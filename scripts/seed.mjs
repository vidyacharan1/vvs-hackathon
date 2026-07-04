// Seed script: runs SQL migrations against Supabase
// Usage: node scripts/seed.mjs
// Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local

import https from "https"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

async function loadEnv() {
  try {
    const envPath = resolve(__dirname, "..", ".env.local")
    const content = readFileSync(envPath, "utf-8")
    const env = {}
    for (const line of content.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq > 0) {
        env[trimmed.substring(0, eq).trim()] = trimmed.substring(eq + 1).trim()
      }
    }
    return env
  } catch {
    return {}
  }
}

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
        "apikey": options.apiKey,
        "Authorization": `Bearer ${options.apiKey}`,
        ...options.headers,
      },
    }
    const req = https.request(opts, (res) => {
      let data = ""
      res.on("data", (chunk) => data += chunk)
      res.on("end", () => resolve({ status: res.statusCode, data }))
    })
    req.on("error", reject)
    req.setTimeout(30000, () => { req.destroy(); reject(new Error("timeout")) })
    if (body) req.write(body)
    req.end()
  })
}

async function runSQL(sql, supabaseUrl, serviceKey) {
  const res = await httpsRequest(`${supabaseUrl}/pg/v1/sql`, {
    method: "POST",
    apiKey: serviceKey,
  }, JSON.stringify({ query: sql }))
  return res
}

async function main() {
  const env = await loadEnv()
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local")
    process.exit(1)
  }

  const migrationsDir = resolve(__dirname, "..", "supabase", "migrations")
  const files = ["002_create_all_tables.sql", "003_seed_data.sql"]

  for (const file of files) {
    const filePath = resolve(migrationsDir, file)
    console.log(`Running ${file}...`)
    try {
      const sql = readFileSync(filePath, "utf-8")
      const res = await runSQL(sql, supabaseUrl, serviceKey)
      console.log(`  Status: ${res.status}`)
      if (res.status >= 400) {
        const err = JSON.parse(res.data)
        // Ignore "already exists" errors
        if (!res.data.includes("already exists")) {
          console.error(`  Error: ${res.data.substring(0, 500)}`)
        }
      }
    } catch (err) {
      console.error(`  Failed: ${err.message}`)
    }
  }

  console.log("Done! Seed data inserted.")
}

main()
