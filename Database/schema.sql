create extension if not exists pgcrypto;

create type user_role as enum (
  'super_admin',
  'state_admin',
  'district_admin',
  'warehouse_manager',
  'medical_officer',
  'doctor',
  'lab_technician',
  'pharmacist',
  'data_entry_operator'
);

create type risk_level as enum ('low', 'medium', 'high', 'critical');
create type facility_type as enum ('phc', 'chc', 'district_hospital', 'warehouse');
create type alert_status as enum ('open', 'acknowledged', 'in_progress', 'resolved');

create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  phone text,
  role user_role not null,
  district_id uuid,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table districts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state text not null,
  health_score integer not null default 0,
  created_at timestamptz not null default now()
);

create table facilities (
  id uuid primary key default gen_random_uuid(),
  district_id uuid not null references districts(id) on delete cascade,
  name text not null,
  code text unique not null,
  type facility_type not null,
  location text not null,
  latitude numeric,
  longitude numeric,
  overall_risk risk_level not null default 'low',
  today_opd integer not null default 0,
  bed_occupancy integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table doctors (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  full_name text not null,
  specialization text,
  attendance_status text not null default 'present',
  patients_seen_today integer not null default 0,
  workload_score integer not null default 0
);

create table patients (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  full_name text not null,
  age integer,
  gender text,
  village text,
  disease_tags text[] not null default '{}',
  risk risk_level not null default 'low',
  next_followup_at timestamptz
);

create table medicines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  manufacturer text,
  category text,
  unit text not null default 'tablet'
);

create table medicine_stock (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  medicine_id uuid not null references medicines(id) on delete cascade,
  batch_number text,
  expiry_date date,
  quantity_available integer not null default 0,
  minimum_stock integer not null default 0,
  maximum_stock integer not null default 0,
  consumption_per_day numeric not null default 0,
  risk risk_level not null default 'low'
);

create table beds (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  bed_type text not null,
  total_count integer not null,
  occupied_count integer not null,
  expected_discharge_count integer not null default 0
);

create table laboratory_tests (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  test_name text not null,
  pending_count integer not null default 0,
  reagent_days_left numeric not null default 0
);

create table ambulances (
  id uuid primary key default gen_random_uuid(),
  district_id uuid not null references districts(id) on delete cascade,
  vehicle_number text unique not null,
  status text not null default 'available',
  latitude numeric,
  longitude numeric,
  eta_minutes integer
);

create table alerts (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid references facilities(id) on delete cascade,
  title text not null,
  severity risk_level not null,
  status alert_status not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table ai_predictions (
  id uuid primary key default gen_random_uuid(),
  district_id uuid references districts(id) on delete cascade,
  facility_id uuid references facilities(id) on delete cascade,
  prediction_type text not null,
  input_snapshot jsonb not null,
  output jsonb not null,
  confidence numeric not null,
  created_at timestamptz not null default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  district_id uuid not null references districts(id) on delete cascade,
  report_type text not null,
  title text not null,
  payload jsonb not null,
  generated_by uuid references users(id),
  created_at timestamptz not null default now()
);

create index idx_facilities_district on facilities(district_id);
create index idx_facilities_risk on facilities(overall_risk);
create index idx_stock_facility on medicine_stock(facility_id);
create index idx_alerts_status on alerts(status, severity);
