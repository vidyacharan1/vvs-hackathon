FACILITIES = [
    {
        "id": "phc-madhurawada",
        "name": "PHC Madhurawada",
        "facilityType": "PHC",
        "location": "Madhurawada",
        "overallRisk": "Critical",
        "todayOpd": 312,
        "medicineRisk": "High",
        "diseaseSpike": "High",
        "bedOccupancy": 96,
    },
    {
        "id": "chc-bheemunipatnam",
        "name": "CHC Bheemunipatnam",
        "facilityType": "CHC",
        "location": "Bheemunipatnam",
        "overallRisk": "High",
        "todayOpd": 248,
        "medicineRisk": "High",
        "diseaseSpike": "Medium",
        "bedOccupancy": 82,
    },
    {
        "id": "phc-gajuwaka",
        "name": "PHC Gajuwaka",
        "facilityType": "PHC",
        "location": "Gajuwaka",
        "overallRisk": "High",
        "todayOpd": 276,
        "medicineRisk": "Medium",
        "diseaseSpike": "Medium",
        "bedOccupancy": 78,
    },
    {
        "id": "phc-ananthapuram",
        "name": "PHC Ananthapuram",
        "facilityType": "PHC",
        "location": "Ananthapuram",
        "overallRisk": "Medium",
        "todayOpd": 198,
        "medicineRisk": "Low",
        "diseaseSpike": "Low",
        "bedOccupancy": 56,
    },
    {
        "id": "phc-pendurthi",
        "name": "PHC Pendurthi",
        "facilityType": "PHC",
        "location": "Pendurthi",
        "overallRisk": "Low",
        "todayOpd": 162,
        "medicineRisk": "Low",
        "diseaseSpike": "Low",
        "bedOccupancy": 42,
    },
    {
        "id": "chc-narsipatnam",
        "name": "CHC Narsipatnam",
        "facilityType": "CHC",
        "location": "Narsipatnam",
        "overallRisk": "Low",
        "todayOpd": 134,
        "medicineRisk": "Low",
        "diseaseSpike": "Low",
        "bedOccupancy": 36,
    },
]


def get_facilities() -> list[dict]:
    return FACILITIES


def get_facility_detail(facility_id: str) -> dict:
    match = next((facility for facility in FACILITIES if facility["id"] == facility_id), None)
    return match or {"id": facility_id, "status": "not_found"}
