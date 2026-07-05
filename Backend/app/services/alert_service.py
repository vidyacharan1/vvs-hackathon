def get_alert_feed() -> list[dict]:
    return [
        {"title": "Bed occupancy crossed 95%", "severity": "Critical", "time": "4 min ago"},
        {"title": "Paracetamol stock running low", "severity": "High", "time": "12 min ago"},
        {"title": "Dengue cases rising in Bheemunipatnam", "severity": "Medium", "time": "28 min ago"},
        {"title": "Doctor absent at Madhurawada PHC", "severity": "High", "time": "41 min ago"},
    ]
