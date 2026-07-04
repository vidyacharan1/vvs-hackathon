"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BedDouble, Users, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Ward {
  name: string
  total: number
  occupied: number
  available: number
  status: "good" | "warning" | "critical"
}

const wards: Ward[] = [
  { name: "General Ward", total: 60, occupied: 45, available: 15, status: "good" },
  { name: "ICU", total: 20, occupied: 18, available: 2, status: "critical" },
  { name: "Pediatrics", total: 25, occupied: 18, available: 7, status: "warning" },
  { name: "Maternity", total: 30, occupied: 22, available: 8, status: "warning" },
  { name: "Emergency", total: 15, occupied: 14, available: 1, status: "critical" },
  { name: "Cardiology", total: 20, occupied: 12, available: 8, status: "good" },
]

const recentOccupancy = [
  { day: "Mon", occupancy: 78 },
  { day: "Tue", occupancy: 82 },
  { day: "Wed", occupancy: 85 },
  { day: "Thu", occupancy: 80 },
  { day: "Fri", occupancy: 76 },
  { day: "Sat", occupancy: 72 },
  { day: "Sun", occupancy: 74 },
]

export default function BedManagementPage() {
  const totalBeds = wards.reduce((s, w) => s + w.total, 0)
  const occupiedBeds = wards.reduce((s, w) => s + w.occupied, 0)
  const availableBeds = wards.reduce((s, w) => s + w.available, 0)
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100)

  return (
    <div className="space-y-6">
      <PageHeader title="Bed Management" description="Monitor bed occupancy across all wards" icon={BedDouble} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2.5"><BedDouble className="h-5 w-5 text-blue-600" /></div>
            <div><p className="text-xs text-muted-foreground">Total Beds</p><p className="text-2xl font-bold">{totalBeds}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5"><Users className="h-5 w-5 text-amber-600" /></div>
            <div><p className="text-xs text-muted-foreground">Occupied</p><p className="text-2xl font-bold">{occupiedBeds}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-green-50 dark:bg-green-950/20 p-2.5"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
            <div><p className="text-xs text-muted-foreground">Available</p><p className="text-2xl font-bold text-green-600">{availableBeds}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-2.5"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
            <div><p className="text-xs text-muted-foreground">Occupancy Rate</p><p className="text-2xl font-bold text-red-600">{occupancyRate}%</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Ward Occupancy</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wards.map((ward) => {
                const pct = Math.round((ward.occupied / ward.total) * 100)
                const statusColor = ward.status === "critical" ? "bg-red-500" : ward.status === "warning" ? "bg-amber-500" : "bg-green-500"
                return (
                  <div key={ward.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{ward.name}</span>
                      <span className="text-muted-foreground">{ward.occupied}/{ward.total}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${statusColor}`}
                        />
                      </div>
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        ward.status === "critical" && "border-red-300 text-red-600 dark:border-red-800 dark:text-red-400",
                        ward.status === "warning" && "border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400",
                        ward.status === "good" && "border-green-300 text-green-600 dark:border-green-800 dark:text-green-400",
                      )}>{pct}%</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">7-Day Occupancy Trend</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentOccupancy}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v) => (v != null ? `${v}%` : "")} />
                <Bar dataKey="occupancy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
