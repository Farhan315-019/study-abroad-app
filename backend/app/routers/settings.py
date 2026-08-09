from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .. import models
from ..deps import get_db, require_admin

router = APIRouter(prefix="/api/settings", tags=["settings"])

SENSITIVE_KEYS = {"ai_api_key", "websearch_api_key"}


class SettingsIn(BaseModel):
    ai_provider: str = ""
    ai_base_url: str = ""
    ai_model: str = ""
    ai_api_key: str = ""
    websearch_provider: str = ""
    websearch_api_key: str = ""
    hipolabs_refresh_hours: str = "72"


@router.get("")
def get_settings(admin=Depends(require_admin), db: Session = Depends(get_db)):
    rows = db.query(models.Setting).all()
    out = {}
    for s in rows:
        if s.key in SENSITIVE_KEYS:
            out[s.key] = {"set": bool(s.value)}
        else:
            out[s.key] = s.value or ""
    return out


@router.put("")
def update_settings(
    body: SettingsIn,
    admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    data = body.model_dump()
    for key, value in data.items():
        row = db.get(models.Setting, key)
        if row is None:
            db.add(models.Setting(key=key, value=value or ""))
        else:
            row.value = value or ""
    db.commit()
    return {"ok": True}
