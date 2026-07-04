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
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">STAFF</p>
          <h1 className="text-headline-lg font-bold text-on-surface mt-1">Doctor CRM</h1>
          <p className="text-label-sm text-outline mt-0.5">{doctors.length} doctors across all facilities</p>
        </div>
        <button className="card-glass px-4 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all"><BarChart3 className="w-4 h-4 text-brand-purple" /> Analyze Doctor Load</button>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
        <input type="text" placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/50 transition-all" />
      </div>
      <div className="card-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/10">
                {["Doctor", "Facility", "Specialty", "Attendance", "Seen Today", "Capacity", "Active Patients", "High-risk", "Pending Reviews", "Workload", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-label-xs text-outline uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest/50 transition-colors cursor-pointer" onClick={() => setSelected(d.id)}>
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-xs font-bold text-brand-purple">Dr</div><span className="text-label-md font-medium">{d.name}</span></div></td>
                  <td className="px-4 py-3 text-label-md">{getFacilityName(d.facilityId)}</td>
                  <td className="px-4 py-3 text-label-md">{d.specialty}</td>
                  <td className="px-4 py-3"><span className={`pill ${d.attendance === "present" ? "pill-low" : d.attendance === "absent" ? "pill-critical" : "pill-medium"}`}>{d.attendance.charAt(0).toUpperCase() + d.attendance.slice(1)}</span></td>
                  <td className="px-4 py-3 text-label-md font-semibold">{d.patientsSeenToday}</td>
                  <td className="px-4 py-3 text-label-md">{d.maxCapacity}</td>
                  <td className="px-4 py-3 text-label-md">{d.activePatients}</td>
                  <td className="px-4 py-3 text-label-md">{d.highRiskPatients}</td>
                  <td className="px-4 py-3 text-label-md">{d.pendingReviews}</td>
                  <td className="px-4 py-3"><span className={`pill ${d.workloadStatus === "normal" ? "pill-low" : d.workloadStatus === "high" ? "pill-high" : "pill-critical"}`}>{d.workloadStatus.charAt(0).toUpperCase() + d.workloadStatus.slice(1)}</span></td>
                  <td className="px-4 py-3"><Eye className="w-4 h-4 text-outline hover:text-brand-purple transition-colors" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {doc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="card-glass w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-sm font-bold text-brand-purple">Dr</div><div><h2 className="text-headline-sm font-bold">{doc.name}</h2><p className="text-label-xs text-outline">{doc.specialty} · {getFacilityName(doc.facilityId)}</p></div></div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Staff Details</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Attendance", value: doc.attendance.charAt(0).toUpperCase() + doc.attendance.slice(1), color: doc.attendance === "present" ? "pill-low" : doc.attendance === "absent" ? "pill-critical" : "pill-medium" },
                  { label: "Seen Today", value: `${doc.patientsSeenToday} / ${doc.maxCapacity}` },
                  { label: "Active Patients", value: doc.activePatients },
                  { label: "Pending Reviews", value: doc.pendingReviews },
                  { label: "High-risk Patients", value: doc.highRiskPatients },
                  { label: "Workload", value: doc.workloadStatus.charAt(0).toUpperCase() + doc.workloadStatus.slice(1), color: doc.workloadStatus === "normal" ? "pill-low" : doc.workloadStatus === "high" ? "pill-high" : "pill-critical" },
                ].map((s) => (
                  <div key={s.label} className="card-glass p-3"><p className="text-label-xs text-outline">{s.label}</p>{s.color ? <span className={`pill mt-0.5 ${s.color}`}>{s.value}</span> : <p className="text-label-md font-bold mt-0.5 text-on-surface">{s.value}</p>}</div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-brand-purple/5 border border-brand-purple/10 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <div><p className="text-label-md font-medium text-brand-purple">AI Redistribution Suggestion</p><p className="text-label-sm text-outline mt-0.5">Transfer {doc.pendingReviews > 10 ? "8" : "3"} pending reviews to available colleagues. Prioritize {doc.highRiskPatients} high-risk patients for immediate review.</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
