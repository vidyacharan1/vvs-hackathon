# Arogyam Frontend Plan

## Product Definition

CareGrid 360 is an AI PHC / CHC command center powered by a healthcare CRM layer.

The frontend must make one story obvious during the hackathon demo:

```text
Role Switcher
-> District Dashboard
-> Create / View PHCs and CHCs
-> Open PHC Madhurawada
-> See facility risk summary
-> Generate AI Action Plan
-> Simulate Tomorrow's Crisis
-> Show updated risk, alerts, and AI recommendations
```

Build the dashboard and facility detail page first. Every other screen supports those two screens.

## Frontend Stack

```text
Folder: Frontend/
Framework: Next.js App Router
Language: TypeScript
Styling: Tailwind CSS
UI kit: shadcn/ui
Charts: Recharts
Icons: lucide-react
Backend data: Supabase-backed API contracts from backend-plan.md
AI output: Gemini action plan returned through backend API
```

Do not build a full login flow for the hackathon. Use a role switcher in the header.

## Target App Structure

```text
Frontend/
  app/
    layout.tsx
    page.tsx
    dashboard/
      page.tsx
    facilities/
      page.tsx
      [id]/
        page.tsx
    patients/
      page.tsx
      [id]/
        page.tsx
    staff/
      doctors/
        page.tsx
      nurses/
        page.tsx
    inventory/
      page.tsx
    disease-trends/
      page.tsx
    insights/
      page.tsx
  components/
    layout/
    dashboard/
    facility/
    patients/
    staff/
    inventory/
    ai/
    shared/
  lib/
    api/
    demo-data/
    types/
    utils/
```

## Routes

| Route | Screen | Priority |
| --- | --- | --- |
| `/dashboard` | District Dashboard | Must build |
| `/facilities` | Facility list and create entry point | Must build |
| `/facilities/[id]` | Facility detail page | Must build |
| `/patients` | Patient CRM table | Must build |
| `/patients/[id]` | Patient profile | Nice to have |
| `/staff/doctors` | Doctor CRM | Must build |
| `/staff/nurses` | Nurse CRM | Must build |
| `/inventory` | Medicine inventory | Must build |
| `/disease-trends` | Disease spike intelligence | Should build |
| `/insights` | AI insights board | Should build |

The root route `/` should redirect to `/dashboard`.

## Global Layout

Every page uses the same shell:

```text
Sidebar
Header
Main content area
```

### Sidebar

Items:

```text
Dashboard
Facilities
Patients
Doctors
Nurses
Inventory
Disease Trends
AI Insights
```

Use lucide icons. Keep labels short and scannable.

### Header

Header items:

```text
CareGrid 360 logo/name
Current district or facility context
Role switcher
Simulate Tomorrow button
```

Role switcher options:

```text
District Officer
Medical Officer
Doctor
Nurse
```

The selected role controls visible actions only. It does not need real auth in the first build.

## Shared Frontend State

Keep prototype state simple:

```ts
type AppRole = "district_officer" | "medical_officer" | "doctor" | "nurse";

type AppState = {
  role: AppRole;
  selectedFacilityId?: string;
  simulationMode: "today" | "tomorrow";
};
```

For the demo, seed PHC Madhurawada as the main critical facility.

## Screen 1: District Dashboard

```text
Route: /dashboard
Primary user: District Officer
Priority: Must build
```

### Purpose

Give the district officer a command-center view of all PHCs and CHCs and make the highest-risk facility obvious immediately.

### Top Metric Cards

```text
Total Facilities
Critical Facilities
Medicine Stock Alerts
Doctor Absence Alerts
Nurse Overload Alerts
Disease Spike Alerts
High-risk Patients
Bed Pressure Alerts
```

### Facility Risk Ranking

Show a table or dense cards:

```text
PHC Madhurawada     Critical
CHC Bheemili        High
PHC Gajuwaka        High
PHC Anandapuram     Medium
PHC Pendurthi       Low
CHC Narsipatnam     Low
```

Each row/card shows:

```text
Facility name
PHC / CHC type
Location
Overall risk
Today's OPD footfall
Doctor availability
Medicine risk
Disease spike
Bed occupancy
```

### Actions

```text
+ Create New PHC / CHC
Generate District Brief
Open Facility
```

Only `District Officer` sees `+ Create New PHC / CHC` and `Generate District Brief`.

### Backend Data

```text
GET /api/dashboard/summary
GET /api/facilities
GET /api/alerts?scope=district
```

Schemas used:

```text
facilities
facility_dashboard_metrics
alerts
medicine_stock
patients
staff
facility_daily_stats
disease_surveillance_reports
```

### Judge Takeaway

The district officer can see which PHC is in trouble and why.

## Screen 2: Create New PHC / CHC

```text
UI: Modal opened from dashboard or facilities page
Primary user: District Officer
Priority: Must build
```

