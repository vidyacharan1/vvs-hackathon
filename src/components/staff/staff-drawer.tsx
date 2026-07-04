"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Stethoscope,
  HandHeart,
  CalendarDays,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  MapPin,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import type { Doctor, Nurse } from "@/types"

interface StaffDrawerProps {
  staff: Doctor | Nurse | null
  type: "doctor" | "nurse"
  open: boolean
  onClose: () => void
}

const ATTENDANCE_COLORS = ["#22c55e", "#eab308", "#ef4444"]

export function StaffDrawer({ staff, type, open, onClose }: StaffDrawerProps) {
  const isDoctor = type === "doctor"
  const isNurse = type === "nurse"

  const attendanceData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days.map((day, i) => ({
      day,
      present: Math.floor(60 + Math.random() * 35),
      absent: Math.floor(Math.random() * 10 + 5),
    }))
  }, [])

  const workloadData = useMemo(() => {
    if (!staff) return []
    const categories = isDoctor
      ? ["Patient Care", "Reviews", "Admin", "Meetings"]
      : ["Field Visits", "Follow-ups", "Reports", "Training"]
    return categories.map((name, i) => ({
      name,
      hours: Math.floor(4 + Math.random() * 8),
      fill: ["#3b82f6", "#22c55e", "#eab308", "#ef4444"][i],
    }))
  }, [staff, isDoctor])

  if (!staff) return null

  const workloadColor =
    staff.workload >= 80
      ? "text-red-600 [&>div]:bg-red-500"
      : staff.workload >= 50
        ? "text-amber-600 [&>div]:bg-amber-500"
        : "text-emerald-600 [&>div]:bg-emerald-500"

  const initials = staff.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <>
      {/* Desktop: Slide-in panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-lg border-l bg-background shadow-2xl hidden md:block"
          >
            <div className="flex h-full flex-col">
              <DrawerHeader staff={staff} type={type} initials={initials} onClose={onClose} />
              <ScrollArea className="flex-1">
                <DrawerContent
                  staff={staff}
                  isDoctor={isDoctor}
                  isNurse={isNurse}
                  attendanceData={attendanceData}
                  workloadData={workloadData}
                  workloadColor={workloadColor}
                />
              </ScrollArea>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile: Dialog overlay */}
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="sm:max-w-lg md:hidden max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-muted">
                <AvatarImage src={staff.avatar} alt={staff.name} />
                <AvatarFallback
                  className={cn(
                    "text-sm font-medium",
                    isDoctor
                      ? "bg-primary/10 text-primary"
                      : "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
                  )}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-lg">{staff.name}</DialogTitle>
                <DialogDescription>
                  {isDoctor ? (staff as Doctor).specialty : `${(staff as Nurse).assignedVillages.length} villages`}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DrawerContent
            staff={staff}
            isDoctor={isDoctor}
            isNurse={isNurse}
            attendanceData={attendanceData}
            workloadData={workloadData}
            workloadColor={workloadColor}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

function DrawerHeader({
  staff,
  type,
  initials,
  onClose,
}: {
  staff: Doctor | Nurse
  type: "doctor" | "nurse"
  initials: string
  onClose: () => void
}) {
  const isDoctor = type === "doctor"
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-muted">
          <AvatarImage src={staff.avatar} alt={staff.name} />
          <AvatarFallback
            className={cn(
              "text-base font-medium",
              isDoctor
                ? "bg-primary/10 text-primary"
                : "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
            )}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{staff.name}</h2>
          <p className="text-sm text-muted-foreground">
            {isDoctor ? (staff as Doctor).specialty : `Nurse - ${(staff as Nurse).assignedVillages.length} villages`}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9 rounded-xl">
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}

