"use client";

import {
  Building2,
  Users,
  Activity,
  Pill,
  Stethoscope,
  UserRound,
  TrendingUp,
  BedDouble,
} from "lucide-react";

const severityGradients: Record<string, string> = {
  "Total Facilities": "from-[#3b48b8] to-[#5a2bae]",
  "Critical Facilities": "from-rose-500 to-pink-600",
  "Medicine Stock Alerts": "from-amber-500 to-orange-600",
  "Doctor Absence Alerts": "from-orange-500 to-red-600",
  "Nurse Overload Alerts": "from-violet-500 to-purple-600",
  "Disease Spike Alerts": "from-red-500 to-rose-600",
  "High-risk Patients": "from-pink-500 to-rose-600",
  "Bed Pressure Alerts": "from-cyan-500 to-blue-600",
};

const metrics = [
  { label: "Total Facilities", value: 6, icon: Building2 },
  { label: "Critical Facilities", value: 1, icon: Activity },
  { label: "Medicine Stock Alerts", value: 9, icon: Pill },
  { label: "Doctor Absence Alerts", value: 2, icon: Stethoscope },
  { label: "Nurse Overload Alerts", value: 4, icon: UserRound },
  { label: "Disease Spike Alerts", value: 3, icon: TrendingUp },
  { label: "High-risk Patients", value: 37, icon: Users },
  { label: "Bed Pressure Alerts", value: 2, icon: BedDouble },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-border hover:border-[#cdd2ed] transition-all duration-200 cursor-default"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${severityGradients[m.label]} flex items-center justify-center shrink-0`}>
              <Icon className="w-[16px] h-[16px] text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-text-primary tracking-tight">{m.value}</p>
              <p className="text-[11px] text-text-muted truncate font-medium">{m.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
