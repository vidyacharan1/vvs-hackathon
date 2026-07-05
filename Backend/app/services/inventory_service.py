def get_inventory_alerts() -> list[dict]:
    return [
        {"medicine": "Paracetamol", "severity": "High", "facilities": 5, "daysLeft": 2.1},
        {"medicine": "Antibiotics", "severity": "High", "facilities": 4, "daysLeft": 2.8},
        {"medicine": "ORS", "severity": "Medium", "facilities": 7, "daysLeft": 4.5},
    ]
