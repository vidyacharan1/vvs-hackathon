def generate_district_brief() -> dict:
    return {
        "title": "AI District Brief",
        "summary": "PHC Madhurawada is critical because of bed pressure, medicine risk, and staff shortage.",
        "actions": [
            "Send emergency doctor support to PHC Madhurawada.",
            "Transfer Paracetamol and antibiotics from warehouse reserve.",
            "Increase fever and Dengue surveillance in three hotspots.",
        ],
        "confidence": 0.91,
    }


def recommend_redistribution() -> dict:
    return {
        "recommendation": "Move 400 Paracetamol strips and 120 antibiotic units to Madhurawada and Bheemunipatnam.",
        "impact": "Reduces stock-out risk across 9 facilities within 24 hours.",
        "confidence": 0.88,
    }
