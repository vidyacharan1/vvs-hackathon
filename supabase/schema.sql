-- Facilities table for Arogyam
create table if not exists facilities (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Basic info
  name text not null,
  type text not null check (type in ('phc', 'chc')),
  district text not null,
  taluka text not null,
  village text not null,

  -- Beds
  total_beds integer not null default 0,
  occupied_beds integer not null default 0,

  -- Staff
  doctors_present integer not null default 0,
  doctors_required integer not null default 0,
  nurses_present integer not null default 0,
  nurses_required integer not null default 0,

  -- Patients
  total_patients integer not null default 0,
  high_risk_patients integer not null default 0,

  -- Medicine
  medicine_stock integer not null default 0,
  medicine_required integer not null default 0,

  -- OPD
  today_opd integer not null default 0,
  week_avg_opd integer not null default 0,

  -- Risk / Health scores
  overall_risk text not null default 'low' check (overall_risk in ('low', 'medium', 'high', 'critical')),
  risk_score integer not null default 0,
  health_score integer not null default 100,

  -- Sub-scores
  doctor_availability integer not null default 100,
  nurse_workload integer not null default 0,
  medicine_risk integer not null default 0,
  disease_risk integer not null default 0,
  bed_occupancy integer not null default 0,
  patient_risk integer not null default 0,

  -- Location
  coordinates jsonb default null
);

-- Enable Row Level Security
alter table facilities enable row level security;

-- Allow all authenticated users to read
create policy "Authenticated users can read facilities"
  on facilities for select
  to authenticated
  using (true);

-- Allow authenticated users to insert
create policy "Authenticated users can create facilities"
  on facilities for insert
  to authenticated
  with check (true);

-- Allow authenticated users to update
create policy "Authenticated users can update facilities"
  on facilities for update
  to authenticated
  using (true);

-- Profiles table linking Clerk users to roles
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  clerk_id text not null unique,
  email text,
  name text not null,
  role text not null check (role in ('district_officer', 'doctor', 'nurse')),
  district text,
  facility_id text
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on profiles for select
  to authenticated
  using (auth.jwt() ->> 'sub' = clerk_id);

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  to authenticated
  using (auth.jwt() ->> 'sub' = clerk_id)
  with check (auth.jwt() ->> 'sub' = clerk_id);

-- Allow service role to read all profiles
create policy "Service role can read all profiles"
  on profiles for select
  to service_role
  using (true);

-- Allow service role to insert/update profiles
create policy "Service role can manage profiles"
  on profiles for all
  to service_role
  using (true)
  with check (true);
