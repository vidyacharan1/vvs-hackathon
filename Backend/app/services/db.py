from sqlalchemy import select, func, update as sa_update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import (
    Facility, Doctor, Nurse, Patient, InventoryStock,
    InventoryLog, AIInsight, DiseaseSpike, HealthTrend, VillageCondition,
)


def _row_to_dict(row) -> dict:
    return {c.key: getattr(row, c.key) for c in row.__table__.columns}


def _facility_dict(f: Facility) -> dict:
    return {
        "id": f.id, "name": f.name, "facilityType": f.facility_type,
        "location": f.location, "overallRisk": f.overall_risk,
        "todayOpd": f.today_opd, "medicineRisk": f.medicine_risk,
        "diseaseSpike": f.disease_spike, "bedOccupancy": f.bed_occupancy,
    }


def _doctor_dict(d: Doctor) -> dict:
    return {
        "id": d.id, "name": d.name, "facilityId": d.facility_id,
        "specialty": d.specialty, "attendance": d.attendance,
        "patientsSeenToday": d.patients_seen_today, "maxCapacity": d.max_capacity,
        "activePatients": d.active_patients, "highRiskPatients": d.high_risk_patients,
        "pendingReviews": d.pending_reviews, "workloadStatus": d.workload_status,
    }


def _nurse_dict(n: Nurse) -> dict:
    return {
        "id": n.id, "name": n.name, "facilityId": n.facility_id,
        "assignedVillages": n.assigned_villages or [],
        "assignedPatients": n.assigned_patients,
        "pendingFollowUps": n.pending_follow_ups,
        "completedToday": n.completed_today,
        "highRiskFollowUps": n.high_risk_follow_ups,
        "workloadStatus": n.workload_status,
    }


def _patient_dict(p: Patient) -> dict:
    return {
        "id": p.id, "name": p.name, "age": p.age, "gender": p.gender,
        "phone": p.phone, "village": p.village, "facilityId": p.facility_id,
        "assignedDoctorId": p.assigned_doctor_id, "assignedNurseId": p.assigned_nurse_id,
        "riskScore": p.risk_score, "condition": p.condition,
        "conditions": p.conditions or [], "followUpStatus": p.follow_up_status,
        "lastVisit": p.last_visit, "nextFollowUp": p.next_follow_up,
        "avatar": p.avatar,
    }


def _stock_dict(s: InventoryStock) -> dict:
    return {
        "id": s.id, "name": s.name, "facilityId": s.facility_id,
        "currentStock": s.current_stock, "avgDailyUsage": s.avg_daily_usage,
        "daysLeft": s.days_left, "reorderLevel": s.reorder_level,
        "risk": s.risk, "batchNumber": s.batch_number,
    }


def _insight_dict(i: AIInsight) -> dict:
    return {
        "id": i.id, "message": i.message, "priority": i.priority,
        "category": i.category, "timestamp": i.timestamp, "type": i.type,
        "facilityId": i.facility_id, "severity": i.severity,
        "createdAt": i.created_at, "summary": i.summary,
        "recommendation": i.recommendation, "status": i.status,
    }


def _disease_dict(d: DiseaseSpike) -> dict:
    return {
        "condition": d.condition, "facilityId": d.facility_id,
        "thisWeek": d.this_week, "lastWeek": d.last_week,
        "increase": d.increase, "risk": d.risk,
        "linkedMedicine": d.linked_medicine,
    }


def _trend_dict(t: HealthTrend) -> dict:
    return {
        "month": t.month, "opVisits": t.op_visits,
        "chronicCases": t.chronic_cases, "followUps": t.follow_ups,
        "fever": t.fever, "respiratory": t.respiratory,
        "hypertension": t.hypertension, "diabetes": t.diabetes,
        "diarrhea": t.diarrhea,
    }


def _village_dict(v: VillageCondition) -> dict:
    return {
        "village": v.village, "facilityId": v.facility_id,
        "condition": v.condition, "count": v.count,
    }


def _calc_risk(days_left: float) -> str:
    if days_left > 10:
        return "low"
    if days_left > 5:
        return "medium"
    if days_left > 3:
        return "high"
    return "critical"


# --- Facilities ---

async def get_facilities(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(Facility))
    return [_facility_dict(f) for f in result.scalars().all()]


