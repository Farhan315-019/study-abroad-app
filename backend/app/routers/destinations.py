"""Real per-country stats derived from the universities table.
Used by the StudyIn (/study/:slug) page to merge real data with static content.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .. import models
from ..db import get_db

router = APIRouter(prefix="/api/destinations", tags=["destinations"])

# slug -> country names as stored in universities.country
NAME_ALIASES = {
    "uk": ["United Kingdom", "UK"],
    "usa": ["USA", "United States"],
    "uae": ["UAE", "United Arab Emirates"],
    "czechia": ["Czech Republic", "Czechia"],
}


class DestinationUniBrief(BaseModel):
    name: str
    city: str | None = None
    rank_world: int | None = None
    ielts_min: float | None = None
    tuition_min_usd: int | None = None
    status: str = "approx"


class DestinationStats(BaseModel):
    slug: str
    name: str
    university_count: int = 0
    verified_count: int = 0
    approx_count: int = 0
    tuition_min_usd: int | None = None
    tuition_max_usd: int | None = None
    intakes: list[str] = []
    top_universities: list[DestinationUniBrief] = []


def _names_for(slug: str, name: str) -> list[str]:
    names = list(NAME_ALIASES.get(slug, []))
    if name and name not in names:
        names.append(name)
    return names


@router.get("/{slug}", response_model=DestinationStats)
def destination_stats(
    slug: str,
    name: str = Query("", description="Display name used to match the DB country column"),
    db: Session = Depends(get_db),
):
    names = _names_for(slug, name)
    if not names:
        raise HTTPException(status_code=404, detail="Destination not found")

    rows = db.query(models.University).filter(models.University.country.in_(names)).all()
    ranked = sorted((u for u in rows if u.rank_world is not None), key=lambda u: u.rank_world)
    top = ranked[:6]
    for u in ranked[6:] + [u for u in rows if u.rank_world is None]:
        if len(top) >= 6:
            break
        top.append(u)

    min_t = min((u.tuition_min_usd for u in rows if u.tuition_min_usd), default=None)
    max_t = max((u.tuition_max_usd for u in rows if u.tuition_max_usd), default=None)

    return DestinationStats(
        slug=slug,
        name=names[0] if name else slug,
        university_count=len(rows),
        verified_count=sum(1 for u in rows if u.status == "verified"),
        approx_count=sum(1 for u in rows if u.status == "approx"),
        tuition_min_usd=min_t,
        tuition_max_usd=max_t,
        intakes=sorted({u.intake_seasons for u in rows if u.intake_seasons}),
        top_universities=[
            DestinationUniBrief(
                name=u.name,
                city=u.city,
                rank_world=u.rank_world,
                ielts_min=u.ielts_min,
                tuition_min_usd=u.tuition_min_usd,
                status=u.status,
            )
            for u in top
        ],
    )
