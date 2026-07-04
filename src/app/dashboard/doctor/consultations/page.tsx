"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Video, Calendar } from "lucide-react"

interface Consultation {
  id: string
  patient: string
  type: "follow-up" | "new" | "emergency"
  status: "pending" | "in-progress" | "completed"
  time: string
  date: string
}

const consultations: Consultation[] = [
  { id: "C001", patient: "Rajesh Kumar", type: "follow-up", status: "pending", time: "09:00 AM", date: "Today" },
  { id: "C002", patient: "Sunita Sharma", type: "new", status: "pending", time: "10:30 AM", date: "Today" },
  { id: "C003", patient: "Amit Singh", type: "emergency", status: "in-progress", time: "11:45 AM", date: "Today" },
  { id: "C004", patient: "Priya Patel", type: "follow-up", status: "completed", time: "08:00 AM", date: "Today" },
  { id: "C005", patient: "Vikram Reddy", type: "follow-up", status: "pending", time: "02:00 PM", date: "Today" },
  { id: "C006", patient: "Lakshmi Devi", type: "new", status: "completed", time: "Yesterday", date: "Yesterday" },
]

const typeColors: Record<string, string> = {
  "follow-up": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "new": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "emergency": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
}

const statusIcons: Record<string, React.ReactNode> = {
  "pending": <Clock className="h-4 w-4 text-amber-500" />,
  "in-progress": <AlertCircle className="h-4 w-4 text-blue-500" />,
  "completed": <CheckCircle2 className="h-4 w-4 text-green-500" />,
}

export default function ConsultationsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  const filtered = filter === "all" ? consultations : consultations.filter((c) => c.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader title="Consultations" description="Manage your patient consultations" icon={ClipboardList}>
        <Button size="sm" className="gap-1.5">
          <Video className="h-4 w-4" />
          Start Teleconsultation
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{consultations.filter((c) => c.status === "pending").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2.5">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">{consultations.filter((c) => c.status === "in-progress").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-green-50 dark:bg-green-950/20 p-2.5">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-bold">{consultations.filter((c) => c.status === "completed").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Today&apos;s Consultations</CardTitle>
          <div className="flex items-center gap-2">
            {["all", "pending", "in-progress", "completed"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setFilter(f as typeof filter)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-xl border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {c.patient.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium">{c.patient}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className={cn("text-xs", typeColors[c.type])}>
                        {c.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{c.date} • {c.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-sm">{statusIcons[c.status]}{c.status}</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
