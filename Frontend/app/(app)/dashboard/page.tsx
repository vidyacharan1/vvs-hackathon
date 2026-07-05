"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import {
  Activity,
  AlertTriangle,
  BedDouble,
  Building2,
  ChevronRight,
  Clock,
  Download,
  Pill,
  Plus,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { aiInsights, dashboardSummary, diseaseSpikes, facilities, medicines } from "@/lib/demo-data";
import type { Facility, FacilityStatus } from "@/lib/demo-data";
import { useDistrictDashboard, useFacilities, useAIDistrictBrief } from "@/lib/api";

const riskLabel: Record<FacilityStatus, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const riskDot: Record<FacilityStatus, string> = {
  critical: "#dc2626",
  high: "#ea580c",
  medium: "#d97706",
  low: "#16a34a",
};

const metricCards = [
  { label: "Facilities", value: dashboardSummary.totalFacilities, trend: "+12%", icon: Building2, tone: "good" },
  { label: "Stock Alerts", value: dashboardSummary.medicineStockIssues, trend: "+8%", icon: Pill, tone: "danger" },
  { label: "Disease Spikes", value: dashboardSummary.diseaseSpikeAlerts, trend: "+4", icon: Activity, tone: "danger" },
  { label: "High-risk", value: dashboardSummary.criticalPatients, trend: "live", icon: Users, tone: "good" },
  { label: "Bed Pressure", value: "56%", trend: "+9%", icon: BedDouble, tone: "warning" },
];

function useLiveMetricCards() {
  const { data: dashData } = useDistrictDashboard();
  const liveCards = useMemo(() => {
    if (!dashData) return metricCards;
    const m = dashData.metrics;
    return [
      { label: "Facilities", value: m.totalFacilities, trend: "+12%", icon: Building2, tone: "good" },
      { label: "Stock Alerts", value: m.medicineStockAlerts, trend: "+8%", icon: Pill, tone: "danger" },
      { label: "Disease Spikes", value: m.diseaseSpikeAlerts, trend: "+4", icon: Activity, tone: "danger" },
      { label: "High-risk", value: m.highRiskPatients, trend: "live", icon: Users, tone: "good" },
      { label: "Bed Pressure", value: `${m.bedPressure}%`, trend: "+9%", icon: BedDouble, tone: "warning" },
    ];
  }, [dashData]);
  return liveCards;
}

const quickActions = [
  { label: "Facilities", icon: Building2, href: "/facilities" },
  { label: "AI Brief", icon: Sparkles, href: "/insights" },
  { label: "Trends", icon: TrendingUp, href: "/disease-trends" },
  { label: "Export", icon: Download, href: "/dashboard" },
];

const diseaseTrendData = [
  { day: "D-6", dengue: 11, malaria: 6, typhoid: 8 },
  { day: "D-5", dengue: 14, malaria: 7, typhoid: 8 },
  { day: "D-4", dengue: 16, malaria: 8, typhoid: 10 },
  { day: "D-3", dengue: 19, malaria: 8, typhoid: 12 },
  { day: "D-2", dengue: 23, malaria: 9, typhoid: 14 },
  { day: "D-1", dengue: 25, malaria: 11, typhoid: 15 },
  { day: "Today", dengue: 31, malaria: 12, typhoid: 18 },
];

const medicineSeverity = [
  { facility: "Madhur.", high: 2, medium: 1, low: 0, total: 3 },
  { facility: "Bheem.", high: 2, medium: 1, low: 1, total: 4 },
  { facility: "Gaju.", high: 0, medium: 2, low: 0, total: 2 },
  { facility: "Pendur.", high: 0, medium: 1, low: 1, total: 2 },
  { facility: "Narsi.", high: 0, medium: 0, low: 2, total: 2 },
];

const toneStyles: Record<string, { badge: string; icon: string; glow: string }> = {
  good: {
    badge: "bg-success/10 text-success border-success/20",
    icon: "bg-success/10 text-success",
    glow: "shadow-success/5",
  },
  warning: {
    badge: "bg-warning/10 text-warning border-warning/20",
    icon: "bg-warning/10 text-warning",
    glow: "shadow-warning/5",
  },
  danger: {
    badge: "bg-error/10 text-error border-error/20",
    icon: "bg-error/10 text-error",
    glow: "shadow-error/5",
  },
};

