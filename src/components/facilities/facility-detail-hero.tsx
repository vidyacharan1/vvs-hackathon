"use client"

import { motion } from "framer-motion"
import {
  Building2, Calendar, TrendingUp, Stethoscope, HandHeart, Bed, AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { RiskBadge } from "@/components/shared/risk-badge"
import type { Facility } from "@/types"

interface FacilityDetailHeroProps {
  facility: Facility
  className?: string
}

const typeLabels = {
  phc: { label: "Primary Health Center", variant: "info" as const },
  chc: { label: "Community Health Center", variant: "warning" as const },
}

const metrics = [
  {
    label: "Today's OPD",
    value: (f: Facility) => f.todayOPD,
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    label: "7-Day Avg",
    value: (f: Facility) => f.weekAvgOPD,
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    label: "Doctors Present",
    value: (f: Facility) => f.doctorsPresent,
    icon: Stethoscope,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    label: "Nurses Present",
    value: (f: Facility) => f.nursesPresent,
    icon: HandHeart,
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    border: "border-pink-200 dark:border-pink-800",
  },
  {
    label: "Beds Occupied",
    value: (f: Facility) => f.occupiedBeds,
    icon: Bed,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    label: "High Risk Patients",
    value: (f: Facility) => f.highRiskPatients,
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  },
]

export function FacilityDetailHero({ facility, className }: FacilityDetailHeroProps) {
  const type = typeLabels[facility.type]

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-[#4648d4]/5 to-[#3B82F6]/10 dark:from-[#7C3AED]/20 dark:via-[#4648d4]/10 dark:to-[#3B82F6]/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative p-6 sm:p-8 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {facility.name}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={type.variant}>{type.label}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{facility.district}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{facility.taluka}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{facility.village}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Overall Risk</p>
              <RiskBadge level={facility.overallRisk} className="mt-1 text-sm px-4 py-1.5" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              className={cn(
                "rounded-xl border p-3 sm:p-4 backdrop-blur-sm bg-white/60 dark:bg-black/40",
                metric.bg,
                metric.border
              )}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <metric.icon className={cn("h-4 w-4", metric.color)} />
                <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  {metric.label}
                </span>
              </div>
              <AnimatedCounter
                value={metric.value(facility)}
                className={cn(
                  "text-lg sm:text-2xl font-bold",
                  metric.color
                )}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
