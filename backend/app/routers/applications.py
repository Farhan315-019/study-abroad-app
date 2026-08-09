from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .. import models
from ..deps import get_current_user, get_db
from ..services import drafts
from ..services.ai import get_settings_map

router = APIRouter(prefix="/api/applications", tags=["applications"])

MAX_APPLICATIONS = 10

VALID_STATUSES = {"drafted", "in_progress", "submitted", "offered", "rejected", "withdrawn"}


class ApplicationIn(BaseModel):
    university_id: int


class ApplicationUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None


class EmailPurpose(BaseModel):
    purpose: str = "the application requirements and deadlines"


def _serialize(app: models.Application) -> dict:
    u = app.university
    return {
        "id": app.id,
        "university": {
            "id": u.id,
            "name": u.name,
            "country": u.country,
            "city": u.city,
            "rank_world": u.rank_world,
            "tuition_min_usd": u.tuition_min_usd,
            "ielts_min": u.ielts_min,
            "status": u.status,
            "admissions_page": u.admissions_page,
            "official_website": u.official_website,
        },
        "status": app.status,
        "sop_draft": app.sop_draft,
        "email_draft": app.email_draft,
        "checklist": app.checklist,
        "notes": app.notes,
        "created_at": app.created_at,
        "updated_at": app.updated_at,
    }


@router.get("")
def list_applications(user=Depends(get_current_user), db: Session = Depends(get_db)):
    rows = (
        db.query(models.Application)
        .filter(models.Application.user_id == user.id)
        .order_by(models.Application.created_at.desc())
        .all()
    )
    return {"items": [_serialize(a) for a in rows]}


@router.post("")
def add_application(
    body: ApplicationIn,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    uni = db.get(models.University, body.university_id)
    if uni is None:
        raise HTTPException(status_code=404, detail="University not found")

    count = (
        db.query(models.Application)
        .filter(models.Application.user_id == user.id)
        .count()
    )
    if count >= MAX_APPLICATIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Application list is full (max {MAX_APPLICATIONS} universities)",
        )

    app = models.Application(user_id=user.id, university_id=uni.id)
    db.add(app)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="University already in your application list")
    db.refresh(app)
    return _serialize(app)


def _get_owned(user_id: int, app_id: int, db: Session) -> models.Application:
    app = db.get(models.Application, app_id)
    if app is None or app.user_id != user_id:
        raise HTTPException(status_code=404, detail="Application not found")
    return app


@router.patch("/{app_id}")
def update_application(
    app_id: int,
    body: ApplicationUpdate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    app = _get_owned(user.id, app_id, db)
    if body.status is not None:
        if body.status not in VALID_STATUSES:
            raise HTTPException(status_code=400, detail=f"Invalid status: {body.status}")
        app.status = body.status
    if body.notes is not None:
        app.notes = body.notes
    db.commit()
    db.refresh(app)
    return _serialize(app)


@router.delete("/{app_id}")
def delete_application(
    app_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    app = _get_owned(user.id, app_id, db)
    db.delete(app)
    db.commit()
    return {"ok": True}


@router.post("/{app_id}/draft-sop")
def draft_sop(app_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    app = _get_owned(user.id, app_id, db)
    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    settings = get_settings_map(db)
    text = drafts.sop_draft(settings, profile, app.university)
    app.sop_draft = text
    db.commit()
    db.refresh(app)
    return _serialize(app)


@router.post("/{app_id}/draft-email")
def draft_email(
    app_id: int,
    body: EmailPurpose = EmailPurpose(),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    app = _get_owned(user.id, app_id, db)
    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    settings = get_settings_map(db)
    text = drafts.email_draft(settings, profile, app.university, body.purpose)
    app.email_draft = text
    db.commit()
    db.refresh(app)
    return _serialize(app)


@router.post("/{app_id}/checklist")
def make_checklist(app_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    app = _get_owned(user.id, app_id, db)
    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    app.checklist = drafts.build_checklist(db, profile, app.university)
    db.commit()
    db.refresh(app)
    return _serialize(app)


@router.get("/package")
def application_package(user=Depends(get_current_user), db: Session = Depends(get_db)):
    rows = (
        db.query(models.Application)
        .filter(models.Application.user_id == user.id)
        .order_by(models.Application.created_at)
        .all()
    )
    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    return {
        "user": {"name": user.name, "email": user.email},
        "profile": {
            "goal": profile.goal if profile else None,
            "ielts": profile.ielts if profile else None,
            "gpa": profile.gpa if profile else None,
        },
        "applications": [_serialize(a) for a in rows],
        "generated_at": None,
    }
