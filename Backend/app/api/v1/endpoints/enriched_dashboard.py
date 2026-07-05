from fastapi import APIRouter

from app.services.enriched_dashboard_service import get_enriched_dashboard

router = APIRouter()


@router.get("")
async def enriched_dashboard() -> dict:
    return get_enriched_dashboard()
