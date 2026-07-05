INVENTORY_STOCK = [
    {"id": "stock-1", "name": "Paracetamol 650mg", "facilityId": "phc-madhurawada", "currentStock": 68, "avgDailyUsage": 31, "daysLeft": 2.2, "reorderLevel": 180, "risk": "critical", "batchNumber": "BATCH-001"},
    {"id": "stock-2", "name": "ORS packets", "facilityId": "phc-madhurawada", "currentStock": 92, "avgDailyUsage": 30, "daysLeft": 3.0, "reorderLevel": 220, "risk": "high", "batchNumber": "BATCH-002"},
    {"id": "stock-3", "name": "Amoxicillin", "facilityId": "chc-bheemunipatnam", "currentStock": 140, "avgDailyUsage": 42, "daysLeft": 3.3, "reorderLevel": 260, "risk": "high", "batchNumber": "BATCH-003"},
    {"id": "stock-4", "name": "Iron tablets", "facilityId": "chc-bheemunipatnam", "currentStock": 310, "avgDailyUsage": 38, "daysLeft": 8.1, "reorderLevel": 250, "risk": "low", "batchNumber": "BATCH-004"},
    {"id": "stock-5", "name": "Insulin vials", "facilityId": "phc-gajuwaka", "currentStock": 42, "avgDailyUsage": 9, "daysLeft": 4.7, "reorderLevel": 70, "risk": "medium", "batchNumber": "BATCH-005"},
    {"id": "stock-6", "name": "Zinc tablets", "facilityId": "chc-narsipatnam", "currentStock": 220, "avgDailyUsage": 14, "daysLeft": 15.7, "reorderLevel": 110, "risk": "low", "batchNumber": "BATCH-006"},
    {"id": "stock-7", "name": "Paracetamol 650mg", "facilityId": "phc-pendurthi", "currentStock": 350, "avgDailyUsage": 25, "daysLeft": 14.0, "reorderLevel": 150, "risk": "low", "batchNumber": "BATCH-007"},
    {"id": "stock-8", "name": "ORS packets", "facilityId": "phc-pendurthi", "currentStock": 280, "avgDailyUsage": 20, "daysLeft": 14.0, "reorderLevel": 120, "risk": "low", "batchNumber": "BATCH-008"},
    {"id": "stock-9", "name": "Metformin", "facilityId": "phc-pendurthi", "currentStock": 150, "avgDailyUsage": 18, "daysLeft": 8.3, "reorderLevel": 100, "risk": "low", "batchNumber": "BATCH-009"},
    {"id": "stock-10", "name": "Paracetamol 650mg", "facilityId": "phc-ananthapuram", "currentStock": 200, "avgDailyUsage": 15, "daysLeft": 13.3, "reorderLevel": 100, "risk": "low", "batchNumber": "BATCH-010"},
    {"id": "stock-11", "name": "Amoxicillin", "facilityId": "phc-ananthapuram", "currentStock": 80, "avgDailyUsage": 12, "daysLeft": 6.7, "reorderLevel": 70, "risk": "medium", "batchNumber": "BATCH-011"},
    {"id": "stock-12", "name": "ORS packets", "facilityId": "phc-ananthapuram", "currentStock": 120, "avgDailyUsage": 10, "daysLeft": 12.0, "reorderLevel": 60, "risk": "low", "batchNumber": "BATCH-012"},
    {"id": "stock-13", "name": "Amlodipine", "facilityId": "phc-ananthapuram", "currentStock": 90, "avgDailyUsage": 8, "daysLeft": 11.3, "reorderLevel": 50, "risk": "low", "batchNumber": "BATCH-013"},
]

INVENTORY_LOG = []


def get_inventory_alerts() -> list[dict]:
    return [
        {"medicine": "Paracetamol", "severity": "High", "facilities": 5, "daysLeft": 2.1},
        {"medicine": "Antibiotics", "severity": "High", "facilities": 4, "daysLeft": 2.8},
        {"medicine": "ORS", "severity": "Medium", "facilities": 7, "daysLeft": 4.5},
    ]


def get_inventory_stock() -> list[dict]:
    return INVENTORY_STOCK


def add_stock_item(medicine: str, facility_id: str, quantity: int, batch_number: str = "") -> dict:
    existing = next((s for s in INVENTORY_STOCK if s["name"].lower() == medicine.lower() and s["facilityId"] == facility_id), None)
    if existing:
        existing["currentStock"] += quantity
        existing["daysLeft"] = round(existing["currentStock"] / existing["avgDailyUsage"], 1) if existing["avgDailyUsage"] > 0 else 999
        if existing["daysLeft"] > 10:
            existing["risk"] = "low"
        elif existing["daysLeft"] > 5:
            existing["risk"] = "medium"
        elif existing["daysLeft"] > 3:
            existing["risk"] = "high"
        else:
            existing["risk"] = "critical"
        result = existing
    else:
        new_id = f"stock-{len(INVENTORY_STOCK) + 1}"
        new_item = {
            "id": new_id,
            "name": medicine,
            "facilityId": facility_id,
            "currentStock": quantity,
            "avgDailyUsage": 10,
            "daysLeft": round(quantity / 10, 1),
            "reorderLevel": quantity,
            "risk": "low",
            "batchNumber": batch_number,
        }
        INVENTORY_STOCK.append(new_item)
        result = new_item

    INVENTORY_LOG.append({
        "action": "add_stock",
        "medicine": medicine,
        "facilityId": facility_id,
        "quantity": quantity,
        "batchNumber": batch_number,
    })
    return result


def transfer_stock_item(medicine: str, from_facility_id: str, to_facility_id: str, quantity: int) -> dict:
    source = next((s for s in INVENTORY_STOCK if s["name"].lower() == medicine.lower() and s["facilityId"] == from_facility_id), None)
    if not source:
        return {"error": f"Medicine {medicine} not found at {from_facility_id}"}
    if source["currentStock"] < quantity:
        return {"error": f"Insufficient stock. Available: {source['currentStock']}, Requested: {quantity}"}

    source["currentStock"] -= quantity
    source["daysLeft"] = round(source["currentStock"] / source["avgDailyUsage"], 1) if source["avgDailyUsage"] > 0 else 999
    if source["daysLeft"] > 10:
        source["risk"] = "low"
    elif source["daysLeft"] > 5:
        source["risk"] = "medium"
    elif source["daysLeft"] > 3:
        source["risk"] = "high"
    else:
        source["risk"] = "critical"

    dest = next((s for s in INVENTORY_STOCK if s["name"].lower() == medicine.lower() and s["facilityId"] == to_facility_id), None)
    if dest:
        dest["currentStock"] += quantity
        dest["daysLeft"] = round(dest["currentStock"] / dest["avgDailyUsage"], 1) if dest["avgDailyUsage"] > 0 else 999
    else:
        new_id = f"stock-{len(INVENTORY_STOCK) + 1}"
        INVENTORY_STOCK.append({
            "id": new_id,
            "name": medicine,
            "facilityId": to_facility_id,
            "currentStock": quantity,
            "avgDailyUsage": 10,
            "daysLeft": round(quantity / 10, 1),
            "reorderLevel": quantity,
            "risk": "low",
            "batchNumber": "",
        })

    INVENTORY_LOG.append({
        "action": "transfer",
        "medicine": medicine,
        "from": from_facility_id,
        "to": to_facility_id,
        "quantity": quantity,
    })
    return {"status": "success", "message": f"Transferred {quantity} units of {medicine} from {from_facility_id} to {to_facility_id}"}
