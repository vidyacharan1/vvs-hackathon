import https from "https"

const supabaseUrl = "https://gqvkvqhfwtsojtsjhcne.supabase.co"
const key = "sb_publishable_MjJH0ToRXFTta8k46R4PNw_41r6xuxY"

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
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        ...options.headers,
      },
    }
    const req = https.request(opts, (res) => {
      let data = ""
      res.on("data", (chunk) => data += chunk)
      res.on("end", () => resolve({ status: res.statusCode, data }))
    })
    req.on("error", reject)
    req.setTimeout(10000, () => { req.destroy(); reject(new Error("timeout")) })
    if (body) req.write(body)
    req.end()
  })
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
);`

async function main() {
  // Try different endpoints
  const paths = [
    "/pg/v1/sql",
    "/pg/v1/query",
    "/pg/v1/sql/execute",
    "/api/v1/projects/gqvkvqhfwtsojtsjhcne/database/query",
  ]
  for (const path of paths) {
    const res = await httpsRequest(`${supabaseUrl}${path}`, { method: "POST" }, JSON.stringify({ query: sql }))
    console.log(`${path}: ${res.status} - ${res.data.substring(0, 100)}`)
  }
}
main()
