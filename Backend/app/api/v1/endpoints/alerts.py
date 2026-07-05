from fastapi import APIRouter

from app.services.alert_service import get_alert_feed

router = APIRouter()


@router.get("")
async def alert_feed() -> list[dict]:
    return get_alert_feed()


@router.post("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str) -> dict:
    return {"status": "success", "message": f"Alert {alert_id} acknowledged", "newStatus": "acknowledged"}


@router.post("/{alert_id}/resolve")
async def resolve_alert(alert_id: str) -> dict:
    return {"status": "success", "message": f"Alert {alert_id} resolved", "newStatus": "resolved"}
