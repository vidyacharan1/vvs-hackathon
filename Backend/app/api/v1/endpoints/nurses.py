from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


class CreateNurseRequest(BaseModel):
    name: str
    facilityId: str
    assignedVillages: list[str] = []


class UpdateNurseRequest(BaseModel):
    name: Optional[str] = None
    facilityId: Optional[str] = None
    assignedVillages: Optional[list[str]] = None
    assignedPatients: Optional[int] = None
    pendingFollowUps: Optional[int] = None
    completedToday: Optional[int] = None
    highRiskFollowUps: Optional[int] = None
    workloadStatus: Optional[str] = None


@router.get("")
async def nurses(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_nurses(session)


@router.get("/{nurse_id}")
async def nurse_detail(nurse_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    return await db.get_nurse_detail(session, nurse_id)


@router.get("/facility/{facility_id}")
async def facility_nurses(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_nurses(session, facility_id)


@router.post("")
async def create_nurse(req: CreateNurseRequest, session: AsyncSession = Depends(get_db)) -> dict:
    data = {
        "id": f"nurse-{hash(req.name) % 100000}",
        "name": req.name,
        "facility_id": req.facilityId,
        "assigned_villages": req.assignedVillages,
        "assigned_patients": 0,
        "pending_follow_ups": 0,
        "completed_today": 0,
        "high_risk_follow_ups": 0,
        "workload_status": "normal",
    }
    return await db.create_nurse(session, data)


@router.put("/{nurse_id}")
async def update_nurse(nurse_id: str, req: UpdateNurseRequest, session: AsyncSession = Depends(get_db)) -> dict:
    field_map = {
        "name": "name", "facilityId": "facility_id", "assignedVillages": "assigned_villages",
        "assignedPatients": "assigned_patients", "pendingFollowUps": "pending_follow_ups",
        "completedToday": "completed_today", "highRiskFollowUps": "high_risk_follow_ups",
        "workloadStatus": "workload_status",
    }
    update_data = {}
    for req_key, db_key in field_map.items():
        val = getattr(req, req_key, None)
        if val is not None:
            update_data[db_key] = val
    result = await db.update_nurse(session, nurse_id, update_data)
    if not result:
        raise HTTPException(status_code=404, detail="Nurse not found")
    return result