### Fields

```text
Facility name
Facility type: PHC / CHC
District
Mandal
Village / Area
Total beds
Number of doctors
Number of nurses
Starting medicine stock level
```

### Submit Behavior

After submit:

```text
POST /api/facilities
Redirect to /facilities/[newFacilityId]
```

New facility default state:

```text
Risk: Low
Today's OPD: 0
Occupied beds: 0
Alerts: None
AI insight: Not generated yet
```

### Access Rule

Show only for:

```text
District Officer
```

Hide for:

```text
Medical Officer
Doctor
Nurse
```

### Backend Data

Schemas written on create:

```text
facilities
staff
medicine_stock
facility_daily_stats
```

## Screen 3: Facility Detail Page

```text
Route: /facilities/[id]
Hero facility: PHC Madhurawada
Priority: Must build
```

### Top Section

Display:

```text
PHC Madhurawada
Overall Risk: Critical
Today's OPD: 184
7-day Average OPD: 105
Doctors Present: 2 / 3
Nurses Present: 4 / 5
Beds Occupied: 16 / 20
High-risk Patients: 23
Pending Follow-ups: 41
```

### Facility Health Cards

```text
Facility Health Score
Doctor Availability
Nurse Workload
Medicine Stock Risk
Disease Spike Risk
Bed Occupancy
Patient Follow-up Risk
```

### Main Panels

```text
Doctor Attendance Panel
Nurse Workload Panel
Medicine Risk Panel
Disease Trends Panel
Bed Occupancy Panel
Patient Risk Summary Panel
Alerts Panel
AI Action Plan Panel
```

### Main CTA

```text
Generate AI Action Plan
```

After clicking, show:

```text
Executive summary
Top 3 issues
Doctor actions
Nurse actions
Medicine actions
Patient follow-up actions
District officer alert
Medical officer alert
Impact forecast
```

### Impact Forecast

```text
Stock-out avoided: 2 medicines
High-risk follow-ups prioritized: 8
Doctor workload reduced: 18%
Medicine availability improved by: 2.8 days
Critical alerts generated: 3
```

### Backend Data

```text
GET /api/facilities/:id/summary
GET /api/facilities/:id/patients
GET /api/facilities/:id/staff
GET /api/facilities/:id/inventory
GET /api/facilities/:id/alerts
GET /api/facilities/:id/tasks
POST /api/ai/action-plan
```

Schemas used:

```text
facilities
facility_dashboard_metrics
facility_daily_stats
patients
staff
staff_attendance
medicine_stock
medicines
alerts
tasks
ai_action_plans
disease_surveillance_reports
```

## Screen 4: Patients CRM

```text
Route: /patients
Priority: Must build
```

### Purpose

Show that the product is not only a dashboard. It has a patient CRM layer underneath facility risk.

### Table Columns

```text
Patient name
Age
Gender
Village
Condition tags
Assigned doctor
Assigned nurse
Risk level
Follow-up status
Last visit
Next follow-up
```

### Filters

```text
Facility
Risk level
Condition
Follow-up status
Assigned nurse
```

### Actions

```text
View Patient
Add Patient
Summarize Patient Journey
```

For the hackathon, `Add Patient` can be a simple modal or mocked.

### Backend Data

```text
GET /api/patients
POST /api/patients
GET /api/patients/:id
POST /api/ai/patient-summary
```

Schemas used:

```text
patients
patient_conditions
visits
vitals
prescriptions
staff
tasks
alerts
```

## Screen 5: Patient Profile

```text
Route: /patients/[id]
Priority: Nice to have
```

### Sections

```text
Basic details
Condition tags
Assigned doctor
Assigned nurse
Visit timeline
Prescriptions
Follow-up tasks
AI patient summary
```

### AI Button

```text
Summarize Patient Journey
```

Output must be operational, not diagnostic:

```text
Last visit summary
Condition tags
Medicines issued
Follow-up status
Reason for risk level
Next recommended follow-up action
```

Do not present AI as diagnosing a patient.

## Screen 6: Doctor CRM

```text
Route: /staff/doctors
Priority: Must build
```

### Purpose

Show doctor attendance, capacity, patient load, and pending review pressure.

### Table Columns

```text
Doctor name
Facility
Attendance
Patients seen today
Max daily capacity
Active patients
High-risk patients
Pending reviews
Workload status
```

### Actions

```text
View Doctor
Mark attendance
Analyze Doctor Load
```

### Doctor Detail Drawer

```text
Attendance status
Assigned patients
Patients seen today
Pending reviews
High-risk patients
Workload score
AI redistribution suggestion
```

### Backend Data

```text
GET /api/staff/doctors
PATCH /api/staff/:id/attendance
POST /api/ai/staff-load
```

Schemas used:

```text
staff
staff_attendance
patients
visits
tasks
alerts
```

