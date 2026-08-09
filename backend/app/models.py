"""Database models (SQLAlchemy). Tables are created via create_all on startup."""
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint,
)
from sqlalchemy.orm import relationship

from .db import Base


def utcnow():
    return datetime.now(timezone.utc).replace(tzinfo=None)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    profile = relationship(
        "StudentProfile", back_populates="user", uselist=False
    )


class SessionToken(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String(255), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    expires_at = Column(DateTime(timezone=True), nullable=False)

    user = relationship("User")


class StudentProfile(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    current_country = Column(String(100), nullable=True)
    nationality = Column(String(100), nullable=True)
    highest_education = Column(String(50), nullable=True)
    gpa = Column(Float, nullable=True)
    ielts = Column(Float, nullable=True)
    pte = Column(Float, nullable=True)
    budget_per_year_usd = Column(Integer, nullable=True)
    preferred_countries = Column(String(300), nullable=True)
    preferred_degrees = Column(String(200), nullable=True)
    target_intake = Column(String(50), nullable=True)
    goal = Column(Text, nullable=True)
    completed = Column(Boolean, default=False, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    user = relationship("User", back_populates="profile")


class University(Base):
    __tablename__ = "universities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    country = Column(String(100), nullable=False, index=True)
    city = Column(String(120), nullable=True)
    rank_world = Column(Integer, nullable=True)
    intake_seasons = Column(String(120), nullable=True)
    ielts_min = Column(Float, nullable=True)
    pte_min = Column(Float, nullable=True)
    toefl_min = Column(Integer, nullable=True)
    gpa_requirement = Column(String(200), nullable=True)
    tuition_fees = Column(String(300), nullable=True)
    tuition_min_usd = Column(Integer, nullable=True)
    tuition_max_usd = Column(Integer, nullable=True)
    application_fee = Column(String(120), nullable=True)
    documents_required = Column(Text, nullable=True)
    deadlines = Column(Text, nullable=True)
    official_website = Column(String(300), nullable=True)
    admissions_page = Column(String(300), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(20), default="approx", nullable=False)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    saved_by = relationship(
        "SavedUniversity", back_populates="university", cascade="all, delete-orphan"
    )
    applications = relationship(
        "Application", back_populates="university", cascade="all, delete-orphan"
    )


class SavedUniversity(Base):
    __tablename__ = "saved_universities"
    __table_args__ = (UniqueConstraint("user_id", "university_id", name="uq_saved"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    user = relationship("User")
    university = relationship("University", back_populates="saved_by")


class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    country = Column(String(100), nullable=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id", ondelete="SET NULL"), nullable=True)
    eligibility = Column(Text, nullable=True)
    coverage = Column(String(300), nullable=True)
    amount_per_year_usd = Column(Integer, nullable=True)
    deadline = Column(String(120), nullable=True)
    link = Column(String(300), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(20), default="approx", nullable=False)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    university = relationship("University")


class Application(Base):
    __tablename__ = "applications"
    __table_args__ = (UniqueConstraint("user_id", "university_id", name="uq_app"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(30), default="drafted", nullable=False)
    sop_draft = Column(Text, nullable=True)
    email_draft = Column(Text, nullable=True)
    checklist = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    user = relationship("User")
    university = relationship("University", back_populates="applications")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    user = relationship("User")


class Setting(Base):
    __tablename__ = "settings"

    key = Column(String(100), primary_key=True)
    value = Column(Text, nullable=True)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class PartnerInquiry(Base):
    __tablename__ = "partner_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    university_name = Column(String(255), nullable=False)
    country = Column(String(120), nullable=False)
    contact_name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False)
    role = Column(String(120), nullable=False)
    website = Column(String(300), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(30), default="new", nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)
