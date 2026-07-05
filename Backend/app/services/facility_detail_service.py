MEDICINES = [
    {"id": "med-1", "name": "Paracetamol 650mg", "facilityId": "phc-madhurawada", "currentStock": 68, "avgDailyUsage": 31, "daysLeft": 2.2, "reorderLevel": 180, "risk": "critical", "suggestedAction": "Transfer 300 strips from CHC Narsipatnam today."},
    {"id": "med-2", "name": "ORS packets", "facilityId": "phc-madhurawada", "currentStock": 92, "avgDailyUsage": 30, "daysLeft": 3.0, "reorderLevel": 220, "risk": "high", "suggestedAction": "Move buffer stock from PHC Pendurthi."},
    {"id": "med-3", "name": "Amoxicillin", "facilityId": "chc-bheemunipatnam", "currentStock": 140, "avgDailyUsage": 42, "daysLeft": 3.3, "reorderLevel": 260, "risk": "high", "suggestedAction": "Emergency warehouse refill within 24 hours."},
    {"id": "med-4", "name": "Iron tablets", "facilityId": "chc-bheemunipatnam", "currentStock": 310, "avgDailyUsage": 38, "daysLeft": 8.1, "reorderLevel": 250, "risk": "low", "suggestedAction": "Monitor weekly."},
    {"id": "med-5", "name": "Insulin vials", "facilityId": "phc-gajuwaka", "currentStock": 42, "avgDailyUsage": 9, "daysLeft": 4.7, "reorderLevel": 70, "risk": "medium", "suggestedAction": "Reorder within 48 hours."},
    {"id": "med-6", "name": "Zinc tablets", "facilityId": "chc-narsipatnam", "currentStock": 220, "avgDailyUsage": 14, "daysLeft": 15.7, "reorderLevel": 110, "risk": "low", "suggestedAction": "Maintain current level."},
]

AI_INSIGHTS = [
    {"id": "I001", "message": "PHC Madhurawada is critical due to 96% bed occupancy and reduced doctor availability.", "priority": "high", "category": "Facility Risk", "timestamp": "4 min ago", "type": "Facility Risk Insight", "facilityId": "phc-madhurawada", "severity": "critical", "createdAt": "2026-07-05T09:10:00+05:30", "summary": "Bed occupancy is at 96% with doctor capacity under pressure.", "recommendation": "Send doctor support, route stable patients to nurse-led screening, and prepare diversion protocol.", "status": "open"},
    {"id": "I002", "message": "23 medicine stock alerts detected across 9 facilities, led by Paracetamol and ORS.", "priority": "high", "category": "Inventory", "timestamp": "12 min ago", "type": "Medicine Stock-out Alert", "facilityId": "phc-madhurawada", "severity": "high", "createdAt": "2026-07-05T09:02:00+05:30", "summary": "Paracetamol and ORS will breach stock-out threshold within 72 hours.", "recommendation": "Approve transfer from PHC Pendurthi and CHC Narsipatnam stock buffers.", "status": "open"},
    {"id": "I003", "message": "Dengue cases increased 136% week over week in Bheemunipatnam and nearby clusters.", "priority": "high", "category": "Disease Surveillance", "timestamp": "28 min ago", "type": "Disease Spike Alert", "facilityId": "chc-bheemunipatnam", "severity": "high", "createdAt": "2026-07-05T08:46:00+05:30", "summary": "Dengue cases are rising across Bheemunipatnam, Gajuwaka, and Madhurawada.", "recommendation": "Activate fever desk, local surveillance, and ORS buffer distribution.", "status": "acknowledged"},
    {"id": "I004", "message": "Nurse follow-up backlog is rising for high-risk respiratory patients in Gajuwaka.", "priority": "medium", "category": "Workload", "timestamp": "41 min ago", "type": "Nurse Overload Alert", "facilityId": "phc-gajuwaka", "severity": "medium", "createdAt": "2026-07-05T08:33:00+05:30", "summary": "Follow-up backlog is rising for high-risk respiratory patients.", "recommendation": "Optimize field route and reassign stable follow-ups to available nurses.", "status": "open"},
    {"id": "I005", "message": "CHC Narsipatnam can donate buffer stock without breaching reserve levels.", "priority": "low", "category": "Supply Chain", "timestamp": "1 hr ago", "type": "Stock Transfer Opportunity", "facilityId": "chc-narsipatnam", "severity": "low", "createdAt": "2026-07-05T08:00:00+05:30", "summary": "Narsipatnam has adequate Zinc and Paracetamol buffer stock.", "recommendation": "Use as first transfer source for PHC Madhurawada demand surge.", "status": "resolved"},
]


def get_facility_medicines(facility_id: str) -> list[dict]:
    return [m for m in MEDICINES if m["facilityId"] == facility_id]


def get_facility_insights(facility_id: str) -> list[dict]:
    return [i for i in AI_INSIGHTS if i["facilityId"] == facility_id]