function riskFromValue(value: number): FacilityStatus {
  if (value >= 85) return "critical";
  if (value >= 70) return "high";
  if (value >= 45) return "medium";
  return "low";
}

function stockRisk(facility: Facility): FacilityStatus {
  if (facility.medicineStockIssues >= 4) return "critical";
  if (facility.medicineStockIssues >= 3) return "high";
  if (facility.medicineStockIssues >= 1) return "medium";
  return "low";
}

function spikeRisk(facility: Facility): FacilityStatus {
  if (facility.diseaseSpikeRisk >= 80) return "critical";
  if (facility.diseaseSpikeRisk >= 55) return "high";
  if (facility.diseaseSpikeRisk >= 30) return "medium";
  return "low";
}

function RiskBadge({ value }: { value: FacilityStatus }) {
  return <span className={`pill pill-${value}`}>{riskLabel[value]}</span>;
}

function MetricCard({ label, value, trend, icon: Icon, tone }: { label: string; value: string | number; trend: string; icon: ElementType; tone: string }) {
  const styles = toneStyles[tone];

  return (
    <div className={`card-glass flex flex-col p-3.5 ${styles.glow}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${styles.icon}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${styles.badge}`}>{trend}</span>
      </div>
      <div className="mt-auto">
        <p className="text-xl font-bold leading-none tracking-tight text-on-surface">{value}</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-outline">{label}</p>
      </div>
    </div>
  );
}

function CircleProgress({ value }: { value: number }) {
  const stroke = value >= 85 ? riskDot.critical : value >= 70 ? riskDot.high : value >= 45 ? riskDot.medium : riskDot.low;

  return (
    <div className="relative h-7 w-7 shrink-0">
      <svg viewBox="0 0 36 36" className="-rotate-90">
        <path d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31" fill="none" stroke="#e4e8f7" strokeWidth="3" />
        <path d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray={`${Math.min(value, 100)} 100`} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-on-surface">{value}</span>
    </div>
  );
}

function CriticalAlertBanner({ facility, onActionPlan }: { facility: Facility; onActionPlan: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-error/20 bg-gradient-to-r from-error/5 via-error/8 to-error/5 p-4">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-error/5" />
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-error/10">
            <ShieldAlert className="h-5 w-5 text-error" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-error">Critical</span>
              <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse-dot" />
            </div>
            <p className="text-label-md font-bold text-on-surface">{facility.name}</p>
            <div className="mt-1 flex items-center gap-3 text-[10px] text-outline">
              <span>{facility.bedOccupancyRate}% beds</span>
              <span className="h-0.5 w-0.5 rounded-full bg-outline" />
              <span>{facility.criticalPatients} critical</span>
              <span className="h-0.5 w-0.5 rounded-full bg-outline" />
              <span>{facility.openAlerts} alerts</span>
            </div>
          </div>
        </div>
        <button
          onClick={onActionPlan}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-error px-4 py-2 text-[12px] font-bold text-white shadow-md shadow-error/20 transition hover:bg-error/90"
        >
          <AlertTriangle className="h-3.5 w-3.5" /> Action Plan
        </button>
      </div>
    </section>
  );
}

