import type { AIInsight } from "@/types"
import { supabase } from "@/lib/supabase"

function mapInsight(row: any): AIInsight {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description || "",
    recommendation: row.recommendation || "",
    severity: row.severity,
    timestamp: row.timestamp || row.created_at,
    acknowledged: row.acknowledged,
    resolved: row.resolved,
  }
}

export async function getInsights(): Promise<AIInsight[]> {
  const { data, error } = await supabase.from("ai_insights").select("*").order("created_at", { ascending: false })
  if (error) throw error
  return (data || []).map(mapInsight)
}

export async function getInsightById(id: string): Promise<AIInsight | undefined> {
  const { data, error } = await supabase.from("ai_insights").select("*").eq("id", id).single()
  if (error || !data) return undefined
  return mapInsight(data)
}

export async function getUnacknowledgedInsights(): Promise<AIInsight[]> {
  const { data, error } = await supabase.from("ai_insights").select("*").eq("acknowledged", false).order("created_at", { ascending: false })
  if (error) throw error
  return (data || []).map(mapInsight)
}

export async function acknowledgeInsight(id: string): Promise<AIInsight | undefined> {
  const { data, error } = await supabase.from("ai_insights").update({ acknowledged: true }).eq("id", id).select().single()
  if (error || !data) return undefined
  return mapInsight(data)
}

export async function resolveInsight(id: string): Promise<AIInsight | undefined> {
  const { data, error } = await supabase.from("ai_insights").update({ resolved: true }).eq("id", id).select().single()
  if (error || !data) return undefined
  return mapInsight(data)
}
