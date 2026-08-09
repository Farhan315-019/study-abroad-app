from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db

router = APIRouter(prefix="/api/scholarships", tags=["scholarships"])


@router.get("", response_model=schemas.ScholarshipList)
def list_scholarships(
    q: str = "",
    country: str = "",
    amount_max: int | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(models.Scholarship)
    if q:
        like = f"%{q.strip()}%"
        query = query.filter(
            or_(
                models.Scholarship.name.ilike(like),
                models.Scholarship.eligibility.ilike(like),
            )
        )
    if country:
        query = query.filter(models.Scholarship.country == country)
    if amount_max is not None:
        query = query.filter(
            or_(
                models.Scholarship.amount_per_year_usd <= amount_max,
                models.Scholarship.amount_per_year_usd.is_(None),
            )
        )

    total = query.count()
    items = (
        query.order_by(func.coalesce(models.Scholarship.amount_per_year_usd, 0).desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return schemas.ScholarshipList(
        total=total,
        items=[schemas.ScholarshipOut.model_validate(s) for s in items],
    )


@router.get("/countries", response_model=list[str])
def list_scholarship_countries(db: Session = Depends(get_db)):
    rows = (
        db.query(models.Scholarship.country)
        .distinct()
        .order_by(models.Scholarship.country.asc())
        .all()
    )
    return [r[0] for r in rows if r[0]]


@router.get("/{sch_id}", response_model=schemas.ScholarshipOut)
def get_scholarship(sch_id: int, db: Session = Depends(get_db)):
    sch = db.get(models.Scholarship, sch_id)
    if sch is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scholarship not found")
    return sch
