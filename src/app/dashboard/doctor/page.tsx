"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { useStore } from "@/store/use-store"
import { usePatients } from "@/hooks/use-patients"
import { useFacilities } from "@/hooks/use-facilities"
import { useInventory } from "@/hooks/use-inventory"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "@/components/shared/risk-badge"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ChartCard } from "@/components/dashboard/chart-card"
import {
  Users, Stethoscope, Pill, BedDouble, ClipboardList,
  Calendar, CheckCircle2, Clock, AlertTriangle, Brain,
  FileText, TrendingUp, Activity, ArrowRight, Syringe,
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts"
import { formatDate, cn } from "@/lib/utils"

const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"]

export default function DoctorDashboardPage() {
  const router = useRouter()
  const { user } = useUser()
  const { role } = useStore()
  const { data: patients, loading: patientsLoading } = usePatients()
  const { data: facilities } = useFacilities()
  const { data: medicines } = useInventory()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  if (role !== "doctor") {
    router.push("/dashboard")
    return null
  }

  if (patientsLoading) return <LoadingSkeleton type="dashboard" />

  const todayPatients = patients?.filter(
    (p) => p.visits?.some((v) => v.date === new Date().toISOString().split("T")[0])
  ) || []
  const highRisk = patients?.filter((p) => p.risk === "high" || p.risk === "critical") || []
  const pendingReviews = patients?.filter((p) => p.status === "pending") || []
  const followUps = patients?.filter((p) => {
    const followUp = new Date(p.nextFollowUp)
    const now = new Date()
    return followUp >= now && followUp <= new Date(now.getTime() + 7 * 86400000)
  }) || []

  const totalBeds = facilities?.reduce((s, f) => s + f.totalBeds, 0) || 0
  const occupiedBeds = facilities?.reduce((s, f) => s + f.occupiedBeds, 0) || 0
  const availableBeds = totalBeds - occupiedBeds

  const criticalMedicines = medicines?.filter((m) => m.risk === "critical" || m.daysLeft < 7) || []

  const riskDist = [
    { name: "Low", value: patients?.filter((p) => p.risk === "low").length || 0 },
    { name: "Medium", value: patients?.filter((p) => p.risk === "medium").length || 0 },
    { name: "High", value: patients?.filter((p) => p.risk === "high").length || 0 },
    { name: "Critical", value: patients?.filter((p) => p.risk === "critical").length || 0 },
  ]

  const vitalsSummary = [
    { label: "Heart Rate", value: "72-85", unit: "bpm", icon: Activity, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { label: "SpO2", value: "96-99", unit: "%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "Temperature", value: "36.5", unit: "°C", icon: Activity, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-green-500/10 shadow-sm ring-1 ring-emerald-500/20">
            <Stethoscope className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Doctor Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome, Dr. {user?.fullName || "User"} &middot;{" "}
              {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-xl text-xs">
            <Calendar className="h-3.5 w-3.5" />
            Mark Attendance
          </Button>
          <Button size="sm" className="h-9 gap-1.5 rounded-xl text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/20">
            <FileText className="h-3.5 w-3.5" />
            New Consultation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2.5"><Users className="h-5 w-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Today's Patients</p>
              <p className="text-2xl font-bold">{todayPatients.length}</p>
              <p className="text-[10px] text-muted-foreground">{patients?.length || 0} total assigned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-2.5"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">High Risk Patients</p>
              <p className="text-2xl font-bold text-red-600">{highRisk.length}</p>
              <p className="text-[10px] text-muted-foreground">Requires immediate attention</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5"><Clock className="h-5 w-5 text-amber-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Reviews</p>
              <p className="text-2xl font-bold text-amber-600">{pendingReviews.length}</p>
              <p className="text-[10px] text-muted-foreground">Awaiting consultation</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-2.5"><BedDouble className="h-5 w-5 text-emerald-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Available Beds</p>
              <p className="text-2xl font-bold text-emerald-600">{availableBeds}<span className="text-sm text-muted-foreground font-normal">/{totalBeds}</span></p>
              <p className="text-[10px] text-muted-foreground">Before admission</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">Today's Patient List</CardTitle>
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
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-xs font-bold text-white">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{patient.age}y &middot; {patient.gender}</span>
                          <span>&middot;</span>
                          <span className="capitalize">{patient.conditions.slice(0, 1).join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level={patient.risk} />
                      <Badge variant={patient.status === "active" ? "default" : "secondary"} className="text-[10px]">
                        {patient.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <ChartCard title="Patient Risk Distribution">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={riskDist} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {riskDist.map((_, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-emerald-600" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-xl bg-emerald-50 p-3 text-xs dark:bg-emerald-950/20">
                <p className="font-medium text-emerald-700 dark:text-emerald-300">High BP in 3 patients</p>
                <p className="text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">Consider reviewing antihypertensive prescriptions</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3 text-xs dark:bg-blue-950/20">
                <p className="font-medium text-blue-700 dark:text-blue-300">Seasonal flu spike detected</p>
                <p className="text-blue-600/70 dark:text-blue-400/70 mt-0.5">Stock up on antivirals in your facility</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-xs dark:bg-amber-950/20">
                <p className="font-medium text-amber-700 dark:text-amber-300">Follow-up reminders</p>
                <p className="text-amber-600/70 dark:text-amber-400/70 mt-0.5">{followUps.length} patients due for follow-up this week</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Pill className="h-4 w-4 text-amber-600" />
              Critical Medicine Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalMedicines.slice(0, 5).map((med) => (
                <div key={med.id} className="flex items-center justify-between rounded-xl bg-red-50 p-2.5 dark:bg-red-950/20">
                  <div>
                    <p className="text-sm font-medium">{med.name}</p>
                    <p className="text-xs text-muted-foreground">Stock: {med.currentStock} {med.unit} &middot; {med.daysLeft} days left</p>
                  </div>
                  <Badge variant="destructive" className="text-[10px]">{med.risk}</Badge>
                </div>
              ))}
              {criticalMedicines.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">All medicine stocks are adequate</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ClipboardList className="h-4 w-4 text-blue-600" />
              Upcoming Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {followUps.slice(0, 5).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.conditions.slice(0, 2).join(", ")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{formatDate(patient.nextFollowUp)}</p>
                    <p className="text-[10px] text-muted-foreground">Dr. {patient.doctor}</p>
                  </div>
                </div>
              ))}
              {followUps.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming follow-ups</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Symptom Analyzer</h3>
                <p className="text-sm text-emerald-100">Get AI suggestions based on patient symptoms and medicine availability</p>
              </div>
            </div>
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
              <Syringe className="h-4 w-4 mr-2" />
              Analyze Symptoms
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
