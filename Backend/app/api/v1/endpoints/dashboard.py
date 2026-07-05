from fastapi import APIRouter

from app.services.dashboard_service import get_district_dashboard

router = APIRouter()


@router.get("/district")
async def district_dashboard() -> dict:
    return get_district_dashboard()
