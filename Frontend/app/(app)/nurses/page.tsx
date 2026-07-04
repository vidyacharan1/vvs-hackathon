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
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">STAFF</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">Nurse CRM</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">{nurses.length} nurses across all facilities</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border border-primary text-primary px-5 py-2.5 rounded-lg font-label-md font-medium flex items-center gap-2 hover:bg-primary/5 transition-all"><Sparkles className="w-4 h-4" /> Optimize Follow-ups</button>
              <button className="gradient-button text-white px-5 py-2.5 rounded-lg font-label-md font-semibold flex items-center gap-2 active:scale-90 transition-transform"><CheckCircle className="w-4 h-4" /> Mark Completed</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input type="text" placeholder="Search nurses..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none text-body-md placeholder:text-outline/50 transition-all" />
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                    {["Nurse", "Facility", "Assigned Villages", "Patients", "Pending", "Completed Today", "High-risk", "Workload", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5 text-primary font-label-sm uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((n) => (
                    <tr key={n.id} className="border-b border-outline-variant/10 hover:bg-primary-fixed/30 transition-colors cursor-pointer" onClick={() => setSelected(n.id)}>
                      <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-xs font-bold text-primary">{n.name.split(" ").pop()?.[0] || "N"}</div><span className="font-label-md font-medium">{n.name}</span></div></td>
                      <td className="px-4 py-4 font-label-md">{getFacilityName(n.facilityId)}</td>
                      <td className="px-4 py-4 font-label-md max-w-[180px] truncate">{n.assignedVillages.join(", ")}</td>
                      <td className="px-4 py-4 font-label-md font-semibold">{n.assignedPatients}</td>
                      <td className="px-4 py-4 font-label-md">{n.pendingFollowUps}</td>
                      <td className="px-4 py-4 font-label-md">{n.completedToday}</td>
                      <td className="px-4 py-4 font-label-md">{n.highRiskFollowUps}</td>
                      <td className="px-4 py-4"><span className={`pill ${n.workloadStatus === "normal" ? "pill-low" : n.workloadStatus === "high" ? "pill-high" : "pill-critical"}`}>{n.workloadStatus.charAt(0).toUpperCase() + n.workloadStatus.slice(1)}</span></td>
                      <td className="px-4 py-4"><Eye className="w-4 h-4 text-outline hover:text-primary transition-colors" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {nur && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="glass-card rounded-2xl w-full max-w-lg mx-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-sm font-bold text-primary">{nur.name.split(" ").pop()?.[0] || "N"}</div><div><h2 className="text-xl font-semibold text-on-surface">{nur.name}</h2><p className="text-on-surface-variant font-label-md">{getFacilityName(nur.facilityId)}</p></div></div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">Staff Details</span>
              <div className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">Assigned Villages</p><p className="font-label-md font-medium mt-0.5">{nur.assignedVillages.join(", ")}</p></div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">Workload Metrics</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Assigned Patients", value: nur.assignedPatients },
                  { label: "Pending Follow-ups", value: nur.pendingFollowUps, color: nur.pendingFollowUps > 10 ? "text-error" : "text-warning" },
                  { label: "Completed Today", value: nur.completedToday, color: "text-success" },
                  { label: "High-risk Follow-ups", value: nur.highRiskFollowUps, color: nur.highRiskFollowUps > 2 ? "text-error" : "text-warning" },
                  { label: "Overload Score", value: `${Math.round(nur.assignedPatients / 30 * 100)}%`, color: nur.workloadStatus === "critical" ? "text-error" : nur.workloadStatus === "high" ? "text-warning" : "text-success" },
                  { label: "Workload", value: nur.workloadStatus.charAt(0).toUpperCase() + nur.workloadStatus.slice(1), color: `pill ${nur.workloadStatus === "normal" ? "pill-low" : nur.workloadStatus === "high" ? "pill-high" : "pill-critical"}` },
                ].map((s) => (
                  <div key={s.label} className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">{s.label}</p>{s.label === "Workload" ? <span className={`${s.color} mt-0.5`}>{s.value}</span> : <p className={`font-label-md font-bold mt-0.5 ${s.color || "text-on-surface"}`}>{s.value}</p>}</div>
                ))}
              </div>
              <div className="rounded-xl bg-primary-fixed/30 border border-primary/10 p-4 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div><p className="font-label-md font-medium text-primary">AI Follow-up Priority Plan</p><p className="text-label-sm text-outline mt-0.5">{nur.highRiskFollowUps > 0 ? `Priority: Visit ${nur.highRiskFollowUps} high-risk patients first. Complete ${nur.pendingFollowUps - nur.highRiskFollowUps} routine follow-ups within 48 hours.` : "All high-risk follow-ups completed. Focus on pending routine visits."}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
