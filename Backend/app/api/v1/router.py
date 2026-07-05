from fastapi import APIRouter

from app.api.v1.endpoints import (
    ai, alerts, dashboard, facilities, inventory,
    patients, doctors, nurses, disease_trends,
    enriched_facilities, enriched_dashboard,
)

api_router = APIRouter()

api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(enriched_dashboard.router, prefix="/dashboard/enriched", tags=["dashboard-enriched"])
api_router.include_router(facilities.router, prefix="/facilities", tags=["facilities"])
api_router.include_router(enriched_facilities.router, prefix="/facilities/enriched", tags=["facilities-enriched"])
api_router.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(patients.router, prefix="/patients", tags=["patients"])
api_router.include_router(doctors.router, prefix="/doctors", tags=["doctors"])
api_router.include_router(nurses.router, prefix="/nurses", tags=["nurses"])
api_router.include_router(disease_trends.router, prefix="/disease-trends", tags=["disease-trends"])
