from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .. import models
from ..deps import get_db, get_optional_user
from ..schemas import StudentProfileOut
from ..services import recommendations as reco

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])


class RecommendationRequest(BaseModel):
    ielts: Optional[float] = None
    pte: Optional[float] = None
    gpa: Optional[float] = None
    budget_per_year_usd: Optional[float] = None
    preferred_countries: Optional[str] = None
    degree_level: Optional[str] = None
    field_of_study: Optional[str] = None
    limit: int = 15


def _merge_from_saved_profile(db, user, req: RecommendationRequest):
    if user is None:
        return
    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    if profile is None:
        return
    for field in ("ielts", "pte", "gpa", "budget_per_year_usd", "preferred_countries"):
        if getattr(req, field) is None:
            setattr(req, field, getattr(profile, field))


@router.get("")
def get_recommendations(
    user=Depends(get_optional_user),
    db: Session = Depends(get_db),
    limit: int = 15,
):
    if user is None:
        raise HTTPException(status_code=401, detail="Sign in to get personalized recommendations")
    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    if profile is None:
        raise HTTPException(
            status_code=404, detail="No profile found. Complete your profile first."
        )
    return reco.recommend(db, profile, limit=limit)


@router.post("")
def compute_recommendations(
    req: RecommendationRequest,
    user=Depends(get_optional_user),
    db: Session = Depends(get_db),
):
    _merge_from_saved_profile(db, user, req)
    profile = models.StudentProfile(
        ielts=req.ielts,
        pte=req.pte,
        gpa=req.gpa,
        budget_per_year_usd=req.budget_per_year_usd,
        preferred_countries=req.preferred_countries,
    )
    return reco.recommend(db, profile, limit=req.limit)
