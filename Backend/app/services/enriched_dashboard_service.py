from app.services.enriched_service import get_enriched_facilities


def get_enriched_dashboard() -> dict:
    facilities = get_enriched_facilities()
    total = len(facilities)
    critical = sum(1 for f in facilities if f.get("status") == "critical")
    high = sum(1 for f in facilities if f.get("status") == "high")
    medium = sum(1 for f in facilities if f.get("status") == "medium")
    low = sum(1 for f in facilities if f.get("status") == "low")
    total_patients = sum(f.get("totalPatients", 0) for f in facilities)
    critical_patients = sum(f.get("criticalPatients", 0) for f in facilities)
    open_alerts = sum(f.get("openAlerts", 0) for f in facilities)
    medicine_stock_issues = sum(f.get("medicineStockIssues", 0) for f in facilities)
    disease_spike_alerts = sum(f.get("diseaseSpikeCount", 0) for f in facilities)
    bed_pressure = sum(1 for f in facilities if f.get("bedOccupancy", 0) >= 80)

    return {
        "district": "Visakhapatnam",
        "healthScore": 82,
        "metrics": {
            "totalFacilities": total,
            "medicineStockAlerts": medicine_stock_issues,
            "diseaseSpikeAlerts": disease_spike_alerts,
            "highRiskPatients": critical_patients,
            "bedPressure": bed_pressure,
        },
        "facilitySummary": {
            "critical": critical,
            "high": high,
            "medium": medium,
            "low": low,
            "totalPatients": total_patients,
            "criticalPatients": critical_patients,
            "openAlerts": open_alerts,
        },
        "aiRecommendations": [
            "Prioritize PHC Madhurawada bed overflow and doctor allocation.",
            "Redistribute antibiotics and Paracetamol to 9 facilities.",
            "Increase surveillance for fever and Dengue clusters.",
        ],
        "facilities": facilities,
    }
