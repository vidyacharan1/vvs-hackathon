PATIENTS = [
    {
        "id": "pat-001", "name": "Sabrina Rao", "age": 39, "gender": "Female",
        "phone": "+91 98765 12001", "village": "Madhurawada", "facilityId": "phc-madhurawada",
        "assignedDoctorId": "doc-1", "assignedNurseId": "nurse-1",
        "riskScore": "High", "condition": "Fever with dehydration",
        "conditions": ["Fever", "Dehydration"], "followUpStatus": "pending",
        "lastVisit": "2026-07-04", "nextFollowUp": "2026-07-05", "avatar": "SR"
    },
    {
        "id": "pat-002", "name": "Anil Varma", "age": 62, "gender": "Male",
        "phone": "+91 98765 12002", "village": "Madhurawada", "facilityId": "phc-madhurawada",
        "assignedDoctorId": "doc-1", "assignedNurseId": "nurse-1",
        "riskScore": "High", "condition": "Diabetes and hypertension",
        "conditions": ["Diabetes", "Hypertension"], "followUpStatus": "overdue",
        "lastVisit": "2026-07-01", "nextFollowUp": "2026-07-03", "avatar": "AV"
    },
    {
        "id": "pat-003", "name": "Lakshmi Devi", "age": 28, "gender": "Female",
        "phone": "+91 98765 12003", "village": "Bheemunipatnam", "facilityId": "chc-bheemunipatnam",
        "assignedDoctorId": "doc-3", "assignedNurseId": "nurse-3",
        "riskScore": "Medium", "condition": "Pregnancy risk and anemia",
        "conditions": ["Pregnancy risk", "Anemia"], "followUpStatus": "pending",
        "lastVisit": "2026-07-03", "nextFollowUp": "2026-07-06", "avatar": "LD"
    },
    {
        "id": "pat-004", "name": "Rafiq Khan", "age": 45, "gender": "Male",
        "phone": "+91 98765 12004", "village": "Gajuwaka", "facilityId": "phc-gajuwaka",
        "assignedDoctorId": "doc-4", "assignedNurseId": "nurse-4",
        "riskScore": "High", "condition": "ARI and asthma",
        "conditions": ["ARI", "Asthma"], "followUpStatus": "pending",
        "lastVisit": "2026-07-04", "nextFollowUp": "2026-07-05", "avatar": "RK"
    },
    {
        "id": "pat-005", "name": "Mariyamma Devi", "age": 62, "gender": "Female",
        "phone": "+91 98765 12005", "village": "Pendurthi", "facilityId": "phc-pendurthi",
        "assignedDoctorId": "doc-5", "assignedNurseId": "nurse-5",
        "riskScore": "High", "condition": "Diabetes Type 2",
        "conditions": ["Diabetes Type 2"], "followUpStatus": "completed",
        "lastVisit": "2026-07-02", "nextFollowUp": "2026-07-12", "avatar": "MD"
    },
    {
        "id": "pat-006", "name": "Venkata Ramana", "age": 45, "gender": "Male",
        "phone": "+91 98765 12006", "village": "Bheemunipatnam", "facilityId": "chc-bheemunipatnam",
        "assignedDoctorId": "doc-3", "assignedNurseId": "nurse-3",
        "riskScore": "Medium", "condition": "Hypertension",
        "conditions": ["Hypertension"], "followUpStatus": "completed",
        "lastVisit": "2026-06-30", "nextFollowUp": "2026-07-14", "avatar": "VR"
    },
    {
        "id": "pat-007", "name": "Saraswati Bai", "age": 28, "gender": "Female",
        "phone": "+91 98765 12007", "village": "Gajuwaka", "facilityId": "phc-gajuwaka",
        "assignedDoctorId": "doc-4", "assignedNurseId": "nurse-4",
        "riskScore": "Low", "condition": "Antenatal care",
        "conditions": ["Antenatal"], "followUpStatus": "completed",
        "lastVisit": "2026-06-29", "nextFollowUp": "2026-07-20", "avatar": "SB"
    },
]


def get_patients() -> list[dict]:
    return PATIENTS


def get_patient_detail(patient_id: str) -> dict:
    match = next((p for p in PATIENTS if p["id"] == patient_id), None)
    return match or {"id": patient_id, "status": "not_found"}


def get_facility_patients(facility_id: str) -> list[dict]:
    return [p for p in PATIENTS if p["facilityId"] == facility_id]
