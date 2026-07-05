from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


class CreatePatientRequest(BaseModel):
    name: str
    age: int
    gender: str
    phone: str = ""
    village: str = ""
    facilityId: str = ""
    assignedDoctorId: str = ""
    assignedNurseId: str = ""
    riskScore: str = "Medium"
    condition: str = ""
    conditions: list[str] = []


class UpdatePatientRequest(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    village: Optional[str] = None
    facilityId: Optional[str] = None
    assignedDoctorId: Optional[str] = None
    assignedNurseId: Optional[str] = None
    riskScore: Optional[str] = None
    condition: Optional[str] = None
    conditions: Optional[list[str]] = None
    followUpStatus: Optional[str] = None


@router.get("")
async def patients(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_patients(session)


@router.get("/{patient_id}")
async def patient_detail(patient_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    return await db.get_patient_detail(session, patient_id)


@router.get("/facility/{facility_id}")
async def facility_patients(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_patients(session, facility_id)


@router.post("")
async def create_patient(req: CreatePatientRequest, session: AsyncSession = Depends(get_db)) -> dict:
    initials = "".join(w[0] for w in req.name.split()[:2]).upper()
    data = {
        "id": f"pat-{hash(req.name) % 100000}",
        "name": req.name,
        "age": req.age,
        "gender": req.gender,
        "phone": req.phone,
        "village": req.village,
        "facility_id": req.facilityId,
        "assigned_doctor_id": req.assignedDoctorId,
        "assigned_nurse_id": req.assignedNurseId,
        "risk_score": req.riskScore,
        "condition": req.condition,
        "conditions": req.conditions,
        "follow_up_status": "pending",
        "last_visit": "",
        "next_follow_up": "",
        "avatar": initials,
    }
    return await db.create_patient(session, data)


@router.put("/{patient_id}")
async def update_patient(patient_id: str, req: UpdatePatientRequest, session: AsyncSession = Depends(get_db)) -> dict:
    field_map = {
        "name": "name", "age": "age", "gender": "gender",
        "phone": "phone", "village": "village", "facilityId": "facility_id",
        "assignedDoctorId": "assigned_doctor_id", "assignedNurseId": "assigned_nurse_id",
        "riskScore": "risk_score", "condition": "condition", "conditions": "conditions",
        "followUpStatus": "follow_up_status",
    }
    update_data = {}
    for req_key, db_key in field_map.items():
        val = getattr(req, req_key, None)
        if val is not None:
            update_data[db_key] = val
    result = await db.update_patient(session, patient_id, update_data)
    if not result:
        raise HTTPException(status_code=404, detail="Patient not found")
    return result
