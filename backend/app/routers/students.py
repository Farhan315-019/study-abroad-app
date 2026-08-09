from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user

router = APIRouter(prefix="/api/me", tags=["profile"])


@router.get("/profile", response_model=schemas.StudentProfileOut | None)
def get_profile(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return db.query(models.StudentProfile).filter(
        models.StudentProfile.user_id == user.id
    ).first()


@router.put("/profile", response_model=schemas.StudentProfileOut)
def upsert_profile(
    payload: schemas.StudentProfileIn,
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.query(models.StudentProfile).filter(
        models.StudentProfile.user_id == user.id
    ).first()
    if profile is None:
        profile = models.StudentProfile(user_id=user.id)
        db.add(profile)

    for field in schemas.StudentProfileIn.model_fields:
        setattr(profile, field, getattr(payload, field))

    db.commit()
    db.refresh(profile)
    return profile
