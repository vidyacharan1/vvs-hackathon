"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, Eye, X, Sparkles, CheckCircle, Users,
  MapPin, Activity, AlertTriangle, Clock
} from "lucide-react";
import { nurses, getFacilityName } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

const workloadStyles: Record<string, { label: string; text: string; bg: string; border: string; dot: string }> = {
  normal: { label: "Normal", text: "text-[#16a34a]", bg: "bg-[#f0fdf4]", border: "border-[#bbf7d0]", dot: "bg-[#16a34a]" },
  high: { label: "High", text: "text-[#ea580c]", bg: "bg-[#fff7ed]", border: "border-[#fed7aa]", dot: "bg-[#ea580c]" },
  critical: { label: "Critical", text: "text-[#dc2626]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]", dot: "bg-[#dc2626]" },
};

export default function NursesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = nurses.filter((n) => n.name.toLowerCase().includes(search.toLowerCase()) || getFacilityName(n.facilityId).toLowerCase().includes(search.toLowerCase()));
  const nur = selected ? nurses.find((n) => n.id === selected) : null;

  const stats = useMemo(() => ({
    total: nurses.length,
    totalPatients: nurses.reduce((s, n) => s + n.assignedPatients, 0),
    pendingTotal: nurses.reduce((s, n) => s + n.pendingFollowUps, 0),
    criticalLoad: nurses.filter((n) => n.workloadStatus === "critical").length,
    highLoad: nurses.filter((n) => n.workloadStatus === "high").length,
    completedToday: nurses.reduce((s, n) => s + n.completedToday, 0),
  }), []);

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nurse CRM</h1>
            <p className="text-sm text-[#a1a1aa] mt-0.5">{nurses.length} nurses across all facilities</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary"><Sparkles className="w-3.5 h-3.5" /> Optimize</button>
            <button className="btn-primary"><CheckCircle className="w-3.5 h-3.5" /> Mark Completed</button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-6 gap-3">
          {[
            { label: "Total Nurses", value: stats.total, color: "text-[#a1a1aa]", icon: null },
            { label: "Assigned Patients", value: stats.totalPatients, color: "text-[#a1a1aa]", icon: null },
            { label: "Pending", value: stats.pendingTotal, color: "text-[#ea580c]", icon: Clock },
            { label: "Critical", value: stats.criticalLoad, color: "text-[#dc2626]", icon: AlertTriangle },
            { label: "High Load", value: stats.highLoad, color: "text-[#ea580c]", icon: Activity },
            { label: "Completed Today", value: stats.completedToday, color: "text-[#16a34a]", icon: CheckCircle },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-[#e4e4e7]">
              {s.icon ? (
                <div className={`flex items-center gap-1.5 text-xs font-medium ${s.color} mb-1`}>
                  <s.icon className="w-3.5 h-3.5" /> {s.label}
                </div>
              ) : (
                <p className="text-xs font-medium text-[#a1a1aa] mb-1">{s.label}</p>
              )}
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
          <input type="text" placeholder="Search nurses..." value={search} onChange={(e) => setSearch(e.target.value)} className="premium-input pl-10" />
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Nurse</th>
                  <th>Facility</th>
                  <th>Villages</th>
                  <th>Patients</th>
                  <th>Pending</th>
                  <th>Completed</th>
                  <th>High-risk</th>
                  <th>Workload</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center text-[#a1a1aa] py-16">
                      <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">No nurses match your search</p>
                      <p className="text-xs mt-1">Try a different name or facility</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((n) => {
                    const wStyle = workloadStyles[n.workloadStatus];
                    return (
                      <tr key={n.id} className="hover:bg-[#fafafa] cursor-pointer transition-colors" onClick={() => setSelected(n.id)}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${wStyle.bg} ${wStyle.text}`}>
                              {n.name.split(" ").pop()?.[0] || "N"}
                            </div>
                            <span className="text-sm font-medium">{n.name}</span>
                          </div>
                        </td>
                        <td><span className="text-sm">{getFacilityName(n.facilityId)}</span></td>
                        <td>
                          <div className="flex items-center gap-1 max-w-[180px]">
                            <MapPin className="w-3 h-3 text-[#a1a1aa] shrink-0" />
                            <span className="text-sm truncate">{n.assignedVillages.join(", ")}</span>
                          </div>
                        </td>
                        <td><span className="text-sm font-semibold">{n.assignedPatients}</span></td>
                        <td>
                          <span className={`text-sm ${n.pendingFollowUps > 10 ? "text-[#dc2626] font-semibold" : n.pendingFollowUps > 5 ? "text-[#ea580c] font-semibold" : ""}`}>
                            {n.pendingFollowUps}
                          </span>
                        </td>
                        <td><span className="text-sm">{n.completedToday}</span></td>
                        <td>
                          <span className={`text-sm ${n.highRiskFollowUps > 2 ? "text-[#dc2626] font-semibold" : "text-[#ea580c]"}`}>
                            {n.highRiskFollowUps}
                          </span>
                        </td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${wStyle.bg} ${wStyle.text} ${wStyle.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${wStyle.dot}`} />
                            {wStyle.label}
                          </span>
                        </td>
                        <td><Eye className="w-4 h-4 text-[#a1a1aa] hover:text-[#6366f1] transition-colors cursor-pointer" /></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {nur && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#e4e4e7]">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold ${workloadStyles[nur.workloadStatus].bg} ${workloadStyles[nur.workloadStatus].text}`}>
                    {nur.name.split(" ").pop()?.[0] || "N"}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold leading-tight">{nur.name}</h2>
                    <p className="text-sm text-[#a1a1aa]">{getFacilityName(nur.facilityId)}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f4f4f5] transition-colors shrink-0"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#a1a1aa]" />
                    <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest">Assigned Villages</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {nur.assignedVillages.map((v, i) => (
                      <span key={i} className="rounded-lg px-3 py-1 text-xs font-medium bg-[#eef2ff] text-[#6366f1]">{v}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">Assigned Patients</p>
                    <p className="text-lg font-bold mt-1">{nur.assignedPatients}</p>
                    <div className="w-full h-1.5 rounded-full bg-[#e4e4e7] mt-2 overflow-hidden">
                      <div className={`h-full rounded-full ${workloadStyles[nur.workloadStatus].dot}`} style={{ width: `${Math.min(100, (nur.assignedPatients / 30) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">Pending Follow-ups</p>
                    <p className={`text-lg font-bold mt-1 ${nur.pendingFollowUps > 10 ? "text-[#dc2626]" : nur.pendingFollowUps > 5 ? "text-[#ea580c]" : ""}`}>{nur.pendingFollowUps}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">Completed Today</p>
                    <p className="text-lg font-bold mt-1 text-[#16a34a]">{nur.completedToday}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">High-risk Follow-ups</p>
                    <p className={`text-lg font-bold mt-1 ${nur.highRiskFollowUps > 2 ? "text-[#dc2626]" : ""}`}>{nur.highRiskFollowUps}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#eef2ff] border border-[#6366f1]/10 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#6366f1] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#6366f1]">AI Follow-up Priority Plan</p>
                      <p className="text-sm text-[#52525b] mt-1">
                        {nur.highRiskFollowUps > 0
                          ? `Priority: Visit ${nur.highRiskFollowUps} high-risk patients first. Complete ${nur.pendingFollowUps - nur.highRiskFollowUps} routine follow-ups within 48 hours.`
                          : "All high-risk follow-ups completed. Focus on pending routine visits."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
