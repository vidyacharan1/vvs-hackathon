"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import {
  Building2, AlertTriangle, Pill, Stethoscope, Users,
  TrendingUp, BedDouble, Plus, Sparkles,
  UserX, AlertCircle, ChevronRight,
  X, MapPin, Heart
} from "lucide-react";
import { dashboardSummary, facilities } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

const statusLabel: Record<string, string> = {
  critical: "Critical", high: "High", medium: "Medium", low: "Low",
};

const metricCards = [
  { label: "Total Facilities", value: dashboardSummary.totalFacilities, icon: Building2, theme: "primary" as const },
  { label: "Critical Facilities", value: dashboardSummary.criticalFacilities, icon: AlertTriangle, theme: "error" as const },
  { label: "Medicine Alerts", value: dashboardSummary.medicineStockIssues, icon: Pill, theme: "warning" as const },
  { label: "Doctor Absences", value: dashboardSummary.doctorAbsenceAlerts, icon: UserX, theme: "error" as const },
  { label: "Nurse Overloads", value: dashboardSummary.nurseOverloadAlerts, icon: Users, theme: "warning" as const },
  { label: "Disease Spikes", value: dashboardSummary.diseaseSpikeAlerts, icon: TrendingUp, theme: "error" as const },
  { label: "High-risk Patients", value: dashboardSummary.criticalPatients, icon: AlertCircle, theme: "error" as const },
  { label: "Bed Pressure", value: dashboardSummary.bedPressureAlerts, icon: BedDouble, theme: "warning" as const },
];

const themeStyles: Record<string, { iconBg: string; iconColor: string }> = {
  primary: { iconBg: "bg-primary-fixed", iconColor: "text-primary" },
  secondary: { iconBg: "bg-secondary-fixed", iconColor: "text-secondary" },
  tertiary: { iconBg: "bg-tertiary-fixed", iconColor: "text-tertiary" },
  error: { iconBg: "bg-error-container", iconColor: "text-on-error-container" },
  warning: { iconBg: "bg-warning/10", iconColor: "text-warning" },
};

function MetricCard({ label, value, icon: Icon, theme }: { label: string; value: number; icon: React.ElementType; theme: string }) {
  const s = themeStyles[theme] || themeStyles.primary;
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center ${s.iconColor} mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold text-on-surface">{value}</div>
      <div className="text-on-surface-variant font-label-md">{label}</div>
    </div>
  );
}

