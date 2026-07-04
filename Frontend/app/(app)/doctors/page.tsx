"use client";

import { useState } from "react";
import { Search, Eye, BarChart3, X, Sparkles } from "lucide-react";
import { doctors, getFacilityName } from "@/lib/demo-data";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || getFacilityName(d.facilityId).toLowerCase().includes(search.toLowerCase()));
  const doc = selected ? doctors.find((d) => d.id === selected) : null;

  return (
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">STAFF</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">Doctor CRM</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">{doctors.length} doctors across all facilities</p>
            </div>
            <button className="border border-primary text-primary px-5 py-2.5 rounded-lg font-label-md font-medium flex items-center gap-2 hover:bg-primary/5 transition-all"><BarChart3 className="w-4 h-4" /> Analyze Doctor Load</button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input type="text" placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none text-body-md placeholder:text-outline/50 transition-all" />
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                    {["Doctor", "Facility", "Specialty", "Attendance", "Seen Today", "Capacity", "Active Patients", "High-risk", "Pending Reviews", "Workload", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5 text-primary font-label-sm uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} className="border-b border-outline-variant/10 hover:bg-primary-fixed/30 transition-colors cursor-pointer" onClick={() => setSelected(d.id)}>
                      <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-xs font-bold text-primary">Dr</div><span className="font-label-md font-medium">{d.name}</span></div></td>
                      <td className="px-4 py-4 font-label-md">{getFacilityName(d.facilityId)}</td>
                      <td className="px-4 py-4 font-label-md">{d.specialty}</td>
                      <td className="px-4 py-4"><span className={`pill ${d.attendance === "present" ? "pill-present" : d.attendance === "absent" ? "pill-absent" : "pill-leave"}`}>{d.attendance.charAt(0).toUpperCase() + d.attendance.slice(1)}</span></td>
                      <td className="px-4 py-4 font-label-md font-semibold">{d.patientsSeenToday}</td>
                      <td className="px-4 py-4 font-label-md">{d.maxCapacity}</td>
                      <td className="px-4 py-4 font-label-md">{d.activePatients}</td>
                      <td className="px-4 py-4 font-label-md">{d.highRiskPatients}</td>
                      <td className="px-4 py-4 font-label-md">{d.pendingReviews}</td>
                      <td className="px-4 py-4"><span className={`pill ${d.workloadStatus === "normal" ? "pill-low" : d.workloadStatus === "high" ? "pill-high" : "pill-critical"}`}>{d.workloadStatus.charAt(0).toUpperCase() + d.workloadStatus.slice(1)}</span></td>
                      <td className="px-4 py-4"><Eye className="w-4 h-4 text-outline hover:text-primary transition-colors" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {doc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="glass-card rounded-2xl w-full max-w-lg mx-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-sm font-bold text-primary">Dr</div><div><h2 className="text-xl font-semibold text-on-surface">{doc.name}</h2><p className="text-on-surface-variant font-label-md">{doc.specialty} · {getFacilityName(doc.facilityId)}</p></div></div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">Staff Details</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Attendance", value: doc.attendance.charAt(0).toUpperCase() + doc.attendance.slice(1), color: doc.attendance === "present" ? "pill-present" : doc.attendance === "absent" ? "pill-absent" : "pill-leave" },
                  { label: "Seen Today", value: `${doc.patientsSeenToday} / ${doc.maxCapacity}` },
                  { label: "Active Patients", value: doc.activePatients },
                  { label: "Pending Reviews", value: doc.pendingReviews },
                  { label: "High-risk Patients", value: doc.highRiskPatients },
                  { label: "Workload", value: doc.workloadStatus.charAt(0).toUpperCase() + doc.workloadStatus.slice(1), color: doc.workloadStatus === "normal" ? "pill-low" : doc.workloadStatus === "high" ? "pill-high" : "pill-critical" },
                ].map((s) => (
                  <div key={s.label} className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">{s.label}</p>{s.color ? <span className={`pill mt-0.5 ${s.color}`}>{s.value}</span> : <p className="font-label-md font-bold mt-0.5 text-on-surface">{s.value}</p>}</div>
                ))}
              </div>
              <div className="rounded-xl bg-primary-fixed/30 border border-primary/10 p-4 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div><p className="font-label-md font-medium text-primary">AI Redistribution Suggestion</p><p className="text-label-sm text-outline mt-0.5">Transfer {doc.pendingReviews > 10 ? "8" : "3"} pending reviews to available colleagues. Prioritize {doc.highRiskPatients} high-risk patients for immediate review.</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
