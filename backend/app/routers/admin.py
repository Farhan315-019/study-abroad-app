from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import or_
from sqlalchemy.orm import Session

from .. import models
from ..deps import get_db, require_admin
from ..services.ai import get_settings_map, verify_university

router = APIRouter(prefix="/api/admin", tags=["admin"])


def _utcnow_naive():
    return datetime.now(timezone.utc).replace(tzinfo=None)


class UniStatusUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None


def _serialize(u: models.University) -> dict:
    return {
        "id": u.id,
        "name": u.name,
        "country": u.country,
        "city": u.city,
        "rank_world": u.rank_world,
        "status": u.status,
        "notes": u.notes,
        "verified_at": u.verified_at,
        "admissions_page": u.admissions_page,
        "ielts_min": u.ielts_min,
    }


@router.get("/universities")
def list_universities(
    admin=Depends(require_admin),
    db: Session = Depends(get_db),
    q: str = "",
    status: str = "",
    page_size: int = 50,
    offset: int = 0,
):
    query = db.query(models.University)
    if status:
        query = query.filter(models.University.status == status)
    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(
                models.University.name.like(like),
                models.University.country.like(like),
            )
        )
    total = query.count()
    rows = query.order_by(models.University.name).offset(offset).limit(page_size).all()
    return {"total": total, "items": [_serialize(u) for u in rows]}


@router.patch("/universities/{uni_id}")
def update_status(
    uni_id: int,
    body: UniStatusUpdate,
    admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    u = db.get(models.University, uni_id)
    if u is None:
        raise HTTPException(status_code=404, detail="University not found")
    if body.status is not None:
        if body.status not in {"verified", "approx", "manual"}:
            raise HTTPException(status_code=400, detail="Invalid status")
        u.status = body.status
        u.verified_at = _utcnow_naive() if body.status == "verified" else None
    if body.notes is not None:
        u.notes = body.notes
    db.commit()
    db.refresh(u)
    return _serialize(u)


@router.post("/universities/{uni_id}/verify")
def run_verification(
    uni_id: int,
    admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    u = db.get(models.University, uni_id)
    if u is None:
        raise HTTPException(status_code=404, detail="University not found")
    settings = get_settings_map(db)
    result = verify_university(settings, u)
    u.status = result["status"]
    if result["status"] == "verified":
        u.verified_at = _utcnow_naive()
    else:
        u.verified_at = None
    if result["summary"]:
        u.notes = result["summary"]
    db.commit()
    db.refresh(u)
    return {"university": _serialize(u), **result}
