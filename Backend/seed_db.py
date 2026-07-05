import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import async_session
from app.models import (
    Facility, Doctor, Nurse, Patient, InventoryStock,
    AIInsight, DiseaseSpike, HealthTrend, VillageCondition,
)

SEED_FACILITIES = [
    {"id": "phc-madhurawada", "name": "PHC Madhurawada", "facility_type": "PHC", "location": "Madhurawada", "overall_risk": "Critical", "today_opd": 312, "medicine_risk": "High", "disease_spike": "High", "bed_occupancy": 96},
    {"id": "chc-bheemunipatnam", "name": "CHC Bheemunipatnam", "facility_type": "CHC", "location": "Bheemunipatnam", "overall_risk": "High", "today_opd": 248, "medicine_risk": "High", "disease_spike": "Medium", "bed_occupancy": 82},
    {"id": "phc-gajuwaka", "name": "PHC Gajuwaka", "facility_type": "PHC", "location": "Gajuwaka", "overall_risk": "High", "today_opd": 276, "medicine_risk": "Medium", "disease_spike": "Medium", "bed_occupancy": 78},
    {"id": "phc-ananthapuram", "name": "PHC Ananthapuram", "facility_type": "PHC", "location": "Ananthapuram", "overall_risk": "Medium", "today_opd": 198, "medicine_risk": "Low", "disease_spike": "Low", "bed_occupancy": 56},
    {"id": "phc-pendurthi", "name": "PHC Pendurthi", "facility_type": "PHC", "location": "Pendurthi", "overall_risk": "Low", "today_opd": 162, "medicine_risk": "Low", "disease_spike": "Low", "bed_occupancy": 42},
    {"id": "chc-narsipatnam", "name": "CHC Narsipatnam", "facility_type": "CHC", "location": "Narsipatnam", "overall_risk": "Low", "today_opd": 134, "medicine_risk": "Low", "disease_spike": "Low", "bed_occupancy": 36},
]

SEED_DOCTORS = [
    {"id": "doc-1", "name": "Dr. Kavya Menon", "facility_id": "phc-madhurawada", "specialty": "General Medicine", "attendance": "present", "patients_seen_today": 58, "max_capacity": 42, "active_patients": 138, "high_risk_patients": 23, "pending_reviews": 18, "workload_status": "critical"},
    {"id": "doc-2", "name": "Dr. Rajesh Kumar", "facility_id": "phc-madhurawada", "specialty": "Family Medicine", "attendance": "absent", "patients_seen_today": 0, "max_capacity": 40, "active_patients": 92, "high_risk_patients": 15, "pending_reviews": 14, "workload_status": "high"},
    {"id": "doc-3", "name": "Dr. Prakash Rao", "facility_id": "chc-bheemunipatnam", "specialty": "Emergency Medicine", "attendance": "present", "patients_seen_today": 46, "max_capacity": 48, "active_patients": 121, "high_risk_patients": 19, "pending_reviews": 11, "workload_status": "high"},
    {"id": "doc-4", "name": "Dr. Meera Shah", "facility_id": "phc-gajuwaka", "specialty": "Pediatrics", "attendance": "present", "patients_seen_today": 52, "max_capacity": 44, "active_patients": 113, "high_risk_patients": 17, "pending_reviews": 14, "workload_status": "high"},
    {"id": "doc-5", "name": "Dr. Nikhil Reddy", "facility_id": "phc-pendurthi", "specialty": "General Medicine", "attendance": "present", "patients_seen_today": 28, "max_capacity": 40, "active_patients": 74, "high_risk_patients": 7, "pending_reviews": 6, "workload_status": "normal"},
    {"id": "doc-6", "name": "Dr. Ananya Iyer", "facility_id": "chc-narsipatnam", "specialty": "Public Health", "attendance": "present", "patients_seen_today": 31, "max_capacity": 45, "active_patients": 65, "high_risk_patients": 5, "pending_reviews": 4, "workload_status": "normal"},
    {"id": "doc-7", "name": "Dr. Suresh Babu", "facility_id": "phc-ananthapuram", "specialty": "General Medicine", "attendance": "present", "patients_seen_today": 22, "max_capacity": 35, "active_patients": 45, "high_risk_patients": 4, "pending_reviews": 3, "workload_status": "normal"},
    {"id": "doc-8", "name": "Dr. Priya Nair", "facility_id": "phc-ananthapuram", "specialty": "Obstetrics", "attendance": "present", "patients_seen_today": 18, "max_capacity": 30, "active_patients": 38, "high_risk_patients": 6, "pending_reviews": 5, "workload_status": "normal"},
]

