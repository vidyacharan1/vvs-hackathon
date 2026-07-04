"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { RiskLevel } from "@/types"

interface RiskBadgeProps {
  level: RiskLevel
  showDot?: boolean
  className?: string
}

const riskConfig: Record<RiskLevel, { variant: "low" | "medium" | "high" | "critical"; label: string }> = {
  low: { variant: "low", label: "Low" },
  medium: { variant: "medium", label: "Medium" },
  high: { variant: "high", label: "High" },
  critical: { variant: "critical", label: "Critical" },
}

export function RiskBadge({ level, showDot = true, className }: RiskBadgeProps) {
  const config = riskConfig[level]

  return (
    <Badge variant={config.variant} className={cn("gap-1.5 px-2.5 py-1", className)}>
      {showDot && (
        <span
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            level === "critical" && "animate-pulse bg-current",
            level === "high" && "bg-current",
            level === "medium" && "bg-current",
            level === "low" && "bg-current"
          )}
        />
      )}
      {config.label}
    </Badge>
  )
}
