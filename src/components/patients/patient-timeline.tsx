"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn, formatDate } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Pill,
  FlaskConical,
  FileText,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"
import type { TimelineEvent } from "@/types"

interface PatientTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const eventConfig: Record<
  TimelineEvent["type"],
  { icon: typeof Calendar; color: string; bg: string; border: string }
> = {
  visit: {
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
  },
  medicine: {
    icon: Pill,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  test: {
    icon: FlaskConical,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
  },
  note: {
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
  },
  alert: {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
  },
}

const typeLabels: Record<TimelineEvent["type"], string> = {
  visit: "Visit",
  medicine: "Medicine",
  test: "Test",
  note: "Note",
  alert: "Alert",
}

export function PatientTimeline({ events, className }: PatientTimelineProps) {
  const [showAll, setShowAll] = useState(false)
  const displayEvents = showAll ? events : events.slice(0, 5)

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <FileText className="h-12 w-12 mb-3 opacity-30" />
        <p className="text-sm">No timeline events recorded</p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <ScrollArea className="max-h-[500px] pr-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-border via-border/50 to-transparent" />

          <div className="space-y-0">
            <AnimatePresence>
              {displayEvents.map((event, idx) => {
                const config = eventConfig[event.type]
                const Icon = config.icon
                return (
                  <motion.div
                    key={`${event.date}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="relative pl-12 pb-6 last:pb-0"
                  >
                    {/* Icon circle */}
                    <div
                      className={cn(
                        "absolute left-2.5 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background shadow-sm",
                        config.bg
                      )}
                    >
                      <Icon className={cn("h-4 w-4", config.color)} />
                    </div>

                    {/* Content card */}
                    <div className={cn("rounded-xl border p-3 transition-colors hover:bg-muted/30", config.border)}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                                config.bg,
                                config.color
                              )}
                            >
                              {typeLabels[event.type]}
                            </span>
                            {event.doctor && (
                              <span className="text-xs text-muted-foreground">
                                by {event.doctor}
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{event.description}</p>
                        </div>
                        <time className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(event.date)}
                        </time>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>

      {events.length > 5 && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            onClick={() => setShowAll(!showAll)}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                showAll && "rotate-180"
              )}
            />
            {showAll
              ? "Show Less"
              : `Show ${events.length - 5} More Events`}
          </Button>
        </div>
      )}
    </div>
  )
}
