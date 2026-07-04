# CareGrid 360 Backend Plan

## Product Definition

The backend supports this core product:

```text
Dashboard overview
-> PHC / Facility detail
-> AI-generated action plan
```

The backend must answer these questions quickly:

```text
Which PHC is in trouble?
Why is it in trouble?
Which patients need attention?
Which medicines are missing?
Which staff are overloaded?
What should the PHC team do next?
```

## Backend Stack

```text
Folder: Backend/
API framework: NestJS
Database: Supabase PostgreSQL
Auth: Supabase Auth
AI: Gemini API
Frontend consumer: Next.js frontend with shadcn/ui
```

If the team decides to keep API routes inside the Next.js app for speed, expose the same contracts through `app/api/*`. The service boundaries and schemas in this plan should stay the same.

## Target Backend Structure

```text
Backend/
  src/
    main.ts
    app.module.ts
    config/
      env.ts
    common/
      decorators/
      filters/
      guards/
      pipes/
      types/
    lib/
      supabase/
        supabase-admin.client.ts
        supabase-user.client.ts
      gemini/
        gemini.client.ts
        prompts.ts
    modules/
      dashboard/
      facilities/
      patients/
      staff/
      inventory/
      disease-trends/
      alerts/
      tasks/
      ai/
      simulation/
  supabase/
    migrations/
    seed/
      demo-data.sql
```

## Backend Scope

### Build First

```text
1. facilities
2. facility_dashboard_metrics view
3. patients
4. staff
5. patient_conditions
6. visits
7. vitals
8. medicines
9. medicine_stock
10. alerts
11. ai_action_plans
12. tasks
13. facility_daily_stats
14. staff_attendance
15. disease_surveillance_reports
```

### Do Not Build For Hackathon

```text
Billing
Insurance
Lab report uploads
Appointment booking system
Full hospital EMR
Multi-department hospital structure
Complex permission hierarchy
```

## Data Model Overview

The database is facility-first:

```text
Facility / PHC
  |-- Staff
  |-- Staff attendance
  |-- Patients
  |-- Visits
  |-- Vitals
  |-- Conditions
  |-- Prescriptions
  |-- Medicine stock
  |-- Daily stats / bed pressure
  |-- Disease surveillance
  |-- Alerts
  |-- Tasks
  |-- AI action plans
```

## Core Database Schema

### 0. Required Extension

```sql
create extension if not exists pgcrypto;
```

### 1. Users / Profiles

Supabase Auth handles login. This table stores app-specific user data.

```sql
create type user_role as enum (
  'super_admin',
  'district_officer',
  'phc_admin',
  'medical_officer',
  'doctor',
  'nurse',
  'field_worker',
  'viewer'
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role user_role not null default 'viewer',
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

For the demo, a role switcher can replace real login, but the schema is ready for auth.

### 2. Facilities / PHCs

```sql
create type facility_status as enum (
  'healthy',
  'warning',
  'critical'
);

create table facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique not null,
  type text not null default 'PHC',
  district text not null,
  mandal text,
  village text,
  address text,
  latitude numeric,
  longitude numeric,

  population_covered integer default 0,
  total_beds integer default 0,

  status facility_status not null default 'healthy',
  risk_score integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Frontend usage:

```text
Dashboard cards
Facility list
PHC detail header
Status badge
Risk score
Location display
Create PHC / CHC modal
```

### 3. Facility User Access

```sql
create table facility_users (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role user_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),

  unique(facility_id, user_id)
);
```

Demo behavior:

```text
district_officer -> can see all PHCs
medical_officer -> can see assigned PHC
doctor/nurse -> can see assigned PHC and patient work
```

### 4. Staff

```sql
create type staff_role as enum (
  'doctor',
  'nurse',
  'pharmacist',
  'lab_technician',
  'asha_worker',
  'anm',
  'admin_staff'
);

create table staff (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,

  full_name text not null,
  role staff_role not null,
  phone text,
  email text,

  specialization text,
  shift text,
  assigned_villages text[] default '{}',
  is_available boolean not null default true,

  patients_assigned integer default 0,
  max_daily_capacity integer default 40,
  last_active_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Frontend usage:

```text
Doctor CRM
Nurse CRM
PHC detail staff section
Doctor/nurse availability
Staff workload
AI staffing risk analysis
```

### 5. Staff Attendance

This powers doctor attendance and nurse presence panels.

```sql
create type attendance_status as enum (
  'present',
  'absent',
  'late',
  'on_leave'
);

