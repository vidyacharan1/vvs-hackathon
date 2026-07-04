"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Stethoscope, HandHeart, Bed } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RiskBadge } from "@/components/shared/risk-badge"
import type { Facility } from "@/types"

interface FacilityCardProps {
  facility: Facility
  index?: number
  className?: string
}

const typeConfig = {
  phc: { label: "PHC", variant: "info" as const },
  chc: { label: "CHC", variant: "warning" as const },
}

export function FacilityCard({ facility, index = 0, className }: FacilityCardProps) {
  const type = typeConfig[facility.type]
  const occupancyPercent = Math.round((facility.occupiedBeds / facility.totalBeds) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/facilities/${facility.id}`} className="block">
        <Card className={cn("group cursor-pointer transition-all hover:shadow-lg hover:border-primary/30", className)}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                  {facility.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={type.variant} className="text-[10px] px-1.5 py-0">
                    {type.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {facility.district}
                  </span>
                </div>
              </div>
              <RiskBadge level={facility.overallRisk} showDot />
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5" />
                {facility.doctorsPresent}/{facility.doctorsRequired}
              </span>
              <span className="flex items-center gap-1">
                <HandHeart className="h-3.5 w-3.5" />
                {facility.nursesPresent}/{facility.nursesRequired}
              </span>
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {facility.occupiedBeds}/{facility.totalBeds}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Risk Score</span>
                <span className={cn(
                  "font-medium",
                  facility.riskScore >= 80 ? "text-red-600" :
                  facility.riskScore >= 60 ? "text-orange-600" :
                  facility.riskScore >= 40 ? "text-amber-600" :
                  "text-green-600"
                )}>
                  {facility.riskScore}%
                </span>
              </div>
              <Progress
                value={facility.riskScore}
                className={cn(
                  "h-1.5",
                  facility.riskScore >= 80 && "[&>div]:bg-red-500",
                  facility.riskScore >= 60 && facility.riskScore < 80 && "[&>div]:bg-orange-500",
                  facility.riskScore >= 40 && facility.riskScore < 60 && "[&>div]:bg-amber-500",
                  facility.riskScore < 40 && "[&>div]:bg-green-500"
                )}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t">
              <span>{facility.taluka}</span>
              <span>OPD: {facility.todayOPD}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
