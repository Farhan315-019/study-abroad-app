from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from .. import schemas
from ..db import get_db
from ..deps import get_current_user
from ..models import SessionToken, User
from ..security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _issue_session(db: Session, user: User) -> schemas.AuthResponse:
    token, expires_at = create_access_token(user.id)
    session = SessionToken(
        token=token,
        user_id=user.id,
        expires_at=expires_at,
    )
    db.add(session)
    db.commit()
    return schemas.AuthResponse(token=token, user=schemas.UserOut.model_validate(user))


@router.post("/register", response_model=schemas.AuthResponse, status_code=201)
def register(payload: schemas.RegisterRequest, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()
    existing = db.query(User).filter(
        or_(User.email == email, User.email == payload.email)
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )
    user = User(
        name=payload.name.strip(),
        email=email,
        password_hash=hash_password(payload.password),
        is_admin=db.query(User).count() == 0,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _issue_session(db, user)


@router.post("/login", response_model=schemas.AuthResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()
    user = db.query(User).filter(User.email == email).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    return _issue_session(db, user)


@router.post("/logout")
def logout(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.query(SessionToken).filter(SessionToken.user_id == user.id).delete()
    db.commit()
    return {"status": "ok"}


@router.get("/me", response_model=schemas.UserOut)
def me(user: User = Depends(get_current_user)):
    return user
