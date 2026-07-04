import type { Medicine } from "@/types"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/use-store"

function mapMedicine(row: any): Medicine {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    currentStock: row.current_stock,
    averageUsage: row.average_usage,
    daysLeft: row.days_left,
    reorderLevel: row.reorder_level,
    risk: row.risk,
    unit: row.unit,
    facilityId: row.facility_id,
    facilityName: row.facility_name,
    expiryDate: row.expiry_date,
    manufacturer: row.manufacturer,
  }
}

export async function getMedicines(): Promise<Medicine[]> {
  const { data, error } = await supabase.from("medicines").select("*")
  if (error) throw error
  const medicines = (data || []).map(mapMedicine)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return medicines.map((m) => ({
      ...m,
      currentStock: Math.max(0, Math.floor(m.currentStock * (1 - simulationDay * 0.02))),
      daysLeft: Math.max(0, m.daysLeft - Math.floor(simulationDay * 0.5)),
    }))
  }
  return medicines
}

export async function getMedicineById(id: string): Promise<Medicine | undefined> {
  const { data, error } = await supabase.from("medicines").select("*").eq("id", id).single()
  if (error || !data) return undefined
  const medicine = mapMedicine(data)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return {
      ...medicine,
      currentStock: Math.max(0, Math.floor(medicine.currentStock * (1 - simulationDay * 0.02))),
      daysLeft: Math.max(0, medicine.daysLeft - Math.floor(simulationDay * 0.5)),
    }
  }
  return medicine
}

export async function getMedicinesByFacility(facilityId: string): Promise<Medicine[]> {
  const { data, error } = await supabase.from("medicines").select("*").eq("facility_id", facilityId)
  if (error) throw error
  return (data || []).map(mapMedicine)
}

export async function getCriticalMedicines(): Promise<Medicine[]> {
  const { data, error } = await supabase.from("medicines").select("*").in("risk", ["critical", "high"])
  if (error) throw error
  return (data || []).map(mapMedicine)
}

export async function getLowStockMedicines(thresholdDays = 7): Promise<Medicine[]> {
  const { data, error } = await supabase.from("medicines").select("*").lte("days_left", thresholdDays)
  if (error) throw error
  return (data || []).map(mapMedicine)
}

export async function createMedicine(input: {
  name: string
  category: string
  currentStock: number
  averageUsage: number
  reorderLevel: number
  unit: string
  facilityId: string
  facilityName: string
  expiryDate?: string
  manufacturer?: string
}): Promise<Medicine> {
  const daysLeft = input.averageUsage > 0 ? Math.floor(input.currentStock / input.averageUsage) : 999
  const risk: Medicine["risk"] =
    daysLeft <= 7 ? "critical" : daysLeft <= 15 ? "high" : daysLeft <= 30 ? "medium" : "low"

  const { data, error } = await supabase
    .from("medicines")
    .insert({
      name: input.name,
      category: input.category,
      current_stock: input.currentStock,
      average_usage: input.averageUsage,
      days_left: daysLeft,
      reorder_level: input.reorderLevel,
      unit: input.unit,
      facility_id: input.facilityId,
      facility_name: input.facilityName,
      expiry_date: input.expiryDate || null,
      manufacturer: input.manufacturer || null,
      risk,
    })
    .select()
    .single()

  if (error) throw error
  return mapMedicine(data)
}

export async function addStock(
  medicineId: string,
  quantity: number,
): Promise<Medicine> {
  const existing = await getMedicineById(medicineId)
  if (!existing) throw new Error("Medicine not found")

  const newStock = existing.currentStock + quantity
  const daysLeft =
    existing.averageUsage > 0 ? Math.floor(newStock / existing.averageUsage) : 999
  const risk: Medicine["risk"] =
    daysLeft <= 7 ? "critical" : daysLeft <= 15 ? "high" : daysLeft <= 30 ? "medium" : "low"

  const { data, error } = await supabase
    .from("medicines")
    .update({
      current_stock: newStock,
      days_left: daysLeft,
      risk,
    })
    .eq("id", medicineId)
    .select()
    .single()

  if (error) throw error
  return mapMedicine(data)
}
