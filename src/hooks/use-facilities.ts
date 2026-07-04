"use client"
import { useState, useEffect } from "react"
import { getFacilities, getFacilityById, getFacilityRiskRanking, generateActionPlan } from "@/api/facilities"
import type { Facility, ActionPlan } from "@/types"

export function useFacilities() {
  const [data, setData] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getFacilities()
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

export function useFacility(id: string | null) {
  const [data, setData] = useState<Facility | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getFacilityById(id).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [id])

  return { data, loading }
}

export function useFacilityRiskRanking() {
  const [data, setData] = useState<{ id: string; name: string; riskScore: number; risk: Facility["overallRisk"]; change: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFacilityRiskRanking().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

export function useActionPlan(facilityId: string | null) {
  const [data, setData] = useState<ActionPlan | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!facilityId) {
      setData(null)
      return
    }
    setLoading(true)
    generateActionPlan(facilityId).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [facilityId])

  return { data, loading }
}
