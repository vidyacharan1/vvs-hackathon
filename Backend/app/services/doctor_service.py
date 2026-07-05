DOCTORS = [
    {
        "id": "doc-1", "name": "Dr. Kavya Menon", "facilityId": "phc-madhurawada",
        "specialty": "General Medicine", "attendance": "present",
        "patientsSeenToday": 58, "maxCapacity": 42, "activePatients": 138,
        "highRiskPatients": 23, "pendingReviews": 18, "workloadStatus": "critical"
    },
    {
        "id": "doc-2", "name": "Dr. Rajesh Kumar", "facilityId": "phc-madhurawada",
        "specialty": "Family Medicine", "attendance": "absent",
        "patientsSeenToday": 0, "maxCapacity": 40, "activePatients": 92,
        "highRiskPatients": 15, "pendingReviews": 14, "workloadStatus": "high"
    },
    {
        "id": "doc-3", "name": "Dr. Prakash Rao", "facilityId": "chc-bheemunipatnam",
        "specialty": "Emergency Medicine", "attendance": "present",
        "patientsSeenToday": 46, "maxCapacity": 48, "activePatients": 121,
        "highRiskPatients": 19, "pendingReviews": 11, "workloadStatus": "high"
    },
    {
        "id": "doc-4", "name": "Dr. Meera Shah", "facilityId": "phc-gajuwaka",
        "specialty": "Pediatrics", "attendance": "present",
        "patientsSeenToday": 52, "maxCapacity": 44, "activePatients": 113,
        "highRiskPatients": 17, "pendingReviews": 14, "workloadStatus": "high"
    },
    {
        "id": "doc-5", "name": "Dr. Nikhil Reddy", "facilityId": "phc-pendurthi",
        "specialty": "General Medicine", "attendance": "present",
        "patientsSeenToday": 28, "maxCapacity": 40, "activePatients": 74,
        "highRiskPatients": 7, "pendingReviews": 6, "workloadStatus": "normal"
    },
    {
        "id": "doc-6", "name": "Dr. Ananya Iyer", "facilityId": "chc-narsipatnam",
        "specialty": "Public Health", "attendance": "present",
        "patientsSeenToday": 31, "maxCapacity": 45, "activePatients": 65,
        "highRiskPatients": 5, "pendingReviews": 4, "workloadStatus": "normal"
    },
    {
        "id": "doc-7", "name": "Dr. Suresh Babu", "facilityId": "phc-ananthapuram",
        "specialty": "General Medicine", "attendance": "present",
        "patientsSeenToday": 22, "maxCapacity": 35, "activePatients": 45,
        "highRiskPatients": 4, "pendingReviews": 3, "workloadStatus": "normal"
    },
    {
        "id": "doc-8", "name": "Dr. Priya Nair", "facilityId": "phc-ananthapuram",
        "specialty": "Obstetrics", "attendance": "present",
        "patientsSeenToday": 18, "maxCapacity": 30, "activePatients": 38,
        "highRiskPatients": 6, "pendingReviews": 5, "workloadStatus": "normal"
    },
]


def get_doctors() -> list[dict]:
    return DOCTORS


def get_doctor_detail(doctor_id: str) -> dict:
    match = next((d for d in DOCTORS if d["id"] == doctor_id), None)
    return match or {"id": doctor_id, "status": "not_found"}


def get_facility_doctors(facility_id: str) -> list[dict]:
    return [d for d in DOCTORS if d["facilityId"] == facility_id]
