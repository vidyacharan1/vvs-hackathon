"use client"
import { useState, useCallback } from "react"
import { startSimulation, stopSimulation, advanceSimulationDay, getSimulationStatus } from "@/api/simulation"
import type { Alert } from "@/types"

export function useSimulation() {
  const [active, setActive] = useState(false)
  const [day, setDay] = useState(0)
  const [loading, setLoading] = useState(false)
  const [newAlerts, setNewAlerts] = useState<Alert[]>([])

  const start = useCallback(async () => {
    setLoading(true)
    try {
      await startSimulation()
      setActive(true)
      setDay(0)
      setNewAlerts([])
    } finally {
      setLoading(false)
    }
  }, [])

  const stop = useCallback(async () => {
    setLoading(true)
    try {
      await stopSimulation()
      setActive(false)
      setDay(0)
      setNewAlerts([])
    } finally {
      setLoading(false)
    }
  }, [])

  const advance = useCallback(async () => {
    setLoading(true)
    try {
      const result = await advanceSimulationDay()
      setDay(result.day)
      setNewAlerts((prev) => [...prev, ...result.newAlerts])
      return result
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshStatus = useCallback(async () => {
    const status = await getSimulationStatus()
    setActive(status.active)
    setDay(status.day)
    return status
  }, [])

  return {
    active,
    day,
    loading,
    newAlerts,
    start,
    stop,
    advance,
    refreshStatus,
  }
}
