"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "@/components/shared/risk-badge"
import { MapPin, ArrowRight, Building2, AlertTriangle } from "lucide-react"
import type { RiskLevel, FacilityType } from "@/types"

interface CriticalFacility {
  id: string
  name: string
  type: FacilityType
  riskScore: number
  risk: RiskLevel
}

interface TopCriticalFacilitiesProps {
  facilities: CriticalFacility[]
}

const typeLabels: Record<FacilityType, string> = {
  phc: "PHC",
  chc: "CHC",
}

const typeStyles: Record<FacilityType, string> = {
  phc: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  chc: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
}

const riskColorMap: Record<RiskLevel, string> = {
  low: "from-[#7C3AED] to-[#4648d4]",
  medium: "from-yellow-500 to-yellow-600",
  high: "from-orange-500 to-orange-600",
  critical: "from-red-500 to-red-600",
}

const riskGlow: Record<RiskLevel, string> = {
  low: "shadow-[#7C3AED]/20 group-hover:shadow-[#7C3AED]/30",
  medium: "shadow-yellow-500/20 group-hover:shadow-yellow-500/30",
  high: "shadow-orange-500/20 group-hover:shadow-orange-500/30",
  critical: "shadow-red-500/20 group-hover:shadow-red-500/30",
}

const riskBar: Record<RiskLevel, string> = {
  low: "bg-[#7C3AED]",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
}

export function TopCriticalFacilities({ facilities }: TopCriticalFacilitiesProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
      <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/5 to-transparent blur-3xl" />
      <div className="relative z-10 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 shadow-sm ring-1 ring-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">Top Critical Facilities</h3>
              <p className="text-xs text-muted-foreground">Facilities requiring immediate attention</p>
            </div>
          </div>
          <Badge variant="destructive" className="rounded-full px-3 py-1 text-xs font-semibold">
            {facilities.length} facilities
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="group/card"
            >
              <div className={cn(
                "relative h-full overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 shadow-md transition-all duration-300 hover:shadow-xl",
                riskGlow[facility.risk]
              )}>
                <div className={cn("h-1.5 w-full bg-gradient-to-r", riskColorMap[facility.risk])} />
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", typeStyles[facility.type])}>
                      {typeLabels[facility.type]}
                    </span>
                    <RiskBadge level={facility.risk} showDot className="h-5 text-[10px] font-semibold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold leading-tight line-clamp-2 group-hover/card:text-primary transition-colors">{facility.name}</h4>
                    <p className="text-xs text-muted-foreground/70 mt-1.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">Bengaluru Urban</span>
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Risk Score</span>
                      <span className="font-bold tabular-nums">{facility.riskScore}/100</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-700 ease-out", riskBar[facility.risk])}
                        style={{ width: `${facility.riskScore}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 gap-1.5 rounded-lg text-xs font-medium sm:opacity-0 transition-all duration-200 sm:group-hover/card:opacity-100 hover:bg-muted/80"
                  >
                    View Details <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
