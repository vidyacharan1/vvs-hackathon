from fastapi import APIRouter
from pydantic import BaseModel

from app.services.patient_service import get_patients, get_patient_detail, get_facility_patients, PATIENTS

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


@router.get("")
async def patients() -> list[dict]:
    return get_patients()


@router.get("/{patient_id}")
async def patient_detail(patient_id: str) -> dict:
    return get_patient_detail(patient_id)


@router.get("/facility/{facility_id}")
async def facility_patients(facility_id: str) -> list[dict]:
    return get_facility_patients(facility_id)


@router.post("")
async def create_patient(req: CreatePatientRequest) -> dict:
    new_id = f"pat-{len(PATIENTS) + 1:03d}"
    initials = "".join(w[0] for w in req.name.split()[:2]).upper()
    patient = {
        "id": new_id,
        "name": req.name,
        "age": req.age,
        "gender": req.gender,
        "phone": req.phone,
        "village": req.village,
        "facilityId": req.facilityId,
        "assignedDoctorId": req.assignedDoctorId,
        "assignedNurseId": req.assignedNurseId,
        "riskScore": req.riskScore,
        "condition": req.condition,
        "conditions": req.conditions,
        "followUpStatus": "pending",
        "lastVisit": "",
        "nextFollowUp": "",
        "avatar": initials,
    }
    PATIENTS.append(patient)
    return patient
