from sqlalchemy import Column, String, Integer, Float, Text, JSON

from app.core.database import Base


class Facility(Base):
    __tablename__ = "facilities"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    facility_type = Column(String, nullable=False, default="PHC")
    location = Column(String, nullable=False)
    overall_risk = Column(String, nullable=False, default="Medium")
    today_opd = Column(Integer, nullable=False, default=0)
    medicine_risk = Column(String, nullable=False, default="Low")
    disease_spike = Column(String, nullable=False, default="Low")
    bed_occupancy = Column(Integer, nullable=False, default=50)


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    facility_id = Column(String, nullable=False)
    specialty = Column(String, nullable=False, default="General Medicine")
    attendance = Column(String, nullable=False, default="present")
    patients_seen_today = Column(Integer, nullable=False, default=0)
    max_capacity = Column(Integer, nullable=False, default=40)
    active_patients = Column(Integer, nullable=False, default=0)
    high_risk_patients = Column(Integer, nullable=False, default=0)
    pending_reviews = Column(Integer, nullable=False, default=0)
    workload_status = Column(String, nullable=False, default="normal")


class Nurse(Base):
    __tablename__ = "nurses"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    facility_id = Column(String, nullable=False)
    assigned_villages = Column(JSON, nullable=False, default=list)
    assigned_patients = Column(Integer, nullable=False, default=0)
    pending_follow_ups = Column(Integer, nullable=False, default=0)
    completed_today = Column(Integer, nullable=False, default=0)
    high_risk_follow_ups = Column(Integer, nullable=False, default=0)
    workload_status = Column(String, nullable=False, default="normal")


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False, default="Female")
    phone = Column(String, nullable=False, default="")
    village = Column(String, nullable=False, default="")
    facility_id = Column(String, nullable=False)
    assigned_doctor_id = Column(String, nullable=False, default="")
    assigned_nurse_id = Column(String, nullable=False, default="")
    risk_score = Column(String, nullable=False, default="Medium")
    condition = Column(String, nullable=False, default="")
    conditions = Column(JSON, nullable=False, default=list)
    follow_up_status = Column(String, nullable=False, default="pending")
    last_visit = Column(String, nullable=False, default="")
    next_follow_up = Column(String, nullable=False, default="")
    avatar = Column(String, nullable=False, default="")


class InventoryStock(Base):
    __tablename__ = "inventory_stock"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    facility_id = Column(String, nullable=False)
    current_stock = Column(Integer, nullable=False, default=0)
    avg_daily_usage = Column(Integer, nullable=False, default=10)
    days_left = Column(Float, nullable=False, default=0.0)
    reorder_level = Column(Integer, nullable=False, default=0)
    risk = Column(String, nullable=False, default="low")
    batch_number = Column(String, nullable=False, default="")


class InventoryLog(Base):
    __tablename__ = "inventory_log"

    id = Column(Integer, primary_key=True, autoincrement=True)
    action = Column(String, nullable=False)
    medicine = Column(String, nullable=False)
    facility_id = Column(String, nullable=False, default="")
    from_facility_id = Column(String, nullable=False, default="")
    to_facility_id = Column(String, nullable=False, default="")
    quantity = Column(Integer, nullable=False, default=0)
    batch_number = Column(String, nullable=False, default="")


class AIInsight(Base):
    __tablename__ = "ai_insights"

    id = Column(String, primary_key=True)
    message = Column(Text, nullable=False)
    priority = Column(String, nullable=False, default="low")
    category = Column(String, nullable=False, default="")
    timestamp = Column(String, nullable=False, default="")
    type = Column(String, nullable=False, default="")
    facility_id = Column(String, nullable=False)
    severity = Column(String, nullable=False, default="low")
    created_at = Column(String, nullable=False, default="")
    summary = Column(Text, nullable=False, default="")
    recommendation = Column(Text, nullable=False, default="")
    status = Column(String, nullable=False, default="open")


class DiseaseSpike(Base):
    __tablename__ = "disease_spikes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    condition = Column(String, nullable=False)
    facility_id = Column(String, nullable=False)
    this_week = Column(Integer, nullable=False, default=0)
    last_week = Column(Integer, nullable=False, default=0)
    increase = Column(Integer, nullable=False, default=0)
    risk = Column(String, nullable=False, default="low")
    linked_medicine = Column(String, nullable=False, default="")


class HealthTrend(Base):
    __tablename__ = "health_trends"

    id = Column(Integer, primary_key=True, autoincrement=True)
    month = Column(String, nullable=False)
    op_visits = Column(Integer, nullable=False, default=0)
    chronic_cases = Column(Integer, nullable=False, default=0)
    follow_ups = Column(Integer, nullable=False, default=0)
    fever = Column(Integer, nullable=False, default=0)
    respiratory = Column(Integer, nullable=False, default=0)
    hypertension = Column(Integer, nullable=False, default=0)
    diabetes = Column(Integer, nullable=False, default=0)
    diarrhea = Column(Integer, nullable=False, default=0)


class VillageCondition(Base):
    __tablename__ = "village_conditions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    village = Column(String, nullable=False)
    facility_id = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    count = Column(Integer, nullable=False, default=0)
