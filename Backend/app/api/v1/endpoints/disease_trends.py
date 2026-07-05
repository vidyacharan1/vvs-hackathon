from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


@router.get("/spikes")
async def disease_spikes(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_disease_spikes(session)


@router.get("/health-trends")
async def health_trends(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_health_trends(session)


@router.get("/villages")
async def village_conditions(session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_village_conditions(session)
