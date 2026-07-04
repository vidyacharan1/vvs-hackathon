"use client"
import { useState, useEffect } from "react"
import { getDashboardSummary, getFacilityRiskTrend, getMedicineStockTrend } from "@/api/dashboard"
import type { DashboardSummary } from "@/types"

export function useDashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboardSummary()
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}

export function useFacilityRiskTrend() {
  const [data, setData] = useState<DashboardSummary["facilityRiskTrend"]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFacilityRiskTrend().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

export function useMedicineStockTrend() {
  const [data, setData] = useState<DashboardSummary["medicineStockTrend"]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMedicineStockTrend().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}
