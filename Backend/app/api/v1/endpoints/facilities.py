from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

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


class UpdateFacilityRequest(BaseModel):
    name: Optional[str] = None
    facilityType: Optional[str] = None
    location: Optional[str] = None
    overallRisk: Optional[str] = None
    todayOpd: Optional[int] = None
    medicineRisk: Optional[str] = None
    diseaseSpike: Optional[str] = None
    bedOccupancy: Optional[int] = None


@router.get("")
async def facilities(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facilities(session)


@router.get("/{facility_id}")
async def facility_detail(facility_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    return await db.get_facility_detail(session, facility_id)


@router.post("")
async def create_facility(req: CreateFacilityRequest, session: AsyncSession = Depends(get_db)) -> dict:
    new_id = req.name.lower().replace(" ", "-").replace("/", "-")
    data = {
        "id": new_id,
        "name": req.name,
        "facility_type": req.facilityType,
        "location": req.location,
        "overall_risk": req.overallRisk,
        "today_opd": req.todayOpd,
        "medicine_risk": req.medicineRisk,
        "disease_spike": req.diseaseSpike,
        "bed_occupancy": req.bedOccupancy,
    }
    return await db.create_facility(session, data)


@router.put("/{facility_id}")
async def update_facility(facility_id: str, req: UpdateFacilityRequest, session: AsyncSession = Depends(get_db)) -> dict:
    field_map = {
        "name": "name", "facilityType": "facility_type", "location": "location",
        "overallRisk": "overall_risk", "todayOpd": "today_opd",
        "medicineRisk": "medicine_risk", "diseaseSpike": "disease_spike",
        "bedOccupancy": "bed_occupancy",
    }
    update_data = {}
    for req_key, db_key in field_map.items():
        val = getattr(req, req_key, None)
        if val is not None:
            update_data[db_key] = val
    result = await db.update_facility(session, facility_id, update_data)
    if not result:
        raise HTTPException(status_code=404, detail="Facility not found")
    return result
