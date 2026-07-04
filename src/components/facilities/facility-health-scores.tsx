"use client"

import { motion } from "framer-motion"
import {
  Heart, Stethoscope, HandHeart, Pill, Bug, Bed, Users
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Facility } from "@/types"

interface FacilityHealthScoresProps {
  facility: Facility
  className?: string
}

function getScoreColor(value: number): string {
  if (value >= 80) return "text-red-500"
  if (value >= 60) return "text-orange-500"
  if (value >= 30) return "text-amber-500"
  return "text-green-500"
}

function getProgressColor(value: number): string {
  if (value >= 80) return "[&>div]:bg-red-500"
  if (value >= 60) return "[&>div]:bg-orange-500"
  if (value >= 30) return "[&>div]:bg-amber-500"
  return "[&>div]:bg-green-500"
}

function getProgressBgColor(value: number): string {
  if (value >= 80) return "bg-red-100 dark:bg-red-950/30"
  if (value >= 60) return "bg-orange-100 dark:bg-orange-950/30"
  if (value >= 30) return "bg-amber-100 dark:bg-amber-950/30"
  return "bg-green-100 dark:bg-green-950/30"
}

function getBadgeVariant(value: number): "critical" | "high" | "medium" | "low" {
  if (value >= 80) return "critical"
  if (value >= 60) return "high"
  if (value >= 30) return "medium"
  return "low"
}

function CircularProgress({ value, size = 100 }: { value: number; size?: number }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const color = value >= 80 ? "#ef4444" : value >= 60 ? "#f97316" : value >= 30 ? "#f59e0b" : "#22c55e"

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className={cn("absolute text-xl font-bold", getScoreColor(value))}>
        {Math.round(value)}
      </span>
    </div>
  )
}

interface ScoreCardProps {
  title: string
  value: number
  icon: React.ElementType
  suffix?: string
  badge?: boolean
  progress?: boolean
  circular?: boolean
  index?: number
}

function ScoreCard({ title, value, icon: Icon, suffix = "", badge = false, progress = true, circular = false, index = 0 }: ScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {circular ? (
            <div className="flex justify-center py-2">
              <CircularProgress value={value} />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={cn("text-lg font-bold", getScoreColor(value))}>
                  {value}{suffix}
                </span>
                {badge && (
                  <Badge variant={getBadgeVariant(value)} className="text-[10px]">
                    {value >= 80 ? "Critical" : value >= 60 ? "High" : value >= 30 ? "Medium" : "Low"}
                  </Badge>
                )}
              </div>
              {progress && (
                <Progress
                  value={value}
                  className={cn("h-2", getProgressBgColor(value), getProgressColor(value))}
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function FacilityHealthScores({ facility, className }: FacilityHealthScoresProps) {
  const scores: ScoreCardProps[] = [
    { title: "Health Score", value: facility.healthScore, icon: Heart, circular: true, progress: false, index: 0 },
    { title: "Doctor Availability", value: facility.doctorAvailability, icon: Stethoscope, suffix: "%", index: 1 },
    { title: "Nurse Workload", value: facility.nurseWorkload, icon: HandHeart, suffix: "%", index: 2 },
    { title: "Medicine Risk", value: facility.medicineRisk, icon: Pill, suffix: "%", badge: true, index: 3 },
    { title: "Disease Risk", value: facility.diseaseRisk, icon: Bug, suffix: "%", badge: true, index: 4 },
    { title: "Bed Occupancy", value: facility.bedOccupancy, icon: Bed, suffix: "%", index: 5 },
    { title: "Patient Risk", value: facility.patientRisk, icon: Users, suffix: "%", badge: true, index: 6 },
  ]

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3", className)}>
      {scores.map((score) => (
        <ScoreCard key={score.title} {...score} />
      ))}
    </div>
  )
}
