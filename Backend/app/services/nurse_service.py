NURSES = [
    {
        "id": "nurse-1", "name": "Sr. Lakshmi Devi", "facilityId": "phc-madhurawada",
        "assignedVillages": ["Madhurawada", "Rushikonda"], "assignedPatients": 82,
        "pendingFollowUps": 29, "completedToday": 17, "highRiskFollowUps": 11,
        "workloadStatus": "critical"
    },
    {
        "id": "nurse-2", "name": "Sr. Mary D.", "facilityId": "phc-madhurawada",
        "assignedVillages": ["Madhurawada", "Yendada"], "assignedPatients": 76,
        "pendingFollowUps": 24, "completedToday": 12, "highRiskFollowUps": 8,
        "workloadStatus": "high"
    },
    {
        "id": "nurse-3", "name": "Sr. Revathi", "facilityId": "chc-bheemunipatnam",
        "assignedVillages": ["Bheemunipatnam", "Tagarapuvalasa"], "assignedPatients": 73,
        "pendingFollowUps": 18, "completedToday": 21, "highRiskFollowUps": 8,
        "workloadStatus": "high"
    },
    {
        "id": "nurse-4", "name": "Sr. Asha", "facilityId": "phc-gajuwaka",
        "assignedVillages": ["Gajuwaka", "Malkapuram"], "assignedPatients": 69,
        "pendingFollowUps": 23, "completedToday": 14, "highRiskFollowUps": 10,
        "workloadStatus": "high"
    },
    {
        "id": "nurse-5", "name": "Sr. Jyothi", "facilityId": "phc-pendurthi",
        "assignedVillages": ["Pendurthi"], "assignedPatients": 48,
        "pendingFollowUps": 7, "completedToday": 16, "highRiskFollowUps": 3,
        "workloadStatus": "normal"
    },
    {
        "id": "nurse-6", "name": "Sr. Padma", "facilityId": "phc-ananthapuram",
        "assignedVillages": ["Ananthapuram", "Gavaravaram"], "assignedPatients": 61,
        "pendingFollowUps": 15, "completedToday": 19, "highRiskFollowUps": 7,
        "workloadStatus": "high"
    },
    {
        "id": "nurse-7", "name": "Sr. Sunitha", "facilityId": "chc-narsipatnam",
        "assignedVillages": ["Narsipatnam", "Devarapalle"], "assignedPatients": 54,
        "pendingFollowUps": 11, "completedToday": 20, "highRiskFollowUps": 4,
        "workloadStatus": "normal"
    },
]


def get_nurses() -> list[dict]:
    return NURSES


def get_nurse_detail(nurse_id: str) -> dict:
    match = next((n for n in NURSES if n["id"] == nurse_id), None)
    return match or {"id": nurse_id, "status": "not_found"}


def get_facility_nurses(facility_id: str) -> list[dict]:
    return [n for n in NURSES if n["facilityId"] == facility_id]
