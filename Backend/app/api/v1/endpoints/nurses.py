from fastapi import APIRouter
from pydantic import BaseModel

from app.services.nurse_service import get_nurses, get_nurse_detail, get_facility_nurses, NURSES

router = APIRouter()


class CreateNurseRequest(BaseModel):
    name: str
    facilityId: str
    assignedVillages: list[str] = []


@router.get("")
async def nurses() -> list[dict]:
    return get_nurses()


@router.get("/{nurse_id}")
async def nurse_detail(nurse_id: str) -> dict:
    return get_nurse_detail(nurse_id)


@router.get("/facility/{facility_id}")
async def facility_nurses(facility_id: str) -> list[dict]:
    return get_facility_nurses(facility_id)


@router.post("")
async def create_nurse(req: CreateNurseRequest) -> dict:
    new_id = f"nurse-{len(NURSES) + 1}"
    nurse = {
        "id": new_id,
        "name": req.name,
        "facilityId": req.facilityId,
        "assignedVillages": req.assignedVillages,
        "assignedPatients": 0,
        "pendingFollowUps": 0,
        "completedToday": 0,
        "highRiskFollowUps": 0,
        "workloadStatus": "normal",
    }
    NURSES.append(nurse)
    return nurse
