"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, Eye, BarChart3, X, Sparkles, Users,
  Clock, AlertTriangle, CheckCircle,
  UserCheck, UserX
} from "lucide-react";
import { doctors, getFacilityName } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

const attendanceStyles: Record<string, { label: string; text: string; bg: string; icon: React.ElementType }> = {
  present: { label: "Present", text: "text-[#16a34a]", bg: "bg-[#f0fdf4] border-[#bbf7d0]", icon: CheckCircle },
  absent: { label: "Absent", text: "text-[#dc2626]", bg: "bg-[#fef2f2] border-[#fecaca]", icon: AlertTriangle },
  leave: { label: "On Leave", text: "text-[#f59e0b]", bg: "bg-[#fefce8] border-[#fef08a]", icon: Clock },
};

const workloadStyles: Record<string, { label: string; text: string; bg: string }> = {
  normal: { label: "Normal", text: "text-[#16a34a]", bg: "bg-[#f0fdf4]" },
  high: { label: "High", text: "text-[#ea580c]", bg: "bg-[#fff7ed]" },
  critical: { label: "Critical", text: "text-[#dc2626]", bg: "bg-[#fef2f2]" },
};

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState("all");

  const filtered = doctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || getFacilityName(d.facilityId).toLowerCase().includes(search.toLowerCase());
    const matchesAttendance = attendanceFilter === "all" || d.attendance === attendanceFilter;
    return matchesSearch && matchesAttendance;
  });

  const doc = selected ? doctors.find((d) => d.id === selected) : null;

  const stats = useMemo(() => ({
    total: doctors.length,
    present: doctors.filter((d) => d.attendance === "present").length,
    absent: doctors.filter((d) => d.attendance === "absent").length,
    onLeave: doctors.filter((d) => d.attendance === "leave").length,
    avgWorkload: Math.round(doctors.reduce((s, d) => s + d.patientsSeenToday, 0) / doctors.length),
    criticalWorkload: doctors.filter((d) => d.workloadStatus === "critical").length,
  }), []);

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Doctor CRM</h1>
            <p className="text-sm text-[#a1a1aa] mt-0.5">{doctors.length} doctors across all facilities</p>
          </div>
          <button className="btn-secondary"><BarChart3 className="w-3.5 h-3.5" /> Analyze Workload</button>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-6 gap-3">
          {[
            { label: "Total", value: stats.total, color: "text-[#a1a1aa]", icon: null },
            { label: "Present", value: stats.present, color: "text-[#16a34a]", icon: UserCheck },
            { label: "Absent", value: stats.absent, color: "text-[#dc2626]", icon: UserX },
            { label: "On Leave", value: stats.onLeave, color: "text-[#f59e0b]", icon: Clock },
            { label: "Avg Seen", value: stats.avgWorkload, color: "text-[#a1a1aa]", icon: null },
            { label: "Critical Load", value: stats.criticalWorkload, color: "text-[#dc2626]", icon: null },
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

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
            <input type="text" placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="premium-input pl-10" />
          </div>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#f4f4f5]">
            {["all", "present", "absent", "leave"].map((f) => (
              <button key={f} onClick={() => setAttendanceFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${attendanceFilter === f ? "bg-white text-[#18181b] shadow-sm" : "text-[#a1a1aa] hover:text-[#52525b]"}`}
              >{f === "leave" ? "on leave" : f}</button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Facility</th>
                  <th>Specialty</th>
                  <th>Attendance</th>
                  <th>Seen Today</th>
                  <th>Active</th>
                  <th>High-risk</th>
                  <th>Pending</th>
                  <th>Workload</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-[#a1a1aa] py-16">
                      <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">No doctors match your search</p>
                      <p className="text-xs mt-1">Try a different name or facility</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => {
                    const aStyle = attendanceStyles[d.attendance];
                    const wStyle = workloadStyles[d.workloadStatus];
                    const capacityPct = (d.patientsSeenToday / Math.max(d.maxCapacity, 1)) * 100;
                    return (
                      <tr key={d.id} className="hover:bg-[#fafafa] cursor-pointer transition-colors" onClick={() => setSelected(d.id)}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold bg-[#eef2ff] text-[#6366f1]">Dr</div>
                            <span className="text-sm font-medium">{d.name}</span>
                          </div>
                        </td>
                        <td><span className="text-sm">{getFacilityName(d.facilityId)}</span></td>
                        <td><span className="text-sm">{d.specialty}</span></td>
                        <td>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${aStyle.bg} ${aStyle.text}`}>
                            <aStyle.icon className="w-3 h-3" /> {aStyle.label}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{d.patientsSeenToday}</span>
                            <span className="text-xs text-[#a1a1aa]">/ {d.maxCapacity}</span>
                            <div className="w-12 h-1.5 rounded-full bg-[#e4e4e7] overflow-hidden">
                              <div className={`h-full rounded-full ${capacityPct > 70 ? "bg-[#f59e0b]" : capacityPct > 40 ? "bg-[#6366f1]" : "bg-[#10b981]"}`} style={{ width: `${capacityPct}%` }} />
                            </div>
                          </div>
                        </td>
                        <td><span className="text-sm">{d.activePatients}</span></td>
                        <td>
                          <span className={`text-sm ${d.highRiskPatients > 5 ? "text-[#dc2626] font-semibold" : d.highRiskPatients > 2 ? "text-[#ea580c] font-semibold" : ""}`}>
                            {d.highRiskPatients}
                          </span>
                        </td>
                        <td><span className="text-sm">{d.pendingReviews}</span></td>
                        <td>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${wStyle.bg} ${wStyle.text}`}>{wStyle.label}</span>
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

        {doc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#e4e4e7]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold bg-[#eef2ff] text-[#6366f1]">Dr</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold leading-tight">{doc.name}</h2>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${attendanceStyles[doc.attendance].bg} ${attendanceStyles[doc.attendance].text}`}>
                        {doc.attendance === "present" ? <CheckCircle className="w-3 h-3" /> : doc.attendance === "absent" ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {attendanceStyles[doc.attendance].label}
                      </span>
                    </div>
                    <p className="text-sm text-[#a1a1aa]">{doc.specialty} · {getFacilityName(doc.facilityId)}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f4f4f5] transition-colors shrink-0"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">Capacity Usage</p>
                    <p className="text-lg font-bold mt-1">{doc.patientsSeenToday} / {doc.maxCapacity}</p>
                    <div className="w-full h-1.5 rounded-full bg-[#e4e4e7] mt-2 overflow-hidden">
                      <div className={`h-full rounded-full ${(doc.patientsSeenToday / doc.maxCapacity) > 0.7 ? "bg-[#f59e0b]" : (doc.patientsSeenToday / doc.maxCapacity) > 0.4 ? "bg-[#6366f1]" : "bg-[#10b981]"}`}
                        style={{ width: `${(doc.patientsSeenToday / Math.max(doc.maxCapacity, 1)) * 100}%` }} />
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">Active Patients</p>
                    <p className="text-lg font-bold mt-1">{doc.activePatients}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">Pending Reviews</p>
                    <p className="text-lg font-bold mt-1">{doc.pendingReviews}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                    <p className="text-xs text-[#a1a1aa]">High-risk Patients</p>
                    <p className={`text-lg font-bold mt-1 ${doc.highRiskPatients > 5 ? "text-[#dc2626]" : ""}`}>{doc.highRiskPatients}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#a1a1aa]">Workload Score</p>
                    <span className="text-xs font-medium text-[#a1a1aa]">{doc.patientsSeenToday}/{doc.maxCapacity} seen today</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#e4e4e7] overflow-hidden">
                    <div className={`h-full rounded-full ${workloadStyles[doc.workloadStatus].text === "text-[#dc2626]" ? "bg-[#dc2626]" : workloadStyles[doc.workloadStatus].text === "text-[#ea580c]" ? "bg-[#f59e0b]" : "bg-[#10b981]"}`}
                      style={{ width: `${(doc.patientsSeenToday / Math.max(doc.maxCapacity, 1)) * 100}%` }} />
                  </div>
                </div>

                <div className="rounded-xl bg-[#eef2ff] border border-[#6366f1]/10 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#6366f1] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#6366f1]">AI Workload Redistribution</p>
                      <p className="text-sm text-[#52525b] mt-1">
                        {doc.pendingReviews > 10
                          ? `Transfer ${Math.min(doc.pendingReviews, 8)} pending reviews to available colleagues. Prioritize ${doc.highRiskPatients} high-risk patients for immediate review.`
                          : `Workload is manageable. ${doc.highRiskPatients} high-risk patients need monitoring.`}
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
