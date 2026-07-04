import type { Facility, ActionPlan } from "@/types"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/use-store"

function mapFacility(row: any): Facility {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    district: row.district,
    taluka: row.taluka,
    village: row.village,
    overallRisk: row.overall_risk,
    riskScore: row.risk_score,
    todayOPD: row.today_opd,
    weekAvgOPD: row.week_avg_opd,
    doctorsPresent: row.doctors_present,
    doctorsRequired: row.doctors_required,
    nursesPresent: row.nurses_present,
    nursesRequired: row.nurses_required,
    totalBeds: row.total_beds,
    occupiedBeds: row.occupied_beds,
    highRiskPatients: row.high_risk_patients,
    totalPatients: row.total_patients,
    medicineStock: row.medicine_stock,
    medicineRequired: row.medicine_required,
    lastUpdated: row.last_updated || row.created_at,
    coordinates: row.coordinates,
    healthScore: row.health_score,
    doctorAvailability: row.doctor_availability,
    nurseWorkload: row.nurse_workload,
    medicineRisk: row.medicine_risk,
    diseaseRisk: row.disease_risk,
    bedOccupancy: row.bed_occupancy,
    patientRisk: row.patient_risk,
  }
}

export async function getFacilities(): Promise<Facility[]> {
  const { data, error } = await supabase.from("facilities").select("*")
  if (error) throw error
  const facilities = (data || []).map(mapFacility)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return facilities.map((f) => ({
      ...f,
      todayOPD: Math.floor(f.todayOPD * (1 + simulationDay * 0.02)),
      riskScore: Math.min(100, f.riskScore + simulationDay * 0.5),
      occupiedBeds: Math.min(f.totalBeds, Math.floor(f.occupiedBeds * (1 + simulationDay * 0.03))),
      medicineStock: Math.max(0, Math.floor(f.medicineStock * (1 - simulationDay * 0.02))),
    }))
  }
  return facilities
}

export async function getFacilityById(id: string): Promise<Facility | undefined> {
  const { data, error } = await supabase.from("facilities").select("*").eq("id", id).single()
  if (error || !data) return undefined
  const facility = mapFacility(data)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return {
      ...facility,
      todayOPD: Math.floor(facility.todayOPD * (1 + simulationDay * 0.02)),
      riskScore: Math.min(100, facility.riskScore + simulationDay * 0.5),
      occupiedBeds: Math.min(facility.totalBeds, Math.floor(facility.occupiedBeds * (1 + simulationDay * 0.03))),
      medicineStock: Math.max(0, Math.floor(facility.medicineStock * (1 - simulationDay * 0.02))),
    }
  }
  return facility
}

export async function getFacilityRiskRanking(): Promise<{ id: string; name: string; riskScore: number; risk: Facility["overallRisk"]; change: number }[]> {
  const { data, error } = await supabase.from("facilities").select("id, name, risk_score, overall_risk").order("risk_score", { ascending: false }).limit(10)
  if (error) throw error
  return (data || []).map((f) => ({
    id: f.id,
    name: f.name,
    riskScore: f.risk_score,
    risk: f.overall_risk,
    change: Math.floor(Math.random() * 10 - 3),
  }))
}

export async function generateActionPlan(facilityId: string): Promise<ActionPlan> {
  const { data, error } = await supabase.from("facilities").select("*").eq("id", facilityId).single()
  const facility = data ? mapFacility(data) : null

  if (error || !facility) {
    return {
      executiveSummary: "No facility data available.",
      topIssues: [],
      doctorActions: [],
      nurseActions: [],
      medicineActions: [],
      districtActions: [],
      impactForecast: "Unable to generate forecast.",
    }
  }

  return {
    executiveSummary: `${facility.name} faces critical challenges across multiple domains. Risk score of ${facility.riskScore} indicates immediate intervention needed. ${facility.doctorsPresent}/${facility.doctorsRequired} doctors available, ${facility.nursesPresent}/${facility.nursesRequired} nurses present. Medicine stock at ${Math.round((facility.medicineStock / facility.medicineRequired) * 100)}% of requirement. Bed occupancy at ${facility.bedOccupancy}%.`,
    topIssues: [
      { issue: "Doctor shortage", severity: facility.doctorAvailability < 50 ? "critical" : "high", detail: `${facility.doctorsPresent} of ${facility.doctorsRequired} doctors present` },
      { issue: "Medicine stock depletion", severity: facility.medicineRisk > 70 ? "critical" : "high", detail: `Stock at ${Math.round((facility.medicineStock / facility.medicineRequired) * 100)}%` },
      { issue: "High bed occupancy", severity: facility.bedOccupancy > 85 ? "high" : "medium", detail: `${facility.occupiedBeds}/${facility.totalBeds} beds occupied` },
    ],
    doctorActions: [
      { action: "Deploy additional medical officers from district pool", priority: "high" },
      { action: "Implement telemedicine for routine follow-ups", priority: "medium" },
      { action: "Extend OPD hours to manage patient load", priority: "medium" },
    ],
    nurseActions: [
      { action: "Prioritize high-risk patient home visits", priority: "high" },
      { action: "Train community health workers for basic care", priority: "medium" },
      { action: "Implement task-sharing to reduce nurse workload", priority: "high" },
    ],
    medicineActions: [
      { action: "Emergency procurement of critical medicines", priority: "high" },
      { action: "Redistribute stock from low-usage facilities", priority: "medium" },
      { action: "Review and adjust reorder levels", priority: "low" },
    ],
    districtActions: [
      { action: "Release emergency funds for medicine procurement", priority: "high" },
      { action: "Approve temporary staff hiring", priority: "high" },
      { action: "Coordinate with neighboring districts for resource sharing", priority: "medium" },
    ],
    impactForecast: `Without intervention, ${facility.name} risk score is projected to increase by 5-10 points within 2 weeks. Patient outcomes may decline with potential for increased mortality among high-risk patients. Immediate action can stabilize within 72 hours.`,
  }
}
