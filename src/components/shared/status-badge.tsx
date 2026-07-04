"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Status } from "@/types"

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusConfig: Record<Status, { variant: "success" | "secondary" | "warning" | "info"; label: string }> = {
  active: { variant: "success", label: "Active" },
  inactive: { variant: "secondary", label: "Inactive" },
  pending: { variant: "warning", label: "Pending" },
  completed: { variant: "info", label: "Completed" },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={cn("gap-1.5 px-2.5 py-1", className)}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {config.label}
    </Badge>
  )
}
