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
    {
        "id": "pat-008", "name": "Rajeshwari", "age": 55, "gender": "Female",
        "phone": "+91 98765 12008", "village": "Pendurthi", "facilityId": "phc-pendurthi",
        "assignedDoctorId": "doc-5", "assignedNurseId": "nurse-5",
        "riskScore": "Medium", "condition": "Hypertension",
        "conditions": ["Hypertension"], "followUpStatus": "pending",
        "lastVisit": "2026-07-03", "nextFollowUp": "2026-07-07", "avatar": "RW"
    },
    {
        "id": "pat-009", "name": "Srinivasa Rao", "age": 48, "gender": "Male",
        "phone": "+91 98765 12009", "village": "Ananthapuram", "facilityId": "phc-ananthapuram",
        "assignedDoctorId": "doc-7", "assignedNurseId": "nurse-6",
        "riskScore": "Medium", "condition": "Diabetes Type 2",
        "conditions": ["Diabetes Type 2"], "followUpStatus": "pending",
        "lastVisit": "2026-07-04", "nextFollowUp": "2026-07-08", "avatar": "SR"
    },
    {
        "id": "pat-010", "name": "Lakshmi Narasamma", "age": 34, "gender": "Female",
        "phone": "+91 98765 12010", "village": "Ananthapuram", "facilityId": "phc-ananthapuram",
        "assignedDoctorId": "doc-8", "assignedNurseId": "nurse-6",
        "riskScore": "Low", "condition": "Antenatal care",
        "conditions": ["Antenatal"], "followUpStatus": "completed",
        "lastVisit": "2026-07-01", "nextFollowUp": "2026-07-15", "avatar": "LN"
    },
    {
        "id": "pat-011", "name": "Gangadhara Rao", "age": 67, "gender": "Male",
        "phone": "+91 98765 12011", "village": "Ananthapuram", "facilityId": "phc-ananthapuram",
        "assignedDoctorId": "doc-7", "assignedNurseId": "nurse-6",
        "riskScore": "High", "condition": "COPD and hypertension",
        "conditions": ["COPD", "Hypertension"], "followUpStatus": "overdue",
        "lastVisit": "2026-06-28", "nextFollowUp": "2026-07-02", "avatar": "GR"
    },
    {
        "id": "pat-012", "name": "Durga Prasad", "age": 52, "gender": "Male",
        "phone": "+91 98765 12012", "village": "Narsipatnam", "facilityId": "chc-narsipatnam",
        "assignedDoctorId": "doc-6", "assignedNurseId": "nurse-7",
        "riskScore": "Medium", "condition": "Hypertension and diabetes",
        "conditions": ["Hypertension", "Diabetes"], "followUpStatus": "pending",
        "lastVisit": "2026-07-03", "nextFollowUp": "2026-07-06", "avatar": "DP"
    },
    {
        "id": "pat-013", "name": "Parvathi Devi", "age": 35, "gender": "Female",
        "phone": "+91 98765 12013", "village": "Narsipatnam", "facilityId": "chc-narsipatnam",
        "assignedDoctorId": "doc-6", "assignedNurseId": "nurse-7",
        "riskScore": "Low", "condition": "Antenatal care",
        "conditions": ["Antenatal"], "followUpStatus": "completed",
        "lastVisit": "2026-07-01", "nextFollowUp": "2026-07-15", "avatar": "PD"
    },
    {
        "id": "pat-014", "name": "Krishna Murthy", "age": 71, "gender": "Male",
        "phone": "+91 98765 12014", "village": "Devarapalle", "facilityId": "chc-narsipatnam",
        "assignedDoctorId": "doc-6", "assignedNurseId": "nurse-7",
        "riskScore": "High", "condition": "COPD with respiratory infection",
        "conditions": ["COPD", "Respiratory infection"], "followUpStatus": "pending",
        "lastVisit": "2026-07-04", "nextFollowUp": "2026-07-05", "avatar": "KM"
    },
]


def get_patients() -> list[dict]:
    return PATIENTS


def get_patient_detail(patient_id: str) -> dict:
    match = next((p for p in PATIENTS if p["id"] == patient_id), None)
    return match or {"id": patient_id, "status": "not_found"}


def get_facility_patients(facility_id: str) -> list[dict]:
    return [p for p in PATIENTS if p["facilityId"] == facility_id]
