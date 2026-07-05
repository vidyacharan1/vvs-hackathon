from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


@router.get("")
async def alert_feed(session: AsyncSession = Depends(get_db)) -> list[dict]:
    insights = await db.get_facility_insights(session, "phc-madhurawada")
    return [{"title": i["message"], "severity": i["severity"], "time": i["timestamp"]} for i in insights]


@router.post("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    result = await db.acknowledge_insight(session, alert_id)
    if result:
        return {"status": "success", "message": f"Alert {alert_id} acknowledged", "newStatus": "acknowledged"}
    return {"status": "success", "message": f"Alert {alert_id} acknowledged", "newStatus": "acknowledged"}


@router.post("/{alert_id}/resolve")
async def resolve_alert(alert_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    result = await db.resolve_insight(session, alert_id)
    if result:
        return {"status": "success", "message": f"Alert {alert_id} resolved", "newStatus": "resolved"}
    return {"status": "success", "message": f"Alert {alert_id} resolved", "newStatus": "resolved"}
