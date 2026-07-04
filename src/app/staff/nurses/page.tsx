"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNurses } from "@/hooks/use-staff"
import { PageHeader } from "@/components/layout/page-header"
import { NurseTable } from "@/components/staff/nurse-table"
import { StaffDrawer } from "@/components/staff/staff-drawer"
import { AddNurseDialog } from "@/components/staff/add-nurse-dialog"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HandHeart, Users, Clock, AlertTriangle, TrendingUp, Plus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Nurse } from "@/types"
import { useStore } from "@/store/use-store"

export default function NursesPage() {
  const { data: nurses, loading } = useNurses()
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const role = useStore((s) => s.role)

  if (loading) return <LoadingSkeleton type="table" />

  const totalNurses = nurses?.length || 0
  const onDuty = nurses?.filter((n) => n.present).length || 0
  const totalPending = nurses?.reduce((s, n) => s + n.pendingFollowUps, 0) || 0
  const totalHighRisk = nurses?.reduce((s, n) => s + n.highRiskPatients, 0) || 0

  const facilityData = Object.entries(
    (nurses || []).reduce((acc, n) => {
      acc[n.facilityName] = (acc[n.facilityName] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nurse CRM"
        description={`${totalNurses} nurses across all facilities`}
        icon={HandHeart}
      >
        <div className="flex items-center gap-2">
          {role === "district_officer" && (
            <Button variant="default" size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Nurse
            </Button>
          )}
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            AI Priority Plan
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-pink-50 dark:bg-pink-950/20 p-2.5">
              <HandHeart className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Nurses</p>
              <p className="text-2xl font-bold">{totalNurses}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-2.5">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">On Duty</p>
              <p className="text-2xl font-bold">
                {onDuty}
                <span className="text-sm text-muted-foreground font-normal">/{totalNurses}</span>
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Follow-ups</p>
              <p className="text-2xl font-bold text-amber-600">{totalPending}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-2.5">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">High Risk Patients</p>
              <p className="text-2xl font-bold text-red-600">{totalHighRisk}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Nurse Distribution" subtitle="By facility">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Workload Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overloaded (&gt;80%)</span>
                  <span className="font-medium text-red-600">
                    {nurses?.filter((n) => n.workload >= 80).length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Moderate (50-80%)</span>
                  <span className="font-medium text-amber-600">
                    {nurses?.filter((n) => n.workload >= 50 && n.workload < 80).length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Underloaded (&lt;50%)</span>
                  <span className="font-medium text-emerald-600">
                    {nurses?.filter((n) => n.workload < 50).length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Completed Today</span>
                  <span className="font-medium">
                    {Math.round(nurses?.reduce((s, n) => s + n.completedToday, 0) / (nurses?.length || 1))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <NurseTable data={nurses || []} onSelect={(nurse) => setSelectedNurse(nurse)} />
      </motion.div>

      <StaffDrawer
        staff={selectedNurse}
        type="nurse"
        open={!!selectedNurse}
        onClose={() => setSelectedNurse(null)}
      />

      <AddNurseDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={() => window.location.reload()} />
    </div>
  )
}
