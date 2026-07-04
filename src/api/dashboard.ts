import type { DashboardSummary } from "@/types"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/use-store"

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const { simulationDay } = useStore.getState()

  const { data: facilities } = await supabase.from("facilities").select("id, name, type, overall_risk, risk_score, occupied_beds, total_beds, doctors_present, doctors_required, nurses_present, nurses_required, medicine_stock, medicine_required, high_risk_patients, today_opd, week_avg_opd")
  const { data: medicines } = await supabase.from("medicines").select("risk, days_left")
  const { data: diseaseTrends } = await supabase.from("disease_trends").select("disease, current_week, previous_week, change, risk")
  const { data: alerts } = await supabase.from("alerts").select("*").eq("acknowledged", false)
  const { data: patients } = await supabase.from("patients").select("risk")

  const facilityList = facilities || []
  const medicineList = medicines || []
  const diseaseList = diseaseTrends || []
  const alertList = alerts || []
  const patientList = patients || []

  const totalFacilities = facilityList.length
  const criticalFacilities = facilityList.filter((f) => f.overall_risk === "critical" || f.overall_risk === "high").length
  const medicineAlerts = medicineList.filter((m) => m.risk === "critical" || m.risk === "high").length
  const doctorAbsence = facilityList.filter((f) => f.doctors_present < f.doctors_required).length
  const nurseOverload = facilityList.filter((f) => f.nurses_present < f.nurses_required).length
  const diseaseAlerts = diseaseList.filter((d) => d.risk === "critical" || d.risk === "high").length
  const bedPressure = facilityList.filter((f) => f.occupied_beds / Math.max(f.total_beds, 1) > 0.85).length
  const highRiskPatients = patientList.filter((p) => p.risk === "high" || p.risk === "critical").length

  const lowCount = facilityList.filter((x) => x.overall_risk === "low").length
  const mediumCount = facilityList.filter((x) => x.overall_risk === "medium").length
  const highCount = facilityList.filter((x) => x.overall_risk === "high").length
  const criticalCount = facilityList.filter((x) => x.overall_risk === "critical").length

  const facilityRiskTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dayFactor = 1 - (6 - i) * 0.02
    return {
      date: d.toISOString().split("T")[0],
      low: Math.round(lowCount * dayFactor),
      medium: Math.round(mediumCount * dayFactor),
      high: Math.round(highCount * dayFactor),
      critical: Math.round(criticalCount * dayFactor),
    }
  })

  const totalStock = medicineList.reduce((s, m) => s + (m.days_left || 0), 0)
  const medicineStockTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dayFactor = 1 + (6 - i) * 0.03
    return {
      date: d.toISOString().split("T")[0],
      stock: Math.round(totalStock * dayFactor),
      required: Math.round(totalStock * 1.3 * dayFactor),
    }
  })

  const opdSum = facilityList.reduce((s, f) => s + (f.today_opd || 0), 0)
  const patientVisits = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dayFactor = 1 + (6 - i) * 0.05
    return {
      date: d.toISOString().split("T")[0],
      opd: Math.round(opdSum * dayFactor),
      ipd: Math.round(opdSum * 0.15 * dayFactor),
    }
  })

  const diseaseCases = diseaseList.map((d) => ({
    disease: d.disease,
    cases: d.current_week || 0,
    change: d.change || 0,
  }))

  const facilityRiskRanking = facilityList
    .sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0))
    .slice(0, 10)
    .map((f) => ({
      id: f.id,
      name: f.name,
      riskScore: f.risk_score || 0,
      risk: f.overall_risk,
      change: Math.floor(Math.random() * 10 - 3),
    }))

  const recentAlerts = alertList.slice(0, 5).map((a: any) => ({
    id: a.id,
    type: a.type,
    severity: a.severity,
    title: a.title,
    description: a.description || "",
    facilityId: a.facility_id || "",
    facilityName: a.facility_name || "",
    timestamp: a.timestamp || a.created_at,
    acknowledged: a.acknowledged,
    resolved: a.resolved,
  }))

  const topCriticalFacilities = facilityList
    .filter((f) => f.overall_risk === "critical" || f.overall_risk === "high")
    .slice(0, 5)
    .map((f: any) => ({
      id: f.id,
      name: f.name,
      type: f.type,
      riskScore: f.risk_score || 0,
      risk: f.overall_risk,
      bedOccupancy: f.total_beds > 0 ? Math.round((f.occupied_beds / f.total_beds) * 100) : 0,
      doctorAvailability: f.doctors_required > 0 ? Math.round((f.doctors_present / f.doctors_required) * 100) : 0,
    }))

  const summary: DashboardSummary = {
    totalFacilities,
    criticalFacilities,
    medicineAlerts,
    doctorAbsence,
    nurseOverload,
    diseaseAlerts,
    bedPressure,
    highRiskPatients,
    facilityRiskTrend,
    medicineStockTrend,
    patientVisits,
    diseaseCases,
    facilityRiskRanking,
    recentAlerts,
    topCriticalFacilities,
  }

  if (simulationDay > 0) {
    const modifier = 1 + simulationDay * 0.03
    return {
      ...summary,
      criticalFacilities: Math.min(Math.floor(summary.criticalFacilities * modifier), summary.totalFacilities),
      medicineAlerts: Math.floor(summary.medicineAlerts * modifier),
      diseaseAlerts: Math.floor(summary.diseaseAlerts * modifier),
      highRiskPatients: Math.floor(summary.highRiskPatients * modifier),
      bedPressure: Math.floor(summary.bedPressure * modifier),
      nurseOverload: Math.floor(summary.nurseOverload * modifier),
    }
  }

  return summary
}

export async function getFacilityRiskTrend(): Promise<DashboardSummary["facilityRiskTrend"]> {
  const { data } = await supabase.from("facilities").select("overall_risk")
  const facilities = data || []
  const trend = [{
    date: new Date().toISOString().split("T")[0],
    low: facilities.filter((f) => f.overall_risk === "low").length,
    medium: facilities.filter((f) => f.overall_risk === "medium").length,
    high: facilities.filter((f) => f.overall_risk === "high").length,
    critical: facilities.filter((f) => f.overall_risk === "critical").length,
  }]

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    const last = trend[trend.length - 1]
    for (let i = 1; i <= simulationDay; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      trend.push({
        date: date.toISOString().split("T")[0],
        low: Math.max(0, last.low - Math.floor(i * 0.5)),
        medium: last.medium,
        high: last.high + Math.floor(i * 0.5),
        critical: Math.min(last.critical + Math.floor(i * 0.3), facilities.length),
      })
    }
  }
  return trend
}

export async function getMedicineStockTrend(): Promise<DashboardSummary["medicineStockTrend"]> {
  const { data } = await supabase.from("medicines").select("days_left")
  const meds = data || []
  const totalDaysLeft = meds.reduce((s, m) => s + (m.days_left || 0), 0)
  const trend = [{
    date: new Date().toISOString().split("T")[0],
    stock: totalDaysLeft,
    required: Math.round(totalDaysLeft * 1.3),
  }]

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    const last = trend[trend.length - 1]
    for (let i = 1; i <= simulationDay; i++) {
      trend.push({
        date: new Date(Date.now() + i * 86400000).toISOString().split("T")[0],
        stock: Math.max(0, last.stock - Math.floor(i * 300)),
        required: last.required + Math.floor(i * 50),
      })
    }
  }
  return trend
}
