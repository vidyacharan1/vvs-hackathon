"use client"
import { useState, useEffect } from "react"
import { getMedicines, getMedicineById, getMedicinesByFacility, getCriticalMedicines, getLowStockMedicines } from "@/api/inventory"
import type { Medicine } from "@/types"

export function useMedicines() {
  const [data, setData] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getMedicines()
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

export function useMedicine(id: string | null) {
  const [data, setData] = useState<Medicine | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getMedicineById(id).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [id])

  return { data, loading }
}

export function useMedicinesByFacility(facilityId: string | null) {
  const [data, setData] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!facilityId) {
      setData([])
      return
    }
    setLoading(true)
    getMedicinesByFacility(facilityId).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [facilityId])

  return { data, loading }
}

export function useCriticalMedicines() {
  const [data, setData] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCriticalMedicines().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

export function useLowStockMedicines(thresholdDays = 7) {
  const [data, setData] = useState<Medicine[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLowStockMedicines(thresholdDays).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [thresholdDays])

  return { data, loading }
}

export { useMedicines as useInventory }
