"use client";

import { useState } from "react";
import type { ElementType, ReactNode } from "react";
import { useParams } from "next/navigation";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BedDouble,
  CheckCircle,
  ClipboardList,
  MapPin,
  Pill,
  Sparkles,
  Stethoscope,
  Thermometer,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useFacilityDetail } from "@/lib/api";

const statusLabel: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

function riskFromValue(value: number): string {
  if (value >= 85) return "critical";
  if (value >= 70) return "high";
  if (value >= 45) return "medium";
  return "low";
}

function StatBox({ label, value, color = "text-on-surface" }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="card-glass min-w-0 p-3">
      <p className="truncate text-label-xs uppercase tracking-widest text-outline">{label}</p>
      <p className={`mt-1 text-xl font-bold leading-none ${color}`}>{value}</p>
    </div>
  );
}

function HealthCard({ icon: Icon, label, value, status }: { icon: ElementType; label: string; value: string | number; status: string }) {
  return (
    <div className="card-glass min-w-0 p-3">
      <div className="flex items-center gap-2">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${status === "critical" ? "bg-error/10 text-error" : status === "high" ? "bg-warning/10 text-warning" : status === "medium" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-bold uppercase tracking-widest text-outline">{label}</p>
          <p className="truncate text-label-md font-bold text-on-surface">{value}</p>
        </div>
      </div>
      <span className={`pill pill-${status} mt-2`}>{statusLabel[status] ?? status}</span>
    </div>
  );
}

function Panel({ title, icon: Icon, children, action }: { title: string; icon: ElementType; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="card-glass min-w-0 p-4">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-outline-variant/10 pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10">
            <Icon className="h-4 w-4 text-brand-purple" />
          </div>
          <h3 className="truncate text-label-md font-bold text-on-surface">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function ActionPlanModal({ onClose }: { onClose: () => void }) {
  const sections = [
    { title: "Doctor Actions", items: ["Move one doctor from CHC Bheemunipatnam", "Redistribute 12 pending reviews", "Review high-risk patients first"] },
    { title: "Nurse Actions", items: ["Route 8 low-risk follow-ups to Sr. Revathi", "Prioritize 5 high-risk home visits", "Deploy one district nurse"] },
    { title: "Medicine Actions", items: ["Transfer 500 Paracetamol strips", "Move 300 ORS packets", "Order insulin buffer for next week"] },
    { title: "Patient Actions", items: ["Home visit for overdue chronic cases", "Complete fever follow-ups in 48h", "Send ANC reminders today"] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-3xl overflow-y-auto" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple/10"><Sparkles className="h-4 w-4 text-brand-purple" /></div>
            <div>
              <h2 className="text-headline-sm font-bold">AI Action Plan</h2>
              <p className="text-label-xs text-outline">Priority plan for the next 24 hours</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-container-high"><XCircle className="h-4 w-4" /></button>
        </div>
        <div className="space-y-4 px-5 py-4">
          <div className="rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-4">
            <p className="text-label-xs uppercase tracking-widest text-outline">Executive Summary</p>
            <p className="mt-1 text-label-md text-on-surface">PHC Madhurawada is critically overloaded. Doctor shortage, low fever medicine stock, and 96% bed occupancy require immediate redistribution and restocking.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-outline-variant/20 bg-white/70 p-3">
                <p className="mb-2 text-label-md font-bold text-brand-purple">{section.title}</p>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-label-sm text-on-surface">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-success/10 bg-success/5 p-3 md:grid-cols-5">
            {[
              ["Stock-outs Avoided", "2"],
              ["High-risk Prioritized", "8"],
              ["Doctor Load Cut", "18%"],
              ["Medicine Days Added", "2.8"],
              ["Critical Alerts", "3"],
            ].map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="text-lg font-bold text-success">{value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-outline">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end border-t border-outline-variant/10 px-5 py-4">
          <button onClick={onClose} className="gradient-button rounded-xl px-5 py-2 text-label-md font-semibold text-white">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function FacilityDetailPage() {
  const params = useParams();
  const facilityId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: facility, loading } = useFacilityDetail(facilityId);
  const [showPlan, setShowPlan] = useState(false);

  if (loading) return <div className="p-8 text-center text-outline">Loading facility...</div>;
  if (!facility || facility.status === "not_found") return <div className="p-8 text-center text-outline">Facility not found</div>;

  const doctors = facility.doctors ?? [];
  const nurses = facility.nurses ?? [];
  const meds = facility.medicines ?? [];
  const facilityPatients = facility.patients ?? [];
  const insights = facility.insights ?? [];
  const pendingFollowUps = facilityPatients.filter((patient) => patient.followUpStatus === "pending" || patient.followUpStatus === "overdue").length;
  const highRiskPatients = facilityPatients.filter((patient) => patient.riskScore === "Critical" || patient.riskScore === "High");

  const healthCards = [
    { icon: Activity, label: "Health Score", value: `${facility.healthScore}/100`, status: riskFromValue(100 - facility.healthScore) },
    { icon: Stethoscope, label: "Doctors", value: `${facility.doctorsPresent}/${facility.totalDoctors} present`, status: facility.doctorsPresent < facility.totalDoctors ? "high" : "low" },
    { icon: Users, label: "Nurses", value: `${facility.nursesPresent}/${facility.totalNurses} on duty`, status: facility.nursesPresent < facility.totalNurses ? "high" : "low" },
    { icon: Pill, label: "Medicine", value: `${facility.medicineStockIssues} issues`, status: facility.medicineStockIssues >= 3 ? "critical" : facility.medicineStockIssues >= 1 ? "high" : "low" },
    { icon: Thermometer, label: "Disease", value: `${facility.diseaseSpikeCount} spikes`, status: riskFromValue(facility.diseaseSpikeRisk) },
    { icon: BedDouble, label: "Beds", value: `${facility.bedOccupancyRate}%`, status: riskFromValue(facility.bedOccupancyRate) },
  ];

  return (
    <div className="space-y-4 p-4 md:p-5">
      <section className="card-glass p-4 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-label-xs font-bold uppercase tracking-widest text-outline">{facility.type}</span>
              <span className={`pill pill-${facility.status}`}>{statusLabel[facility.status] ?? facility.status}</span>
            </div>
            <h1 className="mt-1 truncate text-headline-md font-bold text-on-surface md:text-headline-lg">{facility.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-label-sm text-outline"><MapPin className="h-3.5 w-3.5" /> {facility.village}, {facility.mandal} - {facility.district}</p>
          </div>
          <button onClick={() => setShowPlan(true)} className="gradient-button flex items-center gap-2 rounded-xl px-4 py-2.5 text-label-sm font-semibold text-white shadow-lg shadow-brand-purple/15">
            <Sparkles className="h-4 w-4" /> Generate AI Action Plan
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        <StatBox label="Today's OPD" value={facility.todayOpd} color="text-brand-purple" />
        <StatBox label="7-day Avg" value={facility.avgOpd7day} />
        <StatBox label="Risk Score" value={`${facility.riskScore}%`} color={facility.riskScore >= 70 ? "text-error" : facility.riskScore >= 45 ? "text-warning" : "text-success"} />
        <StatBox label="Doctors" value={`${facility.doctorsPresent}/${facility.totalDoctors}`} />
        <StatBox label="Nurses" value={`${facility.nursesPresent}/${facility.totalNurses}`} />
        <StatBox label="Critical Patients" value={facility.criticalPatients} color="text-error" />
        <StatBox label="Follow-ups" value={pendingFollowUps} color="text-warning" />
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {healthCards.map((card) => <HealthCard key={card.label} {...card} />)}
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="Doctor Attendance" icon={Stethoscope} action={<span className="text-label-xs font-bold text-outline">{doctors.length} doctors</span>}>
            <div className="space-y-2">
              {doctors.length > 0 ? doctors.map((doctor) => (
                <div key={doctor.id} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-outline-variant/20 bg-white/60 p-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-label-md font-bold text-on-surface">{doctor.name}</p>
                    <p className="truncate text-[11px] text-outline">{doctor.specialty}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-label-xs font-bold text-on-surface">{doctor.patientsSeenToday}/{doctor.maxCapacity}</span>
                    <span className={`pill ${doctor.attendance === "present" ? "pill-low" : doctor.attendance === "absent" ? "pill-critical" : "pill-medium"}`}>{doctor.attendance}</span>
                  </div>
                </div>
              )) : <p className="text-label-sm text-outline">No doctors assigned.</p>}
            </div>
          </Panel>

          <Panel title="Nurse Workload" icon={Users} action={<span className="text-label-xs font-bold text-outline">{nurses.length} nurses</span>}>
            <div className="space-y-2">
              {nurses.length > 0 ? nurses.map((nurse) => (
                <div key={nurse.id} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-outline-variant/20 bg-white/60 p-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-label-md font-bold text-on-surface">{nurse.name}</p>
                    <p className="truncate text-[11px] text-outline">{nurse.assignedVillages.join(", ")}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-label-xs font-bold text-on-surface">{nurse.pendingFollowUps} pending</span>
                    <span className={`pill ${nurse.workloadStatus === "critical" ? "pill-critical" : nurse.workloadStatus === "high" ? "pill-high" : "pill-low"}`}>{nurse.workloadStatus}</span>
                  </div>
                </div>
              )) : <p className="text-label-sm text-outline">No nurses assigned.</p>}
            </div>
          </Panel>

          <Panel title="Medicine Stock Risk" icon={Pill}>
            <div className="space-y-2">
              {meds.length > 0 ? meds.map((medicine) => (
                <div key={medicine.id} className="rounded-2xl border border-outline-variant/20 bg-white/60 p-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-label-md font-bold text-on-surface">{medicine.name}</p>
                      <p className="text-[11px] text-outline">{medicine.currentStock} units - {medicine.daysLeft.toFixed(1)} days left</p>
                    </div>
                    <span className={`pill pill-${medicine.risk}`}>{statusLabel[medicine.risk] ?? medicine.risk}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-outline-variant/20">
                    <div className={`h-full rounded-full ${medicine.risk === "critical" ? "bg-error" : medicine.risk === "high" ? "bg-warning" : medicine.risk === "medium" ? "bg-primary" : "bg-success"}`} style={{ width: `${Math.min(100, (medicine.daysLeft / 16) * 100)}%` }} />
                  </div>
                </div>
              )) : <p className="text-label-sm text-outline">No active medicine stock risk for this facility.</p>}
            </div>
          </Panel>

          <Panel title="Disease & Bed Pressure" icon={TrendingUp}>
            <div className="space-y-2">
              {[
                { label: "Disease spike score", value: `${facility.diseaseSpikeRisk}%`, icon: Thermometer, status: riskFromValue(facility.diseaseSpikeRisk) },
                { label: "Bed occupancy", value: `${facility.bedOccupancyRate}%`, icon: BedDouble, status: riskFromValue(facility.bedOccupancyRate) },
                { label: "Open alerts", value: facility.openAlerts, icon: AlertCircle, status: facility.openAlerts >= 6 ? "critical" : facility.openAlerts >= 3 ? "high" : "low" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-outline-variant/20 bg-white/60 p-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10">
                      <item.icon className="h-4 w-4 text-brand-purple" />
                    </div>
                    <p className="truncate text-label-md font-semibold text-on-surface">{item.label}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-label-md font-bold text-on-surface">{item.value}</p>
                    <span className={`pill pill-${item.status}`}>{statusLabel[item.status] ?? item.status}</span>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-warning/10 bg-warning/5 p-2.5">
                <p className="text-label-sm font-bold text-warning">Fever and dengue watch</p>
                <p className="mt-0.5 text-[11px] text-outline">Paracetamol and ORS pressure may rise over the next 24 hours.</p>
              </div>
            </div>
          </Panel>
        </div>

        <aside className="min-w-0 space-y-4">
          <div className="card-glass p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-purple/10"><Sparkles className="h-4 w-4 text-brand-purple" /></div>
              <div>
                <h2 className="text-headline-sm font-bold text-on-surface">AI Facility Brief</h2>
                <p className="text-label-xs text-outline">Current intervention priority</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                `Risk score is ${facility.riskScore}% with bed occupancy at ${facility.bedOccupancyRate}%.`,
                `${facility.medicineStockIssues} medicine pressure point${facility.medicineStockIssues === 1 ? "" : "s"} require stock movement.`,
                `${pendingFollowUps} patient follow-ups need routing through doctors and nurses.`,
              ].map((text) => (
                <div key={text} className="flex gap-2 rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-2.5">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-purple" />
                  <p className="text-label-sm leading-5 text-on-surface">{text}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowPlan(true)} className="gradient-button mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-label-md font-semibold text-white">
              <Sparkles className="h-4 w-4" /> Generate Action Plan
            </button>
          </div>

          <Panel title="Patient Risk Summary" icon={AlertTriangle}>
            <div className="grid grid-cols-2 gap-2">
              <StatBox label="Total" value={facility.totalPatients} />
              <StatBox label="Critical" value={facility.criticalPatients} color="text-error" />
            </div>
            <div className="mt-3 space-y-2">
              {highRiskPatients.slice(0, 4).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between gap-2 rounded-2xl border border-outline-variant/20 bg-white/60 p-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-label-md font-bold text-on-surface">{patient.name}</p>
                    <p className="truncate text-[11px] text-outline">{patient.condition} - {patient.village}</p>
                  </div>
                  <span className={`pill ${patient.riskScore === "Critical" ? "pill-critical" : "pill-high"}`}>{patient.riskScore}</span>
                </div>
              ))}
              {highRiskPatients.length === 0 && <p className="text-label-sm text-outline">No high-risk patients.</p>}
            </div>
          </Panel>

          <Panel title={`Alerts (${insights.length})`} icon={ClipboardList}>
            <div className="space-y-2">
              {insights.length > 0 ? insights.map((insight) => (
                <div key={insight.id} className="rounded-2xl border border-outline-variant/20 bg-white/60 p-2.5">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="truncate text-label-sm font-bold text-on-surface">{insight.type}</p>
                    <span className={`pill pill-${insight.severity}`}>{statusLabel[insight.severity] ?? insight.severity}</span>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-4 text-outline">{insight.summary}</p>
                </div>
              )) : <p className="text-label-sm text-outline">No active AI alerts for this facility.</p>}
            </div>
          </Panel>
        </aside>
      </section>

      {showPlan && <ActionPlanModal onClose={() => setShowPlan(false)} />}
    </div>
  );
}
