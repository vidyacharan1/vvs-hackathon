import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createAdminClient } from "@/lib/supabase"

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/login(.*)", "/onboarding(.*)"])

const VALID_ROLES = ["district_officer", "doctor", "nurse"] as const

const ROLE_DASHBOARD_ROUTES: Record<string, string> = {
  district_officer: "/dashboard",
  doctor: "/dashboard/doctor",
  nurse: "/dashboard/nurse",
}

const DASHBOARD_ROLE_MAP: Record<string, string> = {
  "/dashboard": "district_officer",
  "/dashboard/doctor": "doctor",
  "/dashboard/nurse": "nurse",
}

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { pathname } = request.nextUrl

  if (isPublicRoute(request) || pathname.startsWith("/api/auth") || pathname.startsWith("/api/clerk")) {
    return NextResponse.next()
  }

  const authObj = await auth.protect()
  const { userId, sessionClaims } = authObj

  const claims = sessionClaims as Record<string, unknown> | null
  let role = (claims?.role as string) || ((claims?.publicMetadata as Record<string, unknown>)?.role as string)

  if (!role || !VALID_ROLES.includes(role as typeof VALID_ROLES[number])) {
    const sb = createAdminClient()
    if (sb) {
      const { data } = await sb.from("profiles").select("role").eq("clerk_id", userId).single()
      role = data?.role || ""
    }
  }

  if (!role || !VALID_ROLES.includes(role as typeof VALID_ROLES[number])) {
    try {
      const client = await clerkClient()
      const user = await client.users.getUser(userId)
      role = (user.publicMetadata?.role as string) || ""
    } catch {
      role = ""
    }
    if (!role || !VALID_ROLES.includes(role as typeof VALID_ROLES[number])) {
      return NextResponse.redirect(new URL("/onboarding/role", request.url))
    }
  }

  const requiredRole = Object.entries(DASHBOARD_ROLE_MAP).find(([prefix]) =>
    pathname === prefix || pathname.startsWith(prefix + "/")
  )?.[1]

  if (requiredRole && role !== requiredRole) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD_ROUTES[role] || "/dashboard", request.url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("X-User-Role", role)
  requestHeaders.set("X-User-Id", userId)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
})

export const config = {
  matcher: ["/((?!_next|_next/static|_next/image|favicon.ico|logo.png).*)"],
}
