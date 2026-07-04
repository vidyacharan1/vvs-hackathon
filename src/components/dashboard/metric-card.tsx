"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { AnimatedCounter } from "@/components/shared/animated-counter"

interface MetricCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: number
  subtitle?: string
  variant?: "default" | "warning" | "danger" | "success"
  onClick?: () => void
  prefix?: string
  suffix?: string
}

const accentMap = {
  default: { bg: "from-blue-500/10 via-blue-500/5 to-transparent", border: "border-blue-200/50 dark:border-blue-800/30", glow: "shadow-blue-500/10", text: "text-blue-600 dark:text-blue-400", iconBg: "bg-blue-100 dark:bg-blue-900/30" },
  warning: { bg: "from-amber-500/10 via-amber-500/5 to-transparent", border: "border-amber-200/50 dark:border-amber-800/30", glow: "shadow-amber-500/10", text: "text-amber-600 dark:text-amber-400", iconBg: "bg-amber-100 dark:bg-amber-900/30" },
  danger: { bg: "from-red-500/10 via-red-500/5 to-transparent", border: "border-red-200/50 dark:border-red-800/30", glow: "shadow-red-500/10", text: "text-red-600 dark:text-red-400", iconBg: "bg-red-100 dark:bg-red-900/30" },
  success: { bg: "from-[#7C3AED]/10 via-[#4648d4]/5 to-transparent", border: "border-[#7C3AED]/20 dark:border-[#7C3AED]/30", glow: "shadow-[#7C3AED]/10", text: "text-[#7C3AED] dark:text-[#A78BFA]", iconBg: "bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20" },
}

export function MetricCard({ title, value, icon, trend, subtitle, variant = "default", onClick, prefix, suffix }: MetricCardProps) {
  const a = accentMap[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={onClick}
      className={cn(onClick && "cursor-pointer", "group relative")}
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-muted/50 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl",
        a.border, a.glow, "hover:shadow-2xl"
      )}>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", a.bg)} />
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-muted-foreground/80 tracking-wide truncate">{title}</p>
              <div className="flex items-baseline gap-1.5">
                {prefix && <span className="text-sm font-medium text-muted-foreground">{prefix}</span>}
                <span className="text-3xl font-bold tracking-tight tabular-nums">
                  <AnimatedCounter value={value} />
                </span>
                {suffix && <span className="text-sm font-medium text-muted-foreground">{suffix}</span>}
              </div>
              {trend !== undefined && (
                <div className="flex items-center gap-1.5">
                  <div className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                    trend >= 0
                      ? "bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#7C3AED]/20 dark:text-[#A78BFA]"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}>
                    {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(trend)}%
                  </div>
                  {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
                </div>
              )}
            </div>
            <div className={cn("rounded-2xl p-3.5 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", a.iconBg)}>
              <div className={cn(a.text)}>
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
