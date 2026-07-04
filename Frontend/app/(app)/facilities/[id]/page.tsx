"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin, Users, Stethoscope, BedDouble, AlertTriangle,
  Pill, TrendingUp, Activity, ClipboardList, Sparkles,
  AlertCircle, Thermometer, CheckCircle, XCircle
} from "lucide-react";
import {
  facilities, getFacilityDoctors, getFacilityNurses,
  getFacilityMedicines, getFacilityPatients, getFacilityInsights
} from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

function statusDotColor(status: string) {
  switch (status) {
    case "critical": return "bg-[#ef4444]";
    case "high": return "bg-[#f59e0b]";
    case "medium": return "bg-[#ca8a04]";
    default: return "bg-[#10b981]";
  }
}

function badgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "critical" || s === "open" || s === "absent") return "badge-critical";
  if (s === "high") return "badge-high";
  if (s === "medium" || s === "acknowledged") return "badge-medium";
  return "badge-low";
}

function StatBox({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e4e4e7] text-center">
      <div className="text-sm text-[#a1a1aa]">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color || ""}`}>{value}</div>
    </div>
  );
}

function HealthCard({ icon: Icon, label, value, status }: { icon: React.ElementType; label: string; value: string | number; status: string }) {
  const iconBg: Record<string, string> = {
    critical: "bg-[#fef2f2] text-[#dc2626]",
    high: "bg-[#fff7ed] text-[#ea580c]",
    medium: "bg-[#fefce8] text-[#ca8a04]",
    low: "bg-[#f0fdf4] text-[#16a34a]",
  };
  const borderAccent: Record<string, string> = {
    critical: "border-l-[#ef4444]",
    high: "border-l-[#f59e0b]",
    medium: "border-l-[#ca8a04]",
    low: "border-l-[#10b981]",
  };
  return (
    <div className={`bg-white rounded-2xl p-5 border border-[#e4e4e7] border-l-4 ${borderAccent[status]}`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg[status]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#a1a1aa] uppercase tracking-wider truncate">{label}</p>
          <p className="text-base font-semibold mt-0.5">{value}</p>
        </div>
        <span className={badgeClass(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#e4e4e7]">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eef2ff] text-[#6366f1]">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ActionPlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto border border-[#e4e4e7]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e4e4e7]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eef2ff] text-[#6366f1]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">AI Action Plan</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f4f4f5] transition-colors">
            <XCircle className="w-5 h-5 text-[#a1a1aa]" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div className="bg-[#eef2ff] rounded-xl p-4 border border-[#6366f1]/20">
            <p className="text-xs text-[#6366f1] uppercase tracking-wider font-semibold">Executive Summary</p>
            <p className="text-sm mt-1 leading-relaxed">PHC Madhurawada is critically overloaded with 184 OPD today. Doctor shortage, medicine stock depletion, and a fever spike are compounding into a high-risk situation requiring immediate multi-department action.</p>
          </div>
          <div>
            <p className="text-xs text-[#6366f1] uppercase tracking-wider font-semibold mb-3">Top 3 Critical Issues</p>
            <div className="space-y-2">
              {[
                "Paracetamol stock critical — 2.2 days remaining with fever cases up 104%",
                "Dr. Rajesh Kumar absent — 32 active patients and 15 pending reviews unassigned",
                "Sr. Mary D. overloaded — 38 patients, 14 pending follow-ups, 5 high-risk"
              ].map((issue, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#fef2f2] border border-[#ef4444]/20">
                  <AlertTriangle className="w-5 h-5 text-[#dc2626] mt-0.5 shrink-0" />
                  <p className="text-sm">{issue}</p>
                </div>
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
              <div key={section.title} className="bg-white rounded-xl p-4 border border-[#e4e4e7]">
                <p className="text-xs font-bold text-[#6366f1] mb-2 uppercase tracking-wider">{section.title}</p>
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-[#16a34a] mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-[#f0fdf4] rounded-xl p-4 border border-[#16a34a]/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-[#16a34a]" />
              <p className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">Impact Forecast</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              {[
                { label: "Stock-out Avoided", value: "2 meds" },
                { label: "High-risk Prioritized", value: "8 patients" },
                { label: "Doctor Workload Reduced", value: "18%" },
                { label: "Medicine Availability", value: "+2.8 days" },
                { label: "Critical Alerts", value: "3 generated" },
              ].map((item) => (
                <div key={item.label} className="p-2">
                  <p className="text-lg font-semibold text-[#16a34a]">{item.value}</p>
                  <p className="text-xs text-[#a1a1aa]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 border-t border-[#e4e4e7]">
          <button onClick={onClose} className="btn-secondary px-6 py-2.5 rounded-lg text-sm font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function FacilityDetailPage() {
  const params = useParams();
  const facility = facilities.find((f) => f.id === params.id);
  const [showPlan, setShowPlan] = useState(false);

  if (!facility) return <div className="p-6 text-center text-[#a1a1aa]">Facility not found</div>;

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
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      <motion.div variants={fadeUp}>
        <section className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-wider">{facility.type}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(facility.status)}`} />
                <span className={badgeClass(facility.status)}>
                  {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">{facility.name}</h1>
              <p className="text-sm text-[#a1a1aa] mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {facility.village}, {facility.mandal} · {facility.district}
              </p>
            </div>
            <button onClick={() => setShowPlan(true)} className="btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shrink-0">
              <Sparkles className="w-4 h-4" /> Generate AI Action Plan
            </button>
          </div>
        </section>
      </motion.div>

      <motion.div variants={fadeUp}>
        <section className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatBox label="Today's OPD" value={facility.todayOpd} color="text-[#6366f1]" />
            <StatBox label="7-day Avg OPD" value={facility.avgOpd7day} />
            <StatBox label="Risk Score" value={`${facility.riskScore}%`} color={facility.riskScore >= 70 ? "text-[#dc2626]" : facility.riskScore >= 40 ? "text-[#f59e0b]" : "text-[#16a34a]"} />
            <StatBox label="Critical Patients" value={facility.criticalPatients} color="text-[#dc2626]" />
            <StatBox label="Pending Follow-ups" value={facilityPatients.filter(p => p.followUpStatus === "pending" || p.followUpStatus === "overdue").length} color="text-[#f59e0b]" />
          </div>
        </section>
      </motion.div>

      <motion.div variants={fadeUp}>
        <section className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {healthCards.map((c) => <HealthCard key={c.label} {...c} />)}
          </div>
        </section>
      </motion.div>

      <motion.div variants={fadeUp}>
        <section className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="Doctor Attendance" icon={Stethoscope}>
              <div className="space-y-2">
                {doctors.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-xl border-b border-[#e4e4e7] last:border-b-0 hover:bg-[#f4f4f5] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${d.attendance === "present" ? "bg-[#f0fdf4] text-[#16a34a]" : d.attendance === "absent" ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#fefce8] text-[#ca8a04]"}`}>
                        {d.name.split(" ").pop()?.[0] || "D"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{d.name}</p>
                        <p className="text-xs text-[#a1a1aa]">{d.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-[#a1a1aa]">Seen</p>
                        <p className="text-sm font-semibold">{d.patientsSeenToday}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#a1a1aa]">Pending</p>
                        <p className="text-sm font-semibold">{d.pendingReviews}</p>
                      </div>
                      <span className={d.attendance === "present" ? "badge-low" : d.attendance === "absent" ? "badge-critical" : "badge-medium"}>
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
                  <div key={n.id} className="flex items-center justify-between p-3 rounded-xl border-b border-[#e4e4e7] last:border-b-0 hover:bg-[#f4f4f5] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-[#eef2ff] text-[#6366f1]">
                        {n.name.split(" ").pop()?.[0] || "N"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{n.name}</p>
                        <p className="text-xs text-[#a1a1aa]">{n.assignedVillages.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-[#a1a1aa]">Assigned</p>
                        <p className="text-sm font-semibold">{n.assignedPatients}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#a1a1aa]">Pending</p>
                        <p className="text-sm font-semibold">{n.pendingFollowUps}</p>
                      </div>
                      <span className={badgeClass(n.workloadStatus)}>
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
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl border-b border-[#e4e4e7] last:border-b-0 hover:bg-[#f4f4f5] transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-full max-w-[200px]">
                        <p className="text-sm font-medium truncate">{m.name}</p>
                        <p className="text-xs text-[#a1a1aa]">{m.currentStock} units · {m.daysLeft.toFixed(1)} days left</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 h-2 rounded-full bg-[#e4e4e7] overflow-hidden">
                        <div className={`h-full rounded-full ${m.risk === "critical" ? "bg-[#ef4444] w-full" : m.risk === "high" ? "bg-[#f59e0b] w-3/5" : m.risk === "medium" ? "bg-[#ca8a04] w-2/5" : "bg-[#10b981] w-1/5"}`} />
                      </div>
                      <span className={badgeClass(m.risk)}>
                        {m.risk.charAt(0).toUpperCase() + m.risk.slice(1)}
                      </span>
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
                  <div key={d.condition} className="flex items-center justify-between p-3 rounded-xl border-b border-[#e4e4e7] last:border-b-0 hover:bg-[#f4f4f5] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${d.risk === "critical" ? "bg-[#ef4444]" : d.risk === "medium" ? "bg-[#ca8a04]" : "bg-[#10b981]"}`} />
                      <span className="text-sm font-medium">{d.condition}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-[#a1a1aa]">This Week</p>
                        <p className="text-sm font-semibold">{d.thisWeek}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#a1a1aa]">Last Week</p>
                        <p className="text-sm font-semibold">{d.lastWeek}</p>
                      </div>
                      <div className={`text-sm font-bold ${d.risk === "critical" ? "text-[#dc2626]" : d.risk === "medium" ? "text-[#f59e0b]" : "text-[#16a34a]"}`}>
                        {d.lastWeek ? `${Math.round((d.thisWeek - d.lastWeek) / d.lastWeek * 100)}%` : "N/A"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3.5 rounded-xl bg-[#fff7ed] border border-[#f59e0b]/20 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#f59e0b]">Fever Spike Alert</p>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">Fever cases up 104% vs last week. Paracetamol and ORS demand surging.</p>
                </div>
              </div>
            </Panel>

            <Panel title="Patient Risk Summary" icon={AlertTriangle}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Total Patients", value: facility.totalPatients, color: "" },
                  { label: "Critical", value: facility.criticalPatients, color: "text-[#dc2626]" },
                  { label: "Overdue Follow-ups", value: facilityPatients.filter(p => p.followUpStatus === "overdue").length, color: "text-[#dc2626]" },
                  { label: "Pending", value: facilityPatients.filter(p => p.followUpStatus === "pending").length, color: "text-[#f59e0b]" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 border border-[#e4e4e7] text-center">
                    <p className="text-xs text-[#a1a1aa] uppercase tracking-wider">{s.label}</p>
                    <p className={`text-lg font-semibold mt-1 ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {facilityPatients.filter(p => p.riskScore === "Critical" || p.riskScore === "High").slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl border-b border-[#e4e4e7] last:border-b-0 hover:bg-[#f4f4f5] transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${p.riskScore === "Critical" ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#fff7ed] text-[#ea580c]"}`}>
                        {p.name.split(" ").map(s => s[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-[#a1a1aa]">{p.condition} · {p.village}</p>
                      </div>
                    </div>
                    <span className={badgeClass(p.riskScore)}>{p.riskScore}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Bed Occupancy" icon={BedDouble}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-[#a1a1aa] uppercase tracking-wider">Occupied</span>
                      <span className="text-sm font-semibold">{facility.bedsOccupied}/{facility.totalBeds}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#e4e4e7] overflow-hidden">
                      <div className="h-full rounded-full bg-[#6366f1]" style={{ width: `${facility.bedOccupancyRate}%` }} />
                    </div>
                  </div>
                  <div className="text-center px-4 py-2 bg-white rounded-xl border border-[#e4e4e7]">
                    <p className="text-xs text-[#a1a1aa] uppercase tracking-wider">Occupancy Rate</p>
                    <p className={`text-lg font-semibold mt-0.5 ${facility.bedOccupancyRate >= 75 ? "text-[#dc2626]" : facility.bedOccupancyRate >= 60 ? "text-[#f59e0b]" : "text-[#16a34a]"}`}>
                      {facility.bedOccupancyRate}%
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-[#fff7ed] border border-[#f59e0b]/20 p-3.5 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#f59e0b]">Bed Pressure Alert</p>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">{facility.totalBeds - facility.bedsOccupied} beds remaining. Fever surge may increase demand.</p>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </section>
      </motion.div>

      <motion.div variants={fadeUp}>
        <section className="py-6">
          <div className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#e4e4e7]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eef2ff] text-[#6366f1]">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold">Alerts ({insights.length})</h3>
            </div>
            <div className="space-y-3">
              {insights.map((insight) => (
                <div key={insight.id} className={`bg-white rounded-xl p-4 border border-[#e4e4e7] border-l-4 flex items-start gap-3 ${insight.severity === "critical" ? "border-l-[#ef4444]" : insight.severity === "high" ? "border-l-[#f59e0b]" : "border-l-[#ca8a04]"}`}>
                  <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${insight.severity === "critical" ? "text-[#dc2626]" : insight.severity === "high" ? "text-[#f59e0b]" : "text-[#ca8a04]"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium">{insight.type}</p>
                      <span className={badgeClass(insight.severity)}>
                        {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">{insight.summary}</p>
                    <p className="text-xs text-[#6366f1] mt-1.5 font-medium">Recommendation: {insight.recommendation}</p>
                  </div>
                  <span className={`shrink-0 ${insight.status === "open" ? "badge-critical" : insight.status === "acknowledged" ? "badge-medium" : "badge-low"}`}>
                    {insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {showPlan && <ActionPlanModal onClose={() => setShowPlan(false)} />}
    </motion.div>
  );
}
