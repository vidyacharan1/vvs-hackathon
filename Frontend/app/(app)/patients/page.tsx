"use client";

import { useState } from "react";
import { Search, Eye, Plus, Sparkles, X } from "lucide-react";
import { patients, getFacilityName, getDoctorName, getNurseName, facilities } from "@/lib/demo-data";

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

  return (
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">CRM</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">Patient CRM</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">{patients.length} patients across all facilities</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="gradient-button text-white px-5 py-2.5 rounded-lg font-label-md font-semibold flex items-center gap-2 active:scale-90 transition-transform"><Plus className="w-4 h-4" /> Add Patient</button>
              <button className="border border-primary text-primary px-5 py-2.5 rounded-lg font-label-md font-medium flex items-center gap-2 hover:bg-primary/5 transition-all"><Sparkles className="w-4 h-4" /> Summarize</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input type="text" placeholder="Search by name, condition, or village..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none text-body-md placeholder:text-outline/50 transition-all" />
            </div>
            <select value={facilityFilter} onChange={(e) => setFacilityFilter(e.target.value)} className="rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 px-4 py-2.5 outline-none text-body-md transition-all">
              <option value="all">All Facilities</option>
              {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                    {["Patient", "Age", "Gender", "Village", "Facility", "Condition", "Risk", "Follow-up", "Next Visit"].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5 text-primary font-label-sm uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-outline-variant/10 hover:bg-primary-fixed/30 transition-colors cursor-pointer" onClick={() => setSelectedPatient(p.id)}>
                      <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-xs font-bold text-primary">{p.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div><span className="font-label-md font-medium">{p.name}</span></div></td>
                      <td className="px-4 py-4 font-label-md">{p.age}</td>
                      <td className="px-4 py-4 font-label-md">{p.gender}</td>
                      <td className="px-4 py-4 font-label-md">{p.village}</td>
                      <td className="px-4 py-4 font-label-md">{getFacilityName(p.facilityId)}</td>
                      <td className="px-4 py-4 font-label-md max-w-[150px] truncate">{p.condition}</td>
                      <td className="px-4 py-4"><span className={`pill ${p.riskScore === "Critical" ? "pill-critical" : p.riskScore === "High" ? "pill-high" : p.riskScore === "Medium" ? "pill-medium" : "pill-low"}`}>{p.riskScore}</span></td>
                      <td className="px-4 py-4"><span className={`pill ${p.followUpStatus === "completed" ? "pill-low" : p.followUpStatus === "overdue" ? "pill-critical" : "pill-medium"}`}>{p.followUpStatus}</span></td>
                      <td className="px-4 py-4 font-label-md">{p.nextFollowUp}</td>
                      <td className="px-4 py-4"><Eye className="w-4 h-4 text-outline hover:text-primary transition-colors" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {patient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPatient(null)}>
          <div className="glass-card rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-sm font-bold text-primary">{patient.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div>
                <div><h2 className="text-xl font-semibold text-on-surface">{patient.name}</h2><p className="text-on-surface-variant font-label-md">{patient.age} yrs · {patient.gender}</p></div>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">Patient Information</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">Village</p><p className="font-label-md font-medium mt-0.5">{patient.village}</p></div>
                <div className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">Facility</p><p className="font-label-md font-medium mt-0.5">{getFacilityName(patient.facilityId)}</p></div>
                <div className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">Assigned Doctor</p><p className="font-label-md font-medium mt-0.5">{getDoctorName(patient.assignedDoctorId)}</p></div>
                <div className="glass-card p-3 rounded-2xl"><p className="text-primary font-label-sm uppercase tracking-widest">Assigned Nurse</p><p className="font-label-md font-medium mt-0.5">{getNurseName(patient.assignedNurseId)}</p></div>
              </div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">Conditions</span>
              <div><div className="flex flex-wrap gap-1.5">{patient.conditions.map((c, i) => <span key={i} className="rounded-xl bg-primary-fixed text-primary text-label-xs font-medium px-3 py-1.5">{c}</span>)}</div></div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">Visit Status</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-card p-3 rounded-2xl text-center"><p className="text-primary font-label-sm uppercase tracking-widest">Risk Level</p><span className={`pill mt-1 ${patient.riskScore === "Critical" ? "pill-critical" : patient.riskScore === "High" ? "pill-high" : patient.riskScore === "Medium" ? "pill-medium" : "pill-low"}`}>{patient.riskScore}</span></div>
                <div className="glass-card p-3 rounded-2xl text-center"><p className="text-primary font-label-sm uppercase tracking-widest">Last Visit</p><p className="font-label-md font-medium mt-1">{patient.lastVisit}</p></div>
                <div className="glass-card p-3 rounded-2xl text-center"><p className="text-primary font-label-sm uppercase tracking-widest">Next Follow-up</p><p className="font-label-md font-medium mt-1">{patient.nextFollowUp}</p></div>
              </div>
              <div className="rounded-xl bg-primary-fixed/30 border border-primary/10 p-4 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-label-sm text-outline">AI Summary: Patient is managing {patient.conditions.join(" and ")}. Last visit showed stable vitals. Follow-up is {patient.followUpStatus === "overdue" ? "overdue" : "scheduled"}.</p>
              </div>
              <button className="w-full gradient-button text-white py-2.5 rounded-lg font-label-sm font-semibold active:scale-90 transition-transform flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Summarize Patient Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
