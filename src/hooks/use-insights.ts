"use client"
import { useState, useEffect } from "react"
import { getInsights, getInsightById, getUnacknowledgedInsights, acknowledgeInsight, resolveInsight } from "@/api/insights"
import type { AIInsight } from "@/types"

export function useInsights() {
  const [data, setData] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getInsights()
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const acknowledgeInsightAction = async (id: string) => {
    try {
      await acknowledgeInsight(id)
      setData((prev) => prev.map((i) => (i.id === id ? { ...i, acknowledged: true } : i)))
    } catch (err: any) {
      setError(err.message)
    }
  }

  const resolveInsightAction = async (id: string) => {
    try {
      await resolveInsight(id)
      setData((prev) => prev.map((i) => (i.id === id ? { ...i, resolved: true } : i)))
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { data, loading, error, acknowledgeInsight: acknowledgeInsightAction, resolveInsight: resolveInsightAction }
}

export function useInsight(id: string | null) {
  const [data, setData] = useState<AIInsight | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getInsightById(id).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [id])

  return { data, loading }
}

export function useUnacknowledgedInsights() {
  const [data, setData] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUnacknowledgedInsights().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

export function useAcknowledgeInsight() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const acknowledge = async (id: string) => {
    setLoading(true)
    try {
      await acknowledgeInsight(id)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return { acknowledge, loading, error }
}

export function useResolveInsight() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resolve = async (id: string) => {
    setLoading(true)
    try {
      await resolveInsight(id)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return { resolve, loading, error }
}
