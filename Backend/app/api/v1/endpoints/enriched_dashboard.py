from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


@router.get("")
async def enriched_dashboard(session: AsyncSession = Depends(get_db)) -> dict:
    facilities = await db.get_facilities(session)

    total = len(facilities)
    critical = sum(1 for f in facilities if f.get("overallRisk") == "Critical")
    high = sum(1 for f in facilities if f.get("overallRisk") == "High")
    medium = sum(1 for f in facilities if f.get("overallRisk") == "Medium")
    low = total - critical - high - medium

    bed_pressure = sum(1 for f in facilities if f.get("bedOccupancy", 0) >= 80)
    disease_spike_alerts = sum(1 for f in facilities if f.get("diseaseSpike") == "High")

    return {
        "district": "Visakhapatnam",
        "healthScore": 82,
        "metrics": {
            "totalFacilities": total,
            "medicineStockAlerts": disease_spike_alerts,
            "diseaseSpikeAlerts": disease_spike_alerts,
            "highRiskPatients": critical,
            "bedPressure": bed_pressure,
        },
        "facilitySummary": {
            "critical": critical,
            "high": high,
            "medium": medium,
            "low": low,
        },
    }