async def get_facility_detail(session: AsyncSession, facility_id: str) -> dict:
    f = await session.get(Facility, facility_id)
    return _facility_dict(f) if f else {"id": facility_id, "status": "not_found"}


async def create_facility(session: AsyncSession, data: dict) -> dict:
    f = Facility(**data)
    session.add(f)
    await session.commit()
    await session.refresh(f)
    return _facility_dict(f)


async def update_facility(session: AsyncSession, facility_id: str, data: dict) -> dict:
    f = await session.get(Facility, facility_id)
    if not f:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(f, k, v)
    await session.commit()
    await session.refresh(f)
    return _facility_dict(f)


# --- Doctors ---

async def get_doctors(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(Doctor))
    return [_doctor_dict(d) for d in result.scalars().all()]


async def get_doctor_detail(session: AsyncSession, doctor_id: str) -> dict:
    d = await session.get(Doctor, doctor_id)
    return _doctor_dict(d) if d else {"id": doctor_id, "status": "not_found"}


async def get_facility_doctors(session: AsyncSession, facility_id: str) -> list[dict]:
    result = await session.execute(select(Doctor).where(Doctor.facility_id == facility_id))
    return [_doctor_dict(d) for d in result.scalars().all()]


async def create_doctor(session: AsyncSession, data: dict) -> dict:
    d = Doctor(**data)
    session.add(d)
    await session.commit()
    await session.refresh(d)
    return _doctor_dict(d)


async def update_doctor(session: AsyncSession, doctor_id: str, data: dict) -> dict:
    d = await session.get(Doctor, doctor_id)
    if not d:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(d, k, v)
    await session.commit()
    await session.refresh(d)
    return _doctor_dict(d)


# --- Nurses ---

async def get_nurses(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(Nurse))
    return [_nurse_dict(n) for n in result.scalars().all()]


async def get_nurse_detail(session: AsyncSession, nurse_id: str) -> dict:
    n = await session.get(Nurse, nurse_id)
    return _nurse_dict(n) if n else {"id": nurse_id, "status": "not_found"}


async def get_facility_nurses(session: AsyncSession, facility_id: str) -> list[dict]:
    result = await session.execute(select(Nurse).where(Nurse.facility_id == facility_id))
    return [_nurse_dict(n) for n in result.scalars().all()]


async def create_nurse(session: AsyncSession, data: dict) -> dict:
    n = Nurse(**data)
    session.add(n)
    await session.commit()
    await session.refresh(n)
    return _nurse_dict(n)


async def update_nurse(session: AsyncSession, nurse_id: str, data: dict) -> dict:
    n = await session.get(Nurse, nurse_id)
    if not n:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(n, k, v)
    await session.commit()
    await session.refresh(n)
    return _nurse_dict(n)


# --- Patients ---

async def get_patients(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(Patient))
    return [_patient_dict(p) for p in result.scalars().all()]


async def get_patient_detail(session: AsyncSession, patient_id: str) -> dict:
    p = await session.get(Patient, patient_id)
    return _patient_dict(p) if p else {"id": patient_id, "status": "not_found"}


async def get_facility_patients(session: AsyncSession, facility_id: str) -> list[dict]:
    result = await session.execute(select(Patient).where(Patient.facility_id == facility_id))
    return [_patient_dict(p) for p in result.scalars().all()]


async def create_patient(session: AsyncSession, data: dict) -> dict:
    p = Patient(**data)
    session.add(p)
    await session.commit()
    await session.refresh(p)
    return _patient_dict(p)


async def update_patient(session: AsyncSession, patient_id: str, data: dict) -> dict:
    p = await session.get(Patient, patient_id)
    if not p:
        return None
    for k, v in data.items():
        if v is not None:
            setattr(p, k, v)
    await session.commit()
    await session.refresh(p)
    return _patient_dict(p)


# --- Inventory ---

async def get_inventory_stock(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(InventoryStock))
    return [_stock_dict(s) for s in result.scalars().all()]


async def get_inventory_alerts(session: AsyncSession) -> list[dict]:
    return [
        {"medicine": "Paracetamol", "severity": "High", "facilities": 5, "daysLeft": 2.1},
        {"medicine": "Antibiotics", "severity": "High", "facilities": 4, "daysLeft": 2.8},
        {"medicine": "ORS", "severity": "Medium", "facilities": 7, "daysLeft": 4.5},
    ]