SEED_NURSES = [
    {"id": "nurse-1", "name": "Sr. Lakshmi Devi", "facility_id": "phc-madhurawada", "assigned_villages": ["Madhurawada", "Rushikonda"], "assigned_patients": 82, "pending_follow_ups": 29, "completed_today": 17, "high_risk_follow_ups": 11, "workload_status": "critical"},
    {"id": "nurse-2", "name": "Sr. Mary D.", "facility_id": "phc-madhurawada", "assigned_villages": ["Madhurawada", "Yendada"], "assigned_patients": 76, "pending_follow_ups": 24, "completed_today": 12, "high_risk_follow_ups": 8, "workload_status": "high"},
    {"id": "nurse-3", "name": "Sr. Revathi", "facility_id": "chc-bheemunipatnam", "assigned_villages": ["Bheemunipatnam", "Tagarapuvalasa"], "assigned_patients": 73, "pending_follow_ups": 18, "completed_today": 21, "high_risk_follow_ups": 8, "workload_status": "high"},
    {"id": "nurse-4", "name": "Sr. Asha", "facility_id": "phc-gajuwaka", "assigned_villages": ["Gajuwaka", "Malkapuram"], "assigned_patients": 69, "pending_follow_ups": 23, "completed_today": 14, "high_risk_follow_ups": 10, "workload_status": "high"},
    {"id": "nurse-5", "name": "Sr. Jyothi", "facility_id": "phc-pendurthi", "assigned_villages": ["Pendurthi"], "assigned_patients": 48, "pending_follow_ups": 7, "completed_today": 16, "high_risk_follow_ups": 3, "workload_status": "normal"},
    {"id": "nurse-6", "name": "Sr. Padma", "facility_id": "phc-ananthapuram", "assigned_villages": ["Ananthapuram", "Gavaravaram"], "assigned_patients": 61, "pending_follow_ups": 15, "completed_today": 19, "high_risk_follow_ups": 7, "workload_status": "high"},
    {"id": "nurse-7", "name": "Sr. Sunitha", "facility_id": "chc-narsipatnam", "assigned_villages": ["Narsipatnam", "Devarapalle"], "assigned_patients": 54, "pending_follow_ups": 11, "completed_today": 20, "high_risk_follow_ups": 4, "workload_status": "normal"},
]

