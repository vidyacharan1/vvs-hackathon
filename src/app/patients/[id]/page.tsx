"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { usePatients } from "@/hooks/use-patients"
import { PageHeader } from "@/components/layout/page-header"
import { PatientProfileCard } from "@/components/patients/patient-profile-card"
import { PatientTimeline } from "@/components/patients/patient-timeline"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { RiskBadge } from "@/components/shared/risk-badge"
import {
  ArrowLeft, Activity, Pill, ClipboardList, Brain,
  Heart, Thermometer, Droplets, Watch, FileText,
  Calendar, ChevronRight
} from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from "recharts"
import { formatDate } from "@/lib/utils"

export default function PatientProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { data: patients } = usePatients()
  const patient = patients?.find(p => p.id === params.id)

  if (!patient) return <LoadingSkeleton type="detail" />

  // Vitals chart data from patient vitals
  const vitalsChartData = patient.vitals.map(v => ({
    date: formatDate(v.date).slice(0, 6),
    bpSystolic: v.bpSystolic,
    bpDiastolic: v.bpDiastolic,
    heartRate: v.heartRate,
    bloodSugar: v.bloodSugar,
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Profile"
        description={`${patient.name} • ${patient.id}`}
        onBack={() => router.push("/patients")}
      >
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button size="sm">
          <Brain className="h-4 w-4 mr-2" />
          AI Summary
        </Button>
      </PageHeader>

      {/* Profile Header */}
      <PatientProfileCard patient={patient} />

      {/* Main Content with Tabs */}
      <Tabs defaultValue="vitals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Blood Pressure" subtitle="Systolic & Diastolic trend">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vitalsChartData}>
                  <defs>
                    <linearGradient id="bpSysGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                    <linearGradient id="bpDiaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[40, 200]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="bpSystolic" name="Systolic" stroke="#ef4444" fill="url(#bpSysGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="bpDiastolic" name="Diastolic" stroke="#3b82f6" fill="url(#bpDiaGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Heart Rate & Blood Sugar" subtitle="Over time">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalsChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line yAxisId="right" type="monotone" dataKey="bloodSugar" name="Blood Sugar" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Current Vitals Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Heart Rate", value: `${patient.vitals[0]?.heartRate || "--"}`, unit: "bpm", icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" },
              { label: "Blood Pressure", value: `${patient.vitals[0]?.bpSystolic || "--"}/${patient.vitals[0]?.bpDiastolic || "--"}`, unit: "mmHg", icon: Activity, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
              { label: "Temperature", value: `${patient.vitals[0]?.temperature || "--"}`, unit: "°F", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
              { label: "SpO2", value: `${patient.vitals[0]?.oxygenSaturation || "--"}`, unit: "%", icon: Droplets, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
            ].map((vital) => {
              const Icon = vital.icon
              return (
                <Card key={vital.label}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-2 ${vital.bg}`}>
                        <Icon className={`h-5 w-5 ${vital.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{vital.label}</p>
                        <p className="text-xl font-bold">{vital.value} <span className="text-xs font-normal text-muted-foreground">{vital.unit}</span></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits">
          <div className="space-y-4">
            {patient.visits.map((visit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2 mt-1">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{visit.reason}</p>
                          <p className="text-sm text-muted-foreground">{visit.diagnosis}</p>
                          <p className="text-xs text-muted-foreground mt-1">{visit.notes}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">{formatDate(visit.date)}</p>
                        <p className="text-muted-foreground">{visit.doctor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Medicines Tab */}
        <TabsContent value="medicines">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patient.medicines.map((med, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-2">
                      <Pill className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{med.name}</p>
                        <Badge variant="outline">{med.dosage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{med.frequency}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Prescribed: {formatDate(med.prescribedDate)}</span>
                        <span>Until: {formatDate(med.endDate)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <PatientTimeline events={patient.timeline} />
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <div className="space-y-3">
            {patient.tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-1.5 ${task.completed ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-amber-50 dark:bg-amber-950/20"}`}>
                      <ClipboardList className={`h-4 w-4 ${task.completed ? "text-emerald-600" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.description}</p>
                      <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)} • Assigned to: {task.assignedTo}</p>
                    </div>
                  </div>
                  <Badge variant={task.completed ? "success" : "warning"}>
                    {task.completed ? "Completed" : "Pending"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Summary Section */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {patient.aiSummary}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
