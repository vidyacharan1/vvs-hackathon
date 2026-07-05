def get_district_dashboard() -> dict:
    return {
        "district": "Visakhapatnam",
        "healthScore": 82,
        "metrics": {
            "totalFacilities": 126,
            "medicineStockAlerts": 23,
            "diseaseSpikeAlerts": 6,
            "highRiskPatients": 312,
            "bedPressure": 56,
        },
        "aiRecommendations": [
            "Prioritize PHC Madhurawada bed overflow and doctor allocation.",
            "Redistribute antibiotics and Paracetamol to 9 facilities.",
            "Increase surveillance for fever and Dengue clusters.",
        ],
    }