## Screen 7: Nurse CRM

```text
Route: /staff/nurses
Priority: Must build
```

### Purpose

Show nurse follow-up workload and field operations.

### Table Columns

```text
Nurse name
Facility
Assigned villages
Assigned patients
Pending follow-ups
Completed today
High-risk follow-ups
Workload status
```

### Actions

```text
View Nurse
Optimize Follow-ups
Mark Follow-up Completed
```

### Nurse Detail Drawer

```text
Assigned villages
Pending follow-ups
High-risk patients
Completed visits
Overload score
AI follow-up priority plan
```

### Backend Data

```text
GET /api/staff/nurses
PATCH /api/tasks/:id
POST /api/ai/follow-up-plan
```

Schemas used:

```text
staff
patients
tasks
visits
alerts
staff_attendance
```

## Screen 8: Medicine Inventory

```text
Route: /inventory
Priority: Must build
```

### Purpose

Directly show medicine stock-out risk and suggested action.

### Table Columns

```text
Medicine name
Facility
Current stock
Average daily usage
Days left
Reorder level
Risk
Suggested action
```

### Important Medicine Examples

```text
Paracetamol
ORS
Amoxicillin
Iron tablets
Insulin
Antihypertensives
```

### Actions

```text
Add Stock
Issue Stock
Transfer Stock
Generate Stock Recommendation
```

For the demo, at least show:

```text
Paracetamol: 2.2 days left, Critical
ORS: 3 days left, High
```

### Backend Data

```text
GET /api/inventory
POST /api/inventory/stock-adjustment
POST /api/ai/stock-recommendation
```

Schemas used:

```text
medicines
medicine_stock
medicine_stock_movements
facilities
alerts
tasks
```

## Screen 9: Disease Trends

```text
Route: /disease-trends
Priority: Should build
```

### Purpose

Show disease spike detection connected to medicine stock and facility pressure.

### Sections

```text
Disease trend chart
This week vs last week comparison
Facility-wise disease spike
Village-wise condition clusters
Linked medicine impact
```

### Example

```text
Fever cases:
This week: 84
Last week: 41
Increase: 104%
Risk: High
Linked medicine pressure: Paracetamol and ORS
```

If time is short, embed this inside the facility detail page first.

### Backend Data

```text
GET /api/disease-trends
GET /api/facilities/:id/disease-trends
```

Schemas used:

```text
disease_surveillance_reports
patient_conditions
visits
medicine_stock
```

## Screen 10: AI Insights Board

```text
Route: /insights
Priority: Should build
```

### Purpose

Show all AI-generated operational insights in one place.

### Insight Cards

```text
Facility Risk Insight
Medicine Stock-out Alert
Doctor Absence Alert
Nurse Overload Alert
Patient Follow-up Alert
Disease Spike Alert
District Brief
```

Each card shows:

```text
Insight type
Facility
Severity
Summary
Recommended action
Created time
Status: Open / Acknowledged / Resolved
```

### Actions

```text
Acknowledge
Mark Resolved
Copy Alert Message
```

### Backend Data

```text
GET /api/insights
PATCH /api/alerts/:id
POST /api/ai/district-brief
```

Schemas used:

```text
alerts
ai_action_plans
tasks
facilities
```

## Simulate Tomorrow Flow

The `Simulate Tomorrow` button should update visible demo risk without requiring a complex simulation engine.

### UI Behavior

```text
1. User clicks Simulate Tomorrow.
2. Header changes state from Today to Tomorrow.
3. Dashboard metrics update.
4. PHC Madhurawada risk remains or becomes more critical.
5. New alerts appear for stock, staff, disease spike, and follow-ups.
6. AI Action Plan panel shows updated recommendations.
```

### Backend Data

Preferred:

```text
POST /api/simulation/tomorrow
```

Fallback for hackathon:

```text
Switch between local demo datasets in the frontend.
```

## Component Structure

```text
components/
  layout/
    Sidebar.tsx
    Header.tsx
    RoleSwitcher.tsx

  dashboard/
    MetricCard.tsx
    FacilityRiskCard.tsx
    FacilityRiskTable.tsx
    AlertList.tsx
    DistrictBriefCard.tsx
    CreateFacilityModal.tsx

  facility/
    FacilityOverview.tsx
    FacilityHealthScore.tsx
    FacilityStaffPanel.tsx
    FacilityMedicinePanel.tsx
    FacilityDiseasePanel.tsx
    FacilityBedPanel.tsx
    FacilityPatientRiskPanel.tsx
    FacilityAIActionPlan.tsx

  patients/
    PatientTable.tsx
    PatientProfileDrawer.tsx
    PatientTimeline.tsx
    PatientRiskBadge.tsx

  staff/
    DoctorTable.tsx
    DoctorProfileDrawer.tsx
    NurseTable.tsx
    NurseProfileDrawer.tsx
    AttendanceBadge.tsx
    WorkloadBadge.tsx

  inventory/
    MedicineTable.tsx
    MedicineRiskBadge.tsx
    StockLevelBar.tsx

  ai/
    AIInsightCard.tsx
    GenerateInsightButton.tsx
    AlertMessageCard.tsx
    ImpactForecastCard.tsx

  shared/
    RiskBadge.tsx
    EmptyState.tsx
    LoadingState.tsx
    PageHeader.tsx
    DataTable.tsx
```

