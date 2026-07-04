import type { DiseaseTrend } from "@/types"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/use-store"

function mapDiseaseTrend(row: any): DiseaseTrend {
  return {
    disease: row.disease,
    weekData: row.week_data || [],
    currentWeek: row.current_week || 0,
    previousWeek: row.previous_week || 0,
    change: row.change || 0,
    risk: row.risk,
    facilities: row.facilities || [],
    villages: row.villages || [],
    medicineImpact: row.medicine_impact || 0,
  }
}

export async function getDiseaseTrends(): Promise<DiseaseTrend[]> {
  const { data, error } = await supabase.from("disease_trends").select("*")
  if (error) throw error
  const diseaseTrends = (data || []).map(mapDiseaseTrend)

  const { simulationDay } = useStore.getState()
  if (simulationDay > 0) {
    return diseaseTrends.map((dt) => ({
      ...dt,
      currentWeek: Math.floor(dt.currentWeek * (1 + simulationDay * 0.02)),
      weekData: [...dt.weekData, ...Array.from({ length: simulationDay }, (_, i) =>
        Math.floor(dt.currentWeek * (1 + (i + 1) * 0.02))
      )],
    }))
  }
  return diseaseTrends
}

export async function getDiseaseTrendByName(disease: string): Promise<DiseaseTrend | undefined> {
  const { data, error } = await supabase.from("disease_trends").select("*").eq("disease", disease).single()
  if (error || !data) return undefined
  return mapDiseaseTrend(data)
}

export async function getActiveDiseaseOutbreaks(threshold = 10): Promise<DiseaseTrend[]> {
  const { data, error } = await supabase.from("disease_trends").select("*").gt("change", threshold)
  if (error) throw error
  return (data || []).map(mapDiseaseTrend)
}
