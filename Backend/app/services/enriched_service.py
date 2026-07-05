from app.services.facility_service import FACILITIES
from app.services.doctor_service import DOCTORS
from app.services.nurse_service import NURSES
from app.services.patient_service import PATIENTS
from app.services.inventory_service import INVENTORY_STOCK
from app.services.facility_detail_service import AI_INSIGHTS


def get_enriched_facilities() -> list[dict]:
    result = []
    for f in FACILITIES:
        fid = f["id"]
        docs = [d for d in DOCTORS if d["facilityId"] == fid]
        nurses = [n for n in NURSES if n["facilityId"] == fid]
        patients = [p for p in PATIENTS if p["facilityId"] == fid]
        meds = [m for m in INVENTORY_STOCK if m["facilityId"] == fid]
        insights = [i for i in AI_INSIGHTS if i["facilityId"] == fid]

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


def get_enriched_facility_detail(facility_id: str) -> dict:
    enriched = get_enriched_facilities()
    match = next((f for f in enriched if f["id"] == facility_id), None)
    if not match:
        return {"id": facility_id, "status": "not_found"}

    fid = facility_id
    docs = [d for d in DOCTORS if d["facilityId"] == fid]
    nurses_list = [n for n in NURSES if n["facilityId"] == fid]
    patients_list = [p for p in PATIENTS if p["facilityId"] == fid]
    meds = [m for m in INVENTORY_STOCK if m["facilityId"] == fid]
    insights = [i for i in AI_INSIGHTS if i["facilityId"] == fid]

    return {
        **match,
        "doctors": docs,
        "nurses": nurses_list,
        "patients": patients_list,
        "medicines": meds,
        "insights": insights,
    }
