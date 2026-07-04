"use client";

import { useState } from "react";
import { Search, Eye, X, Sparkles, CheckCircle } from "lucide-react";
import { nurses, getFacilityName } from "@/lib/demo-data";

export default function NursesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = nurses.filter((n) => n.name.toLowerCase().includes(search.toLowerCase()) || getFacilityName(n.facilityId).toLowerCase().includes(search.toLowerCase()));
  const nur = selected ? nurses.find((n) => n.id === selected) : null;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">STAFF</p>
          <h1 className="text-headline-lg font-bold text-on-surface mt-1">Nurse CRM</h1>
          <p className="text-label-sm text-outline mt-0.5">{nurses.length} nurses across all facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="card-glass px-4 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all"><Sparkles className="w-4 h-4 text-brand-purple" /> Optimize Follow-ups</button>
          <button className="card-glass px-4 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all"><CheckCircle className="w-4 h-4 text-success" /> Mark Completed</button>
        </div>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
        <input type="text" placeholder="Search nurses..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/50 transition-all" />
      </div>
      <div className="card-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/10">
                {["Nurse", "Facility", "Assigned Villages", "Patients", "Pending", "Completed Today", "High-risk", "Workload", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-label-xs text-outline uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr key={n.id} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest/50 transition-colors cursor-pointer" onClick={() => setSelected(n.id)}>
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-xs font-bold text-brand-purple">{n.name.split(" ").pop()?.[0] || "N"}</div><span className="text-label-md font-medium">{n.name}</span></div></td>
                  <td className="px-4 py-3 text-label-md">{getFacilityName(n.facilityId)}</td>
                  <td className="px-4 py-3 text-label-md max-w-[180px] truncate">{n.assignedVillages.join(", ")}</td>
                  <td className="px-4 py-3 text-label-md font-semibold">{n.assignedPatients}</td>
                  <td className="px-4 py-3 text-label-md">{n.pendingFollowUps}</td>
                  <td className="px-4 py-3 text-label-md">{n.completedToday}</td>
                  <td className="px-4 py-3 text-label-md">{n.highRiskFollowUps}</td>
                  <td className="px-4 py-3"><span className={`pill ${n.workloadStatus === "normal" ? "pill-low" : n.workloadStatus === "high" ? "pill-high" : "pill-critical"}`}>{n.workloadStatus.charAt(0).toUpperCase() + n.workloadStatus.slice(1)}</span></td>
                  <td className="px-4 py-3"><Eye className="w-4 h-4 text-outline hover:text-brand-purple transition-colors" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {nur && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="card-glass w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-sm font-bold text-brand-purple">{nur.name.split(" ").pop()?.[0] || "N"}</div><div><h2 className="text-headline-sm font-bold">{nur.name}</h2><p className="text-label-xs text-outline">{getFacilityName(nur.facilityId)}</p></div></div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Staff Details</p>
              <div className="card-glass p-3"><p className="text-label-xs text-outline">Assigned Villages</p><p className="text-label-md font-medium mt-0.5">{nur.assignedVillages.join(", ")}</p></div>
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Workload Metrics</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Assigned Patients", value: nur.assignedPatients },
                  { label: "Pending Follow-ups", value: nur.pendingFollowUps, color: nur.pendingFollowUps > 10 ? "text-error" : "text-warning" },
                  { label: "Completed Today", value: nur.completedToday, color: "text-success" },
                  { label: "High-risk Follow-ups", value: nur.highRiskFollowUps, color: nur.highRiskFollowUps > 2 ? "text-error" : "text-warning" },
                  { label: "Overload Score", value: `${Math.round(nur.assignedPatients / 30 * 100)}%`, color: nur.workloadStatus === "critical" ? "text-error" : nur.workloadStatus === "high" ? "text-warning" : "text-success" },
                  { label: "Workload", value: nur.workloadStatus.charAt(0).toUpperCase() + nur.workloadStatus.slice(1), color: `pill ${nur.workloadStatus === "normal" ? "pill-low" : nur.workloadStatus === "high" ? "pill-high" : "pill-critical"}` },
                ].map((s) => (
                  <div key={s.label} className="card-glass p-3"><p className="text-label-xs text-outline">{s.label}</p>{s.label === "Workload" ? <span className={`${s.color} mt-0.5`}>{s.value}</span> : <p className={`text-label-md font-bold mt-0.5 ${s.color || "text-on-surface"}`}>{s.value}</p>}</div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-brand-purple/5 border border-brand-purple/10 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <div><p className="text-label-md font-medium text-brand-purple">AI Follow-up Priority Plan</p><p className="text-label-sm text-outline mt-0.5">{nur.highRiskFollowUps > 0 ? `Priority: Visit ${nur.highRiskFollowUps} high-risk patients first. Complete ${nur.pendingFollowUps - nur.highRiskFollowUps} routine follow-ups within 48 hours.` : "All high-risk follow-ups completed. Focus on pending routine visits."}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
