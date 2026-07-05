from pydantic import BaseModel


class FacilityRisk(BaseModel):
    id: str
    name: str
    facility_type: str
    location: str
    overall_risk: str
    today_opd: int
    medicine_risk: str
    disease_spike: str
    bed_occupancy: int


class AlertItem(BaseModel):
    id: str
    title: str
    severity: str
    created_at: str
