"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { useStore } from "@/store/use-store"
import { usePatients } from "@/hooks/use-patients"
import { useFacilities } from "@/hooks/use-facilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "@/components/shared/risk-badge"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import {
  HeartPulse, Users, BedDouble, ClipboardList, Activity,
  Thermometer, Droplets, Heart, UserPlus, ArrowRight,
  CheckCircle2, Clock, AlertTriangle, Calendar, Syringe,
  Stethoscope, Pill,
} from "lucide-react"
import { formatDate, cn } from "@/lib/utils"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function NurseDashboardPage() {
  const router = useRouter()
  const { user } = useUser()
  const { role } = useStore()
  const { data: patients, loading: patientsLoading } = usePatients()
  const { data: facilities } = useFacilities()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  if (role !== "nurse") {
    router.push("/dashboard")
    return null
  }

  if (patientsLoading) return <LoadingSkeleton type="dashboard" />

  const activePatients = patients?.filter((p) => p.status === "active") || []
  const highRiskPatients = patients?.filter((p) => p.risk === "high" || p.risk === "critical") || []
  const pendingTasks = patients?.flatMap((p) => p.tasks.filter((t) => !t.completed)) || []

  const totalBeds = facilities?.reduce((s, f) => s + f.totalBeds, 0) || 0
  const occupiedBeds = facilities?.reduce((s, f) => s + f.occupiedBeds, 0) || 0
  const availableBeds = totalBeds - occupiedBeds
  const bedOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0

  const todayAdmissions = patients?.filter((p) => {
    const created = new Date(p.createdAt)
    const today = new Date()
    return created.toDateString() === today.toDateString()
  }) || []

  const pendingVitals = patients?.filter((p) => {
    const lastVital = p.vitals[p.vitals.length - 1]
    if (!lastVital) return true
    const lastVitalDate = new Date(lastVital.date)
    const today = new Date()
    return lastVitalDate.toDateString() !== today.toDateString()
  }) || []

  const bedData = [
    { name: "Occupied", value: occupiedBeds, fill: "#ef4444" },
    { name: "Available", value: availableBeds, fill: "#22c55e" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-purple-500/10 shadow-sm ring-1 ring-pink-500/20">
            <HeartPulse className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Nurse Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome, {user?.fullName || "User"} &middot;{" "}
              {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-xl text-xs">
            <Calendar className="h-3.5 w-3.5" />
            Mark Attendance
          </Button>
          <Button size="sm" className="h-9 gap-1.5 rounded-xl text-xs bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg shadow-pink-500/20">
            <UserPlus className="h-3.5 w-3.5" />
            Register Patient
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2.5"><Users className="h-5 w-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Active Patients</p>
              <p className="text-2xl font-bold">{activePatients.length}</p>
              <p className="text-[10px] text-muted-foreground">{todayAdmissions.length} admitted today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-2.5"><BedDouble className="h-5 w-5 text-emerald-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Bed Occupancy</p>
              <p className="text-2xl font-bold text-emerald-600">{occupiedBeds}<span className="text-sm text-muted-foreground font-normal">/{totalBeds}</span></p>
              <p className="text-[10px] text-muted-foreground">{bedOccupancyRate}% occupied</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5"><ClipboardList className="h-5 w-5 text-amber-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Tasks</p>
              <p className="text-2xl font-bold text-amber-600">{pendingTasks.length}</p>
              <p className="text-[10px] text-muted-foreground">Awaiting your attention</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-2.5"><Activity className="h-5 w-5 text-red-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Vitals Due Today</p>
              <p className="text-2xl font-bold text-red-600">{pendingVitals.length}</p>
              <p className="text-[10px] text-muted-foreground">Patients need checkup</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">Assigned Patients</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => router.push("/patients")}>
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(patients || []).slice(0, 6).map((patient, idx) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-xs font-bold text-white">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{patient.age}y &middot; {patient.gender}</span>
                          <span>&middot;</span>
                          <span>{patient.village}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level={patient.risk} />
                      <div className="flex -space-x-1">
                        {patient.vitals.length > 0 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30" title="Vitals recorded">
                            <Activity className="h-3 w-3 text-emerald-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Bed Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-6 py-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-emerald-600">{availableBeds}</div>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-red-600">{occupiedBeds}</div>
                  <p className="text-xs text-muted-foreground">Occupied</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-gray-600">{totalBeds}</div>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all"
                  style={{ width: `${bedOccupancyRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">{bedOccupancyRate}% occupancy rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-amber-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <UserPlus className="h-3.5 w-3.5 text-blue-600" />
                Register New Patient
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <Activity className="h-3.5 w-3.5 text-emerald-600" />
                Record Vitals
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <BedDouble className="h-3.5 w-3.5 text-purple-600" />
                Manage Beds
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <ArrowRight className="h-3.5 w-3.5 text-amber-600" />
                Discharge Patient
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ClipboardList className="h-4 w-4 text-amber-600" />
              Pending Care Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingTasks.slice(0, 5).map((task) => {
                const patient = patients?.find((p) => p.tasks.some((t) => t.id === task.id))
                return (
                  <div key={task.id} className="flex items-center justify-between rounded-xl bg-amber-50 p-2.5 dark:bg-amber-950/20">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <ClipboardList className="h-3.5 w-3.5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{task.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient?.name || "Unknown"} &middot; Due {formatDate(task.dueDate)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="warning" className="text-[10px]">Pending</Badge>
                  </div>
                )
              })}
              {pendingTasks.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No pending tasks</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <HeartPulse className="h-4 w-4 text-pink-600" />
              Recent Vitals Recorded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(patients || []).filter((p) => p.vitals.length > 0).slice(0, 5).map((patient) => {
                const latest = patient.vitals[patient.vitals.length - 1]
                return (
                  <div key={patient.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>BP: {latest.bpSystolic}/{latest.bpDiastolic}</span>
                          <span>HR: {latest.heartRate}</span>
                          <span>SpO2: {latest.oxygenSaturation}%</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{formatDate(latest.date)}</span>
                  </div>
                )
              })}
              {patients?.filter((p) => p.vitals.length > 0).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No vitals recorded yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-pink-600 to-rose-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Patient Care Reminders</h3>
                <p className="text-sm text-pink-100">{pendingTasks.length} pending tasks &middot; {pendingVitals.length} vitals due today</p>
              </div>
            </div>
            <Button className="bg-white text-pink-700 hover:bg-pink-50">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Tasks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
