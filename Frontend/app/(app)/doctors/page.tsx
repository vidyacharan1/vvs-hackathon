"use client";

import { useMemo, useState } from "react";
import { BarChart3, Edit3, Eye, Search, Sparkles, Stethoscope, X } from "lucide-react";
import { useDoctors, useFacilities } from "@/lib/api";
import { useApp } from "@/lib/app-context";
import { EditDoctorModal } from "@/components/modals/EditDoctorModal";

function workloadPill(status: string) {
  return status === "normal" ? "pill-low" : status === "high" ? "pill-high" : "pill-critical";
}

function getFacilityName(facilities: { id: string; name: string }[], id: string) {
  return facilities.find((f) => f.id === id)?.name ?? "Unknown";
}

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null);
  const { data: doctors, refetch } = useDoctors();
  const { data: facilitiesList } = useFacilities();
  const { role } = useApp();

  const canEdit = role === "district_officer" || role === "medical_officer";
  const canAnalyze = role === "district_officer" || role === "medical_officer";

  const allDoctors = doctors ?? [];
  const allFacilities = facilitiesList ?? [];

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return allDoctors.filter((doctor) => `${doctor.name} ${doctor.specialty} ${getFacilityName(allFacilities, doctor.facilityId)}`.toLowerCase().includes(query));
  }, [search, allDoctors, allFacilities]);
  const doc = selected ? allDoctors.find((doctor) => doctor.id === selected) : null;

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">Staff</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">Doctor CRM</h1>
          <p className="text-label-sm text-outline">{allDoctors.length} doctors with attendance and load tracking.</p>
        </div>
        {canAnalyze && (
          <button onClick={() => { fetch("/api/v1/ai/analyze-load", { method: "POST" }).then((r) => r.json()).then((data) => { const a = data.analysis || {}; alert(`AI Analysis:\n\nOverloaded:\n${(a.overloaded || []).map((d: string) => "  • " + d).join("\n")}\n\nUnderutilized:\n${(a.underutilized || []).map((d: string) => "  • " + d).join("\n")}\n\nSuggestion: ${a.suggestion || data.text || "N/A"}`); }); }} className="card-glass flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold">
            <BarChart3 className="h-4 w-4 text-brand-purple" /> Analyze Load
          </button>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
        <input
          type="text"
          placeholder="Search doctors, specialty, facility..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-2xl border border-outline-variant/30 bg-white/70 py-2.5 pl-9 pr-3 text-label-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="card-glass overflow-hidden p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline">Doctor Operations</p>
            <h2 className="text-headline-sm font-bold text-on-surface">{filtered.length} visible doctors</h2>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-label-xs font-bold text-brand-purple">Capacity aware</span>
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
              <th className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Doctor</th>
              <th className="hidden w-36 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Facility</th>
              <th className="hidden w-32 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Specialty</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Attendance</th>
              <th className="w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Seen</th>
              <th className="hidden w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline sm:table-cell">Active</th>
              <th className="hidden w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline xl:table-cell">Pending</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Workload</th>
              <th className="w-9 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((doctor) => (
              <tr key={doctor.id} onClick={() => setSelected(doctor.id)} className="cursor-pointer border-b border-outline-variant/10 transition hover:bg-brand-purple/5">
                <td className="min-w-0 px-2 py-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-[11px] font-bold text-brand-purple">Dr</div>
                    <div className="min-w-0">
                      <p className="truncate text-label-md font-bold text-on-surface">{doctor.name}</p>
                      <p className="truncate text-[11px] text-outline md:hidden">{getFacilityName(allFacilities, doctor.facilityId)}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline md:table-cell"><span className="line-clamp-1">{getFacilityName(allFacilities, doctor.facilityId)}</span></td>
                <td className="hidden px-2 py-2.5 text-label-sm text-on-surface lg:table-cell">{doctor.specialty}</td>
                <td className="px-2 py-2.5"><span className={`pill ${doctor.attendance === "present" ? "pill-low" : doctor.attendance === "absent" ? "pill-critical" : "pill-medium"}`}>{doctor.attendance}</span></td>
                <td className="px-2 py-2.5 text-label-md font-bold text-on-surface">{doctor.patientsSeenToday}/{doctor.maxCapacity}</td>
                <td className="hidden px-2 py-2.5 text-label-sm text-on-surface sm:table-cell">{doctor.activePatients}</td>
                <td className="hidden px-2 py-2.5 text-label-sm text-on-surface xl:table-cell">{doctor.pendingReviews}</td>
                <td className="px-2 py-2.5"><span className={`pill ${workloadPill(doctor.workloadStatus)}`}>{doctor.workloadStatus}</span></td>
                <td className="px-2 py-2.5">
                  {canEdit ? (
                    <button onClick={(e) => { e.stopPropagation(); setEditingDoctor(doctor.id); }} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high">
                      <Edit3 className="h-4 w-4 text-brand-purple" />
                    </button>
                  ) : (
                    <Eye className="h-4 w-4 text-outline" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {doc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="card-glass w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-sm font-bold text-brand-purple">Dr</div>
                <div className="min-w-0">
                  <h2 className="truncate text-headline-sm font-bold">{doc.name}</h2>
                  <p className="text-label-xs text-outline">{doc.specialty} - {getFacilityName(allFacilities, doc.facilityId)}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Seen Today", `${doc.patientsSeenToday}/${doc.maxCapacity}`],
                  ["Active Patients", doc.activePatients],
                  ["High-risk", doc.highRiskPatients],
                  ["Pending Reviews", doc.pendingReviews],
                ].map(([label, value]) => (
                  <div key={label} className="card-glass p-3">
                    <p className="text-label-xs text-outline">{label}</p>
                    <p className="mt-0.5 text-label-md font-bold text-on-surface">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
                <p className="text-label-sm text-outline">AI Suggestion: Prioritize {doc.highRiskPatients} high-risk patients and shift {doc.pendingReviews > 10 ? 8 : 3} reviews to available colleagues.</p>
              </div>
              <button onClick={() => { fetch("/api/v1/ai/rebalance-doctors", { method: "POST" }).then((r) => r.json()).then((data) => { alert(`Rebalance Complete!\n\n${data.rebalance}\n\nImpact: ${data.impact}`); setSelected(null); }); }} className="gradient-button flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-label-md font-semibold text-white">
                <Stethoscope className="h-4 w-4" /> Rebalance Workload
              </button>
            </div>
          </div>
        </div>
      )}
      {editingDoctor && (() => {
        const d = allDoctors.find((doctor) => doctor.id === editingDoctor);
        return d ? (
          <EditDoctorModal
            doctor={d}
            facilities={allFacilities}
            onClose={() => setEditingDoctor(null)}
            onUpdated={() => refetch()}
          />
        ) : null;
      })()}
    </div>
  );
}
