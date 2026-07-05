# Arogyam AI Backend

FastAPI backend scaffold for the Arogyam AI district health center and supply chain platform.

## Run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Modules

- Auth and role-based access
- District dashboard APIs
- Facility / PHC / CHC APIs
- Medicine inventory and warehouse APIs
- Disease surveillance APIs
- Bed, ambulance, laboratory, report, and alert APIs
- AI recommendation and forecasting service boundaries
