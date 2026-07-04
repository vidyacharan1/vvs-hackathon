"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import {
  Building2, AlertTriangle, Pill, Stethoscope, Users,
  TrendingUp, BedDouble, ClipboardList, Plus, Sparkles,
  Activity, UserX, AlertCircle, BarChart3, ChevronRight,
  X, MapPin
} from "lucide-react";
import { dashboardSummary, facilities } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

const statusLabel: Record<string, string> = {
  critical: "Critical", high: "High", medium: "Medium", low: "Low",
};

const metricCards = [
  { label: "Total Facilities", value: dashboardSummary.totalFacilities, icon: Building2, color: "text-brand-purple", bg: "bg-brand-purple/10" },
  { label: "Critical Facilities", value: dashboardSummary.criticalFacilities, icon: AlertTriangle, color: "text-error", bg: "bg-error/10" },
  { label: "Medicine Alerts", value: dashboardSummary.medicineStockIssues, icon: Pill, color: "text-warning", bg: "bg-warning/10" },
  { label: "Doctor Absences", value: dashboardSummary.doctorAbsenceAlerts, icon: UserX, color: "text-error", bg: "bg-error/10" },
  { label: "Nurse Overloads", value: dashboardSummary.nurseOverloadAlerts, icon: Users, color: "text-warning", bg: "bg-warning/10" },
  { label: "Disease Spikes", value: dashboardSummary.diseaseSpikeAlerts, icon: TrendingUp, color: "text-error", bg: "bg-error/10" },
  { label: "High-risk Patients", value: dashboardSummary.criticalPatients, icon: AlertCircle, color: "text-error", bg: "bg-error/10" },
  { label: "Bed Pressure", value: dashboardSummary.bedPressureAlerts, icon: BedDouble, color: "text-warning", bg: "bg-warning/10" },
];

