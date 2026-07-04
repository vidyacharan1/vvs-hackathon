-- Doctors
create table if not exists doctors (
  id text primary key,
  name text not null,
  email text,
  phone text,
  specialty text,
  facility_id text references facilities(id) on delete cascade,
  facility_name text,
  present boolean default true,
  patients_seen integer default 0,
  max_capacity integer default 40,
  pending_reviews integer default 0,
  workload integer default 0,
  attendance integer default 100,
  avatar text,
  rating numeric(3,1) default 0,
  join_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table doctors enable row level security;
create policy "Authenticated users can read doctors" on doctors for select to authenticated using (true);
create policy "Authenticated users can insert doctors" on doctors for insert to authenticated with check (true);
create policy "Authenticated users can update doctors" on doctors for update to authenticated using (true);

-- Nurses
create table if not exists nurses (
  id text primary key,
  name text not null,
  email text,
  phone text,
  facility_id text references facilities(id) on delete cascade,
  facility_name text,
  assigned_villages jsonb default '[]'::jsonb,
  pending_follow_ups integer default 0,
  completed_today integer default 0,
  high_risk_patients integer default 0,
  total_patients integer default 0,
  workload integer default 0,
  present boolean default true,
  avatar text,
  rating numeric(3,1) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table nurses enable row level security;
create policy "Authenticated users can read nurses" on nurses for select to authenticated using (true);
create policy "Authenticated users can insert nurses" on nurses for insert to authenticated with check (true);
create policy "Authenticated users can update nurses" on nurses for update to authenticated using (true);

-- Patients
create table if not exists patients (
  id text primary key,
  name text not null,
  age integer,
  gender text,
  village text,
  district text,
  conditions jsonb default '[]'::jsonb,
  doctor text,
  doctor_id text,
  nurse text,
  nurse_id text,
  risk text default 'low',
  last_visit text,
  next_follow_up text,
  status text default 'active',
  phone text,
  blood_group text,
  vitals jsonb default '[]'::jsonb,
  visits jsonb default '[]'::jsonb,
  medicines jsonb default '[]'::jsonb,
  timeline jsonb default '[]'::jsonb,
  ai_summary text,
  tasks jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table patients enable row level security;
create policy "Authenticated users can read patients" on patients for select to authenticated using (true);
create policy "Authenticated users can insert patients" on patients for insert to authenticated with check (true);
create policy "Authenticated users can update patients" on patients for update to authenticated using (true);

-- Medicines
create table if not exists medicines (
  id text primary key,
  name text not null,
  category text,
  current_stock integer default 0,
  average_usage integer default 0,
  days_left integer default 0,
  reorder_level integer default 0,
  risk text default 'low',
  unit text,
  facility_id text references facilities(id) on delete cascade,
  facility_name text,
  expiry_date text,
  manufacturer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table medicines enable row level security;
create policy "Authenticated users can read medicines" on medicines for select to authenticated using (true);
create policy "Authenticated users can insert medicines" on medicines for insert to authenticated with check (true);
create policy "Authenticated users can update medicines" on medicines for update to authenticated using (true);

-- Disease Trends
create table if not exists disease_trends (
  disease text primary key,
  week_data jsonb default '[]'::jsonb,
  current_week integer default 0,
  previous_week integer default 0,
  change numeric(5,1) default 0,
  risk text default 'low',
  facilities jsonb default '[]'::jsonb,
  villages jsonb default '[]'::jsonb,
  medicine_impact integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table disease_trends enable row level security;
create policy "Authenticated users can read disease_trends" on disease_trends for select to authenticated using (true);
create policy "Authenticated users can insert disease_trends" on disease_trends for insert to authenticated with check (true);
create policy "Authenticated users can update disease_trends" on disease_trends for update to authenticated using (true);

-- Alerts
create table if not exists alerts (
  id text primary key,
  type text not null,
  severity text not null,
  title text not null,
  description text,
  facility_id text,
  facility_name text,
  timestamp text,
  acknowledged boolean default false,
  resolved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table alerts enable row level security;
create policy "Authenticated users can read alerts" on alerts for select to authenticated using (true);
create policy "Authenticated users can insert alerts" on alerts for insert to authenticated with check (true);
create policy "Authenticated users can update alerts" on alerts for update to authenticated using (true);

-- AI Insights
create table if not exists ai_insights (
  id text primary key,
  type text not null,
  title text not null,
  description text,
  recommendation text,
  severity text not null,
  timestamp text,
  acknowledged boolean default false,
  resolved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table ai_insights enable row level security;
create policy "Authenticated users can read ai_insights" on ai_insights for select to authenticated using (true);
create policy "Authenticated users can insert ai_insights" on ai_insights for insert to authenticated with check (true);
create policy "Authenticated users can update ai_insights" on ai_insights for update to authenticated using (true);