SEED_PATIENTS = [
    {"id": "pat-001", "name": "Sabrina Rao", "age": 39, "gender": "Female", "phone": "+91 98765 12001", "village": "Madhurawada", "facility_id": "phc-madhurawada", "assigned_doctor_id": "doc-1", "assigned_nurse_id": "nurse-1", "risk_score": "High", "condition": "Fever with dehydration", "conditions": ["Fever", "Dehydration"], "follow_up_status": "pending", "last_visit": "2026-07-04", "next_follow_up": "2026-07-05", "avatar": "SR"},
    {"id": "pat-002", "name": "Anil Varma", "age": 62, "gender": "Male", "phone": "+91 98765 12002", "village": "Madhurawada", "facility_id": "phc-madhurawada", "assigned_doctor_id": "doc-1", "assigned_nurse_id": "nurse-1", "risk_score": "High", "condition": "Diabetes and hypertension", "conditions": ["Diabetes", "Hypertension"], "follow_up_status": "overdue", "last_visit": "2026-07-01", "next_follow_up": "2026-07-03", "avatar": "AV"},
    {"id": "pat-003", "name": "Lakshmi Devi", "age": 28, "gender": "Female", "phone": "+91 98765 12003", "village": "Bheemunipatnam", "facility_id": "chc-bheemunipatnam", "assigned_doctor_id": "doc-3", "assigned_nurse_id": "nurse-3", "risk_score": "Medium", "condition": "Pregnancy risk and anemia", "conditions": ["Pregnancy risk", "Anemia"], "follow_up_status": "pending", "last_visit": "2026-07-03", "next_follow_up": "2026-07-06", "avatar": "LD"},
    {"id": "pat-004", "name": "Rafiq Khan", "age": 45, "gender": "Male", "phone": "+91 98765 12004", "village": "Gajuwaka", "facility_id": "phc-gajuwaka", "assigned_doctor_id": "doc-4", "assigned_nurse_id": "nurse-4", "risk_score": "High", "condition": "ARI and asthma", "conditions": ["ARI", "Asthma"], "follow_up_status": "pending", "last_visit": "2026-07-04", "next_follow_up": "2026-07-05", "avatar": "RK"},
    {"id": "pat-005", "name": "Mariyamma Devi", "age": 62, "gender": "Female", "phone": "+91 98765 12005", "village": "Pendurthi", "facility_id": "phc-pendurthi", "assigned_doctor_id": "doc-5", "assigned_nurse_id": "nurse-5", "risk_score": "High", "condition": "Diabetes Type 2", "conditions": ["Diabetes Type 2"], "follow_up_status": "completed", "last_visit": "2026-07-02", "next_follow_up": "2026-07-12", "avatar": "MD"},
    {"id": "pat-006", "name": "Venkata Ramana", "age": 45, "gender": "Male", "phone": "+91 98765 12006", "village": "Bheemunipatnam", "facility_id": "chc-bheemunipatnam", "assigned_doctor_id": "doc-3", "assigned_nurse_id": "nurse-3", "risk_score": "Medium", "condition": "Hypertension", "conditions": ["Hypertension"], "follow_up_status": "completed", "last_visit": "2026-06-30", "next_follow_up": "2026-07-14", "avatar": "VR"},
    {"id": "pat-007", "name": "Saraswati Bai", "age": 28, "gender": "Female", "phone": "+91 98765 12007", "village": "Gajuwaka", "facility_id": "phc-gajuwaka", "assigned_doctor_id": "doc-4", "assigned_nurse_id": "nurse-4", "risk_score": "Low", "condition": "Antenatal care", "conditions": ["Antenatal"], "follow_up_status": "completed", "last_visit": "2026-06-29", "next_follow_up": "2026-07-20", "avatar": "SB"},
    {"id": "pat-008", "name": "Rajeshwari", "age": 55, "gender": "Female", "phone": "+91 98765 12008", "village": "Pendurthi", "facility_id": "phc-pendurthi", "assigned_doctor_id": "doc-5", "assigned_nurse_id": "nurse-5", "risk_score": "Medium", "condition": "Hypertension", "conditions": ["Hypertension"], "follow_up_status": "pending", "last_visit": "2026-07-03", "next_follow_up": "2026-07-07", "avatar": "RW"},
    {"id": "pat-009", "name": "Srinivasa Rao", "age": 48, "gender": "Male", "phone": "+91 98765 12009", "village": "Ananthapuram", "facility_id": "phc-ananthapuram", "assigned_doctor_id": "doc-7", "assigned_nurse_id": "nurse-6", "risk_score": "Medium", "condition": "Diabetes Type 2", "conditions": ["Diabetes Type 2"], "follow_up_status": "pending", "last_visit": "2026-07-04", "next_follow_up": "2026-07-08", "avatar": "SR"},
    {"id": "pat-010", "name": "Lakshmi Narasamma", "age": 34, "gender": "Female", "phone": "+91 98765 12010", "village": "Ananthapuram", "facility_id": "phc-ananthapuram", "assigned_doctor_id": "doc-8", "assigned_nurse_id": "nurse-6", "risk_score": "Low", "condition": "Antenatal care", "conditions": ["Antenatal"], "follow_up_status": "completed", "last_visit": "2026-07-01", "next_follow_up": "2026-07-15", "avatar": "LN"},
    {"id": "pat-011", "name": "Gangadhara Rao", "age": 67, "gender": "Male", "phone": "+91 98765 12011", "village": "Ananthapuram", "facility_id": "phc-ananthapuram", "assigned_doctor_id": "doc-7", "assigned_nurse_id": "nurse-6", "risk_score": "High", "condition": "COPD and hypertension", "conditions": ["COPD", "Hypertension"], "follow_up_status": "overdue", "last_visit": "2026-06-28", "next_follow_up": "2026-07-02", "avatar": "GR"},
    {"id": "pat-012", "name": "Durga Prasad", "age": 52, "gender": "Male", "phone": "+91 98765 12012", "village": "Narsipatnam", "facility_id": "chc-narsipatnam", "assigned_doctor_id": "doc-6", "assigned_nurse_id": "nurse-7", "risk_score": "Medium", "condition": "Hypertension and diabetes", "conditions": ["Hypertension", "Diabetes"], "follow_up_status": "pending", "last_visit": "2026-07-03", "next_follow_up": "2026-07-06", "avatar": "DP"},
    {"id": "pat-013", "name": "Parvathi Devi", "age": 35, "gender": "Female", "phone": "+91 98765 12013", "village": "Narsipatnam", "facility_id": "chc-narsipatnam", "assigned_doctor_id": "doc-6", "assigned_nurse_id": "nurse-7", "risk_score": "Low", "condition": "Antenatal care", "conditions": ["Antenatal"], "follow_up_status": "completed", "last_visit": "2026-07-01", "next_follow_up": "2026-07-15", "avatar": "PD"},
    {"id": "pat-014", "name": "Krishna Murthy", "age": 71, "gender": "Male", "phone": "+91 98765 12014", "village": "Devarapalle", "facility_id": "chc-narsipatnam", "assigned_doctor_id": "doc-6", "assigned_nurse_id": "nurse-7", "risk_score": "High", "condition": "COPD with respiratory infection", "conditions": ["COPD", "Respiratory infection"], "follow_up_status": "pending", "last_visit": "2026-07-04", "next_follow_up": "2026-07-05", "avatar": "KM"},
]