function ActionPlanModal({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  const actions = [
    { step: "1", title: "Divert Critical Patients", desc: `Route ${facility.criticalPatients} patients to CHC Bheemunipatnam`, icon: Users, urgency: "immediate" as const },
    { step: "2", title: "Deploy Doctors", desc: `Send 2 doctors — only ${facility.doctorsPresent}/${facility.totalDoctors} present`, icon: Stethoscope, urgency: "immediate" as const },
    { step: "3", title: "Stock Transfer", desc: `Move Paracetamol & ORS from Pendurthi buffer`, icon: Pill, urgency: "today" as const },
    { step: "4", title: "Overflow Protocol", desc: `Open field triage at ${facility.bedOccupancyRate}% occupancy`, icon: BedDouble, urgency: "today" as const },
    { step: "5", title: "Spike Response", desc: `Deploy nurses for fever surveillance in ${facility.village}`, icon: Activity, urgency: "within48h" as const },
  ];

  const urgencyColor = {
    immediate: "bg-error/10 text-error border-error/20",
    today: "bg-warning/10 text-warning border-warning/20",
    within48h: "bg-success/10 text-success border-success/20",
  };

  const urgencyLabel = { immediate: "Now", today: "Today", within48h: "48h" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[85vh] w-full max-w-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-outline-variant/10 bg-white/90 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-5 w-5 text-error" />
            <div>
              <h2 className="text-label-md font-bold">Action Plan</h2>
              <p className="text-[10px] text-outline">{facility.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4 rounded-xl border border-outline-variant/15 bg-surface-container-low/50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-outline">AI Recommendation</p>
            <p className="mt-1 text-label-sm leading-4 text-on-surface">Immediate intervention required within 2 hours.</p>
          </div>

          <div className="space-y-2">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.step} className="flex items-center gap-3 rounded-xl border border-outline-variant/10 bg-white/50 px-3 py-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-purple/8">
                    <Icon className="h-3.5 w-3.5 text-brand-purple" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-label-sm font-bold text-on-surface">{a.title}</span>
                      <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${urgencyColor[a.urgency]}`}>{urgencyLabel[a.urgency]}</span>
                    </div>
                    <p className="text-[11px] text-outline truncate">{a.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-outline">{a.step}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-2 border-t border-outline-variant/10 bg-white/90 px-5 py-3 backdrop-blur-md">
          <button onClick={onClose} className="flex-1 rounded-xl border border-outline-variant/30 py-2 text-label-sm font-semibold hover:bg-surface-container-high">Dismiss</button>
          <button onClick={() => { alert("Action plan executed! Notifications sent to all staff."); onClose(); }} className="gradient-button flex-1 rounded-xl py-2 text-label-sm font-bold text-white">Execute</button>
        </div>
      </div>
    </div>
  );
}

function HeroPanel({ onCreate, canCreate }: { onCreate: () => void; canCreate: boolean }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#ffffff_0%,#f7f8ff_50%,#eee9ff_100%)] border border-outline-variant/30 px-5 py-4 md:px-6">
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-brand-purple/8 xl:block">
        <Building2 className="h-16 w-16" />
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h1 className="text-headline-sm font-bold text-on-surface">Dashboard</h1>
          <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
            <span className="h-1 w-1 rounded-full bg-success animate-pulse-dot" /> Live
          </span>
        </div>
        <div className="flex items-center gap-2">
          {canCreate && (
            <button onClick={onCreate} className="gradient-button flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12px] font-bold text-white shadow-md shadow-brand-purple/20">
              <Plus className="h-3.5 w-3.5" /> New PHC
            </button>
          )}
          <button className="flex items-center gap-1.5 rounded-lg border border-outline-variant/25 bg-white/85 px-3.5 py-1.5 text-[12px] font-bold text-on-surface transition hover:border-brand-purple/30 hover:text-brand-purple">
            <Sparkles className="h-3.5 w-3.5 text-brand-purple" /> Brief
          </button>
        </div>
      </div>
    </section>
  );
}

function FacilityRiskTable({ facilities: rankedFacilities }: { facilities: Facility[] }) {
  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-outline-variant/30 bg-white/85 p-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-label-md font-bold text-on-surface">Risk Ranking</h2>
        <div className="flex gap-1">
          {(["critical", "high", "medium", "low"] as FacilityStatus[]).map((s) => (
            <span key={s} className={`pill pill-${s}`}>{riskLabel[s]}</span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
              <th className="w-8 px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline">#</th>
              <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Facility</th>
              <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Risk</th>
              <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline">OPD</th>
              <th className="hidden px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Med</th>
              <th className="hidden px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline xl:table-cell">Disease</th>
              <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Beds</th>
              <th className="w-8 px-2 py-1.5" />
            </tr>
          </thead>
          <tbody>
            {rankedFacilities.map((facility, index) => (
              <tr key={facility.id} className="border-b border-outline-variant/5 transition hover:bg-brand-purple/5">
                <td className="px-2 py-2 text-[11px] font-bold text-outline">{index + 1}</td>
                <td className="min-w-0 px-2 py-2">
                  <Link href={`/facilities/${facility.id}`} className="block min-w-0">
                    <p className="truncate text-[13px] font-bold text-on-surface">{facility.name}</p>
                    <p className="truncate text-[9px] text-outline">{facility.village}</p>
                  </Link>
                </td>
                <td className="px-2 py-2"><RiskBadge value={riskFromValue(facility.riskScore)} /></td>
                <td className="px-2 py-2 text-[13px] font-bold text-on-surface">{facility.todayOpd}</td>
                <td className="hidden px-2 py-2 lg:table-cell"><RiskBadge value={stockRisk(facility)} /></td>
                <td className="hidden px-2 py-2 xl:table-cell"><RiskBadge value={spikeRisk(facility)} /></td>
                <td className="px-2 py-2"><CircleProgress value={facility.bedOccupancyRate} /></td>
                <td className="px-2 py-2">
                  <Link href={`/facilities/${facility.id}`} className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple transition hover:bg-brand-purple hover:text-white">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AIDistrictBrief() {
  const topMed = medicines.filter((m) => m.risk === "critical" || m.risk === "high")[0];
  const spikes = diseaseSpikes[1];
  const { data: aiBrief, loading: briefLoading, generate } = useAIDistrictBrief();

  return (
    <section className="card-glass flex flex-col overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-purple" />
          <h2 className="text-label-md font-bold text-on-surface">AI Brief</h2>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
          <span className="h-1 w-1 rounded-full bg-success animate-pulse-dot" /> Live
        </span>
      </div>

      {aiBrief ? (
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center gap-2 rounded-lg bg-white/50 px-2.5 py-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-purple" />
            <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-on-surface">{aiBrief.summary}</p>
          </div>
          {aiBrief.actions.slice(0, 2).map((action, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/50 px-2.5 py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />
              <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-on-surface">{action}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-3 space-y-1.5">
          {aiInsights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="flex items-center gap-2 rounded-lg bg-white/50 px-2.5 py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: riskDot[insight.severity] }} />
              <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-on-surface">{insight.summary}</p>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-outline-variant/10 pt-2.5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[12px] font-bold text-on-surface">Alerts</h3>
          <Link href="/insights" className="text-[10px] font-bold text-brand-purple">View All</Link>
        </div>
        <div className="space-y-1.5">
          {[
            { title: "Madhurawada beds 96%", sev: "critical" as FacilityStatus },
            { title: `${topMed?.name ?? "Paracetamol"} low`, sev: "high" as FacilityStatus },
            { title: `${spikes?.condition ?? "Dengue"} rising`, sev: "high" as FacilityStatus },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/40 px-2.5 py-1.5">
              <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-on-surface">{a.title}</p>
              <RiskBadge value={a.sev} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => generate()}
        disabled={briefLoading}
        className="gradient-button mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-bold text-white disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" /> {briefLoading ? "Generating..." : "Generate Brief"}
      </button>
    </section>
  );
}

function DiseaseTrendChart() {
  return (
    <section className="card-glass p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-label-md font-bold text-on-surface">Disease Trend</h3>
        <div className="flex items-center gap-3">
          {[
            { label: "Dengue", color: "#7C3AED" },
            { label: "Malaria", color: "#2563EB" },
            { label: "Typhoid", color: "#10B981" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-semibold text-outline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={diseaseTrendData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#5E668A" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#5E668A" }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #E4E8F7", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", fontSize: 11 }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Line type="monotone" dataKey="dengue" stroke="#7C3AED" strokeWidth={2} dot={{ r: 2.5, fill: "#7C3AED" }} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="malaria" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: "#2563EB" }} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="typhoid" stroke="#10B981" strokeWidth={2} dot={{ r: 2.5, fill: "#10B981" }} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function MedicineStockCard() {
  return (
    <section className="card-glass p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-label-md font-bold text-on-surface">Stock Alerts</h3>
        <div className="flex items-center gap-2">
          {[{ l: "Crit", c: "#dc2626" }, { l: "Med", c: "#f59e0b" }, { l: "Low", c: "#10b981" }].map((i) => (
            <div key={i.l} className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: i.c }} />
              <span className="text-[10px] font-semibold text-outline">{i.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        {medicineSeverity.map((item) => {
          const bars = [
            ...Array(item.high).fill("bg-error"),
            ...Array(item.medium).fill("bg-warning"),
            ...Array(item.low).fill("bg-success"),
          ];
          return (
            <div key={item.facility}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-on-surface">{item.facility}</span>
                <span className="text-[10px] font-bold text-outline">{item.total}</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`h-5 flex-1 rounded-sm ${i < bars.length ? bars[i] : "bg-outline/10"}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CreateFacilityModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: "", facilityType: "PHC", location: "", todayOpd: "0", bedOccupancy: "50" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.location) return;
    setSubmitting(true);
    try {
      await fetch("/api/v1/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          facilityType: form.facilityType,
          location: form.location,
          todayOpd: parseInt(form.todayOpd) || 0,
          bedOccupancy: parseInt(form.bedOccupancy) || 50,
        }),
      });
      onCreated();
      onClose();
    } catch {
      alert("Failed to create facility");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-brand-purple" />
            <h2 className="text-label-md font-bold">New PHC / CHC</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Facility Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="e.g. PHC Rushikonda" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Type
            <select value={form.facilityType} onChange={(e) => setForm({ ...form, facilityType: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="PHC">PHC</option>
              <option value="CHC">CHC</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Location *
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="e.g. Rushikonda" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Today OPD
            <input type="number" value={form.todayOpd} onChange={(e) => setForm({ ...form, todayOpd: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">
            Bed Occupancy %
            <input type="number" min="0" max="100" value={form.bedOccupancy} onChange={(e) => setForm({ ...form, bedOccupancy: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name || !form.location} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Creating..." : "Create"}</button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { role } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const { data: apiFacilities, refetch: refetchFacilities } = useFacilities();
  const isDistrictOfficer = role === "district_officer";

  const sortedFacilities = useMemo(() => {
    if (apiFacilities && apiFacilities.length > 0) {
      return [...apiFacilities].sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0)) as unknown as Facility[];
    }
    return [...facilities].sort((a, b) => b.riskScore - a.riskScore);
  }, [apiFacilities]);

  const criticalFacility = sortedFacilities.find((f) => f.status === "critical") ?? sortedFacilities[0];
  const liveMetricCards = useLiveMetricCards();

  return (
    <div className="min-w-0 space-y-4 p-4 md:p-6 lg:p-7">
      <HeroPanel onCreate={() => setShowCreate(true)} canCreate={isDistrictOfficer} />

      <CriticalAlertBanner facility={criticalFacility} onActionPlan={() => setShowActionPlan(true)} />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {liveMetricCards.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="flex flex-wrap items-center gap-1.5">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-1.5 rounded-lg border border-outline-variant/20 bg-white/70 px-3 py-2 text-[12px] font-semibold text-brand-purple transition-colors hover:bg-brand-purple/5 hover:border-brand-purple/25"
          >
            <action.icon className="h-3.5 w-3.5" /> {action.label}
          </Link>
        ))}
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <FacilityRiskTable facilities={sortedFacilities} />
        <AIDistrictBrief />
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
        <DiseaseTrendChart />
        <MedicineStockCard />
      </section>

      {showCreate && <CreateFacilityModal onClose={() => setShowCreate(false)} onCreated={() => refetchFacilities()} />}
      {showActionPlan && <ActionPlanModal facility={criticalFacility} onClose={() => setShowActionPlan(false)} />}
    </div>
  );
}
