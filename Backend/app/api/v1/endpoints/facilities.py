from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from app.services.facility_service import get_facilities, get_facility_detail, FACILITIES

router = APIRouter()


class CreateFacilityRequest(BaseModel):
    name: str
    facilityType: str = "PHC"
    location: str
    overallRisk: str = "Medium"
    todayOpd: int = 0
    medicineRisk: str = "Low"
    diseaseSpike: str = "Low"
    bedOccupancy: int = 50


@router.get("")
async def facilities() -> list[dict]:
    return get_facilities()


@router.get("/{facility_id}")
async def facility_detail(facility_id: str) -> dict:
    return get_facility_detail(facility_id)


@router.post("")
async def create_facility(req: CreateFacilityRequest) -> dict:
    new_id = req.name.lower().replace(" ", "-").replace("/", "-")
    facility = {
        "id": new_id,
        "name": req.name,
        "facilityType": req.facilityType,
        "location": req.location,
        "overallRisk": req.overallRisk,
        "todayOpd": req.todayOpd,
        "medicineRisk": req.medicineRisk,
        "diseaseSpike": req.diseaseSpike,
        "bedOccupancy": req.bedOccupancy,
    }
    FACILITIES.append(facility)
    return facility
