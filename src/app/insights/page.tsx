"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInsights } from "@/hooks/use-insights"
import { PageHeader } from "@/components/layout/page-header"
import { InsightCard } from "@/components/insights/insight-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { Brain, Bell, CheckCircle, AlertTriangle } from "lucide-react"

export default function InsightsPage() {
  const { data: insights, loading, acknowledgeInsight, resolveInsight } = useInsights()

  if (loading) return <LoadingSkeleton type="dashboard" />

  const activeInsights = insights?.filter(i => !i.resolved) || []
  const resolvedInsights = insights?.filter(i => i.resolved) || []

  const counts = {
    total: insights?.length || 0,
    active: activeInsights.length,
    acknowledged: insights?.filter(i => i.acknowledged && !i.resolved).length || 0,
    resolved: resolvedInsights.length,
  }

  return (
    <div className="space-y-6">
      <PageHeader title="AI Insights" description="AI-generated recommendations and alerts" icon={Brain}>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          {counts.active} Active
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Insights", value: counts.total, Icon: Brain, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20" },
          { label: "Active", value: counts.active, Icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
          { label: "Acknowledged", value: counts.acknowledged, Icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
          { label: "Resolved", value: counts.resolved, Icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/20" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`rounded-xl ${stat.bg} p-2.5`}>
                <stat.Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Insights ({counts.active})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({counts.resolved})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {activeInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <InsightCard
                    insight={insight}
                    onAcknowledge={() => acknowledgeInsight(insight.id)}
                    onResolve={() => resolveInsight(insight.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {activeInsights.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <p className="text-lg font-medium">All clear!</p>
              <p className="text-sm text-muted-foreground">No active insights at the moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {resolvedInsights.map((insight) => (
              <motion.div key={insight.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <InsightCard
                  insight={insight}
                  resolved
                />
              </motion.div>
            ))}
          </div>
          {resolvedInsights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg font-medium">No resolved insights</p>
              <p className="text-sm text-muted-foreground">Acknowledge and resolve active insights to see them here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
