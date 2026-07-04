import type { Doctor, Nurse } from "@/types"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/use-store"

function mapDoctor(row: any): Doctor {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    specialty: row.specialty,
    facilityId: row.facility_id,
    facilityName: row.facility_name,
    present: row.present,
    patientsSeen: row.patients_seen,
    maxCapacity: row.max_capacity,
    pendingReviews: row.pending_reviews,
    workload: row.workload,
    attendance: row.attendance,
    avatar: row.avatar,
    rating: row.rating,
    joinDate: row.join_date,
  }
}

function mapNurse(row: any): Nurse {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    facilityId: row.facility_id,
    facilityName: row.facility_name,
    assignedVillages: row.assigned_villages || [],
    pendingFollowUps: row.pending_follow_ups,
    completedToday: row.completed_today,
    highRiskPatients: row.high_risk_patients,
    totalPatients: row.total_patients,
    workload: row.workload,
    present: row.present,
    avatar: row.avatar,
    rating: row.rating,
  }
}

export async function getDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase.from("doctors").select("*")
  if (error) throw error
  const doctors = (data || []).map(mapDoctor)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return doctors.map((d) => ({
      ...d,
      patientsSeen: Math.floor(d.patientsSeen * (1 + simulationDay * 0.02)),
      workload: Math.min(100, d.workload + simulationDay),
      pendingReviews: d.pendingReviews + Math.floor(simulationDay * 0.5),
    }))
  }
  return doctors
}

export async function getDoctorById(id: string): Promise<Doctor | undefined> {
  const { data, error } = await supabase.from("doctors").select("*").eq("id", id).single()
  if (error || !data) return undefined
  return mapDoctor(data)
}

export async function getDoctorsByFacility(facilityId: string): Promise<Doctor[]> {
  const { data, error } = await supabase.from("doctors").select("*").eq("facility_id", facilityId)
  if (error) throw error
  return (data || []).map(mapDoctor)
}

export async function getNurses(): Promise<Nurse[]> {
  const { data, error } = await supabase.from("nurses").select("*")
  if (error) throw error
  const nurses = (data || []).map(mapNurse)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return nurses.map((n) => ({
      ...n,
      workload: Math.min(100, n.workload + simulationDay),
      pendingFollowUps: n.pendingFollowUps + Math.floor(simulationDay * 0.5),
    }))
  }
  return nurses
}

export async function getNurseById(id: string): Promise<Nurse | undefined> {
  const { data, error } = await supabase.from("nurses").select("*").eq("id", id).single()
  if (error || !data) return undefined
  return mapNurse(data)
}

export async function getNursesByFacility(facilityId: string): Promise<Nurse[]> {
  const { data, error } = await supabase.from("nurses").select("*").eq("facility_id", facilityId)
  if (error) throw error
  return (data || []).map(mapNurse)
}

export async function getAbsentDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase.from("doctors").select("*").eq("present", false)
  if (error) throw error
  return (data || []).map(mapDoctor)
}

export async function getOverloadedNurses(threshold = 75): Promise<Nurse[]> {
  const { data, error } = await supabase.from("nurses").select("*").gte("workload", threshold)
  if (error) throw error
  return (data || []).map(mapNurse)
}
