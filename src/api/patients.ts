import type { Patient } from "@/types"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/use-store"

function mapPatient(row: any): Patient {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    gender: row.gender,
    village: row.village,
    district: row.district,
    conditions: row.conditions || [],
    doctor: row.doctor,
    doctorId: row.doctor_id,
    nurse: row.nurse,
    nurseId: row.nurse_id,
    risk: row.risk,
    lastVisit: row.last_visit,
    nextFollowUp: row.next_follow_up,
    status: row.status,
    phone: row.phone,
    bloodGroup: row.blood_group,
    vitals: row.vitals || [],
    visits: row.visits || [],
    medicines: row.medicines || [],
    timeline: row.timeline || [],
    aiSummary: row.ai_summary,
    tasks: row.tasks || [],
    createdAt: row.created_at,
  }
}

export async function getPatients(): Promise<Patient[]> {
  const { data, error } = await supabase.from("patients").select("*")
  if (error) throw error
  const patients = (data || []).map(mapPatient)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return patients.map((p) => ({
      ...p,
      risk: p.risk === "low" && simulationDay > 3 ? "medium" as const : p.risk,
      vitals: p.vitals.map((v: any) => ({
        ...v,
        bpSystolic: v.bpSystolic + simulationDay,
        bpDiastolic: v.bpDiastolic + Math.floor(simulationDay * 0.5),
        heartRate: v.heartRate + Math.floor(simulationDay * 0.3),
      })),
    }))
  }
  return patients
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  const { data, error } = await supabase.from("patients").select("*").eq("id", id).single()
  if (error || !data) return undefined
  const patient = mapPatient(data)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return {
      ...patient,
      vitals: patient.vitals.map((v: any) => ({
        ...v,
        bpSystolic: v.bpSystolic + simulationDay,
        bpDiastolic: v.bpDiastolic + Math.floor(simulationDay * 0.5),
        heartRate: v.heartRate + Math.floor(simulationDay * 0.3),
      })),
    }
  }
  return patient
}

export async function getPatientsByFacility(facilityId: string): Promise<Patient[]> {
  const allPatients = await getPatients()
  const doctorFacilityMap: Record<string, string> = {
    "doc-001": "fac-001", "doc-002": "fac-002", "doc-003": "fac-004",
    "doc-004": "fac-002", "doc-005": "fac-008", "doc-006": "fac-006",
    "doc-007": "fac-012", "doc-008": "fac-003", "doc-009": "fac-010",
    "doc-010": "fac-014", "doc-011": "fac-005", "doc-012": "fac-008",
    "doc-013": "fac-016", "doc-014": "fac-002", "doc-015": "fac-012",
    "doc-016": "fac-004", "doc-017": "fac-007", "doc-018": "fac-002",
    "doc-019": "fac-014", "doc-020": "fac-009",
  }
  return allPatients.filter((p) => doctorFacilityMap[p.doctorId] === facilityId)
}

export async function getHighRiskPatients(): Promise<Patient[]> {
  const patients = await getPatients()
  return patients.filter((p) => p.risk === "high" || p.risk === "critical")
}
