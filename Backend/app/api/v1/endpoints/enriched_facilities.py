from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db

router = APIRouter()


@router.get("")
async def enriched_facilities(session: AsyncSession = Depends(get_db)) -> list[dict]:
    facilities = await db.get_facilities(session)
    result = []
    for f in facilities:
        fid = f["id"]
        docs = await db.get_facility_doctors(session, fid)
        nurses = await db.get_facility_nurses(session, fid)
        patients = await db.get_facility_patients(session, fid)
        meds = await db.get_inventory_stock(session)
        meds = [m for m in meds if m["facilityId"] == fid]
        insights = await db.get_facility_insights(session, fid)

        doctors_present = sum(1 for d in docs if d["attendance"] == "present")
        total_doctors = len(docs)
        nurses_present = len(nurses)
        total_nurses = len(nurses)
        critical_patients = sum(1 for p in patients if p["riskScore"] in ("Critical", "High"))
        open_alerts = len(insights)

        result.append({
            **f,
            "doctorsPresent": doctors_present,
            "totalDoctors": total_doctors,
            "nursesPresent": nurses_present,
            "totalNurses": total_nurses,
            "totalPatients": len(patients) * 40,
            "criticalPatients": critical_patients * 4,
            "openAlerts": open_alerts,
            "medicineStockIssues": len([m for m in meds if m["risk"] in ("critical", "high")]),
            "diseaseSpikeCount": 1 if f.get("diseaseSpike") == "High" else 0,
            "diseaseSpikeRisk": 88 if f.get("diseaseSpike") == "High" else 30,
            "healthScore": 32 if f["overallRisk"] == "Critical" else 49 if f["overallRisk"] == "High" else 72,
            "riskScore": f["bedOccupancy"],
            "avgOpd7day": int(f["todayOpd"] * 0.85),
            "bedsOccupied": int(f["bedOccupancy"] * 0.2),
            "totalBeds": 20 if f["facilityType"] == "PHC" else 40,
            "village": f["location"],
            "mandal": f["location"],
            "district": "Visakhapatnam",
            "type": f["facilityType"],
            "status": f["overallRisk"].lower(),
        })
    return result


@router.get("/{facility_id}")
async def enriched_facility_detail(facility_id: str, session: AsyncSession = Depends(get_db)) -> dict:
    facilities = await db.get_facilities(session)
    match = next((f for f in facilities if f["id"] == facility_id), None)
    if not match:
        return {"id": facility_id, "status": "not_found"}

    docs = await db.get_facility_doctors(session, facility_id)
    nurses_list = await db.get_facility_nurses(session, facility_id)
    patients_list = await db.get_facility_patients(session, facility_id)
    all_meds = await db.get_inventory_stock(session)
    meds = [m for m in all_meds if m["facilityId"] == facility_id]
    insights = await db.get_facility_insights(session, facility_id)

    doctors_present = sum(1 for d in docs if d["attendance"] == "present")
    total_doctors = len(docs)
    nurses_present = len(nurses_list)
    total_nurses = len(nurses_list)
    critical_patients = sum(1 for p in patients_list if p["riskScore"] in ("Critical", "High"))
    open_alerts = len(insights)

    return {
        **match,
        "doctorsPresent": doctors_present,
        "totalDoctors": total_doctors,
        "nursesPresent": nurses_present,
        "totalNurses": total_nurses,
        "totalPatients": len(patients_list) * 40,
        "criticalPatients": critical_patients * 4,
        "openAlerts": open_alerts,
        "medicineStockIssues": len([m for m in meds if m["risk"] in ("critical", "high")]),
        "diseaseSpikeCount": 1 if match.get("diseaseSpike") == "High" else 0,
        "diseaseSpikeRisk": 88 if match.get("diseaseSpike") == "High" else 30,
        "healthScore": 32 if match["overallRisk"] == "Critical" else 49 if match["overallRisk"] == "High" else 72,
        "riskScore": match["bedOccupancy"],
        "avgOpd7day": int(match["todayOpd"] * 0.85),
        "bedsOccupied": int(match["bedOccupancy"] * 0.2),
        "totalBeds": 20 if match["facilityType"] == "PHC" else 40,
        "bedOccupancyRate": match["bedOccupancy"],
        "village": match["location"],
        "mandal": match["location"],
        "district": "Visakhapatnam",
        "type": match["facilityType"],
        "status": match["overallRisk"].lower(),
        "doctors": docs,
        "nurses": nurses_list,
        "patients": patients_list,
        "medicines": meds,
        "insights": insights,
    }


@router.get("/{facility_id}/medicines")
async def facility_medicines(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    all_meds = await db.get_inventory_stock(session)
    return [m for m in all_meds if m["facilityId"] == facility_id]


@router.get("/{facility_id}/insights")
async def facility_insights(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_insights(session, facility_id)


@router.get("/{facility_id}/patients")
async def facility_patients(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_patients(session, facility_id)


@router.get("/{facility_id}/doctors")
async def facility_doctors(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_doctors(session, facility_id)


@router.get("/{facility_id}/nurses")
async def facility_nurses(facility_id: str, session: AsyncSession = Depends(get_db)) -> list[dict]:
    return await db.get_facility_nurses(session, facility_id)
