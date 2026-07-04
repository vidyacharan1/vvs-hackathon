"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RiskBadge } from "@/components/shared/risk-badge"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Edit,
  Activity,
  Droplets,
  Thermometer,
} from "lucide-react"
import type { Patient } from "@/types"

interface PatientProfileCardProps {
  patient: Patient
  className?: string
}

export function PatientProfileCard({ patient, className }: PatientProfileCardProps) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-xl shadow-lg",
        className
      )}
    >
      {/* Glass morphism background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-background shadow-xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient.name}`} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1">
              <RiskBadge level={patient.risk} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{patient.name}</h2>
                  <Badge variant="outline" className="text-xs font-mono">
                    {patient.id}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {patient.age} years, <span className="capitalize">{patient.gender}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="h-3.5 w-3.5" />
                    {patient.bloodGroup}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={patient.status} />
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            <Separator />

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last Visit
                </p>
                <p className="text-sm font-medium">{patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Next Follow-up
                </p>
                <p className="text-sm font-medium">{patient.nextFollowUp ? new Date(patient.nextFollowUp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Doctor
                </p>
                <p className="text-sm font-medium truncate">{patient.doctor}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Nurse
                </p>
                <p className="text-sm font-medium truncate">{patient.nurse}</p>
              </div>
            </div>

            <Separator />

            {/* Contact & Location */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="hidden sm:block text-muted-foreground">•</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {patient.village}, {patient.district}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
