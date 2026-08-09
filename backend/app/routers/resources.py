from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db

router = APIRouter(prefix="/api/resources", tags=["resources"])


@router.post(
    "/partner-inquiries",
    response_model=schemas.PartnerInquiryOut,
    status_code=status.HTTP_201_CREATED,
)
def create_partner_inquiry(
    body: schemas.PartnerInquiryIn,
    db: Session = Depends(get_db),
):
    inquiry = models.PartnerInquiry(**body.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry
