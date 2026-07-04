"use client"
import { useState, useEffect } from "react"
import { getPatients, getPatientById, getPatientsByFacility, getHighRiskPatients } from "@/api/patients"
import type { Patient } from "@/types"

export function usePatients() {
  const [data, setData] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPatients()
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

export function usePatient(id: string | null) {
  const [data, setData] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getPatientById(id).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [id])

  return { data, loading }
}

export function usePatientsByFacility(facilityId: string | null) {
  const [data, setData] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!facilityId) {
      setData([])
      return
    }
    setLoading(true)
    getPatientsByFacility(facilityId).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [facilityId])

  return { data, loading }
}

export function useHighRiskPatients() {
  const [data, setData] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHighRiskPatients().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}
