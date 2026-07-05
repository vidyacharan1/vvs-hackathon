from app.services.inventory_service import INVENTORY_STOCK

AI_INSIGHTS = [
    {"id": "I001", "message": "PHC Madhurawada is critical due to 96% bed occupancy and reduced doctor availability.", "priority": "high", "category": "Facility Risk", "timestamp": "4 min ago", "type": "Facility Risk Insight", "facilityId": "phc-madhurawada", "severity": "critical", "createdAt": "2026-07-05T09:10:00+05:30", "summary": "Bed occupancy is at 96% with doctor capacity under pressure.", "recommendation": "Send doctor support, route stable patients to nurse-led screening, and prepare diversion protocol.", "status": "open"},
    {"id": "I002", "message": "23 medicine stock alerts detected across 9 facilities, led by Paracetamol and ORS.", "priority": "high", "category": "Inventory", "timestamp": "12 min ago", "type": "Medicine Stock-out Alert", "facilityId": "phc-madhurawada", "severity": "high", "createdAt": "2026-07-05T09:02:00+05:30", "summary": "Paracetamol and ORS will breach stock-out threshold within 72 hours.", "recommendation": "Approve transfer from PHC Pendurthi and CHC Narsipatnam stock buffers.", "status": "open"},
    {"id": "I003", "message": "Dengue cases increased 136% week over week in Bheemunipatnam and nearby clusters.", "priority": "high", "category": "Disease Surveillance", "timestamp": "28 min ago", "type": "Disease Spike Alert", "facilityId": "chc-bheemunipatnam", "severity": "high", "createdAt": "2026-07-05T08:46:00+05:30", "summary": "Dengue cases are rising across Bheemunipatnam, Gajuwaka, and Madhurawada.", "recommendation": "Activate fever desk, local surveillance, and ORS buffer distribution.", "status": "acknowledged"},
    {"id": "I004", "message": "Nurse follow-up backlog is rising for high-risk respiratory patients in Gajuwaka.", "priority": "medium", "category": "Workload", "timestamp": "41 min ago", "type": "Nurse Overload Alert", "facilityId": "phc-gajuwaka", "severity": "medium", "createdAt": "2026-07-05T08:33:00+05:30", "summary": "Follow-up backlog is rising for high-risk respiratory patients.", "recommendation": "Optimize field route and reassign stable follow-ups to available nurses.", "status": "open"},
    {"id": "I005", "message": "CHC Narsipatnam can donate buffer stock without breaching reserve levels.", "priority": "low", "category": "Supply Chain", "timestamp": "1 hr ago", "type": "Stock Transfer Opportunity", "facilityId": "chc-narsipatnam", "severity": "low", "createdAt": "2026-07-05T08:00:00+05:30", "summary": "Narsipatnam has adequate Zinc and Paracetamol buffer stock.", "recommendation": "Use as first transfer source for PHC Madhurawada demand surge.", "status": "resolved"},
    {"id": "I006", "message": "PHC Ananthapuram has low patient volume. Consider rotating staff.", "priority": "low", "category": "Workload", "timestamp": "2 hr ago", "type": "Low Utilization Alert", "facilityId": "phc-ananthapuram", "severity": "low", "createdAt": "2026-07-05T07:00:00+05:30", "summary": "Patient volume is below threshold at Ananthapuram.", "recommendation": "Review staffing allocation and consider cross-facility support.", "status": "open"},
    {"id": "I007", "message": "PHC Pendurthi stock levels adequate. Monitor weekly.", "priority": "low", "category": "Inventory", "timestamp": "3 hr ago", "type": "Stock Level Notice", "facilityId": "phc-pendurthi", "severity": "low", "createdAt": "2026-07-05T06:00:00+05:30", "summary": "All medicine stocks are above reorder levels.", "recommendation": "Continue routine monitoring.", "status": "open"},
]


def get_facility_medicines(facility_id: str) -> list[dict]:
    return [m for m in INVENTORY_STOCK if m["facilityId"] == facility_id]


def get_facility_insights(facility_id: str) -> list[dict]:
    return [i for i in AI_INSIGHTS if i["facilityId"] == facility_id]
