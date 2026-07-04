"use client"
import { useState, useEffect } from "react"
import { getDoctors, getDoctorById, getDoctorsByFacility, getNurses, getNurseById, getNursesByFacility, getAbsentDoctors, getOverloadedNurses } from "@/api/staff"
import type { Doctor, Nurse } from "@/types"

export function useDoctors() {
  const [data, setData] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDoctors()
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

export function useDoctor(id: string | null) {
  const [data, setData] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getDoctorById(id).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [id])

  return { data, loading }
}

export function useDoctorsByFacility(facilityId: string | null) {
  const [data, setData] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!facilityId) {
      setData([])
      return
    }
    setLoading(true)
    getDoctorsByFacility(facilityId).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [facilityId])

  return { data, loading }
}

export function useNurses() {
  const [data, setData] = useState<Nurse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getNurses()
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

export function useNurse(id: string | null) {
  const [data, setData] = useState<Nurse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getNurseById(id).then((result) => {
      setData(result || null)
      setLoading(false)
    })
  }, [id])

  return { data, loading }
}

export function useNursesByFacility(facilityId: string | null) {
  const [data, setData] = useState<Nurse[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!facilityId) {
      setData([])
      return
    }
    setLoading(true)
    getNursesByFacility(facilityId).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [facilityId])

  return { data, loading }
}

export function useAbsentDoctors() {
  const [data, setData] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAbsentDoctors().then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

export function useOverloadedNurses(threshold = 75) {
  const [data, setData] = useState<Nurse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOverloadedNurses(threshold).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [threshold])

  return { data, loading }
}
