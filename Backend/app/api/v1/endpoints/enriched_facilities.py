from fastapi import APIRouter

from app.services.enriched_service import get_enriched_facilities, get_enriched_facility_detail
from app.services.facility_detail_service import get_facility_medicines, get_facility_insights
from app.services.patient_service import get_facility_patients
from app.services.doctor_service import get_facility_doctors
from app.services.nurse_service import get_facility_nurses

router = APIRouter()


@router.get("")
async def enriched_facilities() -> list[dict]:
    return get_enriched_facilities()


@router.get("/{facility_id}")
async def enriched_facility_detail(facility_id: str) -> dict:
    return get_enriched_facility_detail(facility_id)


@router.get("/{facility_id}/medicines")
async def facility_medicines(facility_id: str) -> list[dict]:
    return get_facility_medicines(facility_id)


@router.get("/{facility_id}/insights")
async def facility_insights(facility_id: str) -> list[dict]:
    return get_facility_insights(facility_id)


@router.get("/{facility_id}/patients")
async def facility_patients(facility_id: str) -> list[dict]:
    return get_facility_patients(facility_id)


@router.get("/{facility_id}/doctors")
async def facility_doctors(facility_id: str) -> list[dict]:
    return get_facility_doctors(facility_id)


@router.get("/{facility_id}/nurses")
async def facility_nurses(facility_id: str) -> list[dict]:
    return get_facility_nurses(facility_id)
