"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { FilterBar } from "@/components/shared/filter-bar"
import type { FilterOption } from "@/components/shared/filter-bar"

interface FilterConfig {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

interface PatientFiltersProps {
  filters: FilterConfig[]
  onClearAll: () => void
  className?: string
}

export function PatientFilters({ filters, onClearAll, className }: PatientFiltersProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <FilterBar filters={filters} onClearAll={onClearAll} />
    </div>
  )
}
