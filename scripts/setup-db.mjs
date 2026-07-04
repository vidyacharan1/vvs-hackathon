import https from "https"

const supabaseUrl = "https://gqvkvqhfwtsojtsjhcne.supabase.co"
const serviceKey = "sb_secret_x7-IvVqmdXaNiPdrDDdSGA_hHKyjvXy"

function httpsRequest(url, options, body = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const opts = {
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceKey,
        "Authorization": `Bearer ${serviceKey}`,
        ...options.headers,
      },
    }
    const req = https.request(opts, (res) => {
      let data = ""
      res.on("data", (chunk) => data += chunk)
      res.on("end", () => resolve({ status: res.statusCode, data }))
    })
    req.on("error", reject)
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("timeout")) })
    if (body) req.write(body)
    req.end()
  })
}

async function main() {
  console.log("Testing connection...")
  let res = await httpsRequest(`${supabaseUrl}/rest/v1/`, { method: "GET" })
  console.log(`REST: ${res.status}`)

  // SQL to create the facilities table
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

  console.log("Creating table via pg-meta SQL endpoint...")
  res = await httpsRequest(`${supabaseUrl}/pg/v1/sql`, {
    method: "POST",
  }, JSON.stringify({ query: sql }))
  console.log(`PG: ${res.status}`)
  console.log("Response:", res.data.substring(0, 300))

  // Also try REST endpoint
  console.log("Trying REST exec endpoint...")
  res = await httpsRequest(`${supabaseUrl}/rest/v1/rpc/`, {
    method: "POST",
  }, JSON.stringify({ query: sql }))
  console.log(`RPC: ${res.status}`)
  console.log("Response:", res.data.substring(0, 300))
}

main()
