# Arogyam AI — Healthcare Platform

AI-powered healthcare management platform for Visakhapatnam district. Manages PHC/CHC facilities, patients, doctors, nurses, inventory, and disease surveillance with real-time AI insights.

## Architecture

```
Frontend (Next.js 15, port 3000)
    ↕  /api/* rewrites
Backend (FastAPI, port 8000)
    ↕  SQLAlchemy async
Supabase PostgreSQL
    ↕  Gemini 2.5 Flash API
AI Insights (district briefs, action plans, nurse optimization, etc.)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS, Recharts |
| Backend | FastAPI, Python 3.9, SQLAlchemy (async), asyncpg |
| Database | Supabase PostgreSQL (AWS Mumbai region) |
| AI | Google Gemini 2.5 Flash (via REST API) |
| Auth | JWT tokens with role-based access control |

## Roles

| Role | Capabilities |
|------|-------------|
| `district_officer` | Full CRUD on all entities, create facilities, execute plans |
| `medical_officer` | View all data, add doctors/nurses |
| `doctor` | View patients, doctors, nurses |
| `nurse` | Add patients, view assigned patients |

## Features

- **Dashboard** — Risk-ranked facility table, metric cards, disease trend charts, AI district brief
- **Facilities** — 12 seeded facilities with enriched detail (doctors, nurses, patients, medicines, insights)
- **Patients** — 52 patients with facility linking, risk scoring, follow-up tracking, AI patient journey summary
- **Doctors** — 17 doctors with workload analysis, AI load analysis, rebalancing
- **Nurses** — 13 nurses with village assignments, AI route optimization
- **Inventory** — Medicine stock tracking, add stock, transfer between facilities
- **Disease Trends** — Spike tracking, health trends, village conditions
- **Insights** — AI-generated alerts with acknowledge/resolve actions
- **AI Features** — All 7 AI endpoints call real Gemini API with context-aware prompts

## Quick Start

### Backend

```bash
cd Backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Set up .env with Supabase credentials and Gemini API key
python3 -m uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`, proxies API calls to backend on `http://localhost:8000`.

## Environment Variables

**Backend `.env`:**
```
DATABASE_URL=postgresql://postgres.xcjrgqwqafzndralpudy:<password>@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
GEMINI_API_KEY=****
```

**Frontend `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Database Schema

9 tables, auto-created on backend startup:

| Table | Rows | Description |
|-------|------|-------------|
| `facilities` | 12 | PHC/CHC facilities |
| `doctors` | 17 | Doctor records with workload |
| `nurses` | 13 | Nurse records with village assignments |
| `patients` | 52 | Patient records with risk scores |
| `inventory_stock` | 30 | Medicine stock per facility |
| `inventory_log` | — | Stock add/transfer audit log |
| `ai_insights` | 15 | AI-generated alerts |
| `disease_spikes` | 12 | Disease case tracking |
| `health_trends` | 7 | Monthly health trends |
| `village_conditions` | 18 | Village-level health data |

## API Endpoints

### Facilities
- `GET /api/v1/facilities/enriched` — All facilities with aggregated stats
- `GET /api/v1/facilities/enriched/{id}` — Facility detail with doctors, nurses, patients, medicines, insights
- `POST /api/v1/facilities` — Create facility
- `PUT /api/v1/facilities/{id}` — Update facility

### Patients
- `GET /api/v1/patients` — List all patients
- `GET /api/v1/patients/{id}` — Patient detail
- `POST /api/v1/patients` — Create patient
- `PUT /api/v1/patients/{id}` — Update patient

### Doctors
- `GET /api/v1/doctors` — List all doctors
- `POST /api/v1/doctors` — Create doctor
- `PUT /api/v1/doctors/{id}` — Update doctor

### Nurses
- `GET /api/v1/nurses` — List all nurses
- `POST /api/v1/nurses` — Create nurse
- `PUT /api/v1/nurses/{id}` — Update nurse

### Inventory
- `GET /api/v1/inventory/stock` — All stock items
- `GET /api/v1/inventory/alerts` — Stock alerts
- `POST /api/v1/inventory/add-stock` — Add medicine stock
- `POST /api/v1/inventory/transfer` — Transfer stock between facilities

### AI (Gemini-powered)
- `POST /api/v1/ai/district-brief` — District health overview
- `POST /api/v1/ai/brief` — Clinical patient cohort summary
- `POST /api/v1/ai/redistribution` — Medicine redistribution plan
- `POST /api/v1/ai/optimize-nurses` — Nurse workload optimization
- `POST /api/v1/ai/rebalance-doctors` — Doctor workload rebalancing
- `POST /api/v1/ai/analyze-load` — Doctor load analysis
- `POST /api/v1/ai/facility-action-plan` — 24-hour action plan for a facility

### Other
- `GET /api/v1/dashboard/enriched` — Dashboard aggregate metrics
- `GET /api/v1/alerts` — Alert feed
- `POST /api/v1/alerts/{id}/acknowledge` — Acknowledge alert
- `POST /api/v1/alerts/{id}/resolve` — Resolve alert
- `GET /api/v1/disease-trends/spikes` — Disease spikes
- `GET /api/v1/disease-trends/health-trends` — Monthly trends
- `GET /api/v1/disease-trends/villages` — Village conditions

## Project Structure

```
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app, lifespan, CORS
│   │   ├── core/
│   │   │   ├── config.py        # Settings (Supabase, Gemini)
│   │   │   ├── database.py      # SQLAlchemy engine, sessions
│   │   │   └── security.py      # JWT auth
│   │   ├── models/
│   │   │   └── models.py        # SQLAlchemy models (10 tables)
│   │   ├── services/
│   │   │   ├── db.py            # Database CRUD operations
│   │   │   ├── db_seed.py       # Seed data (164+ rows)
│   │   │   ├── gemini_service.py # Gemini API client
│   │   │   └── ...              # Legacy in-memory services
│   │   └── api/
│   │       ├── deps.py          # Role-based access control
│   │       └── v1/
│   │           ├── router.py    # Route registrations
│   │           └── endpoints/   # 12 endpoint files
│   └── .env                     # Supabase + Gemini credentials
├── Frontend/
│   ├── app/(app)/
│   │   ├── dashboard/page.tsx
│   │   ├── facilities/[id]/page.tsx
│   │   ├── patients/[id]/page.tsx
│   │   ├── doctors/page.tsx
│   │   ├── nurses/page.tsx
│   │   ├── inventory/page.tsx
│   │   ├── insights/page.tsx
│   │   └── disease-trends/page.tsx
│   ├── components/modals/        # Edit/Add modals
│   ├── lib/
│   │   ├── api/client.ts         # Typed API client
│   │   ├── api/hooks.ts          # React data-fetching hooks
│   │   └── app-context.tsx       # Role state management
│   └── next.config.ts            # API rewrites
└── README.md
```

## Running

1. Start backend: `cd Backend && python3 -m uvicorn app.main:app --reload --port 8000`
2. Start frontend: `cd Frontend && npm run dev`
3. Open `http://localhost:3000`

Database auto-creates tables and seeds data on first backend startup.
