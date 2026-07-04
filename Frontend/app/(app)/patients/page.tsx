"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, Eye, Plus, Sparkles, X, Users,
  AlertTriangle, Clock, Phone, MapPin,
  Activity, Calendar
} from "lucide-react";
import { patients, getFacilityName, getDoctorName, getNurseName, facilities } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

const riskStyles: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  Critical: { dot: "bg-[#dc2626]", bg: "bg-[#fef2f2]", text: "text-[#dc2626]", border: "border-[#fecaca]" },
  High: { dot: "bg-[#ea580c]", bg: "bg-[#fff7ed]", text: "text-[#ea580c]", border: "border-[#fed7aa]" },
  Medium: { dot: "bg-[#ca8a04]", bg: "bg-[#fefce8]", text: "text-[#ca8a04]", border: "border-[#fef08a]" },
  Low: { dot: "bg-[#16a34a]", bg: "bg-[#f0fdf4]", text: "text-[#16a34a]", border: "border-[#bbf7d0]" },
};

const followUpStyles: Record<string, { bg: string; text: string; icon: boolean }> = {
  overdue: { bg: "bg-[#fef2f2]", text: "text-[#dc2626]", icon: true },
  pending: { bg: "bg-[#fefce8]", text: "text-[#ca8a04]", icon: true },
  completed: { bg: "bg-[#f0fdf4]", text: "text-[#16a34a]", icon: false },
};

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [facilityFilter, setFacilityFilter] = useState("all");

  const filtered = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase()) || p.village.toLowerCase().includes(search.toLowerCase());
    const matchesFacility = facilityFilter === "all" || p.facilityId === facilityFilter;
    return matchesSearch && matchesFacility;
  });

  const patient = selectedPatient ? patients.find((p) => p.id === selectedPatient) : null;

  const stats = useMemo(() => ({
    total: patients.length,
    critical: patients.filter((p) => p.riskScore === "Critical").length,
    highRisk: patients.filter((p) => p.riskScore === "High").length,
    overdue: patients.filter((p) => p.followUpStatus === "overdue").length,
  }), []);

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patient CRM</h1>
            <p className="text-sm text-[#a1a1aa] mt-0.5">{patients.length} patients across all facilities</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-primary"><Plus className="w-3.5 h-3.5" /> Add Patient</button>
            <button className="btn-secondary"><Sparkles className="w-3.5 h-3.5" /> Summarize</button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Patients", value: stats.total, icon: Users, color: "text-[#a1a1aa]" },
            { label: "Critical", value: stats.critical, icon: AlertTriangle, color: "text-[#dc2626]" },
            { label: "High Risk", value: stats.highRisk, icon: Activity, color: "text-[#ea580c]" },
            { label: "Overdue", value: stats.overdue, icon: Clock, color: "text-[#dc2626]" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-[#e4e4e7]">
              <div className={`flex items-center gap-1.5 text-xs font-medium ${s.color} mb-1`}>
                <s.icon className="w-3.5 h-3.5" /> {s.label}
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] w-4 h-4" />
            <input type="text" placeholder="Search by name, condition, or village..." value={search} onChange={(e) => setSearch(e.target.value)} className="premium-input pl-10" />
          </div>
          <select value={facilityFilter} onChange={(e) => setFacilityFilter(e.target.value)} className="premium-select">
            <option value="all">All Facilities</option>
            {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Village</th>
                  <th>Facility</th>
                  <th>Condition</th>
                  <th>Risk</th>
                  <th>Follow-up</th>
                  <th>Next Visit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-[#a1a1aa] py-16">
                      <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">No patients match your search</p>
                      <p className="text-xs mt-1">Try a different name, condition, or village</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="cursor-pointer hover:bg-[#fafafa] transition-colors" onClick={() => setSelectedPatient(p.id)}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${riskStyles[p.riskScore].bg} ${riskStyles[p.riskScore].text}`}>
                            {p.name.split(" ").map(s => s[0]).join("").slice(0, 2)}
                          </div>
                          <div className="leading-tight">
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-[#a1a1aa]">{p.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="text-sm">{p.age}</span></td>
                      <td><span className="text-sm">{p.gender}</span></td>
                      <td><span className="text-sm">{p.village}</span></td>
                      <td><span className="text-sm truncate block max-w-[130px]">{getFacilityName(p.facilityId)}</span></td>
                      <td><span className="text-sm truncate block max-w-[140px]">{p.condition}</span></td>
                      <td>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${riskStyles[p.riskScore].bg} ${riskStyles[p.riskScore].text} ${riskStyles[p.riskScore].border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${riskStyles[p.riskScore].dot}`} />
                          {p.riskScore}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${followUpStyles[p.followUpStatus].bg} ${followUpStyles[p.followUpStatus].text}`}>
                          {followUpStyles[p.followUpStatus].icon && <AlertTriangle className="w-3 h-3" />}
                          {p.followUpStatus}
                        </span>
                      </td>
                      <td><span className="text-sm">{p.nextFollowUp}</span></td>
                      <td><Eye className="w-4 h-4 text-[#a1a1aa] hover:text-[#6366f1] transition-colors cursor-pointer" /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {patient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setSelectedPatient(null)}>
            <div className="bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e4e7] sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold ${riskStyles[patient.riskScore].bg} ${riskStyles[patient.riskScore].text}`}>
                    {patient.name.split(" ").map(s => s[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold leading-tight">{patient.name}</h2>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${riskStyles[patient.riskScore].bg} ${riskStyles[patient.riskScore].text} ${riskStyles[patient.riskScore].border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${riskStyles[patient.riskScore].dot}`} />
                        {patient.riskScore}
                      </span>
                    </div>
                    <p className="text-sm text-[#a1a1aa]">{patient.age} yrs · {patient.gender} · {patient.village}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedPatient(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f4f4f5] transition-colors shrink-0"><X className="w-4 h-4" /></button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-3 space-y-1">
                    <Phone className="w-4 h-4 text-[#a1a1aa]" />
                    <p className="text-xs text-[#a1a1aa]">Phone</p>
                    <p className="text-sm font-semibold">{patient.phone}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-3 space-y-1">
                    <MapPin className="w-4 h-4 text-[#a1a1aa]" />
                    <p className="text-xs text-[#a1a1aa]">Facility</p>
                    <p className="text-sm font-semibold truncate">{getFacilityName(patient.facilityId)}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-3 space-y-1">
                    <Calendar className="w-4 h-4 text-[#a1a1aa]" />
                    <p className="text-xs text-[#a1a1aa]">Last Visit</p>
                    <p className="text-sm font-semibold">{patient.lastVisit}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-3">
                    <p className="text-xs text-[#a1a1aa] mb-0.5">Assigned Doctor</p>
                    <p className="text-sm font-semibold">{getDoctorName(patient.assignedDoctorId)}</p>
                  </div>
                  <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-3">
                    <p className="text-xs text-[#a1a1aa] mb-0.5">Assigned Nurse</p>
                    <p className="text-sm font-semibold">{getNurseName(patient.assignedNurseId)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-2">Conditions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["bg-[#eef2ff] text-[#6366f1]", "bg-[#fef2f2] text-[#dc2626]", "bg-[#fff7ed] text-[#ea580c]", "bg-[#f0fdf4] text-[#16a34a]", "bg-[#fefce8] text-[#ca8a04]", "bg-[#f5f3ff] text-[#9333ea]"].map((c, i) => (
                      patient.conditions[i] && <span key={i} className={`rounded-lg px-3 py-1 text-xs font-medium ${c}`}>{patient.conditions[i]}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-3">Visit Status</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4 text-center space-y-1">
                      <p className="text-xs text-[#a1a1aa]">Next Follow-up</p>
                      <p className="text-sm font-bold">{patient.nextFollowUp}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${followUpStyles[patient.followUpStatus].bg} ${followUpStyles[patient.followUpStatus].text}`}>
                        {patient.followUpStatus}
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4 text-center space-y-1">
                      <p className="text-xs text-[#a1a1aa]">Risk Level</p>
                      <p className={`text-lg font-bold ${riskStyles[patient.riskScore].text}`}>{patient.riskScore}</p>
                    </div>
                    <div className="rounded-xl bg-[#fafafa] border border-[#e4e4e7] p-4 text-center space-y-1">
                      <p className="text-xs text-[#a1a1aa]">Status</p>
                      <p className={`text-lg font-bold capitalize ${followUpStyles[patient.followUpStatus].text}`}>{patient.followUpStatus}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#eef2ff] border border-[#6366f1]/10 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#6366f1] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#6366f1]">AI Assessment</p>
                      <p className="text-sm text-[#52525b] mt-1">
                        Patient is managing {patient.conditions.join(" and ")}. Last visit showed stable vitals. Follow-up is {patient.followUpStatus === "overdue" ? "overdue" : "scheduled"}.
                      </p>
                    </div>
                  </div>
                </div>

                <button className="btn-primary w-full justify-center"><Sparkles className="w-4 h-4" /> Generate Patient Journey Report</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
