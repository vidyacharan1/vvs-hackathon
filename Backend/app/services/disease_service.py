DISEASE_SPIKES = [
    {"condition": "Fever", "facilityId": "phc-madhurawada", "thisWeek": 84, "lastWeek": 41, "increase": 104, "risk": "critical", "linkedMedicine": "Paracetamol, ORS"},
    {"condition": "Dengue", "facilityId": "chc-bheemunipatnam", "thisWeek": 26, "lastWeek": 11, "increase": 136, "risk": "high", "linkedMedicine": "ORS, platelet kits"},
    {"condition": "ARI", "facilityId": "phc-gajuwaka", "thisWeek": 52, "lastWeek": 37, "increase": 41, "risk": "medium", "linkedMedicine": "Salbutamol, Amoxicillin"},
    {"condition": "Diarrhea", "facilityId": "phc-pendurthi", "thisWeek": 19, "lastWeek": 22, "increase": -14, "risk": "low", "linkedMedicine": "ORS, Zinc"},
]

HEALTH_TRENDS = [
    {"month": "Jan", "opVisits": 2840, "chronicCases": 420, "followUps": 1120, "fever": 38, "respiratory": 21, "hypertension": 48, "diabetes": 42, "diarrhea": 16},
    {"month": "Feb", "opVisits": 3020, "chronicCases": 445, "followUps": 1180, "fever": 42, "respiratory": 24, "hypertension": 51, "diabetes": 44, "diarrhea": 18},
    {"month": "Mar", "opVisits": 3180, "chronicCases": 470, "followUps": 1240, "fever": 49, "respiratory": 27, "hypertension": 54, "diabetes": 47, "diarrhea": 20},
    {"month": "Apr", "opVisits": 2950, "chronicCases": 458, "followUps": 1190, "fever": 46, "respiratory": 25, "hypertension": 53, "diabetes": 46, "diarrhea": 17},
    {"month": "May", "opVisits": 3410, "chronicCases": 492, "followUps": 1310, "fever": 58, "respiratory": 31, "hypertension": 57, "diabetes": 49, "diarrhea": 19},
    {"month": "Jun", "opVisits": 3650, "chronicCases": 518, "followUps": 1420, "fever": 66, "respiratory": 39, "hypertension": 61, "diabetes": 52, "diarrhea": 22},
    {"month": "Jul", "opVisits": 3890, "chronicCases": 542, "followUps": 1510, "fever": 84, "respiratory": 52, "hypertension": 65, "diabetes": 56, "diarrhea": 19},
]

VILLAGE_CONDITIONS = [
    {"village": "Madhurawada", "facilityId": "phc-madhurawada", "condition": "Fever", "count": 48},
    {"village": "Rushikonda", "facilityId": "phc-madhurawada", "condition": "Dehydration", "count": 19},
    {"village": "Bheemunipatnam", "facilityId": "chc-bheemunipatnam", "condition": "Dengue watch", "count": 26},
    {"village": "Gajuwaka", "facilityId": "phc-gajuwaka", "condition": "ARI", "count": 31},
    {"village": "Pendurthi", "facilityId": "phc-pendurthi", "condition": "Diarrhea", "count": 12},
]


def get_disease_spikes() -> list[dict]:
    return DISEASE_SPIKES


def get_health_trends() -> list[dict]:
    return HEALTH_TRENDS


def get_village_conditions() -> list[dict]:
    return VILLAGE_CONDITIONS