function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link href={`/facilities/${facility.id}`} className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group block">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary font-label-sm uppercase tracking-widest">{facility.type}</span>
              <span className={`pill pill-${facility.status}`}>{statusLabel[facility.status]}</span>
            </div>
            <h3 className="text-xl font-semibold text-on-surface">{facility.name}</h3>
            <p className="text-on-surface-variant text-label-md flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> {facility.village}, {facility.mandal}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-outline shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
      <div className="grid grid-cols-3 gap-5 pt-6 border-t border-outline-variant/20">
        <div className="text-center">
          <div className="text-xl font-bold text-on-surface">{facility.todayOpd}</div>
          <div className="text-on-surface-variant font-label-sm">OPD Today</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-on-surface">{facility.doctorsPresent}/{facility.totalDoctors}</div>
          <div className="text-on-surface-variant font-label-sm">Doctors</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-on-surface">{facility.bedsOccupied}/{facility.totalBeds}</div>
          <div className="text-on-surface-variant font-label-sm">Beds</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-on-surface">{facility.medicineStockIssues}</div>
          <div className="text-on-surface-variant font-label-sm">Medicine Issues</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-on-surface">{facility.diseaseSpikeCount}</div>
          <div className="text-on-surface-variant font-label-sm">Disease Spikes</div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold ${facility.riskScore >= 70 ? "text-on-error-container" : facility.riskScore >= 40 ? "text-warning" : "text-success"}`}>{facility.riskScore}%</div>
          <div className="text-on-surface-variant font-label-sm">Risk Score</div>
        </div>
      </div>
    </Link>
  );
}

function CreateFacilityModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="glass-card rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Plus className="w-4 h-4 text-primary" /></div>
            <h2 className="text-xl font-semibold">Create New PHC / CHC</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
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
              <input type="text" placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl border border-outline-variant/25 bg-surface-container-lowest/60 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/40 transition-all" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-outline-variant/10">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all text-label-md font-medium">Cancel</button>
          <button className="flex-1 gradient-button text-white px-4 py-2.5 rounded-xl text-label-md font-semibold active:scale-95 transition-transform">Create Facility</button>
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
    <div className="bg-surface animate-page-enter">
      {/* Hero / Header */}
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">DISTRICT COMMAND CENTER</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">Visakhapatnam Dashboard</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">
                {simulationMode === "tomorrow" ? "Simulation Mode: Tomorrow" : `${dashboardSummary.totalFacilities} facilities · ${dashboardSummary.totalPatients} patients · ${dashboardSummary.openAlerts} open alerts`}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {isDistrictOfficer && (
                <button onClick={() => setShowCreate(true)} className="gradient-button text-white px-6 py-3 rounded-lg font-label-md flex items-center gap-2 active:scale-90 transition-transform shadow-lg shadow-primary/20">
                  <Plus className="w-4 h-4" /> Create PHC / CHC
                </button>
              )}
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary/5 transition-all flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Generate District Brief
              </button>
            </div>
          </div>

          {/* Stats Section — Matching landing page StatsSection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {metricCards.map((m) => <MetricCard key={m.label} {...m} />)}
          </div>
        </div>
      </section>

      {/* Facility Risk Ranking — Matching landing page FeaturesSection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="mb-12">
            <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">FACILITY RISK RANKING</span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-3xl font-bold text-on-surface">Facility Risk Ranking</h2>
              <div className="flex items-center gap-1.5">
                {["All", "Critical", "High", "Medium", "Low"].map((f) => (
                  <button key={f} className={`px-3.5 py-1.5 rounded-lg text-label-xs font-semibold tracking-wide transition-all ${f === "All" ? "bg-primary-fixed text-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>{f}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedFacilities.map((f) => <FacilityCard key={f.id} facility={f} />)}
          </div>
        </div>
      </section>

      {/* Alerts + Quick Actions — Using landing page layout spacing */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">DISTRICT-WIDE ALERTS</span>
              <h2 className="text-3xl font-bold text-on-surface">District-wide Alerts</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { facility: "PHC Madhurawada", alert: "Paracetamol stock critical — 2.2 days remaining", severity: "critical" },
                { facility: "PHC Madhurawada", alert: "Fever cases up 104% week-over-week", severity: "critical" },
                { facility: "PHC Madhurawada", alert: "Dr. Rajesh Kumar absent — 32 patients need reassignment", severity: "high" },
                { facility: "CHC Bheemili", alert: "Diarrhea cases up 73% — ORS demand increasing", severity: "high" },
                { facility: "PHC Gajuwaka", alert: "Dr. Meera Iyer absent — zero pediatric coverage", severity: "critical" },
                { facility: "PHC Madhurawada", alert: "Sr. Mary D. overloaded — 38 patients, 14 pending follow-ups", severity: "high" },
                { facility: "PHC Madhurawada", alert: "Bed occupancy at 80% — 16/20 beds filled", severity: "medium" },
              ].map((a, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${a.severity === "critical" ? "bg-error-container text-on-error-container" : a.severity === "high" ? "bg-warning/10 text-warning" : "bg-primary-fixed text-primary"}`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-primary font-label-sm uppercase tracking-widest">{a.facility}</p>
                    <p className="text-body-md text-on-surface mt-0.5">{a.alert}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">QUICK ACTIONS</span>
              <h2 className="text-3xl font-bold text-on-surface">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "View All Facilities", icon: Building2, href: "/facilities", theme: "bg-primary-fixed text-primary" },
                { label: "Patient CRM", icon: Users, href: "/patients", theme: "bg-secondary-fixed text-secondary" },
                { label: "Medicine Inventory", icon: Pill, href: "/inventory", theme: "bg-tertiary-fixed text-tertiary" },
                { label: "Doctor Attendance", icon: Stethoscope, href: "/doctors", theme: "bg-primary-fixed-dim text-primary" },
                { label: "Nurse Workload", icon: Heart, href: "/nurses", theme: "bg-secondary-fixed text-secondary" },
                { label: "Disease Trends", icon: TrendingUp, href: "/disease-trends", theme: "bg-tertiary-fixed text-tertiary" },
                { label: "AI Insights Board", icon: Sparkles, href: "/insights", theme: "gradient-button text-white" },
              ].map((action) => (
                <Link key={action.label} href={action.href} className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300 group">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${action.theme}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-label-md font-medium flex-1 text-on-surface">{action.label}</span>
                  <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showCreate && <CreateFacilityModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
