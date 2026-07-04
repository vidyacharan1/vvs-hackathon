"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Syringe, Heart, Activity } from "lucide-react"

interface Task {
  id: string
  title: string
  patient: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed"
  dueTime: string
  category: "medication" | "vitals" | "care" | "procedure"
}

const tasks: Task[] = [
  { id: "T001", title: "Administer insulin", patient: "Rajesh Kumar", priority: "high", status: "pending", dueTime: "08:00 AM", category: "medication" },
  { id: "T002", title: "Check blood pressure", patient: "Sunita Sharma", priority: "medium", status: "in-progress", dueTime: "09:30 AM", category: "vitals" },
  { id: "T003", title: "Wound dressing change", patient: "Amit Singh", priority: "high", status: "pending", dueTime: "10:00 AM", category: "care" },
  { id: "T004", title: "Catheter insertion", patient: "Priya Patel", priority: "low", status: "completed", dueTime: "07:00 AM", category: "procedure" },
  { id: "T005", title: "Temperature check", patient: "Vikram Reddy", priority: "low", status: "completed", dueTime: "06:00 AM", category: "vitals" },
  { id: "T006", title: "IV fluid monitoring", patient: "Lakshmi Devi", priority: "medium", status: "in-progress", dueTime: "09:00 AM", category: "medication" },
]

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
}

const categoryIcons: Record<string, React.ReactNode> = {
  medication: <Syringe className="h-4 w-4" />,
  vitals: <Heart className="h-4 w-4" />,
  care: <Activity className="h-4 w-4" />,
  procedure: <AlertCircle className="h-4 w-4" />,
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  "in-progress": <AlertCircle className="h-4 w-4 text-blue-500" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
}

export default function TasksPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter)
  const pendingCount = tasks.filter((t) => t.status !== "completed").length
  const highPriorityCount = tasks.filter((t) => t.priority === "high" && t.status !== "completed").length
  const completedCount = tasks.filter((t) => t.status === "completed").length

  return (
    <div className="space-y-6">
      <PageHeader title="Pending Tasks" description="Track and manage your nursing tasks" icon={ClipboardList}>
        <Button size="sm" className="gap-1.5">
          <CheckCircle2 className="h-4 w-4" />
          Mark All Completed
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5"><Clock className="h-5 w-5 text-amber-600" /></div>
            <div><p className="text-xs text-muted-foreground">Pending Tasks</p><p className="text-2xl font-bold">{pendingCount}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-2.5"><AlertCircle className="h-5 w-5 text-red-600" /></div>
            <div><p className="text-xs text-muted-foreground">High Priority</p><p className="text-2xl font-bold text-red-600">{highPriorityCount}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-green-50 dark:bg-green-950/20 p-2.5"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
            <div><p className="text-xs text-muted-foreground">Completed Today</p><p className="text-2xl font-bold">{completedCount}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Task List</CardTitle>
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
            {filtered.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-xl border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {categoryIcons[task.category]}
                  </div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{task.patient}</span>
                      <span className="text-muted-foreground">•</span>
                      <Badge variant="outline" className={cn("text-xs", priorityColors[task.priority])}>
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due: {task.dueTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-sm">{statusIcons[task.status]}{task.status}</span>
                  <Button variant="ghost" size="sm" className="h-8">
                    {task.status === "completed" ? "View" : "Start"}
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
