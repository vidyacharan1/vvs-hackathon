import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ role: null }, { status: 401 })
  }

  const sb = createAdminClient()
  if (sb) {
    const { data } = await sb.from("profiles").select("role").eq("clerk_id", userId).single()
    if (data?.role) return NextResponse.json({ role: data.role })
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const role = (user.publicMetadata?.role as string) || null
  return NextResponse.json({ role })
}
