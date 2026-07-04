const supabaseUrl = "https://gqvkvqhfwtsojtsjhcne.supabase.co"
const anonKey = "sb_publishable_MjJH0ToRXFTta8k46R4PNw_41r6xuxY"
const serviceKey = "sb_secret_x7-IvVqmdXaNiPdrDDdSGA_hHKyjvXy"

async function testKey(key, label) {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: { "apikey": key, "Authorization": `Bearer ${key}` }
    })
    console.log(`${label}: status ${res.status}`)
  } catch(e) {
    console.log(`${label}: error ${e.message}`)
  }
}

async function createTable() {
  // Try using the service role key via the pg-meta API
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

  // Try the Supabase management API for SQL
  const endpoints = [
    { url: `${supabaseUrl}/rest/v1/rpc/`, method: "POST", label: "RPC" },
    { url: `${supabaseUrl}/pg/v1/sql`, method: "POST", label: "pg" },
  ]

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, {
        method: ep.method,
        headers: {
          "Content-Type": "application/json",
          "apikey": serviceKey,
          "Authorization": `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ query: sql }),
      })
      const text = await res.text()
      console.log(`${ep.label}: ${res.status} - ${text.substring(0, 200)}`)
    } catch(e) {
      console.log(`${ep.label}: error ${e.message}`)
    }
  }
}

async function main() {
  await testKey(anonKey, "anon")
  await testKey(serviceKey, "service")
  await createTable()
}

main()
