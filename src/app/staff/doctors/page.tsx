"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDoctors } from "@/hooks/use-staff"
import { PageHeader } from "@/components/layout/page-header"
import { DoctorTable } from "@/components/staff/doctor-table"
import { StaffDrawer } from "@/components/staff/staff-drawer"
import { AddDoctorDialog } from "@/components/staff/add-doctor-dialog"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Users, Clock, TrendingUp, Plus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Doctor } from "@/types"
import { useStore } from "@/store/use-store"

export default function DoctorsPage() {
  const { data: doctors, loading } = useDoctors()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const role = useStore((s) => s.role)

  if (loading) return <LoadingSkeleton type="table" />

  const totalDoctors = doctors?.length || 0
  const presentDoctors = doctors?.filter((d) => d.present).length || 0
  const avgWorkload = Math.round(doctors?.reduce((sum, d) => sum + d.workload, 0) / (doctors?.length || 1))

  const specialtyData = Object.entries(
    (doctors || []).reduce((acc, d) => {
      acc[d.specialty] = (acc[d.specialty] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor CRM"
        description={`${totalDoctors} doctors across all facilities`}
        icon={Stethoscope}
      >
        {role === "district_officer" && (
          <Button variant="default" size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </Button>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2.5">
              <Stethoscope className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Doctors</p>
              <p className="text-2xl font-bold">{totalDoctors}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-2.5">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Present Today</p>
              <p className="text-2xl font-bold">
                {presentDoctors}
                <span className="text-sm text-muted-foreground font-normal">/{totalDoctors}</span>
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
              <p className="text-xs text-muted-foreground">Pending Reviews</p>
              <p className="text-2xl font-bold">
                {doctors?.reduce((s, d) => s + d.pendingReviews, 0) || 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 dark:bg-purple-950/20 p-2.5">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Workload</p>
              <p className="text-2xl font-bold">
                {avgWorkload}
                <span className="text-sm text-muted-foreground font-normal">%</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Doctor Distribution" subtitle="By specialty">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Quick Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Absent Today</span>
                  <span className="font-medium text-red-600">{totalDoctors - presentDoctors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">At Capacity</span>
                  <span className="font-medium">{doctors?.filter((d) => d.workload >= 80).length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Under Capacity</span>
                  <span className="font-medium">{doctors?.filter((d) => d.workload < 50).length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Attendance</span>
                  <span className="font-medium">
                    {Math.round(doctors?.reduce((s, d) => s + d.attendance, 0) / (doctors?.length || 1))}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DoctorTable data={doctors || []} onSelect={(doctor) => setSelectedDoctor(doctor)} />
      </motion.div>

      <StaffDrawer
        staff={selectedDoctor}
        type="doctor"
        open={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />

      <AddDoctorDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={() => window.location.reload()} />
    </div>
  )
}
