from fastapi import APIRouter
from pydantic import BaseModel

from app.services.doctor_service import get_doctors, get_doctor_detail, get_facility_doctors, DOCTORS

router = APIRouter()


class CreateDoctorRequest(BaseModel):
    name: str
    facilityId: str
    specialty: str = "General Medicine"


@router.get("")
async def doctors() -> list[dict]:
    return get_doctors()


@router.get("/{doctor_id}")
async def doctor_detail(doctor_id: str) -> dict:
    return get_doctor_detail(doctor_id)


@router.get("/facility/{facility_id}")
async def facility_doctors(facility_id: str) -> list[dict]:
    return get_facility_doctors(facility_id)


@router.post("")
async def create_doctor(req: CreateDoctorRequest) -> dict:
    new_id = f"doc-{len(DOCTORS) + 1}"
    doctor = {
        "id": new_id,
        "name": req.name,
        "facilityId": req.facilityId,
        "specialty": req.specialty,
        "attendance": "present",
        "patientsSeenToday": 0,
        "maxCapacity": 40,
        "activePatients": 0,
        "highRiskPatients": 0,
        "pendingReviews": 0,
        "workloadStatus": "normal",
    }
    DOCTORS.append(doctor)
    return doctor