create table staff_attendance (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  staff_id uuid not null references staff(id) on delete cascade,

  attendance_date date not null default current_date,
  status attendance_status not null default 'present',
  patients_seen integer not null default 0,
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique(staff_id, attendance_date)
);
```

Frontend usage:

```text
Doctor attendance
Nurse attendance
Doctors present: 2 / 3
Nurses present: 4 / 5
Doctor workload table
```

### 6. Patients

```sql
create type gender_type as enum (
  'male',
  'female',
  'other'
);

create type patient_risk_level as enum (
  'low',
  'medium',
  'high',
  'critical'
);

create table patients (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,

  health_id text,
  full_name text not null,
  gender gender_type,
  date_of_birth date,
  phone text,

  village text,
  address text,

  risk_level patient_risk_level not null default 'low',
  risk_score integer not null default 0,

  assigned_doctor_id uuid references staff(id) on delete set null,
  assigned_nurse_id uuid references staff(id) on delete set null,

  last_visit_at timestamptz,
  next_followup_at timestamptz,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Frontend usage:

```text
Total patients
High-risk patients
Critical patients
Patient CRM
Patient profile
Patient list in PHC detail
AI patient prioritization
```

### 7. Patient Conditions

```sql
create type condition_status as enum (
  'active',
  'controlled',
  'recovered',
  'critical'
);

create table patient_conditions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  facility_id uuid not null references facilities(id) on delete cascade,

  condition_name text not null,
  severity patient_risk_level not null default 'low',
  status condition_status not null default 'active',

  diagnosed_at date,
  notes text,

  created_at timestamptz not null default now()
);
```

Example conditions:

```text
Diabetes
Hypertension
Pregnancy risk
Tuberculosis
Fever
Malnutrition
Anemia
Asthma
```

### 8. Visits

```sql
create table visits (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  staff_id uuid references staff(id) on delete set null,

  visit_type text not null default 'general_checkup',
  visit_date timestamptz not null default now(),

  symptoms text,
  diagnosis text,
  notes text,
  follow_up_date timestamptz,

  created_at timestamptz not null default now()
);
```

Frontend usage:

```text
Recent visits
Patients seen today
Visit timeline
Last patient activity
Follow-up timeline
AI missed follow-up detection
```

### 9. Vitals

```sql
create table vitals (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  visit_id uuid references visits(id) on delete cascade,

  bp_systolic integer,
  bp_diastolic integer,
  blood_sugar integer,
  temperature numeric,
  spo2 integer,
  pulse integer,
  weight numeric,

  recorded_at timestamptz not null default now()
);
```

Frontend usage:

```text
Patient health snapshot
Abnormal vitals
AI critical patient detection
```

### 10. Medicines Master

```sql
create table medicines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  unit text not null default 'tablet',
  created_at timestamptz not null default now()
);
```

Example medicines:

```text
Paracetamol
Metformin
Amlodipine
Iron tablets
ORS
Insulin
Amoxicillin
Salbutamol
```

### 11. Medicine Stock / Inventory

```sql
create type stock_status as enum (
  'ok',
  'low',
  'out_of_stock',
  'expiring_soon'
);

create table medicine_stock (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  medicine_id uuid not null references medicines(id) on delete cascade,

  quantity_available integer not null default 0,
  minimum_required integer not null default 0,
  average_daily_usage numeric not null default 0,
  expiry_date date,

  status stock_status not null default 'ok',

  updated_at timestamptz not null default now(),

  unique(facility_id, medicine_id)
);
```

Frontend usage:

```text
Inventory summary
Low stock alerts
Out-of-stock count
Days left
AI supply recommendations
```

### 12. Medicine Stock Movements

This supports add stock, issue stock, and transfer stock actions.

```sql
create type stock_movement_type as enum (
  'add',
  'issue',
  'transfer_in',
  'transfer_out',
  'adjustment'
);

create table medicine_stock_movements (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  medicine_id uuid not null references medicines(id) on delete cascade,

  movement_type stock_movement_type not null,
  quantity integer not null,
  notes text,

  created_by_user_id uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
```

### 13. Prescriptions

```sql
create type adherence_status as enum (
  'unknown',
  'good',
  'missed_doses',
  'stopped'
);

create table prescriptions (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  medicine_id uuid references medicines(id) on delete set null,
  prescribed_by_staff_id uuid references staff(id) on delete set null,

  dosage text,
  frequency text,
  duration_days integer,
  start_date date,
  end_date date,

  adherence adherence_status not null default 'unknown',

  created_at timestamptz not null default now()
);
```

Frontend usage:

```text
Patient medicines
Disease + medicine tracking
AI medicine adherence warning
```

### 14. Facility Daily Stats

This powers OPD footfall, bed pressure, and demo before/after simulation.

```sql
create table facility_daily_stats (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  stat_date date not null default current_date,

  opd_footfall integer not null default 0,
  seven_day_average_opd numeric not null default 0,
  beds_occupied integer not null default 0,
  high_risk_patients_count integer not null default 0,
  pending_followups_count integer not null default 0,

  doctor_absence_alerts integer not null default 0,
  nurse_overload_alerts integer not null default 0,
  disease_spike_alerts integer not null default 0,
  bed_pressure_alerts integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique(facility_id, stat_date)
);
```

Frontend usage:

```text
Today's OPD
7-day average OPD
Beds occupied
Bed occupancy card
Dashboard pressure cards
Simulate Tomorrow state
```

### 15. Disease Surveillance Reports

```sql
create type disease_risk_level as enum (
  'low',
  'medium',
  'high',
  'critical'
);

create table disease_surveillance_reports (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,

  disease_name text not null,
  village text,
  report_week_start date not null,
  cases_this_week integer not null default 0,
  cases_last_week integer not null default 0,
  percent_increase numeric not null default 0,
  linked_medicines text[] default '{}',
  risk_level disease_risk_level not null default 'low',

  created_at timestamptz not null default now(),

  unique(facility_id, disease_name, village, report_week_start)
);
```

Frontend usage:

```text
Disease trend chart
Facility-wise disease spike
Village-wise condition clusters
Linked medicine impact
Disease risk card
```

### 16. Alerts

```sql
create type alert_severity as enum (
  'low',
  'medium',
  'high',
  'critical'
);

create type alert_status as enum (
  'open',
  'acknowledged',
  'in_progress',
  'resolved'
);

create table alerts (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,

  patient_id uuid references patients(id) on delete cascade,
  staff_id uuid references staff(id) on delete set null,

  alert_type text not null,
  title text not null,
  description text,

  severity alert_severity not null default 'medium',
  status alert_status not null default 'open',

  generated_by text not null default 'system',
  due_at timestamptz,
  resolved_at timestamptz,

  created_at timestamptz not null default now()
);
```

Alert examples:

```text
Critical patient follow-up missed
Medicine out of stock
Doctor unavailable
High-risk pregnancy due for checkup
Abnormal vitals reported
Disease spike detected
Bed pressure high
```

### 17. AI Action Plans

```sql
create type ai_plan_status as enum (
  'generated',
  'accepted',
  'in_progress',
  'completed',
  'archived'
);

create table ai_action_plans (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  generated_by_user_id uuid references profiles(id) on delete set null,

  title text not null,
  summary text not null,

  risk_level patient_risk_level not null default 'medium',
  risk_score integer not null default 0,

  input_snapshot jsonb not null,
  gemini_response jsonb not null,

  status ai_plan_status not null default 'generated',

  created_at timestamptz not null default now()
);
```

Frontend usage:

```text
AI Action Plan card
Priority recommendations
Generated plan history
Impact forecast
Demo wow moment
```

### 18. Tasks

```sql
create type task_status as enum (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,

  patient_id uuid references patients(id) on delete cascade,
  assigned_staff_id uuid references staff(id) on delete set null,
  ai_action_plan_id uuid references ai_action_plans(id) on delete set null,

  title text not null,
  description text,

  priority alert_severity not null default 'medium',
  status task_status not null default 'pending',

  due_date timestamptz,
  completed_at timestamptz,

  created_at timestamptz not null default now()
);
```

Frontend usage:

```text
Task list
Follow-up queue
Nurse workload
AI recommended actions
PHC operational plan
```

## Dashboard Metrics View

This view makes the frontend easy to build.

```sql
create view facility_dashboard_metrics as
select
  f.id as facility_id,
  f.name as facility_name,
  f.code as facility_code,
  f.type as facility_type,
  f.district,
  f.mandal,
  f.village,
  f.status,
  f.risk_score,
  f.total_beds,

  coalesce(ds.opd_footfall, 0) as today_opd,
  coalesce(ds.seven_day_average_opd, 0) as seven_day_average_opd,
  coalesce(ds.beds_occupied, 0) as beds_occupied,

  count(distinct p.id) as total_patients,
  count(distinct case when p.risk_level = 'high' then p.id end) as high_risk_patients,
  count(distinct case when p.risk_level = 'critical' then p.id end) as critical_patients,

  count(distinct s.id) as total_staff,
  count(distinct case when s.is_available = true then s.id end) as available_staff,
  count(distinct case when s.role = 'doctor' then s.id end) as total_doctors,
  count(distinct case when s.role = 'nurse' then s.id end) as total_nurses,

  count(distinct case when sa.status = 'present' and s.role = 'doctor' then s.id end) as doctors_present,
  count(distinct case when sa.status = 'present' and s.role = 'nurse' then s.id end) as nurses_present,

  count(distinct a.id) filter (where a.status = 'open') as open_alerts,
  count(distinct a.id) filter (where a.severity = 'critical' and a.status = 'open') as critical_alerts,

  count(distinct ms.id) filter (
    where ms.status in ('low', 'out_of_stock', 'expiring_soon')
  ) as medicine_stock_issues,

  count(distinct dr.id) filter (
    where dr.risk_level in ('high', 'critical')
  ) as disease_spike_count,

  count(distinct t.id) filter (
    where t.status in ('pending', 'in_progress')
  ) as pending_tasks

from facilities f
left join facility_daily_stats ds
  on ds.facility_id = f.id
  and ds.stat_date = current_date
left join patients p
  on p.facility_id = f.id
  and p.is_active = true
left join staff s
  on s.facility_id = f.id
left join staff_attendance sa
  on sa.staff_id = s.id
  and sa.attendance_date = current_date
left join alerts a
  on a.facility_id = f.id
left join medicine_stock ms
  on ms.facility_id = f.id
left join disease_surveillance_reports dr
  on dr.facility_id = f.id
left join tasks t
  on t.facility_id = f.id
group by f.id, ds.opd_footfall, ds.seven_day_average_opd, ds.beds_occupied;
```

## API Contracts

### Dashboard APIs

```text
GET /api/dashboard/summary
```

Response:

```json
{
  "totalFacilities": 8,
  "healthyFacilities": 3,
  "warningFacilities": 4,
  "criticalFacilities": 1,
  "totalPatients": 1240,
  "criticalPatients": 37,
  "openAlerts": 22,
  "medicineStockIssues": 9,
  "doctorAbsenceAlerts": 2,
  "nurseOverloadAlerts": 4,
  "diseaseSpikeAlerts": 3,
  "bedPressureAlerts": 2
}
```

```text
GET /api/facilities
```

Response:

```json
[
  {
    "facilityId": "uuid",
    "name": "PHC Madhurawada",
    "type": "PHC",
    "district": "Visakhapatnam",
    "village": "Madhurawada",
    "status": "critical",
    "riskScore": 87,
    "todayOpd": 184,
    "doctorsPresent": 2,
    "totalDoctors": 3,
    "nursesPresent": 4,
    "totalNurses": 5,
    "bedsOccupied": 16,
    "totalBeds": 20,
    "totalPatients": 320,
    "criticalPatients": 14,
    "openAlerts": 8,
    "medicineStockIssues": 3,
    "diseaseSpikeCount": 1
  }
]
```

### Facility APIs

```text
POST /api/facilities
GET /api/facilities/:id/summary
GET /api/facilities/:id/patients
GET /api/facilities/:id/staff
GET /api/facilities/:id/inventory
GET /api/facilities/:id/alerts
GET /api/facilities/:id/tasks
GET /api/facilities/:id/disease-trends
```

`GET /api/facilities/:id/summary` response:

```json
{
  "facility": {
    "id": "uuid",
    "name": "PHC Madhurawada",
    "status": "critical",
    "riskScore": 87,
    "populationCovered": 42000,
    "totalBeds": 20
  },
  "metrics": {
    "todayOpd": 184,
    "sevenDayAverageOpd": 105,
    "bedsOccupied": 16,
    "totalPatients": 320,
    "highRiskPatients": 42,
    "criticalPatients": 14,
    "totalStaff": 11,
    "availableStaff": 6,
    "doctorsPresent": 2,
    "totalDoctors": 3,
    "nursesPresent": 4,
    "totalNurses": 5,
    "openAlerts": 8,
    "medicineStockIssues": 3,
    "pendingFollowups": 41
  }
}
```

### Patient APIs

```text
GET /api/patients
POST /api/patients
GET /api/patients/:id
GET /api/patients/:id/timeline
POST /api/visits
POST /api/vitals
```

### Staff APIs

```text
GET /api/staff/doctors
GET /api/staff/nurses
GET /api/staff/:id
PATCH /api/staff/:id/attendance
```

### Inventory APIs

```text
GET /api/inventory
GET /api/facilities/:id/inventory
POST /api/inventory/stock-adjustment
```

### Disease Trends APIs

```text
GET /api/disease-trends
GET /api/facilities/:id/disease-trends
```

### Alerts and Tasks APIs

```text
GET /api/alerts
POST /api/alerts
PATCH /api/alerts/:id
GET /api/tasks
POST /api/tasks
PATCH /api/tasks/:id
```

### Simulation API

```text
POST /api/simulation/tomorrow
```

Backend behavior:

```text
1. Increase selected demo facility OPD.
2. Increase disease spike count.
3. Reduce stock days left for key medicines.
4. Add follow-up and stock alerts.
5. Return updated dashboard and facility summary.
```

For the hackathon, this can be deterministic demo data rather than a real forecasting model.

## Gemini AI Action Plan API

```text
POST /api/ai/action-plan
```

Request:

```json
{
  "facilityId": "uuid"
}
```

Backend flow:

```text
1. Fetch facility details.
2. Fetch dashboard metrics.
3. Fetch high-risk patients.
4. Fetch open alerts.
5. Fetch stock issues.
6. Fetch staff availability.
7. Fetch disease spike and bed pressure context.
8. Build structured Gemini prompt.
9. Ask Gemini for JSON response.
10. Save response in ai_action_plans.
11. Convert urgent actions into tasks.
12. Create alert records for critical operational actions.
13. Return action plan to frontend.
```

### Gemini Input Payload

```json
{
  "facility": {
    "name": "PHC Madhurawada",
    "district": "Visakhapatnam",
    "status": "critical",
    "riskScore": 87,
    "populationCovered": 42000
  },
  "metrics": {
    "todayOpd": 184,
    "sevenDayAverageOpd": 105,
    "bedsOccupied": 16,
    "totalBeds": 20,
    "totalPatients": 320,
    "highRiskPatients": 42,
    "criticalPatients": 14,
    "availableStaff": 6,
    "openAlerts": 8,
    "medicineStockIssues": 3
  },
  "highRiskPatients": [
    {
      "name": "Demo Patient 1",
      "age": 62,
      "gender": "female",
      "riskLevel": "critical",
      "conditions": ["Diabetes", "Hypertension"],
      "lastVisitAt": "2026-07-01",
      "nextFollowupAt": "2026-07-03",
      "latestVitals": {
        "bp": "170/100",
        "bloodSugar": 260,
        "spo2": 95
      }
    }
  ],
  "stockIssues": [
    {
      "medicine": "Metformin",
      "status": "low",
      "quantityAvailable": 12,
      "minimumRequired": 80,
      "daysLeft": 2.2
    }
  ],
  "staff": [
    {
      "name": "Dr. Anil Kumar",
      "role": "doctor",
      "isAvailable": true,
      "patientsAssigned": 74
    }
  ],
  "openAlerts": [
    {
      "title": "Critical diabetic patient missed follow-up",
      "severity": "critical",
      "dueAt": "2026-07-03"
    }
  ],
  "diseaseTrends": [
    {
      "disease": "Fever",
      "casesThisWeek": 84,
      "casesLastWeek": 41,
      "percentIncrease": 104,
      "linkedMedicines": ["Paracetamol", "ORS"],
      "riskLevel": "high"
    }
  ]
}
```

### Gemini Response Structure

Force Gemini to return JSON only:

```json
{
  "title": "Urgent PHC Stabilization Plan",
  "summary": "This PHC has high patient risk, medicine shortage, and pending critical follow-ups.",
  "riskLevel": "critical",
  "riskScore": 87,
  "topFindings": [
    {
      "type": "patient_risk",
      "title": "14 critical patients need immediate follow-up",
      "explanation": "Several high-risk patients have missed scheduled follow-ups."
    },
    {
      "type": "medicine_shortage",
      "title": "Metformin stock is below minimum requirement",
      "explanation": "Diabetes patients may face treatment interruption."
    }
  ],
  "urgentActions": [
    {
      "title": "Call all critical diabetic patients today",
      "description": "Assign nurse team to contact patients with missed follow-ups.",
      "priority": "critical",
      "assignedRole": "nurse",
      "dueInHours": 6
    },
    {
      "title": "Request emergency Metformin refill",
      "description": "Raise medicine stock request to district supply team.",
      "priority": "high",
      "assignedRole": "pharmacist",
      "dueInHours": 12
    }
  ],
  "patientPriorities": [
    {
      "patientName": "Demo Patient 1",
      "reason": "Critical diabetes and hypertension with missed follow-up.",
      "recommendedAction": "Schedule same-day visit or teleconsultation."
    }
  ],
  "staffingRecommendations": [
    {
      "title": "Reduce doctor overload",
      "recommendation": "Move stable follow-ups to nurse-led screening queue."
    }
  ],
  "inventoryRecommendations": [
    {
      "medicine": "Metformin",
      "action": "Reorder immediately",
      "priority": "high"
    }
  ],
  "impactForecast": {
    "stockOutAvoided": 2,
    "highRiskFollowupsPrioritized": 8,
    "doctorWorkloadReducedPercent": 18,
    "medicineAvailabilityImprovedDays": 2.8,
    "criticalAlertsGenerated": 3
  },
  "demoNarrative": "The system identified patient risk, stock shortage, and staff pressure, then converted them into an operational action plan."
}
```

## Service Functions

Create these service files:

```text
src/modules/dashboard/dashboard.service.ts
src/modules/facilities/facilities.service.ts
src/modules/patients/patients.service.ts
src/modules/staff/staff.service.ts
src/modules/inventory/inventory.service.ts
src/modules/disease-trends/disease-trends.service.ts
src/modules/alerts/alerts.service.ts
src/modules/tasks/tasks.service.ts
src/modules/ai/ai-action-plan.service.ts
src/modules/simulation/simulation.service.ts
```

Minimum functions:

```ts
getDashboardSummary()
getFacilitiesWithMetrics()
createFacility(input)
getFacilitySummary(facilityId)
getFacilityPatients(facilityId)
getFacilityStaff(facilityId)
getFacilityInventory(facilityId)
getFacilityAlerts(facilityId)
getFacilityTasks(facilityId)
getPatients(filters)
getDoctors(filters)
getNurses(filters)
getInventory(filters)
getDiseaseTrends(filters)
buildGeminiFacilityContext(facilityId)
generateAIActionPlan(facilityId, userId)
createTasksFromAIPlan(planId, urgentActions)
simulateTomorrow(scope)
```

## Frontend Screen to Backend Schema Map

| Frontend screen | Tables/views |
| --- | --- |
| District Dashboard | `facilities`, `facility_dashboard_metrics`, `alerts`, `facility_daily_stats` |
| Create New PHC / CHC | `facilities`, `staff`, `medicine_stock`, `facility_daily_stats` |
| Facility Detail | `facilities`, `facility_dashboard_metrics`, `patients`, `staff`, `medicine_stock`, `alerts`, `tasks`, `ai_action_plans` |
| Patient CRM | `patients`, `patient_conditions`, `visits`, `tasks`, `staff` |
| Patient Profile | `patients`, `patient_conditions`, `visits`, `vitals`, `prescriptions`, `tasks` |
| Doctor CRM | `staff`, `staff_attendance`, `patients`, `visits`, `tasks` |
| Nurse CRM | `staff`, `patients`, `tasks`, `visits`, `staff_attendance` |
| Medicine Inventory | `medicines`, `medicine_stock`, `medicine_stock_movements`, `alerts` |
| Disease Trends | `disease_surveillance_reports`, `patient_conditions`, `visits`, `medicine_stock` |
| AI Insights Board | `alerts`, `ai_action_plans`, `tasks`, `facilities` |

## Seed / Demo Data Plan

Seed only enough data to look rich and coherent.

Recommended facilities:

```text
PHC Madhurawada      -> Critical
CHC Bheemili         -> High
PHC Gajuwaka         -> High
PHC Anandapuram      -> Medium
PHC Pendurthi        -> Low
CHC Narsipatnam      -> Low
```

Core seed counts:

```text
Facilities: 5-6
Staff: 25-35
Patients: 80-120
Conditions: 120-180
Visits: 100-150
Vitals: 100-150
Medicines: 10-15
Medicine stock rows: 50-75
Daily stats rows: 10-14
Disease reports: 20-30
Alerts: 20-30
Tasks: 15-25
AI action plans: 2-3 optional pregenerated plans
```

PHC Madhurawada demo state:

```text
Status: Critical
Risk score: 87
Today's OPD: 184
7-day average OPD: 105
Doctors present: 2 / 3
Nurses present: 4 / 5
Beds occupied: 16 / 20
High-risk patients: 23
Pending follow-ups: 41
Medicine risk: Paracetamol and ORS low
Disease spike: Fever cases up 104%
```

## Build Order

### Phase 1: Supabase Foundation

```text
Create enums
Create tables
Create indexes
Create facility_dashboard_metrics view
Seed demo data
Validate dashboard queries in Supabase SQL editor
```

### Phase 2: NestJS API Foundation

```text
Create NestJS app
Configure environment variables
Create Supabase admin client
Create response DTOs
Create health check route
Create dashboard and facilities modules first
```

### Phase 3: Dashboard and Facility APIs

```text
GET /api/dashboard/summary
GET /api/facilities
POST /api/facilities
GET /api/facilities/:id/summary
GET /api/facilities/:id/patients
GET /api/facilities/:id/staff
GET /api/facilities/:id/inventory
GET /api/facilities/:id/alerts
```

### Phase 4: CRM APIs

```text
GET /api/patients
GET /api/staff/doctors
GET /api/staff/nurses
GET /api/inventory
GET /api/disease-trends
GET /api/insights
```

### Phase 5: AI and Simulation

```text
POST /api/ai/action-plan
Save ai_action_plans
Create tasks from urgentActions
Create alerts from critical actions
POST /api/simulation/tomorrow
```

## Security Plan

For the hackathon:

```text
Use Supabase service role only on the backend.
Do not expose service role to the frontend.
Use mock role switcher for UI permissions.
Keep writes narrow: create facility, create tasks, update tasks, update alerts, generate AI plan.
```

After the demo:

```text
Enable Supabase Auth login.
Map users through profiles and facility_users.
Add RLS policies per facility.
Replace mock role switcher with session-backed role.
```

## Environment Variables

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
GEMINI_API_KEY=
FRONTEND_ORIGIN=http://localhost:3000
PORT=4000
```

## Acceptance Checklist

The backend is ready when:

```text
Dashboard returns district summary metrics.
Facilities endpoint returns ranked risk rows.
Create facility creates a low-risk facility and default stats.
Facility summary returns all top-section metrics.
Facility detail APIs return patients, staff, inventory, alerts, and tasks.
Patient, doctor, nurse, inventory, disease trend, and insight screens have API data.
AI action plan creates an ai_action_plans row.
AI urgent actions become tasks.
Critical AI actions become alerts.
Simulation endpoint returns a believable tomorrow state.
Frontend can complete the full demo path without manual database edits.
```
