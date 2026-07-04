"use client"

import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export interface FilterOption {
  label: string
  value: string
}

interface Filter {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

interface FilterBarProps {
  filters: Filter[]
  onClearAll?: () => void
  className?: string
}

export function FilterBar({ filters, onClearAll, className }: FilterBarProps) {
  const hasAnyValue = filters.some((f) => f.value)

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {filters.map((filter) => (
        <Select key={filter.label} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="h-9 w-auto min-w-[130px] text-xs rounded-xl">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      {hasAnyValue && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 text-xs text-muted-foreground rounded-xl"
          onClick={onClearAll}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  )
}
