"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDiseaseTrends } from "@/hooks/use-disease-trends"
import { PageHeader } from "@/components/layout/page-header"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { RiskBadge } from "@/components/shared/risk-badge"
import { Activity, TrendingUp, TrendingDown, AlertTriangle, MapPin, Pill } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"
import { formatNumber } from "@/lib/utils"

export default function DiseaseTrendsPage() {
  const { data: trends, loading } = useDiseaseTrends()
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null)

  if (loading) return <LoadingSkeleton type="dashboard" />

  const selected = selectedDisease 
    ? trends?.find(t => t.disease === selectedDisease) 
    : null

  const weeklyData = (trends || []).map(t => ({
    disease: t.disease,
    currentWeek: t.currentWeek,
    previousWeek: t.previousWeek,
    change: t.change,
  }))

  return (
    <div className="space-y-6">
      <PageHeader title="Disease Trends" description="Track and analyze disease patterns across the district" icon={Activity} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {(trends || []).map((trend) => (
          <motion.div
            key={trend.disease}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedDisease(trend.disease === selectedDisease ? null : trend.disease)}
          >
            <Card className={`cursor-pointer transition-all duration-200 ${selectedDisease === trend.disease ? "ring-2 ring-primary shadow-lg" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">{trend.disease}</h3>
                  <RiskBadge level={trend.risk} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{formatNumber(trend.currentWeek)}</span>
                  <span className="text-xs text-muted-foreground">this week</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {trend.change >= 0 ? (
                    <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                  <span className={`text-xs font-medium ${trend.change >= 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {trend.change >= 0 ? "+" : ""}{trend.change}% vs last week
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Weekly Comparison" subtitle="Current vs Previous week">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis dataKey="disease" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="previousWeek" name="Previous Week" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="currentWeek" name="Current Week" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Trend Over Time" subtitle="Weekly cases for each disease">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={
              (trends || []).map(t => ({
                disease: t.disease,
                ...t.weekData.reduce((acc: any, val: number, idx: number) => ({ ...acc, [`Week ${idx + 1}`]: val }), {})
              }))
            }>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis dataKey="disease" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              {(trends?.[0]?.weekData || []).map((_, idx) => (
                <Line key={idx} type="monotone" dataKey={`Week ${idx + 1}`} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h3 className="text-lg font-semibold">{selected.disease} - Detailed Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> By Facility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selected.facilities.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{f.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(f.cases / Math.max(...selected.facilities.map(x => x.cases))) * 100}%` }} />
                        </div>
                        <span className="font-medium w-8 text-right">{f.cases}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> Village Clusters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selected.villages.map((v, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm p-1.5 rounded-lg hover:bg-muted/50">
                      <span>{v.name}</span>
                      <span className="font-medium">{v.cases} cases</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm"><Pill className="h-4 w-4" /> Medicine Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{selected.medicineImpact}%</div>
                  <p className="text-sm text-muted-foreground">Medicine effectiveness rate</p>
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${selected.medicineImpact}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#f97316", "#ef4444", "#8b5cf6", "#ec4899"]