SEED_INVENTORY = [
    {"id": "stock-1", "name": "Paracetamol 650mg", "facility_id": "phc-madhurawada", "current_stock": 68, "avg_daily_usage": 31, "days_left": 2.2, "reorder_level": 180, "risk": "critical", "batch_number": "BATCH-001"},
    {"id": "stock-2", "name": "ORS packets", "facility_id": "phc-madhurawada", "current_stock": 92, "avg_daily_usage": 30, "days_left": 3.0, "reorder_level": 220, "risk": "high", "batch_number": "BATCH-002"},
    {"id": "stock-3", "name": "Amoxicillin", "facility_id": "chc-bheemunipatnam", "current_stock": 140, "avg_daily_usage": 42, "days_left": 3.3, "reorder_level": 260, "risk": "high", "batch_number": "BATCH-003"},
    {"id": "stock-4", "name": "Iron tablets", "facility_id": "chc-bheemunipatnam", "current_stock": 310, "avg_daily_usage": 38, "days_left": 8.1, "reorder_level": 250, "risk": "low", "batch_number": "BATCH-004"},
    {"id": "stock-5", "name": "Insulin vials", "facility_id": "phc-gajuwaka", "current_stock": 42, "avg_daily_usage": 9, "days_left": 4.7, "reorder_level": 70, "risk": "medium", "batch_number": "BATCH-005"},
    {"id": "stock-6", "name": "Zinc tablets", "facility_id": "chc-narsipatnam", "current_stock": 220, "avg_daily_usage": 14, "days_left": 15.7, "reorder_level": 110, "risk": "low", "batch_number": "BATCH-006"},
    {"id": "stock-7", "name": "Paracetamol 650mg", "facility_id": "phc-pendurthi", "current_stock": 350, "avg_daily_usage": 25, "days_left": 14.0, "reorder_level": 150, "risk": "low", "batch_number": "BATCH-007"},
    {"id": "stock-8", "name": "ORS packets", "facility_id": "phc-pendurthi", "current_stock": 280, "avg_daily_usage": 20, "days_left": 14.0, "reorder_level": 120, "risk": "low", "batch_number": "BATCH-008"},
    {"id": "stock-9", "name": "Metformin", "facility_id": "phc-pendurthi", "current_stock": 150, "avg_daily_usage": 18, "days_left": 8.3, "reorder_level": 100, "risk": "low", "batch_number": "BATCH-009"},
    {"id": "stock-10", "name": "Paracetamol 650mg", "facility_id": "phc-ananthapuram", "current_stock": 200, "avg_daily_usage": 15, "days_left": 13.3, "reorder_level": 100, "risk": "low", "batch_number": "BATCH-010"},
    {"id": "stock-11", "name": "Amoxicillin", "facility_id": "phc-ananthapuram", "current_stock": 80, "avg_daily_usage": 12, "days_left": 6.7, "reorder_level": 70, "risk": "medium", "batch_number": "BATCH-011"},
    {"id": "stock-12", "name": "ORS packets", "facility_id": "phc-ananthapuram", "current_stock": 120, "avg_daily_usage": 10, "days_left": 12.0, "reorder_level": 60, "risk": "low", "batch_number": "BATCH-012"},
    {"id": "stock-13", "name": "Amlodipine", "facility_id": "phc-ananthapuram", "current_stock": 90, "avg_daily_usage": 8, "days_left": 11.3, "reorder_level": 50, "risk": "low", "batch_number": "BATCH-013"},
]

