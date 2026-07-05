import json

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.services import db
from app.services.gemini_service import call_gemini_json

router = APIRouter()


@router.post("/district-brief")
async def district_brief(session: AsyncSession = Depends(get_db)) -> dict:
    facilities = await db.get_facilities(session)
    alerts = await db.get_inventory_alerts(session)
    spikes = await db.get_disease_spikes(session)

    context = json.dumps({
        "facilities": [{"name": f["name"], "risk": f["overallRisk"], "opd": f["todayOpd"], "beds": f["bedOccupancy"], "medicineRisk": f["medicineRisk"], "diseaseSpike": f["diseaseSpike"]} for f in facilities],
        "alerts": [{"medicine": a.get("medicine", ""), "severity": a.get("severity", "medium"), "daysLeft": a.get("daysLeft", 0)} for a in alerts[:10]],
        "disease_spikes": [{"disease": s.get("disease", ""), "cases": s.get("cases", 0), "trend": s.get("trend", "")} for s in spikes[:8]],
    }, indent=2)

    prompt = f"""You are the chief medical officer AI for Visakhapatnam district, Andhra Pradesh, India.
Based on this real healthcare data, generate a concise district health brief.

DATA:
{context}

Respond in JSON with exactly these fields:
{{
  "title": "District Health Brief - [date]",
  "summary": "2-3 sentence executive summary of the district health situation",
  "actions": ["action 1", "action 2", "action 3", "action 4"],
  "confidence": 0.85
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)


@router.post("/brief")
async def patient_brief(session: AsyncSession = Depends(get_db)) -> dict:
    patients = await db.get_patients(session)
    doctors = await db.get_doctors(session)
    nurses = await db.get_nurses(session)

    high_risk = [p for p in patients if p.get("riskScore") in ("Critical", "High")]
    context = json.dumps({
        "total_patients": len(patients),
        "high_risk_patients": [{"name": p["name"], "age": p["age"], "condition": p.get("condition", ""), "risk": p["riskScore"], "village": p.get("village", ""), "followUp": p.get("followUpStatus", "")} for p in high_risk[:10]],
        "doctors_available": len([d for d in doctors if d.get("attendance") == "present"]),
        "nurses_available": len(nurses),
    }, indent=2)

    prompt = f"""You are a clinical AI assistant for a rural healthcare network in Visakhapatnam district.
Based on this patient data, generate a clinical brief and recommended actions.

DATA:
{context}

