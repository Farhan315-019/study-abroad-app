from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .. import models
from ..deps import get_current_user, get_db
from ..services.ai import consultant_answer, get_settings_map

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatIn(BaseModel):
    message: str


def _history(db, user_id, limit=50):
    rows = (
        db.query(models.ChatMessage)
        .filter(models.ChatMessage.user_id == user_id)
        .order_by(models.ChatMessage.created_at.desc(), models.ChatMessage.id.desc())
        .limit(limit)
        .all()
    )
    return [
        {"role": r.role, "content": r.content, "created_at": r.created_at}
        for r in reversed(rows)
    ]


@router.post("")
def send_message(
    body: ChatIn,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    text = body.message.strip()
    if not text:
        return {"reply": "Please type a question.", "ai": False, "history": _history(db, user.id)}

    user_msg = models.ChatMessage(user_id=user.id, role="user", content=text)
    db.add(user_msg)

    profile = (
        db.query(models.StudentProfile).filter(models.StudentProfile.user_id == user.id).first()
    )
    if profile is not None and profile.goal:
        text = f"{text}\n(Student context: {profile.goal}, budget ${profile.budget_per_year_usd or 0}/yr, IELTS {profile.ielts or 'n/a'})"

    settings = get_settings_map(db)
    answer = consultant_answer(db, text, settings)

    assistant_msg = models.ChatMessage(user_id=user.id, role="assistant", content=answer["text"])
    db.add(assistant_msg)
    db.commit()

    return {
        "reply": answer["text"],
        "ai": answer["ai"],
        "history": _history(db, user.id),
    }


@router.get("/history")
def chat_history(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return {"messages": _history(db, user.id)}
