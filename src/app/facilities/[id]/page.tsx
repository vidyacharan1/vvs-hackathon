"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useFacilities } from "@/hooks/use-facilities"
import { PageHeader } from "@/components/layout/page-header"
import { FacilityDetailHero } from "@/components/facilities/facility-detail-hero"
import { FacilityHealthScores } from "@/components/facilities/facility-health-scores"
import { ChartCard } from "@/components/dashboard/chart-card"
import { ActionPlanCard } from "@/components/insights/action-plan-card"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft, Brain, Users, Stethoscope, HandHeart, Pill,
  Activity, AlertTriangle, Calendar, Download, Share2
} from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { generateActionPlan } from "@/api/facilities"
import type { ActionPlan } from "@/types"

export default function FacilityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: facilities } = useFacilities()
  const facility = facilities?.find(f => f.id === params.id)
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null)
  const [generatingPlan, setGeneratingPlan] = useState(false)

  if (!facility) return <LoadingSkeleton type="detail" />

  const generatePlan = async () => {
    setGeneratingPlan(true)
    const plan = await generateActionPlan(facility.id)
    setActionPlan(plan)
    setGeneratingPlan(false)
  }

  // Mock data for doctor attendance trend
  const doctorAttendanceData = [
    { day: "Mon", present: facility.doctorsPresent, absent: facility.doctorsRequired - facility.doctorsPresent },
    { day: "Tue", present: Math.max(0, facility.doctorsPresent - 1), absent: facility.doctorsRequired - Math.max(0, facility.doctorsPresent - 1) },
    { day: "Wed", present: facility.doctorsPresent, absent: facility.doctorsRequired - facility.doctorsPresent },
    { day: "Thu", present: Math.min(facility.doctorsRequired, facility.doctorsPresent + 1), absent: facility.doctorsRequired - Math.min(facility.doctorsRequired, facility.doctorsPresent + 1) },
    { day: "Fri", present: Math.max(0, facility.doctorsPresent - 2), absent: facility.doctorsRequired - Math.max(0, facility.doctorsPresent - 2) },
    { day: "Sat", present: Math.floor(facility.doctorsPresent / 2), absent: facility.doctorsRequired - Math.floor(facility.doctorsPresent / 2) },
    { day: "Sun", present: Math.floor(facility.doctorsPresent / 3), absent: facility.doctorsRequired - Math.floor(facility.doctorsPresent / 3) },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={facility.name}
        description={`${facility.type === "phc" ? "Primary Health Center" : "Community Health Center"} • ${facility.district} • ${facility.taluka}`}
        onBack={() => router.push("/facilities")}
      >
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </PageHeader>

      {/* Hero Section */}
      <FacilityDetailHero facility={facility} />

      {/* Health Scores Grid */}
      <FacilityHealthScores facility={facility} />

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Doctor Attendance" subtitle="7-day attendance trend">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={doctorAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" name="Present" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Medicine Inventory" subtitle="Stock levels for critical medicines">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { medicine: "Paracetamol", stock: 65, required: 100 },
              { medicine: "Amoxicillin", stock: 30, required: 80 },
              { medicine: "Metformin", stock: 85, required: 60 },
              { medicine: "Amlodipine", stock: 45, required: 70 },
              { medicine: "ORS", stock: 20, required: 90 },
            ]} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis type="number" />
              <YAxis dataKey="medicine" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" name="Current Stock" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="required" name="Required" fill="#f97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Patients Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Patients</span>
                <span className="font-semibold">{facility.totalPatients}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">High Risk</span>
                <Badge variant="destructive">{facility.highRiskPatients}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Today OPD</span>
                <span className="font-semibold">{facility.todayOPD}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">7-Day Avg</span>
                <span className="font-semibold">{facility.weekAvgOPD}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <span className="text-sm">Medicine stock critical</span>
                <Badge variant="critical">Critical</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <span className="text-sm">Doctor shortage</span>
                <Badge variant="high">High</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <span className="text-sm">Dengue cases rising</span>
                <Badge variant="medium">Medium</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Action Plan */}
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-4 w-4" />
              AI Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-blue-100">
              Generate an AI-powered action plan for {facility.name} with recommendations for staffing, medicine, and operations.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-white text-blue-700 hover:bg-blue-50"
              onClick={generatePlan}
              disabled={generatingPlan}
            >
              {generatingPlan ? (
                <>Generating...</>
              ) : (
                <><Brain className="h-5 w-5 mr-2" /> Generate AI Action Plan</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan Result */}
      {actionPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ActionPlanCard plan={actionPlan} />
        </motion.div>
      )}
    </div>
  )
}