Respond in JSON:
{{
  "brief": "3-4 sentence clinical summary of patient cohort status",
  "actions": ["action 1", "action 2", "action 3"],
  "confidence": 0.88
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)


@router.post("/redistribution")
async def redistribution(session: AsyncSession = Depends(get_db)) -> dict:
    stock = await db.get_inventory_stock(session)
    facilities = await db.get_facilities(session)

    critical_stock = [s for s in stock if s.get("risk") in ("critical", "high")]
    context = json.dumps({
        "critical_medicines": [{"name": s["name"], "facility": s["facilityId"], "stock": s["currentStock"], "daysLeft": s.get("daysLeft", 0), "risk": s["risk"]} for s in critical_stock],
        "facility_risks": [{"name": f["name"], "risk": f["overallRisk"], "medicineRisk": f["medicineRisk"]} for f in facilities],
    }, indent=2)

    prompt = f"""You are a pharmaceutical logistics AI for Visakhapatnam district healthcare.
Based on this inventory data, recommend medicine redistribution to prevent stock-outs.

DATA:
{context}

Respond in JSON:
{{
  "recommendation": "2-3 sentence redistribution strategy",
  "impact": "Expected impact statement",
  "confidence": 0.87
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)


@router.post("/optimize-nurses")
async def optimize_nurses(session: AsyncSession = Depends(get_db)) -> dict:
    nurses = await db.get_nurses(session)
    patients = await db.get_patients(session)

    context = json.dumps({
        "nurses": [{"name": n["name"], "facility": n["facilityId"], "villages": n.get("assignedVillages", []), "patients": n.get("assignedPatients", 0), "pending": n.get("pendingFollowUps", 0), "completed": n.get("completedToday", 0), "highRisk": n.get("highRiskFollowUps", 0), "workload": n.get("workloadStatus", "")} for n in nurses],
        "overdue_patients": [{"name": p["name"], "village": p.get("village", ""), "risk": p["riskScore"], "condition": p.get("condition", "")} for p in patients if p.get("followUpStatus") == "overdue"][:10],
    }, indent=2)

    prompt = f"""You are a nurse operations AI for rural healthcare in Visakhapatnam district.
Based on nurse workload and patient data, optimize nurse assignments and routes.

DATA:
{context}

Respond in JSON:
{{
  "optimization": "3-4 sentence optimization plan for nurse operations",
  "impact": "Expected impact statement",
  "confidence": 0.85
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)


@router.post("/rebalance-doctors")
async def rebalance_doctors(session: AsyncSession = Depends(get_db)) -> dict:
    doctors = await db.get_doctors(session)
    patients = await db.get_patients(session)

    context = json.dumps({
        "doctors": [{"name": d["name"], "facility": d["facilityId"], "specialty": d.get("specialty", ""), "attendance": d.get("attendance", ""), "seenToday": d.get("patientsSeenToday", 0), "maxCapacity": d.get("maxCapacity", 0), "active": d.get("activePatients", 0), "highRisk": d.get("highRiskPatients", 0), "pending": d.get("pendingReviews", 0), "workload": d.get("workloadStatus", "")} for d in doctors],
        "high_risk_patients": len([p for p in patients if p.get("riskScore") in ("Critical", "High")]),
        "overdue_followups": len([p for p in patients if p.get("followUpStatus") == "overdue"]),
    }, indent=2)

    prompt = f"""You are a doctor workload management AI for Visakhapatnam district healthcare.
Based on doctor capacity and patient data, recommend workload rebalancing.

DATA:
{context}

Respond in JSON:
{{
  "rebalance": "3-4 sentence rebalancing strategy",
  "impact": "Expected impact statement",
  "confidence": 0.82
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)


@router.post("/analyze-load")
async def analyze_load(session: AsyncSession = Depends(get_db)) -> dict:
    doctors = await db.get_doctors(session)

    context = json.dumps({
        "doctors": [{"name": d["name"], "facility": d["facilityId"], "specialty": d.get("specialty", ""), "seenToday": d.get("patientsSeenToday", 0), "maxCapacity": d.get("maxCapacity", 0), "active": d.get("activePatients", 0), "highRisk": d.get("highRiskPatients", 0), "pending": d.get("pendingReviews", 0), "workload": d.get("workloadStatus", "")} for d in doctors],
    }, indent=2)

    prompt = f"""You are a healthcare capacity planning AI for Visakhapatnam district.
Analyze doctor workload distribution and identify imbalances.

DATA:
{context}

Respond in JSON:
{{
  "analysis": {{
    "overloaded": ["doctor name (load% capacity)"],
    "underutilized": ["doctor name (load% capacity)"],
    "suggestion": "1-2 sentence rebalancing suggestion"
  }},
  "confidence": 0.85
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)


class FacilityActionPlanRequest(BaseModel):
    facilityId: str


@router.post("/facility-action-plan")
async def facility_action_plan(req: FacilityActionPlanRequest, session: AsyncSession = Depends(get_db)) -> dict:
    facilities = await db.get_facilities(session)
    facility = next((f for f in facilities if f["id"] == req.facilityId), None)
    if not facility:
        return {"error": "Facility not found"}

    docs = await db.get_facility_doctors(session, req.facilityId)
    nurses_list = await db.get_facility_nurses(session, req.facilityId)
    patients_list = await db.get_facility_patients(session, req.facilityId)
    all_meds = await db.get_inventory_stock(session)
    meds = [m for m in all_meds if m["facilityId"] == req.facilityId]
    insights = await db.get_facility_insights(session, req.facilityId)

    critical_pts = [p for p in patients_list if p.get("riskScore") in ("Critical", "High")]
    overdue_pts = [p for p in patients_list if p.get("followUpStatus") == "overdue"]
    critical_meds = [m for m in meds if m.get("risk") in ("critical", "high")]

    context = json.dumps({
        "facility": {"name": facility["name"], "type": facility["facilityType"], "risk": facility["overallRisk"], "opd": facility["todayOpd"], "bedOccupancy": facility["bedOccupancy"], "medicineRisk": facility["medicineRisk"]},
        "doctor_count": len(docs),
        "doctors_present": sum(1 for d in docs if d.get("attendance") == "present"),
        "nurse_count": len(nurses_list),
        "critical_patients": len(critical_pts),
        "overdue_patients": len(overdue_pts),
        "critical_medicines": [{"name": m["name"], "daysLeft": round(m.get("daysLeft", 0), 1)} for m in critical_meds],
        "alerts": len(insights),
    }, indent=2)

    prompt = f"""You are the operational AI for a healthcare facility in Visakhapatnam, India.
Based on this real facility data, generate an actionable 24-hour plan.

DATA:
{context}

Respond in JSON:
{{
  "title": "Action Plan - {facility['name']}",
  "summary": "2-3 sentence summary of critical priorities",
  "doctorActions": ["action 1", "action 2"],
  "nurseActions": ["action 1", "action 2"],
  "medicineActions": ["action 1", "action 2"],
  "patientActions": ["action 1", "action 2"],
  "impact": {{"stockoutsAvoided": 2, "highRiskPrioritized": 5, "doctorLoadCut": "15%", "medicineDaysAdded": 2.0, "criticalAlerts": 3}},
  "confidence": 0.88
}}
Only output valid JSON, no markdown."""

    return await call_gemini_json(prompt)
