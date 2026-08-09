from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user, get_optional_user

router = APIRouter(prefix="/api/universities", tags=["universities"])


def _to_out(uni: models.University, saved_ids: set[int] | None = None) -> schemas.UniversityOut:
    out = schemas.UniversityOut.model_validate(uni)
    if saved_ids is not None:
        out.saved = uni.id in saved_ids
    return out


@router.get("", response_model=schemas.UniversityList)
def search_universities(
    q: str = "",
    country: str = "",
    budget_max: int | None = None,
    sort: str = Query("rank", pattern="^(rank|name|tuition)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(models.University)
    if q:
        like = f"%{q.strip()}%"
        query = query.filter(
            or_(
                models.University.name.ilike(like),
                models.University.country.ilike(like),
                models.University.city.ilike(like),
            )
        )
    if country:
        query = query.filter(models.University.country == country)
    if budget_max is not None:
        query = query.filter(
            or_(
                models.University.tuition_min_usd <= budget_max,
                models.University.tuition_min_usd.is_(None),
            )
        )

    total = query.count()

    if sort == "name":
        query = query.order_by(models.University.name.asc())
    elif sort == "tuition":
        query = query.order_by(func.coalesce(models.University.tuition_min_usd, 10**9).asc())
    else:
        query = query.order_by(func.coalesce(models.University.rank_world, 99999).asc())

    items = query.offset((page - 1) * page_size).limit(page_size).all()
    return schemas.UniversityList(
        total=total,
        items=[schemas.UniversityOut.model_validate(u) for u in items],
    )


@router.get("/countries", response_model=list[str])
def list_countries(db: Session = Depends(get_db)):
    rows = (
        db.query(models.University.country)
        .distinct()
        .order_by(models.University.country.asc())
        .all()
    )
    return [r[0] for r in rows]


@router.get("/saved/me", response_model=schemas.UniversityList)
def my_saved_universities(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rows = (
        db.query(models.University)
        .join(models.SavedUniversity)
        .filter(models.SavedUniversity.user_id == user.id)
        .order_by(models.SavedUniversity.created_at.desc())
        .all()
    )
    return schemas.UniversityList(
        total=len(rows),
        items=[schemas.UniversityOut.model_validate(u) for u in rows],
    )


@router.get("/{uni_id}", response_model=schemas.UniversityOut)
def get_university(
    uni_id: int,
    db: Session = Depends(get_db),
    user: models.User | None = Depends(get_optional_user),
):
    uni = db.get(models.University, uni_id)
    if uni is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    saved_ids = set()
    if user is not None:
        saved_ids = {
            s.university_id
            for s in db.query(models.SavedUniversity)
            .filter(models.SavedUniversity.user_id == user.id)
            .all()
        }
    return _to_out(uni, saved_ids)


@router.post("/{uni_id}/save", response_model=schemas.UniversityOut)
def save_university(
    uni_id: int,
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    uni = db.get(models.University, uni_id)
    if uni is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    exists = (
        db.query(models.SavedUniversity)
        .filter(
            models.SavedUniversity.user_id == user.id,
            models.SavedUniversity.university_id == uni_id,
        )
        .first()
    )
    if exists is None:
        db.add(models.SavedUniversity(user_id=user.id, university_id=uni_id))
        db.commit()
    saved_ids = {
        s.university_id
        for s in db.query(models.SavedUniversity)
        .filter(models.SavedUniversity.user_id == user.id)
        .all()
    }
    return _to_out(uni, saved_ids)


@router.delete("/{uni_id}/save", response_model=schemas.UniversityOut)
def unsave_university(
    uni_id: int,
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    uni = db.get(models.University, uni_id)
    if uni is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    db.query(models.SavedUniversity).filter(
        models.SavedUniversity.user_id == user.id,
        models.SavedUniversity.university_id == uni_id,
    ).delete()
    db.commit()
    saved_ids = {
        s.university_id
        for s in db.query(models.SavedUniversity)
        .filter(models.SavedUniversity.user_id == user.id)
        .all()
    }
    return _to_out(uni, saved_ids)


@router.get("/saved/me", response_model=schemas.UniversityList)
def my_saved_universities(
    user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rows = (
        db.query(models.University)
        .join(models.SavedUniversity)
        .filter(models.SavedUniversity.user_id == user.id)
        .order_by(models.SavedUniversity.created_at.desc())
        .all()
    )
    return schemas.UniversityList(
        total=len(rows),
        items=[schemas.UniversityOut.model_validate(u) for u in rows],
    )
