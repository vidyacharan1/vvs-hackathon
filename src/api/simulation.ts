import { useStore } from "@/store/use-store"
import { supabase } from "@/lib/supabase"
import type { Alert } from "@/types"

export async function startSimulation(): Promise<void> {
  useStore.getState().setSimulationMode(true)
  useStore.getState().setSimulationDay(0)
}

export async function stopSimulation(): Promise<void> {
  useStore.getState().resetSimulation()
}

export async function advanceSimulationDay(): Promise<{ day: number; newAlerts: Alert[] }> {
  const store = useStore.getState()
  store.advanceSimulation()
  const currentDay = store.simulationDay

  const newAlerts: Alert[] = []

  const { data: criticalFacilities } = await supabase
    .from("facilities")
    .select("id, name, overall_risk")
    .in("overall_risk", ["critical", "high"])

  if (currentDay % 2 === 0 && criticalFacilities && criticalFacilities.length > 0) {
    const fac = criticalFacilities[currentDay % criticalFacilities.length]
    newAlerts.push({
      id: `sim-alert-${currentDay}-${Date.now()}`,
      type: "facility",
      severity: "high",
      title: `Simulation: ${fac.name} Risk Escalating`,
      description: `Day ${currentDay} of simulation: Risk score increasing at ${fac.name}. Resources depleting faster than anticipated.`,
      facilityId: fac.id,
      facilityName: fac.name,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      resolved: false,
    })
  }

  const { data: dengue } = await supabase
    .from("disease_trends")
    .select("disease, current_week")
    .eq("disease", "Dengue")
    .single()

  if (dengue && currentDay % 3 === 0) {
    newAlerts.push({
      id: `sim-disease-${currentDay}-${Date.now()}`,
      type: "disease",
      severity: "high",
      title: `Simulation: Dengue Cases Rising`,
      description: `Projected ${Math.floor(dengue.current_week * (1 + currentDay * 0.05))} cases this week if trend continues.`,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      resolved: false,
    })
  }

  if (currentDay % 4 === 0) {
    const { data: lowStockMed } = await supabase
      .from("medicines")
      .select("id, name, risk, facility_name, facility_id")
      .in("risk", ["critical", "high"])

    if (lowStockMed && lowStockMed.length > 0) {
      const med = lowStockMed[currentDay % lowStockMed.length]
      newAlerts.push({
        id: `sim-med-${currentDay}-${Date.now()}`,
        type: "medicine",
        severity: "critical",
        title: `Simulation: ${med.name} Stock Depleted`,
        description: `${med.name} at ${med.facility_name} has run out. Emergency restocking needed.`,
        facilityId: med.facility_id,
        facilityName: med.facility_name,
        timestamp: new Date().toISOString(),
        acknowledged: false,
        resolved: false,
      })
    }
  }

  if (newAlerts.length > 0) {
    newAlerts.forEach((alert) => store.addNotification(alert))
  }

  return { day: currentDay, newAlerts }
}

export async function getSimulationStatus(): Promise<{
  active: boolean
  day: number
  projectedFacilityRisk: number
  projectedMedicineShortage: number
  projectedDiseaseCases: number
}> {
  const store = useStore.getState()

  const { data: facilities } = await supabase.from("facilities").select("risk_score")
  const { data: medicines } = await supabase.from("medicines").select("days_left")
  const { data: diseaseTrends } = await supabase.from("disease_trends").select("current_week")

  const facilityList = facilities || []
  const medicineList = medicines || []
  const diseaseList = diseaseTrends || []

  const avgRisk = facilityList.reduce((sum, f) => sum + (f.risk_score || 0), 0) / Math.max(facilityList.length, 1)
  const avgMedStock = medicineList.reduce((sum, m) => sum + (m.days_left || 0), 0) / Math.max(medicineList.length, 1)
  const totalDiseaseCases = diseaseList.reduce((sum, d) => sum + (d.current_week || 0), 0)

  return {
    active: store.simulationMode,
    day: store.simulationDay,
    projectedFacilityRisk: Math.round(avgRisk * (1 + store.simulationDay * 0.02)),
    projectedMedicineShortage: Math.round(Math.max(0, avgMedStock - store.simulationDay * 0.5)),
    projectedDiseaseCases: Math.round(totalDiseaseCases * (1 + store.simulationDay * 0.02)),
  }
}
