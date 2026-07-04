import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import type { Role } from "@/types"

const VALID_ROLES: Role[] = ["district_officer", "doctor", "nurse"]

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { role } = await request.json()
  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  const client = await clerkClient()
  const clerkUser = await client.users.getUser(userId)
  const name = clerkUser.firstName || clerkUser.emailAddresses[0]?.emailAddress || ""
  const email = clerkUser.emailAddresses[0]?.emailAddress || ""

  await client.users.updateUser(userId, {
    publicMetadata: { role },
  })

  const sb = createAdminClient()
  if (sb) {
    const { error } = await sb.from("profiles").upsert(
      {
        clerk_id: userId,
        email,
        name,
        role,
      },
      { onConflict: "clerk_id" }
    )
    if (error) {
      console.error("Failed to save profile to Supabase:", error)
    }
  }

  return NextResponse.json({ success: true })
}
