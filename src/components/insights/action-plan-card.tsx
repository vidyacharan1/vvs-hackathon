"use client"

import { motion } from "framer-motion"
import { Brain, AlertTriangle, Stethoscope, HandHeart, Pill, Building2, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ActionPlan } from "@/types"

interface ActionPlanCardProps {
  plan: ActionPlan
  className?: string
}

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
}

const severityVariants = {
  critical: "critical",
  high: "high",
  medium: "medium",
  low: "low",
} as const

export function ActionPlanCard({ plan, className }: ActionPlanCardProps) {
  const sections = [
    { icon: Stethoscope, title: "Doctor Actions", items: plan.doctorActions },
    { icon: HandHeart, title: "Nurse Actions", items: plan.nurseActions },
    { icon: Pill, title: "Medicine Actions", items: plan.medicineActions },
    { icon: Building2, title: "District Actions", items: plan.districtActions },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6", className)}
    >
      <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="h-5 w-5" />
            AI-Generated Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {plan.executiveSummary}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Top Issues
            </h4>
            <div className="space-y-2">
              {plan.topIssues.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{issue.issue}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{issue.detail}</p>
                  </div>
                  <Badge variant={severityVariants[issue.severity]} className="shrink-0">
                    {issue.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <div key={section.title} className="p-4 rounded-xl border bg-card">
                <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <section.icon className="h-4 w-4 text-primary" />
                  {section.title}
                </h4>
                <ScrollArea className="h-40">
                  <div className="space-y-2 pr-2">
                    {section.items.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No actions needed</p>
                    ) : (
                      section.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
                            priorityColors[item.priority]
                          )}>
                            {item.priority}
                          </span>
                          <span className="text-muted-foreground">{item.action}</span>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-100 dark:border-purple-900">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold mb-1">Impact Forecast</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{plan.impactForecast}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
