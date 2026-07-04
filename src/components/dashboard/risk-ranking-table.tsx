"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RiskBadge } from "@/components/shared/risk-badge"
import { TrendingUp, TrendingDown, Minus, ChevronRight, AlertTriangle } from "lucide-react"
import type { RiskLevel } from "@/types"

interface RiskRankingItem {
  id: string
  name: string
  riskScore: number
  risk: RiskLevel
  change: number
}

interface RiskRankingTableProps {
  data: RiskRankingItem[]
}

const riskGradient = (score: number) => {
  if (score >= 85) return "from-red-500 to-red-600"
  if (score >= 70) return "from-orange-500 to-orange-600"
  if (score >= 50) return "from-yellow-500 to-yellow-600"
  return "from-[#7C3AED] to-[#4648d4]"
}

const riskBarColor = (score: number) => {
  if (score >= 85) return "bg-red-500"
  if (score >= 70) return "bg-orange-500"
  if (score >= 50) return "bg-yellow-500"
  return "bg-[#7C3AED]"
}

export function RiskRankingTable({ data }: RiskRankingTableProps) {
  const sorted = useMemo(
    () => [...data].sort((a, b) => b.riskScore - a.riskScore),
    [data]
  )

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
      <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/5 to-transparent blur-3xl" />
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 shadow-sm ring-1 ring-orange-500/20">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">Facility Risk Ranking</h3>
              <p className="text-xs text-muted-foreground">Sorted by risk score</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground">
            View All <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <ScrollArea className="h-[380px] -mx-2">
          <div className="space-y-1.5 px-2 pb-2">
            {sorted.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
                className="group/item relative overflow-hidden rounded-xl p-3.5 transition-all duration-200 hover:bg-muted/60 hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-sm ring-1 ring-black/5",
                    index === 0 ? "bg-gradient-to-br from-red-500 to-red-600 text-white" :
                    index === 1 ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white" :
                    index === 2 ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm font-semibold truncate">{item.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-bold tabular-nums">{item.riskScore}</span>
                        <RiskBadge level={item.risk} showDot={false} className="h-5 text-[10px]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700 ease-out", riskBarColor(item.riskScore))}
                          style={{ width: `${item.riskScore}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        {item.change > 0 ? (
                          <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                        ) : item.change < 0 ? (
                          <TrendingDown className="h-3.5 w-3.5 text-[#7C3AED]" />
                        ) : (
                          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className={cn(
                          "text-xs font-medium tabular-nums",
                          item.change > 0 ? "text-red-500" :
                          item.change < 0 ? "text-[#7C3AED]" :
                          "text-muted-foreground"
                        )}>
                          {Math.abs(item.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
