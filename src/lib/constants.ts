export const ROLES = ["district_officer", "doctor", "nurse"] as const

export const ROLE_LABELS: Record<string, string> = {
  district_officer: "District Officer",
  doctor: "Doctor",
  nurse: "Nurse",
}

export const ROLE_ICONS: Record<string, string> = {
  district_officer: "Building2",
  doctor: "Stethoscope",
  nurse: "HeartPulse",
}

export const RISK_LEVELS = ["low", "medium", "high", "critical"] as const

export const FACILITY_TYPES = ["phc", "chc"] as const

export const GENDERS = ["male", "female", "other"] as const

export const ROLE_DASHBOARD_ROUTES: Record<string, string> = {
  district_officer: "/dashboard",
  doctor: "/dashboard/doctor",
  nurse: "/dashboard/nurse",
}
