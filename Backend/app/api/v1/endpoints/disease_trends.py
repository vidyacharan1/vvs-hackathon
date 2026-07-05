from fastapi import APIRouter

from app.services.disease_service import get_disease_spikes, get_health_trends, get_village_conditions

router = APIRouter()


@router.get("/spikes")
async def disease_spikes() -> list[dict]:
    return get_disease_spikes()


@router.get("/health-trends")
async def health_trends() -> list[dict]:
    return get_health_trends()


@router.get("/villages")
async def village_conditions() -> list[dict]:
    return get_village_conditions()
