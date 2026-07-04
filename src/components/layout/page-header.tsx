"use client"

import type { ReactNode, ElementType } from "react"
import { cn } from "@/lib/utils"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ElementType
  children?: ReactNode
  className?: string
  onBack?: () => void
}

export function PageHeader({ title, description, icon: Icon, children, className, onBack }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex items-start gap-3">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="mt-0.5 h-9 w-9 shrink-0 rounded-xl"
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        {Icon && !onBack && (
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
