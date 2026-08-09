from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool

    model_config = {"from_attributes": True}


class AuthResponse(BaseModel):
    token: str
    user: UserOut


class StudentProfileIn(BaseModel):
    current_country: str | None = None
    nationality: str | None = None
    highest_education: str | None = None
    gpa: float | None = Field(default=None, ge=0, le=5)
    ielts: float | None = Field(default=None, ge=0, le=9)
    pte: float | None = Field(default=None, ge=0, le=90)
    budget_per_year_usd: int | None = Field(default=None, ge=0)
    preferred_countries: str | None = None
    preferred_degrees: str | None = None
    target_intake: str | None = None
    goal: str | None = None
    completed: bool = False


class StudentProfileOut(StudentProfileIn):
    id: int
    user_id: int
    updated_at: datetime | None = None

    model_config = {"from_attributes": True}


class UniversityOut(BaseModel):
    id: int
    name: str
    country: str
    city: str | None = None
    rank_world: int | None = None
    intake_seasons: str | None = None
    ielts_min: float | None = None
    pte_min: float | None = None
    toefl_min: int | None = None
    gpa_requirement: str | None = None
    tuition_fees: str | None = None
    tuition_min_usd: int | None = None
    tuition_max_usd: int | None = None
    application_fee: str | None = None
    documents_required: str | None = None
    deadlines: str | None = None
    official_website: str | None = None
    admissions_page: str | None = None
    notes: str | None = None
    status: str = "approx"
    verified_at: datetime | None = None
    saved: bool = False

    model_config = {"from_attributes": True}


class UniversityList(BaseModel):
    total: int
    items: list[UniversityOut]


class ScholarshipOut(BaseModel):
    id: int
    name: str
    country: str | None = None
    university_id: int | None = None
    eligibility: str | None = None
    coverage: str | None = None
    amount_per_year_usd: int | None = None
    deadline: str | None = None
    link: str | None = None
    notes: str | None = None
    status: str = "approx"
    verified_at: datetime | None = None

    model_config = {"from_attributes": True}


class ScholarshipList(BaseModel):
    total: int
    items: list[ScholarshipOut]


class PartnerInquiryIn(BaseModel):
    university_name: str = Field(min_length=2, max_length=255)
    country: str = Field(min_length=2, max_length=120)
    contact_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    role: str = Field(min_length=2, max_length=120)
    website: str | None = Field(default=None, max_length=300)
    message: str | None = Field(default=None, max_length=3000)


class PartnerInquiryOut(BaseModel):
    id: int
    university_name: str
    country: str
    contact_name: str
    email: str
    role: str
    website: str | None = None
    message: str | None = None
    status: str = "new"
    created_at: datetime | None = None

    model_config = {"from_attributes": True}