SEED_INSIGHTS = [
    {"id": "I001", "message": "PHC Madhurawada is critical due to 96% bed occupancy and reduced doctor availability.", "priority": "high", "category": "Facility Risk", "timestamp": "4 min ago", "type": "Facility Risk Insight", "facility_id": "phc-madhurawada", "severity": "critical", "created_at": "2026-07-05T09:10:00+05:30", "summary": "Bed occupancy is at 96% with doctor capacity under pressure.", "recommendation": "Send doctor support, route stable patients to nurse-led screening, and prepare diversion protocol.", "status": "open"},
    {"id": "I002", "message": "23 medicine stock alerts detected across 9 facilities, led by Paracetamol and ORS.", "priority": "high", "category": "Inventory", "timestamp": "12 min ago", "type": "Medicine Stock-out Alert", "facility_id": "phc-madhurawada", "severity": "high", "created_at": "2026-07-05T09:02:00+05:30", "summary": "Paracetamol and ORS will breach stock-out threshold within 72 hours.", "recommendation": "Approve transfer from PHC Pendurthi and CHC Narsipatnam stock buffers.", "status": "open"},
    {"id": "I003", "message": "Dengue cases increased 136% week over week in Bheemunipatnam and nearby clusters.", "priority": "high", "category": "Disease Surveillance", "timestamp": "28 min ago", "type": "Disease Spike Alert", "facility_id": "chc-bheemunipatnam", "severity": "high", "created_at": "2026-07-05T08:46:00+05:30", "summary": "Dengue cases are rising across Bheemunipatnam, Gajuwaka, and Madhurawada.", "recommendation": "Activate fever desk, local surveillance, and ORS buffer distribution.", "status": "acknowledged"},
    {"id": "I004", "message": "Nurse follow-up backlog is rising for high-risk respiratory patients in Gajuwaka.", "priority": "medium", "category": "Workload", "timestamp": "41 min ago", "type": "Nurse Overload Alert", "facility_id": "phc-gajuwaka", "severity": "medium", "created_at": "2026-07-05T08:33:00+05:30", "summary": "Follow-up backlog is rising for high-risk respiratory patients.", "recommendation": "Optimize field route and reassign stable follow-ups to available nurses.", "status": "open"},
    {"id": "I005", "message": "CHC Narsipatnam can donate buffer stock without breaching reserve levels.", "priority": "low", "category": "Supply Chain", "timestamp": "1 hr ago", "type": "Stock Transfer Opportunity", "facility_id": "chc-narsipatnam", "severity": "low", "created_at": "2026-07-05T08:00:00+05:30", "summary": "Narsipatnam has adequate Zinc and Paracetamol buffer stock.", "recommendation": "Use as first transfer source for PHC Madhurawada demand surge.", "status": "resolved"},
    {"id": "I006", "message": "PHC Ananthapuram has low patient volume. Consider rotating staff.", "priority": "low", "category": "Workload", "timestamp": "2 hr ago", "type": "Low Utilization Alert", "facility_id": "phc-ananthapuram", "severity": "low", "created_at": "2026-07-05T07:00:00+05:30", "summary": "Patient volume is below threshold at Ananthapuram.", "recommendation": "Review staffing allocation and consider cross-facility support.", "status": "open"},
    {"id": "I007", "message": "PHC Pendurthi stock levels adequate. Monitor weekly.", "priority": "low", "category": "Inventory", "timestamp": "3 hr ago", "type": "Stock Level Notice", "facility_id": "phc-pendurthi", "severity": "low", "created_at": "2026-07-05T06:00:00+05:30", "summary": "All medicine stocks are above reorder levels.", "recommendation": "Continue routine monitoring.", "status": "open"},
]

