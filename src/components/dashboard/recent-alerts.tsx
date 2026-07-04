"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertTriangle, Pill, Stethoscope, Activity, Building2, User,
  ChevronRight, CheckCheck, HandHeart, Bell
} from "lucide-react"
import type { Alert, AlertType, AlertSeverity } from "@/types"

interface RecentAlertsProps {
  alerts: Alert[]
}

const alertIcons: Record<AlertType, React.ReactNode> = {
  medicine: <Pill className="h-4 w-4" />,
  doctor: <Stethoscope className="h-4 w-4" />,
  disease: <Activity className="h-4 w-4" />,
  facility: <Building2 className="h-4 w-4" />,
  patient: <User className="h-4 w-4" />,
  nurse: <HandHeart className="h-4 w-4" />,
}

const severityStyles: Record<AlertSeverity, { label: string; bg: string; dot: string; border: string; badge: "critical" | "high" | "medium" | "low" }> = {
  critical: { label: "Critical", bg: "bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-950/20 dark:to-red-950/10", dot: "bg-red-500", border: "border-l-red-500", badge: "critical" },
  high: { label: "High", bg: "bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-950/20 dark:to-orange-950/10", dot: "bg-orange-500", border: "border-l-orange-500", badge: "high" },
  medium: { label: "Medium", bg: "bg-gradient-to-r from-yellow-50 to-yellow-50/50 dark:from-yellow-950/20 dark:to-yellow-950/10", dot: "bg-yellow-500", border: "border-l-yellow-500", badge: "medium" },
  low: { label: "Low", bg: "bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10", dot: "bg-green-500", border: "border-l-green-500", badge: "low" },
}

function getRelativeTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/5 to-transparent blur-3xl" />
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 shadow-sm ring-1 ring-red-500/20">
              <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">Recent Alerts</h3>
              <p className="text-xs text-muted-foreground">Priority notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="rounded-full px-2.5 py-0.5 text-xs font-semibold">
              {alerts.filter(a => !a.acknowledged).length} open
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[380px] -mx-2">
          <div className="space-y-2 px-2 pb-2">
            {alerts.map((alert, index) => {
              const style = severityStyles[alert.severity]
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className={cn(
                    "relative overflow-hidden rounded-xl border-l-4 p-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                    style.border, style.bg,
                    alert.acknowledged && "opacity-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/80 shadow-sm ring-1 ring-black/5 dark:bg-background/50",
                    )}>
                      {alertIcons[alert.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold leading-tight">{alert.title}</span>
                            <Badge variant={style.badge} className="rounded-full px-1.5 py-0 text-[10px] uppercase font-bold leading-none">
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">{alert.description}</p>
                        </div>
                        {!alert.acknowledged && (
                          <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", style.dot)} />
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-muted-foreground/60">{getRelativeTime(alert.timestamp)}</span>
                        {!alert.acknowledged && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1 rounded-lg px-2.5 text-xs font-medium opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-background"
                          >
                            <CheckCheck className="h-3.5 w-3.5" />
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
