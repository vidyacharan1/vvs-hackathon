from fastapi import APIRouter
from pydantic import BaseModel

from app.services.inventory_service import get_inventory_alerts

router = APIRouter()


class AddStockRequest(BaseModel):
    medicine: str
    facilityId: str
    quantity: int
    batchNumber: str = ""


class TransferStockRequest(BaseModel):
    medicine: str
    fromFacilityId: str
    toFacilityId: str
    quantity: int


@router.get("/alerts")
async def inventory_alerts() -> list[dict]:
    return get_inventory_alerts()


@router.post("/add-stock")
async def add_stock(req: AddStockRequest) -> dict:
    return {
        "status": "success",
        "message": f"Added {req.quantity} units of {req.medicine} to {req.facilityId}",
        "medicine": req.medicine,
        "facilityId": req.facilityId,
        "quantityAdded": req.quantity,
    }


@router.post("/transfer")
async def transfer_stock(req: TransferStockRequest) -> dict:
    return {
        "status": "success",
        "message": f"Transferred {req.quantity} units of {req.medicine} from {req.fromFacilityId} to {req.toFacilityId}",
        "medicine": req.medicine,
        "from": req.fromFacilityId,
        "to": req.toFacilityId,
        "quantity": req.quantity,
    }
