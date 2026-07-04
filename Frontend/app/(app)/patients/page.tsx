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
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">CRM</p>
          <h1 className="text-headline-lg font-bold text-on-surface mt-1">Patient CRM</h1>
          <p className="text-label-sm text-outline mt-0.5">{patients.length} patients across all facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="gradient-button text-white px-5 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 active:scale-95 transition-transform"><Plus className="w-4 h-4" /> Add Patient</button>
          <button className="card-glass px-4 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all"><Sparkles className="w-4 h-4 text-brand-purple" /> Summarize Patient Journey</button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input type="text" placeholder="Search by name, condition, or village..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/50 transition-all" />
        </div>
        <select value={facilityFilter} onChange={(e) => setFacilityFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md transition-all">
          <option value="all">All Facilities</option>
          {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>
      <div className="card-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/10">
                {["Patient", "Age", "Gender", "Village", "Facility", "Condition", "Risk", "Follow-up", "Next Visit"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-label-xs text-outline uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest/50 transition-colors cursor-pointer" onClick={() => setSelectedPatient(p.id)}>
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-xs font-bold text-brand-purple">{p.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div><span className="text-label-md font-medium">{p.name}</span></div></td>
                  <td className="px-4 py-3 text-label-md">{p.age}</td>
                  <td className="px-4 py-3 text-label-md">{p.gender}</td>
                  <td className="px-4 py-3 text-label-md">{p.village}</td>
                  <td className="px-4 py-3 text-label-md">{getFacilityName(p.facilityId)}</td>
                  <td className="px-4 py-3 text-label-md max-w-[150px] truncate">{p.condition}</td>
                  <td className="px-4 py-3"><span className={`pill ${p.riskScore === "Critical" ? "pill-critical" : p.riskScore === "High" ? "pill-high" : p.riskScore === "Medium" ? "pill-medium" : "pill-low"}`}>{p.riskScore}</span></td>
                  <td className="px-4 py-3"><span className={`pill ${p.followUpStatus === "completed" ? "pill-low" : p.followUpStatus === "overdue" ? "pill-critical" : "pill-medium"}`}>{p.followUpStatus}</span></td>
                  <td className="px-4 py-3 text-label-md">{p.nextFollowUp}</td>
                  <td className="px-4 py-3"><Eye className="w-4 h-4 text-outline hover:text-brand-purple transition-colors" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {patient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPatient(null)}>
          <div className="card-glass w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-sm font-bold text-brand-purple">{patient.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div>
                <div><h2 className="text-headline-sm font-bold">{patient.name}</h2><p className="text-label-xs text-outline">{patient.age} yrs · {patient.gender}</p></div>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Patient Information</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="card-glass p-3"><p className="text-label-xs text-outline">Village</p><p className="text-label-md font-medium mt-0.5">{patient.village}</p></div>
                <div className="card-glass p-3"><p className="text-label-xs text-outline">Facility</p><p className="text-label-md font-medium mt-0.5">{getFacilityName(patient.facilityId)}</p></div>
                <div className="card-glass p-3"><p className="text-label-xs text-outline">Assigned Doctor</p><p className="text-label-md font-medium mt-0.5">{getDoctorName(patient.assignedDoctorId)}</p></div>
                <div className="card-glass p-3"><p className="text-label-xs text-outline">Assigned Nurse</p><p className="text-label-md font-medium mt-0.5">{getNurseName(patient.assignedNurseId)}</p></div>
              </div>
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Conditions</p>
              <div><div className="flex flex-wrap gap-1.5">{patient.conditions.map((c, i) => <span key={i} className="px-2.5 py-1 rounded-lg bg-brand-purple/10 text-brand-purple text-label-xs font-medium">{c}</span>)}</div></div>
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Visit Status</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="card-glass p-3 text-center"><p className="text-label-xs text-outline">Risk Level</p><span className={`pill mt-1 ${patient.riskScore === "Critical" ? "pill-critical" : patient.riskScore === "High" ? "pill-high" : patient.riskScore === "Medium" ? "pill-medium" : "pill-low"}`}>{patient.riskScore}</span></div>
                <div className="card-glass p-3 text-center"><p className="text-label-xs text-outline">Last Visit</p><p className="text-label-md font-medium mt-1">{patient.lastVisit}</p></div>
                <div className="card-glass p-3 text-center"><p className="text-label-xs text-outline">Next Follow-up</p><p className="text-label-md font-medium mt-1">{patient.nextFollowUp}</p></div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-purple/5 border border-brand-purple/10">
                <Sparkles className="w-4 h-4 text-brand-purple shrink-0" />
                <p className="text-label-sm text-outline">AI Summary: Patient is managing {patient.conditions.join(" and ")}. Last visit showed stable vitals. Follow-up is {patient.followUpStatus === "overdue" ? "overdue" : "scheduled"}.</p>
              </div>
              <button className="w-full gradient-button text-white py-2.5 rounded-lg text-label-md font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Summarize Patient Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