function MetricCard({ label, value, icon: Icon, color, bg }: { label: string; value: number; icon: React.ElementType; color: string; bg: string }) {
  return (
    <div className="card-glass flex items-center gap-4 p-4">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-label-xs text-outline uppercase tracking-widest">{label}</p>
        <p className={`text-headline-md font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link href={`/facilities/${facility.id}`} className="card-glass p-5 hover:shadow-lg hover:shadow-brand-purple/10 transition-all block group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-purple" />
            <span className="text-label-xs text-outline uppercase tracking-widest">{facility.type}</span>
          </div>
          <h3 className="text-headline-sm font-bold text-on-surface mt-1">{facility.name}</h3>
          <p className="text-label-sm text-outline flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {facility.village}, {facility.mandal}
          </p>
        </div>
        <span className={`pill pill-${facility.status}`}>{statusLabel[facility.status]}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-outline-variant/10">
        <div><p className="text-label-xs text-outline">OPD Today</p><p className="text-body-md font-semibold">{facility.todayOpd}</p></div>
        <div><p className="text-label-xs text-outline">Doctors</p><p className="text-body-md font-semibold">{facility.doctorsPresent}/{facility.totalDoctors}</p></div>
        <div><p className="text-label-xs text-outline">Beds</p><p className="text-body-md font-semibold">{facility.bedsOccupied}/{facility.totalBeds}</p></div>
        <div><p className="text-label-xs text-outline">Medicine</p><p className="text-body-md font-semibold">{facility.medicineStockIssues} issues</p></div>
        <div><p className="text-label-xs text-outline">Disease</p><p className="text-body-md font-semibold">{facility.diseaseSpikeCount} spikes</p></div>
        <div><p className="text-label-xs text-outline">Risk Score</p><p className="text-body-md font-semibold">{facility.riskScore}%</p></div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-brand-purple text-label-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Open Facility <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function CreateFacilityModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-purple/10 flex items-center justify-center"><Plus className="w-4 h-4 text-brand-purple" /></div>
            <h2 className="text-headline-sm font-bold">Create New PHC / CHC</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {[
            { label: "Facility Name", placeholder: "e.g. PHC Kancharapalem" },
            { label: "Facility Type", placeholder: "PHC / CHC" },
            { label: "District", placeholder: "Visakhapatnam" },
            { label: "Mandal", placeholder: "e.g. Kancharapalem" },
            { label: "Village / Area", placeholder: "e.g. Kancharapalem" },
            { label: "Total Beds", placeholder: "e.g. 10" },
            { label: "Number of Doctors", placeholder: "e.g. 2" },
            { label: "Number of Nurses", placeholder: "e.g. 3" },
            { label: "Starting Medicine Stock Level", placeholder: "Low / Medium / High" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-label-sm font-medium text-on-surface mb-1.5 block">{field.label}</label>
              <input type="text" placeholder={field.placeholder} className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/30 bg-surface-container-lowest/60 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/50 transition-all" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-outline-variant/10">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all text-label-md font-medium">Cancel</button>
          <button className="flex-1 gradient-button text-white px-4 py-2.5 rounded-lg text-label-md font-semibold active:scale-95 transition-transform">Create Facility</button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { role, simulationMode } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const isDistrictOfficer = role === "district_officer";

  const sortedFacilities = [...facilities].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">District Command Center</p>
          <h1 className="text-headline-lg font-bold text-on-surface mt-1">Visakhapatnam Dashboard</h1>
          <p className="text-label-sm text-outline mt-0.5">{simulationMode === "tomorrow" ? "🔮 Simulation Mode: Tomorrow" : `${dashboardSummary.totalFacilities} facilities · ${dashboardSummary.totalPatients} patients · ${dashboardSummary.openAlerts} open alerts`}</p>
        </div>
        <div className="flex items-center gap-3">
          {isDistrictOfficer && (
            <button onClick={() => setShowCreate(true)} className="gradient-button text-white px-5 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 active:scale-95 transition-transform">
              <Plus className="w-4 h-4" /> Create PHC / CHC
            </button>
          )}
          <button className="card-glass px-5 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all">
            <Sparkles className="w-4 h-4 text-brand-purple" /> Generate District Brief
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricCards.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      <div>
        <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Facility Risk Ranking</p>
        <div className="flex items-center justify-between mt-1 mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-purple" />
            <h2 className="text-headline-sm font-bold">Facility Risk Ranking</h2>
          </div>
          <div className="flex items-center gap-2">
            {["All", "Critical", "High", "Medium", "Low"].map((f) => (
              <button key={f} className={`px-3 py-1.5 rounded-lg text-label-xs font-medium transition-all ${f === "All" ? "bg-brand-purple/10 text-brand-purple" : "text-outline hover:bg-surface-container-high"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFacilities.map((f) => <FacilityCard key={f.id} facility={f} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Alerts</p>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <Activity className="w-5 h-5 text-brand-purple" />
            <h2 className="text-headline-sm font-bold">District-wide Alerts</h2>
          </div>
          <div className="space-y-3">
            {[
              { facility: "PHC Madhurawada", alert: "Paracetamol stock critical — 2.2 days remaining", severity: "critical" },
              { facility: "PHC Madhurawada", alert: "Fever cases up 104% week-over-week", severity: "critical" },
              { facility: "PHC Madhurawada", alert: "Dr. Rajesh Kumar absent — 32 patients need reassignment", severity: "high" },
              { facility: "CHC Bheemili", alert: "Diarrhea cases up 73% — ORS demand increasing", severity: "high" },
              { facility: "PHC Gajuwaka", alert: "Dr. Meera Iyer absent — zero pediatric coverage", severity: "critical" },
              { facility: "PHC Madhurawada", alert: "Sr. Mary D. overloaded — 38 patients, 14 pending follow-ups", severity: "high" },
              { facility: "PHC Madhurawada", alert: "Bed occupancy at 80% — 16/20 beds filled", severity: "medium" },
            ].map((a, i) => (
              <div key={i} className={`card-glass p-4 flex items-center gap-4 border-l-4 ${a.severity === "critical" ? "border-l-error" : a.severity === "high" ? "border-l-warning" : "border-l-primary"}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.severity === "critical" ? "bg-error/10" : a.severity === "high" ? "bg-warning/10" : "bg-primary/10"}`}>
                  <AlertTriangle className={`w-4 h-4 ${a.severity === "critical" ? "text-error" : a.severity === "high" ? "text-warning" : "text-primary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-label-xs text-outline uppercase tracking-widest">{a.facility}</p>
                  <p className="text-body-md font-medium text-on-surface mt-0.5">{a.alert}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-outline shrink-0" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Actions</p>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <ClipboardList className="w-5 h-5 text-brand-purple" />
            <h2 className="text-headline-sm font-bold">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "View All Facilities", icon: Building2, href: "/facilities" },
              { label: "Patient CRM", icon: Users, href: "/patients" },
              { label: "Medicine Inventory", icon: Pill, href: "/inventory" },
              { label: "Doctor Attendance", icon: Stethoscope, href: "/doctors" },
              { label: "Nurse Workload", icon: Users, href: "/nurses" },
              { label: "Disease Trends", icon: TrendingUp, href: "/disease-trends" },
              { label: "AI Insights Board", icon: Sparkles, href: "/insights" },
            ].map((action) => (
              <Link key={action.label} href={action.href} className="card-glass p-3.5 flex items-center gap-3 hover:shadow-md hover:shadow-brand-purple/5 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-brand-purple/10 flex items-center justify-center"><action.icon className="w-4 h-4 text-brand-purple" /></div>
                <span className="text-label-md font-medium flex-1">{action.label}</span>
                <ChevronRight className="w-4 h-4 text-outline group-hover:text-brand-purple transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showCreate && <CreateFacilityModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