SEED_DISEASE_SPIKES = [
    {"condition": "Fever", "facility_id": "phc-madhurawada", "this_week": 84, "last_week": 41, "increase": 104, "risk": "critical", "linked_medicine": "Paracetamol, ORS"},
    {"condition": "Dengue", "facility_id": "chc-bheemunipatnam", "this_week": 26, "last_week": 11, "increase": 136, "risk": "high", "linked_medicine": "ORS, platelet kits"},
    {"condition": "ARI", "facility_id": "phc-gajuwaka", "this_week": 52, "last_week": 37, "increase": 41, "risk": "medium", "linked_medicine": "Salbutamol, Amoxicillin"},
    {"condition": "Diarrhea", "facility_id": "phc-pendurthi", "this_week": 19, "last_week": 22, "increase": -14, "risk": "low", "linked_medicine": "ORS, Zinc"},
]

SEED_HEALTH_TRENDS = [
    {"month": "Jan", "op_visits": 2840, "chronic_cases": 420, "follow_ups": 1120, "fever": 38, "respiratory": 21, "hypertension": 48, "diabetes": 42, "diarrhea": 16},
    {"month": "Feb", "op_visits": 3020, "chronic_cases": 445, "follow_ups": 1180, "fever": 42, "respiratory": 24, "hypertension": 51, "diabetes": 44, "diarrhea": 18},
    {"month": "Mar", "op_visits": 3180, "chronic_cases": 470, "follow_ups": 1240, "fever": 49, "respiratory": 27, "hypertension": 54, "diabetes": 47, "diarrhea": 20},
    {"month": "Apr", "op_visits": 2950, "chronic_cases": 458, "follow_ups": 1190, "fever": 46, "respiratory": 25, "hypertension": 53, "diabetes": 46, "diarrhea": 17},
    {"month": "May", "op_visits": 3410, "chronic_cases": 492, "follow_ups": 1310, "fever": 58, "respiratory": 31, "hypertension": 57, "diabetes": 49, "diarrhea": 19},
    {"month": "Jun", "op_visits": 3650, "chronic_cases": 518, "follow_ups": 1420, "fever": 66, "respiratory": 39, "hypertension": 61, "diabetes": 52, "diarrhea": 22},
    {"month": "Jul", "op_visits": 3890, "chronic_cases": 542, "follow_ups": 1510, "fever": 84, "respiratory": 52, "hypertension": 65, "diabetes": 56, "diarrhea": 19},
]

SEED_VILLAGE_CONDITIONS = [
    {"village": "Madhurawada", "facility_id": "phc-madhurawada", "condition": "Fever", "count": 48},
    {"village": "Rushikonda", "facility_id": "phc-madhurawada", "condition": "Dehydration", "count": 19},
    {"village": "Bheemunipatnam", "facility_id": "chc-bheemunipatnam", "condition": "Dengue watch", "count": 26},
    {"village": "Gajuwaka", "facility_id": "phc-gajuwaka", "condition": "ARI", "count": 31},
    {"village": "Pendurthi", "facility_id": "phc-pendurthi", "condition": "Diarrhea", "count": 12},
]


async def _seed_table(session: AsyncSession, model, data: list[dict]):
    result = await session.execute(select(model))
    if result.scalars().first() is None:
        for row in data:
            session.add(model(**row))
        await session.commit()


async def seed_database():
    async with async_session() as session:
        await _seed_table(session, Facility, SEED_FACILITIES)
        await _seed_table(session, Doctor, SEED_DOCTORS)
        await _seed_table(session, Nurse, SEED_NURSES)
        await _seed_table(session, Patient, SEED_PATIENTS)
        await _seed_table(session, InventoryStock, SEED_INVENTORY)
        await _seed_table(session, AIInsight, SEED_INSIGHTS)
        await _seed_table(session, DiseaseSpike, SEED_DISEASE_SPIKES)
        await _seed_table(session, HealthTrend, SEED_HEALTH_TRENDS)
        await _seed_table(session, VillageCondition, SEED_VILLAGE_CONDITIONS)


if __name__ == "__main__":
    from app.core.database import init_db
    asyncio.run(init_db())
    asyncio.run(seed_database())
    print("Database seeded successfully.")