## Role-Based UI Plan

### District Officer

Can see:

```text
Dashboard
Facilities
Create PHC / CHC
Patients
Doctors
Nurses
Inventory
Disease Trends
AI Insights
Generate District Brief
Simulate Tomorrow
```

### Medical Officer

Can see:

```text
Assigned facility
Patients in facility
Doctors in facility
Nurses in facility
Inventory in facility
Facility AI Action Plan
```

Cannot see:

```text
Create PHC / CHC
Other facility management actions
```

### Doctor

Can see:

```text
Assigned patients
Patient profile
Visit timeline
Medicine availability
Patient AI summary
```

Cannot see:

```text
Create PHC
District dashboard
All-facility analytics
```

### Nurse

Can see:

```text
Assigned follow-ups
Assigned patients
High-risk follow-ups
Nurse workload
Follow-up completion actions
```

Cannot see:

```text
Create PHC
Medicine stock editing
Doctor management
District-level controls
```

## Backend Mapping Summary

| Frontend area | Backend source |
| --- | --- |
| Dashboard metric cards | `/api/dashboard/summary`, `facility_dashboard_metrics` |
| Facility risk table | `/api/facilities`, `facility_dashboard_metrics` |
| Create facility modal | `POST /api/facilities`, `facilities`, `staff`, `medicine_stock` |
| Facility detail top section | `/api/facilities/:id/summary` |
| Doctor attendance | `staff`, `staff_attendance`, `visits` |
| Nurse workload | `staff`, `tasks`, `patients`, `visits` |
| Medicine panel | `medicines`, `medicine_stock`, `medicine_stock_movements` |
| Disease panel | `disease_surveillance_reports`, `patient_conditions`, `visits` |
| Bed panel | `facility_daily_stats` |
| Patient CRM | `patients`, `patient_conditions`, `visits`, `tasks` |
| AI Action Plan | `POST /api/ai/action-plan`, `ai_action_plans`, `tasks`, `alerts` |
| Insights board | `alerts`, `ai_action_plans`, `tasks` |

## 12-Hour Execution Timeline

### Hour 0-1: Setup

```text
Next.js app setup
Tailwind setup
shadcn/ui setup
Sidebar
Header
RoleSwitcher
Basic route structure
```

### Hour 1-3: Dashboard

```text
Dashboard metric cards
Facility risk ranking table/cards
Create PHC button
Alert list
Open facility navigation
```

### Hour 3-5: Facility Page

```text
Facility overview
Risk cards
Doctor attendance panel
Nurse workload panel
Medicine panel
Disease panel
Bed panel
AI Action Plan placeholder
```

### Hour 5-7: CRM Tables

```text
Patients table
Doctors table
Nurses table
Inventory table
Risk badges
Workload badges
Stock bars
```

### Hour 7-9: AI and Simulation UI

```text
Generate AI Action Plan button
AI response card
Impact forecast card
Simulate Tomorrow button
Before/after risk state
Updated alerts
```

### Hour 9-10.5: Role-Based UI Polish

```text
Show/hide Create PHC by role
Show/hide district controls by role
Facility-only view for Medical Officer
Patient/follow-up focused view for Doctor and Nurse
```

### Hour 10.5-12: Demo Polish

```text
Loading states
Empty states
Demo data consistency
Responsive spacing
Charts
Pitch-ready UI
Bug fixes
```

## Demo Route Order

During judging, show only this order:

```text
1. Dashboard
2. Create New PHC / CHC
3. Open PHC Madhurawada
4. Explain critical risk
5. Generate AI Action Plan
6. Show medicine transfer + nurse reassignment + doctor action
7. Open Patients briefly
8. Open Doctors briefly
9. Open Nurses briefly
10. Click Simulate Tomorrow
11. Show updated critical alerts and impact forecast
```

Do not spend too much time on every screen. The facility page and AI action plan should get the most attention.

## Success Checklist

The frontend is successful if it clearly shows:

```text
A district officer can monitor all PHCs/CHCs
A new PHC can be created
A specific PHC can be opened
The PHC has a clear health/risk summary
Doctor attendance is visible
Nurse workload is visible
Medicine stock-out risk is visible
Disease spike is visible
Patient CRM exists
AI recommends operational actions
Simulation makes the system feel real
```
