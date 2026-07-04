"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  MapPin, Users, Stethoscope, BedDouble, AlertTriangle,
  Pill, TrendingUp, Activity, ClipboardList, Sparkles,
  AlertCircle, Thermometer, CheckCircle, XCircle
} from "lucide-react";
import {
  facilities, getFacilityDoctors, getFacilityNurses,
  getFacilityMedicines, getFacilityPatients, getFacilityInsights
} from "@/lib/demo-data";

function StatBox({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-primary-fixed/20">
      <div className="text-primary font-label-sm uppercase tracking-widest">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color || "text-on-surface"}`}>{value}</div>
    </div>
  );
}

function HealthCard({ icon: Icon, label, value, status }: { icon: React.ElementType; label: string; value: string | number; status: string }) {
  const iconBg: Record<string, string> = {
    critical: "bg-error-container text-on-error-container",
    high: "bg-warning/10 text-warning",
    medium: "bg-primary-fixed text-primary",
    low: "bg-success/10 text-success",
  };
  const borderAccent: Record<string, string> = {
    critical: "border-l-error",
    high: "border-l-warning",
    medium: "border-l-primary",
    low: "border-l-success",
  };
  return (
    <div className={`glass-card rounded-2xl p-4 border-l-4 ${borderAccent[status]} hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg[status]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-primary font-label-sm uppercase tracking-widest truncate">{label}</p>
          <p className="text-xl font-semibold mt-0.5">{value}</p>
        </div>
        <span className={`pill pill-${status} shrink-0`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-outline-variant/10">
        <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ActionPlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="glass-card rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary"><Sparkles className="w-6 h-6" /></div>
            <h2 className="text-xl font-semibold">AI Action Plan</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><XCircle className="w-5 h-5 text-outline" /></button>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div className="glass-card rounded-2xl p-4 bg-primary-fixed/20 border border-primary/10">
            <p className="text-primary font-label-sm uppercase tracking-widest">Executive Summary</p>
            <p className="text-body-md mt-1 leading-relaxed">PHC Madhurawada is critically overloaded with 184 OPD today. Doctor shortage, medicine stock depletion, and a fever spike are compounding into a high-risk situation requiring immediate multi-department action.</p>
          </div>
          <div>
            <p className="text-primary font-label-sm uppercase tracking-widest mb-3">Top 3 Critical Issues</p>
            <div className="space-y-2">
              {[
                "Paracetamol stock critical — 2.2 days remaining with fever cases up 104%",
                "Dr. Rajesh Kumar absent — 32 active patients and 15 pending reviews unassigned",
                "Sr. Mary D. overloaded — 38 patients, 14 pending follow-ups, 5 high-risk"
              ].map((issue, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-error/5 border border-error/10"><AlertTriangle className="w-5 h-5 text-error mt-0.5 shrink-0" /><p className="text-body-md text-sm">{issue}</p></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Doctor Actions", items: ["Transfer 1 doctor from CHC Bheemili", "Redistribute 12 pending reviews to Dr. Arjun", "Dr. Mehta to see critical patients first"] },
              { title: "Nurse Actions", items: ["Transfer 8 low-risk follow-ups to Sr. Geeta", "Sr. Mary to prioritize 5 high-risk home visits", "Deploy 1 additional nurse from district pool"] },
              { title: "Medicine Actions", items: ["Urgent restock: 500 paracetamol from Narsipatnam", "Transfer 300 ORS packets from CHC Bheemili", "Order 20 insulin vials for next week"] },
              { title: "Patient Follow-up Actions", items: ["Venkata Rao (COPD) — home visit today", "Rama Devi (HTN+DM) — home visit today", "8 high-risk overdue follow-ups to be completed in 48h"] },
            ].map((section) => (
              <div key={section.title} className="glass-card rounded-2xl p-4">
                <p className="text-label-md font-bold text-primary mb-2">{section.title}</p>
                <ul className="space-y-1.5">{section.items.map((item, j) => <li key={j} className="flex items-start gap-2 text-body-md text-sm"><CheckCircle className="w-3.5 h-3.5 text-success mt-1 shrink-0" />{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-4 bg-success/5 border border-success/10">
            <div className="flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5 text-success" /><p className="text-label-md font-bold text-success">Impact Forecast</p></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              {[
                { label: "Stock-out Avoided", value: "2 meds" },
                { label: "High-risk Prioritized", value: "8 patients" },
                { label: "Doctor Workload Reduced", value: "18%" },
                { label: "Medicine Availability", value: "+2.8 days" },
                { label: "Critical Alerts", value: "3 generated" },
              ].map((item) => (
                <div key={item.label} className="p-2"><p className="text-xl font-semibold text-success">{item.value}</p><p className="text-on-surface-variant font-label-md">{item.label}</p></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 border-t border-outline-variant/10">
          <button onClick={onClose} className="gradient-button text-white px-6 py-2.5 rounded-lg text-label-md font-semibold active:scale-90 transition-transform">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function FacilityDetailPage() {
  const params = useParams();
  const facility = facilities.find((f) => f.id === params.id);
  const [showPlan, setShowPlan] = useState(false);

  if (!facility) return <div className="p-8 text-center text-outline">Facility not found</div>;

  const doctors = getFacilityDoctors(facility.id);
  const nurses = getFacilityNurses(facility.id);
  const meds = getFacilityMedicines(facility.id);
  const facilityPatients = getFacilityPatients(facility.id);
  const insights = getFacilityInsights(facility.id);

  const healthCards = [
    { icon: Activity, label: "Health Score", value: `${facility.healthScore}/100`, status: facility.healthScore < 40 ? "critical" : facility.healthScore < 60 ? "high" : facility.healthScore < 80 ? "medium" : "low" },
    { icon: Stethoscope, label: "Doctor Availability", value: `${facility.doctorsPresent}/${facility.totalDoctors} present`, status: facility.doctorsPresent < facility.totalDoctors ? "high" : "low" },
    { icon: Users, label: "Nurse Workload", value: `${facility.nursesPresent}/${facility.totalNurses} on duty`, status: facility.nursesPresent < facility.totalNurses ? "high" : "low" },
    { icon: Pill, label: "Medicine Stock Risk", value: `${facility.medicineStockIssues} issues`, status: facility.medicineStockIssues >= 3 ? "critical" : facility.medicineStockIssues >= 1 ? "high" : "low" },
    { icon: Thermometer, label: "Disease Spike Risk", value: `${facility.diseaseSpikeCount} spikes`, status: facility.diseaseSpikeRisk >= 70 ? "critical" : facility.diseaseSpikeRisk >= 40 ? "high" : "low" },
    { icon: BedDouble, label: "Bed Occupancy", value: `${facility.bedOccupancyRate}%`, status: facility.bedOccupancyRate >= 75 ? "critical" : facility.bedOccupancyRate >= 60 ? "high" : "low" },
  ];

  return (
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary font-label-sm uppercase tracking-widest font-semibold">{facility.type}</span>
                <span className={`pill pill-${facility.status}`}>{facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">{facility.name}</h1>
              <p className="text-body-lg text-on-surface-variant mt-2 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {facility.village}, {facility.mandal} · {facility.district}</p>
            </div>
            <button onClick={() => setShowPlan(true)} className="gradient-button text-white px-6 py-3 rounded-lg font-label-md font-semibold flex items-center gap-2 active:scale-90 transition-transform shadow-lg shadow-primary/20 shrink-0">
              <Sparkles className="w-5 h-5" /> Generate AI Action Plan
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatBox label="Today's OPD" value={facility.todayOpd} color="text-primary" />
            <StatBox label="7-day Avg OPD" value={facility.avgOpd7day} />
            <StatBox label="Risk Score" value={`${facility.riskScore}%`} color={facility.riskScore >= 70 ? "text-error" : facility.riskScore >= 40 ? "text-warning" : "text-success"} />
            <StatBox label="Critical Patients" value={facility.criticalPatients} color="text-error" />
            <StatBox label="Pending Follow-ups" value={facilityPatients.filter(p => p.followUpStatus === "pending" || p.followUpStatus === "overdue").length} color="text-warning" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {healthCards.map((c) => <HealthCard key={c.label} {...c} />)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Doctor Attendance" icon={Stethoscope}>
              <div className="space-y-2">
                {doctors.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/50 border-b border-outline-variant/10 hover:bg-surface-container-lowest/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${d.attendance === "present" ? "bg-success/10 text-success" : d.attendance === "absent" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"}`}>
                        {d.name.split(" ").pop()?.[0] || "D"}
                      </div>
                      <div><p className="text-label-md font-medium">{d.name}</p><p className="text-on-surface-variant font-label-md">{d.specialty}</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right"><p className="text-on-surface-variant font-label-md">Seen</p><p className="text-label-md font-semibold">{d.patientsSeenToday}</p></div>
                      <div className="text-right"><p className="text-on-surface-variant font-label-md">Pending</p><p className="text-label-md font-semibold">{d.pendingReviews}</p></div>
                      <span className={`pill ${d.attendance === "present" ? "pill-low" : d.attendance === "absent" ? "pill-critical" : "pill-medium"}`}>
                        {d.attendance === "present" ? "Present" : d.attendance === "absent" ? "Absent" : "On Leave"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Nurse Workload" icon={Users}>
              <div className="space-y-2">
                {nurses.map((n) => (
                  <div key={n.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/50 border-b border-outline-variant/10 hover:bg-surface-container-lowest/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-xs font-bold text-primary">{n.name.split(" ").pop()?.[0] || "N"}</div>
                      <div><p className="text-label-md font-medium">{n.name}</p><p className="text-on-surface-variant font-label-md">{n.assignedVillages.join(", ")}</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right"><p className="text-on-surface-variant font-label-md">Assigned</p><p className="text-label-md font-semibold">{n.assignedPatients}</p></div>
                      <div className="text-right"><p className="text-on-surface-variant font-label-md">Pending</p><p className="text-label-md font-semibold">{n.pendingFollowUps}</p></div>
                      <span className={`pill ${n.workloadStatus === "critical" ? "pill-critical" : n.workloadStatus === "high" ? "pill-high" : "pill-low"}`}>
                        {n.workloadStatus === "critical" ? "Critical" : n.workloadStatus === "high" ? "High" : "Normal"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Medicine Stock Risk" icon={Pill}>
              <div className="space-y-2">
                {meds.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/50 border-b border-outline-variant/10 hover:bg-surface-container-lowest/80 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-full max-w-[200px]"><p className="text-label-md font-medium truncate">{m.name}</p><p className="text-on-surface-variant font-label-md">{m.currentStock} units · {m.daysLeft.toFixed(1)} days left</p></div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 h-2 rounded-full bg-outline-variant/20 overflow-hidden"><div className={`h-full rounded-full ${m.risk === "critical" ? "bg-error" : m.risk === "high" ? "bg-warning" : m.risk === "medium" ? "bg-primary" : "bg-success"} ${m.risk === "critical" ? "" : m.risk === "high" ? "w-3/5" : m.risk === "medium" ? "w-2/5" : "w-1/5"}`} /></div>
                      <span className={`pill pill-${m.risk}`}>{m.risk.charAt(0).toUpperCase() + m.risk.slice(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Disease Trends" icon={TrendingUp}>
              <div className="space-y-3">
                {[
                  { condition: "Fever", thisWeek: 84, lastWeek: 41, risk: "critical" },
                  { condition: "Respiratory", thisWeek: 25, lastWeek: 18, risk: "medium" },
                  { condition: "Diarrhea", thisWeek: 12, lastWeek: 8, risk: "medium" },
                  { condition: "Hypertension", thisWeek: 56, lastWeek: 48, risk: "low" },
                ].map((d) => (
                  <div key={d.condition} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/50 border-b border-outline-variant/10 hover:bg-surface-container-lowest/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`pill-dot pill-dot-${d.risk}`} />
                      <span className="text-label-md font-medium">{d.condition}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right"><p className="text-on-surface-variant font-label-md">This Week</p><p className="text-label-md font-semibold">{d.thisWeek}</p></div>
                      <div className="text-right"><p className="text-on-surface-variant font-label-md">Last Week</p><p className="text-label-md font-semibold">{d.lastWeek}</p></div>
                      <div className={`text-label-md font-bold ${d.risk === "critical" ? "text-error" : d.risk === "medium" ? "text-warning" : "text-success"}`}>
                        {d.lastWeek ? `${Math.round((d.thisWeek - d.lastWeek) / d.lastWeek * 100)}%` : "N/A"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3.5 rounded-xl bg-warning/5 border border-warning/10 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                <div><p className="text-label-md font-medium text-warning">Fever Spike Alert</p><p className="text-on-surface-variant font-label-md mt-0.5">Fever cases up 104% vs last week. Paracetamol and ORS demand surging.</p></div>
              </div>
            </Panel>

            <Panel title="Patient Risk Summary" icon={AlertTriangle}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Total Patients", value: facility.totalPatients, color: "text-on-surface" },
                  { label: "Critical", value: facility.criticalPatients, color: "text-error" },
                  { label: "Overdue Follow-ups", value: facilityPatients.filter(p => p.followUpStatus === "overdue").length, color: "text-error" },
                  { label: "Pending", value: facilityPatients.filter(p => p.followUpStatus === "pending").length, color: "text-warning" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center text-center p-3 rounded-xl bg-primary-fixed/20"><p className="text-primary font-label-sm uppercase tracking-widest">{s.label}</p><p className={`text-xl font-semibold mt-1 ${s.color}`}>{s.value}</p></div>
                ))}
              </div>
              <div className="space-y-2">
                {facilityPatients.filter(p => p.riskScore === "Critical" || p.riskScore === "High").slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest/50 border-b border-outline-variant/10 hover:bg-surface-container-lowest/80 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${p.riskScore === "Critical" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"}`}>
                        {p.name.split(" ").map(s => s[0]).join("").slice(0, 2)}
                      </div>
                      <div><p className="text-label-md font-medium">{p.name}</p><p className="text-on-surface-variant font-label-md">{p.condition} · {p.village}</p></div>
                    </div>
                    <span className={`pill ${p.riskScore === "Critical" ? "pill-critical" : "pill-high"}`}>{p.riskScore}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Bed Occupancy" icon={BedDouble}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5"><span className="text-primary font-label-sm uppercase tracking-widest">Occupied</span><span className="text-label-sm font-semibold">{facility.bedsOccupied}/{facility.totalBeds}</span></div>
                    <div className="w-full h-3 rounded-full bg-outline-variant/20 overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${facility.bedOccupancyRate}%` }} /></div>
                  </div>
                  <div className="text-center px-4 py-2 bg-surface-container-lowest/50 rounded-xl"><p className="text-primary font-label-sm uppercase tracking-widest">Occupancy Rate</p><p className={`text-xl font-semibold mt-0.5 ${facility.bedOccupancyRate >= 75 ? "text-error" : facility.bedOccupancyRate >= 60 ? "text-warning" : "text-success"}`}>{facility.bedOccupancyRate}%</p></div>
                </div>
                <div className="rounded-xl bg-warning/5 border border-warning/10 p-3.5 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                  <div><p className="text-label-md font-medium text-warning">Bed Pressure Alert</p><p className="text-on-surface-variant font-label-md mt-0.5">{facility.totalBeds - facility.bedsOccupied} beds remaining. Fever surge may increase demand.</p></div>
                </div>
              </div>
            </Panel>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-outline-variant/10">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary"><ClipboardList className="w-6 h-6" /></div>
              <h3 className="text-xl font-semibold">Alerts ({insights.length})</h3>
            </div>
            <div className="space-y-3">
              {insights.map((insight) => (
                <div key={insight.id} className={`glass-card rounded-2xl p-3.5 flex items-start gap-3 border-l-4 ${insight.severity === "critical" ? "border-l-error bg-error/5" : insight.severity === "high" ? "border-l-warning bg-warning/5" : "border-l-primary bg-primary/5"}`}>
                  <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${insight.severity === "critical" ? "text-error" : insight.severity === "high" ? "text-warning" : "text-primary"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap"><p className="text-label-md font-medium">{insight.type}</p><span className={`pill pill-${insight.severity}`}>{insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}</span></div>
                    <p className="text-on-surface-variant text-body-md mt-0.5">{insight.summary}</p>
                    <p className="text-label-xs text-primary mt-1.5 font-medium">Recommendation: {insight.recommendation}</p>
                  </div>
                  <span className={`pill shrink-0 ${insight.status === "open" ? "pill-critical" : insight.status === "acknowledged" ? "pill-medium" : "pill-low"}`}>{insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showPlan && <ActionPlanModal onClose={() => setShowPlan(false)} />}
    </div>
  );
}
