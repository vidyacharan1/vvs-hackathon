"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pill,
  Stethoscope,
  Activity,
  Building2,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Eye,
} from "lucide-react"
import type { AIInsight } from "@/types"

interface InsightCardProps {
  insight: AIInsight
  onAcknowledge?: () => void
  onResolve?: () => void
  resolved?: boolean
}

const typeIcons: Record<string, React.ReactNode> = {
  medicine: <Pill className="h-5 w-5" />,
  doctor: <Stethoscope className="h-5 w-5" />,
  disease: <Activity className="h-5 w-5" />,
  facility: <Building2 className="h-5 w-5" />,
  patient: <Users className="h-5 w-5" />,
}

const typeBg: Record<string, string> = {
  medicine: "bg-blue-50 dark:bg-blue-950/20 text-blue-600",
  doctor: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600",
  disease: "bg-red-50 dark:bg-red-950/20 text-red-600",
  facility: "bg-purple-50 dark:bg-purple-950/20 text-purple-600",
  patient: "bg-amber-50 dark:bg-amber-950/20 text-amber-600",
}

const severityVariants: Record<string, "low" | "medium" | "high" | "critical"> = {
  low: "low",
  medium: "medium",
  high: "high",
  critical: "critical",
}

function getRelativeTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export function InsightCard({ insight, onAcknowledge, onResolve, resolved }: InsightCardProps) {
  const icon = typeIcons[insight.type] || <Brain className="h-5 w-5" />
  const bg = typeBg[insight.type] || "bg-gray-50 dark:bg-gray-950/20 text-gray-600"

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      insight.acknowledged && !insight.resolved && "ring-1 ring-amber-400/50",
      insight.resolved && "opacity-75"
    )}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-xl p-2.5", bg)}>
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{insight.title}</h3>
                {insight.acknowledged && !insight.resolved && (
                  <Eye className="h-3.5 w-3.5 text-amber-500" />
                )}
                {insight.resolved && (
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant={severityVariants[insight.severity] || "medium"} className="text-[10px] px-2 py-0">
                  {insight.severity}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {getRelativeTime(insight.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Recommendation</p>
          <p className="text-sm">{insight.recommendation}</p>
        </div>
      </CardContent>
      {!resolved && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          {onAcknowledge && !insight.acknowledged && (
            <Button variant="outline" size="sm" className="flex-1 h-9" onClick={onAcknowledge}>
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Acknowledge
            </Button>
          )}
          {onResolve && (
            <Button variant="default" size="sm" className="flex-1 h-9" onClick={onResolve}>
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Resolve
            </Button>
          )}
        </CardFooter>
      )}
      {resolved && (
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 text-xs text-emerald-600">
            <CheckCircle className="h-3.5 w-3.5" />
            Resolved
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
