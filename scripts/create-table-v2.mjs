import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bxmgmtscsltyrlykmqmc.supabase.co"
const dummyKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bWdtdHNjc2x0eXJseWttcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5OTk5OTksImV4cCI6MTg1NzU3NTk5OX0.placeholder"

const supabase = createClient(supabaseUrl, dummyKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function main() {
  console.log("Attempting login...")
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "srirampksrirampk@gmail.com",
    password: "123456",
  })
  if (error) {
    console.log("Auth error:", error.message)
    return
  }
  console.log("Logged in as:", data.user?.email)
  console.log("Session token:", data.session?.access_token?.substring(0, 20) + "...")
}

main()
