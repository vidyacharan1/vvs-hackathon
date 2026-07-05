"use client";

import { useMemo, useState } from "react";
import { Eye, Plus, Search, Sparkles, X } from "lucide-react";
import { usePatients, useFacilities } from "@/lib/api";

function riskPill(risk: string) {
  return risk === "Critical" ? "pill-critical" : risk === "High" ? "pill-high" : risk === "Medium" ? "pill-medium" : "pill-low";
}

function getFacilityName(facilities: { id: string; name: string }[], id: string) {
  return facilities.find((f) => f.id === id)?.name ?? "Unknown";
}

function AddPatientModal({ onClose, onCreated, facilities }: { onClose: () => void; onCreated: () => void; facilities: { id: string; name: string }[] }) {
  const [form, setForm] = useState({ name: "", age: "", gender: "Female", phone: "", village: "", facilityId: "", riskScore: "Medium", condition: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.age) return;
    setSubmitting(true);
    try {
      await fetch("/api/v1/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          age: parseInt(form.age),
          gender: form.gender,
          phone: form.phone,
          village: form.village,
          facilityId: form.facilityId,
          riskScore: form.riskScore,
          condition: form.condition,
          conditions: form.condition ? form.condition.split(",").map((c) => c.trim()) : [],
        }),
      });
      onCreated();
      onClose();
    } catch {
      alert("Failed to create patient");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-brand-purple" />
            <h2 className="text-label-md font-bold">Add Patient</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Full name" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Age *
            <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Gender
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Phone
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="+91 ..." />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Village
            <input value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Facility
            <select value={form.facilityId} onChange={(e) => setForm({ ...form, facilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="">Select facility</option>
              {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Risk Level
            <select value={form.riskScore} onChange={(e) => setForm({ ...form, riskScore: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">
            Condition
            <input value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="e.g. Fever, Diabetes (comma separated)" />
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name || !form.age} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Adding..." : "Add Patient"}</button>
        </div>
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const { data: patients, refetch } = usePatients();
  const { data: facilitiesList } = useFacilities();

  const allPatients = patients ?? [];
  const allFacilities = facilitiesList ?? [];

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return allPatients.filter((patient) => {
      const matchesSearch = `${patient.name} ${patient.condition} ${patient.village}`.toLowerCase().includes(query);
      const matchesFacility = facilityFilter === "all" || patient.facilityId === facilityFilter;
      return matchesSearch && matchesFacility;
    });
  }, [facilityFilter, search, allPatients]);

  const patient = selectedPatient ? allPatients.find((item) => item.id === selectedPatient) : null;

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">CRM</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">Patient CRM</h1>
          <p className="text-label-sm text-outline">{allPatients.length} patients across district facilities.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowAdd(true)} className="gradient-button flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> Add Patient
          </button>
          <button className="card-glass flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold">
            <Sparkles className="h-4 w-4 text-brand-purple" /> Summarize
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Search name, condition, village..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border border-outline-variant/30 bg-white/70 py-2.5 pl-9 pr-3 text-label-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <select
          value={facilityFilter}
          onChange={(event) => setFacilityFilter(event.target.value)}
          className="min-w-[190px] rounded-2xl border border-outline-variant/30 bg-white/70 px-3 py-2.5 text-label-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        >
          <option value="all">All Facilities</option>
          {allFacilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}
        </select>
      </div>

      <div className="card-glass overflow-hidden p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline">Patient List</p>
            <h2 className="text-headline-sm font-bold text-on-surface">{filtered.length} visible records</h2>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-label-xs font-bold text-brand-purple">Follow-up tracking</span>
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
              <th className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Patient</th>
              <th className="hidden w-32 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Facility</th>
              <th className="hidden w-32 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Condition</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Risk</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Follow-up</th>
              <th className="hidden w-28 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline sm:table-cell">Next Visit</th>
              <th className="w-9 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} onClick={() => setSelectedPatient(item.id)} className="cursor-pointer border-b border-outline-variant/10 transition hover:bg-brand-purple/5">
                <td className="min-w-0 px-2 py-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-[11px] font-bold text-brand-purple">{item.avatar}</div>
                    <div className="min-w-0">
                      <p className="truncate text-label-md font-bold text-on-surface">{item.name}</p>
                      <p className="truncate text-[11px] text-outline">{item.age} yrs, {item.gender} - {item.village}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline md:table-cell"><span className="line-clamp-1">{getFacilityName(allFacilities, item.facilityId)}</span></td>
                <td className="hidden px-2 py-2.5 text-label-sm text-on-surface lg:table-cell"><span className="line-clamp-1">{item.condition}</span></td>
                <td className="px-2 py-2.5"><span className={`pill ${riskPill(item.riskScore)}`}>{item.riskScore}</span></td>
                <td className="px-2 py-2.5"><span className={`pill ${item.followUpStatus === "completed" ? "pill-low" : item.followUpStatus === "overdue" ? "pill-critical" : "pill-medium"}`}>{item.followUpStatus}</span></td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline sm:table-cell">{item.nextFollowUp}</td>
                <td className="px-2 py-2.5"><Eye className="h-4 w-4 text-outline" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {patient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setSelectedPatient(null)}>
          <div className="card-glass max-h-[88vh] w-full max-w-xl overflow-y-auto" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-sm font-bold text-brand-purple">{patient.avatar}</div>
                <div className="min-w-0">
                  <h2 className="truncate text-headline-sm font-bold">{patient.name}</h2>
                  <p className="text-label-xs text-outline">{patient.age} yrs - {patient.gender} - {patient.village}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="card-glass p-3"><p className="text-label-xs text-outline">Facility</p><p className="mt-0.5 text-label-md font-bold">{getFacilityName(allFacilities, patient.facilityId)}</p></div>
                <div className="card-glass p-3"><p className="text-label-xs text-outline">Phone</p><p className="mt-0.5 text-label-md font-bold">{patient.phone}</p></div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.conditions.map((condition) => <span key={condition} className="rounded-xl bg-brand-purple/10 px-2.5 py-1 text-label-xs font-bold text-brand-purple">{condition}</span>)}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="card-glass p-3 text-center"><p className="text-label-xs text-outline">Risk</p><span className={`pill mt-1 ${riskPill(patient.riskScore)}`}>{patient.riskScore}</span></div>
                <div className="card-glass p-3 text-center"><p className="text-label-xs text-outline">Last Visit</p><p className="mt-1 text-label-sm font-bold">{patient.lastVisit}</p></div>
                <div className="card-glass p-3 text-center"><p className="text-label-xs text-outline">Next Visit</p><p className="mt-1 text-label-sm font-bold">{patient.nextFollowUp}</p></div>
              </div>
              <div className="flex gap-2 rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
                <p className="text-label-sm text-outline">AI Summary: {patient.condition}. Follow-up is {patient.followUpStatus}; route through assigned nurse if home visit remains pending.</p>
              </div>
              <button onClick={() => { fetch("/api/v1/ai/brief", { method: "POST" }).then((r) => r.json()).then((data) => alert(`AI Patient Brief:\n${data.brief}\n\nActions: ${data.actions}`)); }} className="gradient-button flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-label-md font-semibold text-white">
                <Sparkles className="h-4 w-4" /> Summarize Patient Journey
              </button>
            </div>
          </div>
        </div>
      )}
      {showAdd && <AddPatientModal onClose={() => setShowAdd(false)} onCreated={() => refetch()} facilities={allFacilities} />}
    </div>
  );
}
