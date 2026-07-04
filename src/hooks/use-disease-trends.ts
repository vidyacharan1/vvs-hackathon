"use client"
import { useState, useEffect } from "react"
import { getDiseaseTrends, getDiseaseTrendByName, getActiveDiseaseOutbreaks } from "@/api/disease-trends"
import type { DiseaseTrend } from "@/types"

export function useDiseaseTrends() {
  const [data, setData] = useState<DiseaseTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDiseaseTrends()
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

export function useDiseaseTrend(disease: string | null) {
  const [data, setData] = useState<DiseaseTrend | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!disease) {
      setLoading(false)
      return
    }
    getDiseaseTrendByName(disease).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [disease])

  return { data, loading }
}

export function useActiveDiseaseOutbreaks(threshold = 10) {
  const [data, setData] = useState<DiseaseTrend[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveDiseaseOutbreaks(threshold).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [threshold])

  return { data, loading }
}