async def add_stock_item(session: AsyncSession, medicine: str, facility_id: str, quantity: int, batch_number: str = "") -> dict:
    result = await session.execute(
        select(InventoryStock).where(
            func.lower(InventoryStock.name) == medicine.lower(),
            InventoryStock.facility_id == facility_id,
        )
    )
    existing = result.scalars().first()

    if existing:
        existing.current_stock += quantity
        existing.days_left = round(existing.current_stock / existing.avg_daily_usage, 1) if existing.avg_daily_usage > 0 else 999
        existing.risk = _calc_risk(existing.days_left)
        item = existing
    else:
        item = InventoryStock(
            id=f"stock-{hash(f'{medicine}{facility_id}') % 10000}",
            name=medicine,
            facility_id=facility_id,
            current_stock=quantity,
            avg_daily_usage=10,
            days_left=round(quantity / 10, 1),
            reorder_level=quantity,
            risk="low",
            batch_number=batch_number,
        )
        session.add(item)

    session.add(InventoryLog(
        action="add_stock", medicine=medicine, facility_id=facility_id,
        quantity=quantity, batch_number=batch_number,
    ))
    await session.commit()
    await session.refresh(item)
    return _stock_dict(item)


async def transfer_stock_item(session: AsyncSession, medicine: str, from_facility_id: str, to_facility_id: str, quantity: int) -> dict:
    src_result = await session.execute(
        select(InventoryStock).where(
            func.lower(InventoryStock.name) == medicine.lower(),
            InventoryStock.facility_id == from_facility_id,
        )
    )
    source = src_result.scalars().first()
    if not source:
        return {"error": f"Medicine {medicine} not found at {from_facility_id}"}
    if source.current_stock < quantity:
        return {"error": f"Insufficient stock. Available: {source.current_stock}, Requested: {quantity}"}

    source.current_stock -= quantity
    source.days_left = round(source.current_stock / source.avg_daily_usage, 1) if source.avg_daily_usage > 0 else 999
    source.risk = _calc_risk(source.days_left)

    dest_result = await session.execute(
        select(InventoryStock).where(
            func.lower(InventoryStock.name) == medicine.lower(),
            InventoryStock.facility_id == to_facility_id,
        )
    )
    dest = dest_result.scalars().first()
    if dest:
        dest.current_stock += quantity
        dest.days_left = round(dest.current_stock / dest.avg_daily_usage, 1) if dest.avg_daily_usage > 0 else 999
    else:
        dest = InventoryStock(
            id=f"stock-{hash(f'{medicine}{to_facility_id}') % 10000}",
            name=medicine, facility_id=to_facility_id,
            current_stock=quantity, avg_daily_usage=10,
            days_left=round(quantity / 10, 1), reorder_level=quantity,
            risk="low", batch_number="",
        )
        session.add(dest)

    session.add(InventoryLog(
        action="transfer", medicine=medicine,
        from_facility_id=from_facility_id, to_facility_id=to_facility_id,
        quantity=quantity,
    ))
    await session.commit()
    return {"status": "success", "message": f"Transferred {quantity} units of {medicine} from {from_facility_id} to {to_facility_id}"}


# --- Insights ---

async def get_facility_insights(session: AsyncSession, facility_id: str) -> list[dict]:
    result = await session.execute(select(AIInsight).where(AIInsight.facility_id == facility_id))
    return [_insight_dict(i) for i in result.scalars().all()]


async def acknowledge_insight(session: AsyncSession, insight_id: str) -> dict:
    i = await session.get(AIInsight, insight_id)
    if not i:
        return None
    i.status = "acknowledged"
    await session.commit()
    return _insight_dict(i)


async def resolve_insight(session: AsyncSession, insight_id: str) -> dict:
    i = await session.get(AIInsight, insight_id)
    if not i:
        return None
    i.status = "resolved"
    await session.commit()
    return _insight_dict(i)


# --- Disease Trends ---

async def get_disease_spikes(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(DiseaseSpike))
    return [_disease_dict(d) for d in result.scalars().all()]


async def get_health_trends(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(HealthTrend))
    return [_trend_dict(t) for t in result.scalars().all()]


async def get_village_conditions(session: AsyncSession) -> list[dict]:
    result = await session.execute(select(VillageCondition))
    return [_village_dict(v) for v in result.scalars().all()]
