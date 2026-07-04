"use client"

import { cn } from "@/lib/utils"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
  height?: number
}

export function ChartCard({ title, subtitle, children, action, className, height }: ChartCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl",
      className
    )}>
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
        <div style={{ height: height || 320 }} className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
