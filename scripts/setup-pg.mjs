import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://gqvkvqhfwtsojtsjhcne.supabase.co"
const anonKey = "sb_publishable_MjJH0ToRXFTta8k46R4PNw_41r6xuxY"

const supabase = createClient(supabaseUrl, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Check if facilities table exists via REST
async function checkTable() {
  const { data, error } = await supabase.from("facilities").select("*").limit(1)
  if (error) {
    console.log("Table check error:", error.message)
    return false
  }
  console.log("Table exists!")
  return true
}

// The SQL we need to run
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

async function main() {
  const exists = await checkTable()
  if (!exists) {
    console.log("Need to create table. Please run this SQL in Supabase Dashboard -> SQL Editor:")
    console.log("---")
    console.log(sql)
    console.log("---")
  }
}
main()
