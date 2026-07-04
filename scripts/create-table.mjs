import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bxmgmtscsltyrlykmqmc.supabase.co"
const dummyKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bWdtdHNjc2x0eXJseWttcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5OTk5OTksImV4cCI6MTg1NzU3NTk5OX0.placeholder"

const supabase = createClient(supabaseUrl, dummyKey)

async function main() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "srirampksrirampk@gmail.com",
    password: "123456",
  })
  if (error) {
    console.log("Auth error:", error.message)
    return
  }
  console.log("Logged in as:", data.user?.email)

  const session = data.session
  if (!session) {
    console.log("No session")
    return
  }

  const sql = `
    CREATE TABLE IF NOT EXISTS facilities (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT now(),
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('phc','chc')),
      district TEXT NOT NULL,
      taluka TEXT NOT NULL,
      village TEXT NOT NULL,
      total_beds INT DEFAULT 0,
      occupied_beds INT DEFAULT 0,
      doctors_present INT DEFAULT 0,
      doctors_required INT DEFAULT 0,
      nurses_present INT DEFAULT 0,
      nurses_required INT DEFAULT 0,
      total_patients INT DEFAULT 0,
      high_risk_patients INT DEFAULT 0,
      medicine_stock INT DEFAULT 0,
      medicine_required INT DEFAULT 0,
      today_opd INT DEFAULT 0,
      week_avg_opd INT DEFAULT 0,
      overall_risk TEXT DEFAULT 'low' CHECK (overall_risk IN ('low','medium','high','critical')),
      risk_score INT DEFAULT 0,
      health_score INT DEFAULT 100,
      doctor_availability INT DEFAULT 100,
      nurse_workload INT DEFAULT 0,
      medicine_risk INT DEFAULT 0,
      disease_risk INT DEFAULT 0,
      bed_occupancy INT DEFAULT 0,
      patient_risk INT DEFAULT 0
    );

    ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "anon_insert_facilities" ON facilities;
    CREATE POLICY "anon_insert_facilities" ON facilities FOR INSERT TO anon WITH CHECK (true);

    DROP POLICY IF EXISTS "anon_select_facilities" ON facilities;
    CREATE POLICY "anon_select_facilities" ON facilities FOR SELECT TO anon USING (true);

    DROP POLICY IF EXISTS "anon_update_facilities" ON facilities;
    CREATE POLICY "anon_update_facilities" ON facilities FOR UPDATE TO anon USING (true);
  `

  console.log("Creating facilities table...")
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`,
      "apikey": dummyKey,
    },
    body: JSON.stringify({ query: sql }),
  })

  const text = await res.text()
  console.log("Response:", res.status, text.substring(0, 200))
}

main()
