from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


class CreateDoctorRequest(BaseModel):
    name: str
    facilityId: str
    specialty: str = "General Medicine"


class UpdateDoctorRequest(BaseModel):
    name: Optional[str] = None
    facilityId: Optional[str] = None
    specialty: Optional[str] = None
    attendance: Optional[str] = None
    patientsSeenToday: Optional[int] = None
    maxCapacity: Optional[int] = None
    activePatients: Optional[int] = None
    highRiskPatients: Optional[int] = None
    pendingReviews: Optional[int] = None
    workloadStatus: Optional[str] = None


@router.get("")
async def doctors(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_doctors(session)


@router.get("/{doctor_id}")
async def doctor_detail(doctor_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    return await db.get_doctor_detail(session, doctor_id)


@router.get("/facility/{facility_id}")
async def facility_doctors(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_doctors(session, facility_id)


@router.post("")
async def create_doctor(req: CreateDoctorRequest, session: AsyncSession = Depends(get_db)) -> dict:
    data = {
        "id": f"doc-{hash(req.name) % 100000}",
        "name": req.name,
        "facility_id": req.facilityId,
        "specialty": req.specialty,
        "attendance": "present",
        "patients_seen_today": 0,
        "max_capacity": 40,
        "active_patients": 0,
        "high_risk_patients": 0,
        "pending_reviews": 0,
        "workload_status": "normal",
    }
    return await db.create_doctor(session, data)


@router.put("/{doctor_id}")
async def update_doctor(doctor_id: str, req: UpdateDoctorRequest, session: AsyncSession = Depends(get_db)) -> dict:
    field_map = {
        "name": "name", "facilityId": "facility_id", "specialty": "specialty",
        "attendance": "attendance", "patientsSeenToday": "patients_seen_today",
        "maxCapacity": "max_capacity", "activePatients": "active_patients",
        "highRiskPatients": "high_risk_patients", "pendingReviews": "pending_reviews",
        "workloadStatus": "workload_status",
    }
    update_data = {}
    for req_key, db_key in field_map.items():
        val = getattr(req, req_key, None)
        if val is not None:
            update_data[db_key] = val
    result = await db.update_doctor(session, doctor_id, update_data)
    if not result:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return result
