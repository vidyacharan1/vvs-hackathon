from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

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
async def inventory_alerts(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_inventory_alerts(session)


@router.get("/stock")
async def inventory_stock(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_inventory_stock(session)


@router.post("/add-stock")
async def add_stock(req: AddStockRequest, session: AsyncSession = Depends(get_db)) -> dict:
    result = await db.add_stock_item(session, req.medicine, req.facilityId, req.quantity, req.batchNumber)
    if "error" in result:
        return {"status": "error", "message": result["error"]}
    return {
        "status": "success",
        "message": f"Added {req.quantity} units of {req.medicine} to {req.facilityId}",
        "medicine": req.medicine,
        "facilityId": req.facilityId,
        "quantityAdded": req.quantity,
        "updatedStock": result,
    }


@router.post("/transfer")
async def transfer_stock(req: TransferStockRequest, session: AsyncSession = Depends(get_db)) -> dict:
    result = await db.transfer_stock_item(session, req.medicine, req.fromFacilityId, req.toFacilityId, req.quantity)
    if "error" in result:
        return {"status": "error", "message": result["error"]}
    return {
        "status": "success",
        "message": result["message"],
        "medicine": req.medicine,
        "from": req.fromFacilityId,
        "to": req.toFacilityId,
        "quantity": req.quantity,
    }