function DrawerContent({
  staff,
  isDoctor,
  isNurse,
  attendanceData,
  workloadData,
  workloadColor,
}: {
  staff: Doctor | Nurse
  isDoctor: boolean
  isNurse: boolean
  attendanceData: { day: string; present: number; absent: number }[]
  workloadData: { name: string; hours: number; fill: string }[]
  workloadColor: string
}) {
  return (
    <div className="space-y-5 p-6">
      {/* Status & Role */}
      <div className="flex items-center gap-3">
        <Badge
          variant={staff.present ? "success" : "destructive"}
          className="text-xs font-medium"
        >
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full mr-1.5",
              staff.present ? "bg-emerald-500" : "bg-red-500"
            )}
          />
          {staff.present ? "Present" : "Absent"}
        </Badge>
        <Badge variant="outline" className="text-xs font-medium">
          {isDoctor ? "Doctor" : "Nurse"}
        </Badge>
        {isDoctor && (
          <Badge variant="secondary" className="text-xs font-medium">
            {(staff as Doctor).rating} ★
          </Badge>
        )}
        {isNurse && (
          <Badge variant="secondary" className="text-xs font-medium">
            {(staff as Nurse).rating} ★
          </Badge>
        )}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {isDoctor ? (
          <>
            <MetricCard
              icon={Users}
              label="Patients Seen"
              value={String((staff as Doctor).patientsSeen)}
              sub={`Capacity: ${(staff as Doctor).maxCapacity}`}
              color="blue"
            />
            <MetricCard
              icon={FileText}
              label="Pending Reviews"
              value={String((staff as Doctor).pendingReviews)}
              color="amber"
            />
            <MetricCard
              icon={CalendarDays}
              label="Attendance"
              value={`${(staff as Doctor).attendance}%`}
              color="emerald"
            />
            <MetricCard
              icon={TrendingUp}
              label="Workload"
              value={`${staff.workload}%`}
              color={staff.workload >= 80 ? "red" : staff.workload >= 50 ? "amber" : "emerald"}
            />
          </>
        ) : (
          <>
            <MetricCard
              icon={CheckCircle2}
              label="Completed Today"
              value={String((staff as Nurse).completedToday)}
              color="emerald"
            />
            <MetricCard
              icon={Clock}
              label="Pending Follow-ups"
              value={String((staff as Nurse).pendingFollowUps)}
              color="amber"
            />
            <MetricCard
              icon={AlertTriangle}
              label="High Risk Patients"
              value={String((staff as Nurse).highRiskPatients)}
              color="red"
            />
            <MetricCard
              icon={TrendingUp}
              label="Workload"
              value={`${staff.workload}%`}
              color={staff.workload >= 80 ? "red" : staff.workload >= 50 ? "amber" : "emerald"}
            />
          </>
        )}
      </div>

      {/* Workload Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Workload</span>
          <span className={cn("text-sm font-bold", workloadColor.split(" ")[0])}>
            {staff.workload}%
          </span>
        </div>
        <Progress value={staff.workload} className={cn("h-2.5", workloadColor)} />
      </div>

      <Separator />

      {/* Attendance Chart */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          7-Day Attendance
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--popover))",
                }}
              />
              <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Separator />

      {/* Workload Distribution */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Workload Distribution
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={workloadData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                dataKey="hours"
              >
                {workloadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--popover))",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Separator />

      {/* Patient List (Doctor) / High Risk (Nurse) */}
      {isDoctor && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Patient Assignment
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Currently managing patient load at {(staff as Doctor).facilityName}.
          </p>
          <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl">
            <span className="text-muted-foreground">Patients Seen</span>
            <span className="font-semibold">{(staff as Doctor).patientsSeen}</span>
          </div>
          <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl mt-2">
            <span className="text-muted-foreground">Max Capacity</span>
            <span className="font-semibold">{(staff as Doctor).maxCapacity}</span>
          </div>
          <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl mt-2">
            <span className="text-muted-foreground">Pending Reviews</span>
            <span className="font-semibold">{(staff as Doctor).pendingReviews}</span>
          </div>
        </div>
      )}

      {isNurse && (
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Assigned Villages
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(staff as Nurse).assignedVillages.map((v) => (
              <Badge key={v} variant="secondary" className="text-xs font-normal">
                <MapPin className="h-2.5 w-2.5 mr-1" />
                {v}
              </Badge>
            ))}
          </div>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            High Risk Patients
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {(staff as Nurse).highRiskPatients} patients requiring urgent attention.
          </p>
          <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl">
            <span className="text-muted-foreground">Total Patients</span>
            <span className="font-semibold">{(staff as Nurse).totalPatients}</span>
          </div>
          <div className="flex items-center justify-between text-sm p-3 bg-muted/40 rounded-xl mt-2">
            <span className="text-muted-foreground">Completed Today</span>
            <span className="font-semibold">{(staff as Nurse).completedToday}</span>
          </div>
        </div>
      )}

      <Separator />

      {/* AI Priority Plan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-100 dark:bg-blue-900/30 p-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              AI Priority Plan
            </h3>
            <p className="text-xs text-blue-700/70 dark:text-blue-400/70 leading-relaxed">
              {isDoctor
                ? `Schedule suggests prioritizing ${(staff as Doctor).pendingReviews > 10 ? "pending reviews" : "patient consultations"} to optimize daily throughput. Current workload of ${staff.workload}% indicates ${staff.workload >= 80 ? "high stress — consider redistributing non-critical tasks." : "manageable capacity for additional OPD."}`
                : `Field visit optimization recommended for ${(staff as Nurse).assignedVillages.slice(0, 2).join(" and ")}${(staff as Nurse).assignedVillages.length > 2 ? " and other areas" : ""}. ${(staff as Nurse).pendingFollowUps > 10 ? `${(staff as Nurse).pendingFollowUps} pending follow-ups need immediate attention.` : "Follow-up schedule is within manageable limits."}`}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: any
  label: string
  value: string
  sub?: string
  color: "blue" | "emerald" | "amber" | "red" | "purple"
}) {
  const colorMap = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
    red: "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400",
  }
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-2.5">
          <div className={cn("rounded-xl p-2", colorMap[color])}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              {label}
            </p>
            <p className="text-base font-bold leading-tight">{value}</p>
            {sub && <p className="text-[10px] text-muted-foreground truncate">{sub}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
