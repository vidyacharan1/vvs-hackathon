"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Eye, Search, Sparkles, Users, X } from "lucide-react";
import { getFacilityName, nurses } from "@/lib/demo-data";

function workloadPill(status: string) {
  return status === "normal" ? "pill-low" : status === "high" ? "pill-high" : "pill-critical";
}

export default function NursesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<"all" | "facility" | "village">("all");
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  const facilities = useMemo(() => Array.from(new Set(nurses.map(n => getFacilityName(n.facilityId)))), []);
  const villages = useMemo(() => Array.from(new Set(nurses.flatMap(n => n.assignedVillages))), []);

  const filtered = useMemo(() => {
    return nurses.filter((nurse) => {
      const searchMatch = `${nurse.name} ${nurse.assignedVillages.join(" ")} ${getFacilityName(nurse.facilityId)}`.toLowerCase().includes(search.toLowerCase());

      const facilityMatch = filterBy === "all" || (filterBy === "facility" && (!selectedFacility || getFacilityName(nurse.facilityId) === selectedFacility));
      const villageMatch = filterBy === "all" || (filterBy === "village" && (!selectedVillage || nurse.assignedVillages.includes(selectedVillage)));

      return searchMatch && facilityMatch && villageMatch;
    });
  }, [search, filterBy, selectedFacility, selectedVillage]);
  const nurse = selected ? nurses.find((item) => item.id === selected) : null;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline font-semibold">Staff Directory</p>
            <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">Nurse CRM</h1>
            <p className="text-label-sm text-outline mt-1">Community health and field operations management</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="card-glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-label-sm font-semibold transition-all duration-200 hover:scale-[1.02]">
              <Sparkles className="h-4 w-4 text-brand-purple" /> Optimize Operations
            </button>
            <button className="card-glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-label-sm font-semibold transition-all duration-200 hover:scale-[1.02]">
              <CheckCircle className="h-4 w-4 text-success" /> Mark Completed
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="Search nurses, villages, facility..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-2xl border border-outline-variant/30 bg-white/70 py-3 pl-9 pr-4 text-label-md outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:shadow-md"
            />
          </div>

          {facilities.length > 1 && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-label-xs text-outline font-semibold">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFilterBy("all");
                    setSelectedFacility(null);
                    setSelectedVillage(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-label-sm font-medium transition-all duration-200 ${filterBy === "all"
                    ? "bg-brand-purple text-white shadow-lg"
                    : "bg-surface-container-lowest/70 text-outline hover:bg-outline-variant/30 hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilterBy("facility");
                    setSelectedFacility(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-label-sm font-medium transition-all duration-200 ${filterBy === "facility"
                    ? "bg-brand-purple text-white shadow-lg"
                    : "bg-surface-container-lowest/70 text-outline hover:bg-outline-variant/30 hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  Facility
                </button>
                <button
                  onClick={() => {
                    setFilterBy("village");
                    setSelectedVillage(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-label-sm font-medium transition-all duration-200 ${filterBy === "village"
                    ? "bg-brand-purple text-white shadow-lg"
                    : "bg-surface-container-lowest/70 text-outline hover:bg-outline-variant/30 hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  Village
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {filterBy === "facility" && (
                  <div className="relative">
                    <select
                      onChange={(event) => setSelectedFacility(event.target.value || null)}
                      value={selectedFacility || ""}
                      className="px-4 py-2 rounded-xl text-label-sm font-medium bg-surface-container-lowest/70 border border-outline-variant/20 appearance-none pr-10 cursor-pointer transition-all duration-200 hover:bg-outline-variant/30 hover:shadow-sm"
                    >
                      <option value="">Select Facility</option>
                      {facilities.map(facility => (
                        <option key={facility} value={facility}>{facility}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
                {filterBy === "village" && (
                  <div className="relative">
                    <select
                      onChange={(event) => setSelectedVillage(event.target.value || null)}
                      value={selectedVillage || ""}
                      className="px-4 py-2 rounded-xl text-label-sm font-medium bg-surface-container-lowest/70 border border-outline-variant/20 appearance-none pr-10 cursor-pointer transition-all duration-200 hover:bg-outline-variant/30 hover:shadow-sm"
                    >
                      <option value="">Select Village</option>
                      {villages.map(village => (
                        <option key={village} value={village}>{village}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      <div className="card-glass overflow-hidden p-5 reveal-card">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline">Follow-up Operations</p>
            <h2 className="text-headline-sm font-bold text-on-surface">{filtered.length} visible nurses</h2>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-label-xs font-bold text-brand-purple">Field routing</span>
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
              <th className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Nurse</th>
              <th className="hidden w-36 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Facility</th>
              <th className="hidden w-36 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Villages</th>
              <th className="w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Patients</th>
              <th className="w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Pending</th>
              <th className="hidden w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline sm:table-cell">Done</th>
              <th className="hidden w-20 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline xl:table-cell">High-risk</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Workload</th>
              <th className="w-9 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} onClick={() => setSelected(item.id)} className="cursor-pointer border-b border-outline-variant/10 transition hover:bg-brand-purple/5">
                <td className="min-w-0 px-2 py-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-[11px] font-bold text-brand-purple">{item.name.split(" ").pop()?.[0] || "N"}</div>
                    <div className="min-w-0">
                      <p className="truncate text-label-md font-bold text-on-surface">{item.name}</p>
                      <p className="truncate text-[11px] text-outline md:hidden">{getFacilityName(item.facilityId)}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline md:table-cell"><span className="line-clamp-1">{getFacilityName(item.facilityId)}</span></td>
                <td className="hidden px-2 py-2.5 text-label-sm text-on-surface lg:table-cell"><span className="line-clamp-1">{item.assignedVillages.join(", ")}</span></td>
                <td className="px-2 py-2.5 text-label-md font-bold text-on-surface">{item.assignedPatients}</td>
                <td className="px-2 py-2.5 text-label-md font-bold text-warning">{item.pendingFollowUps}</td>
                <td className="hidden px-2 py-2.5 text-label-sm text-success sm:table-cell">{item.completedToday}</td>
                <td className="hidden px-2 py-2.5 text-label-sm text-error xl:table-cell">{item.highRiskFollowUps}</td>
                <td className="px-2 py-2.5"><span className={`pill ${workloadPill(item.workloadStatus)}`}>{item.workloadStatus}</span></td>
                <td className="px-2 py-2.5"><Eye className="h-4 w-4 text-outline" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {nurse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="card-glass w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-sm font-bold text-brand-purple">{nurse.name.split(" ").pop()?.[0] || "N"}</div>
                <div className="min-w-0">
                  <h2 className="truncate text-headline-sm font-bold">{nurse.name}</h2>
                  <p className="text-label-xs text-outline">{getFacilityName(nurse.facilityId)}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div className="card-glass p-3">
                <p className="text-label-xs text-outline">Assigned Villages</p>
                <p className="mt-0.5 text-label-md font-bold">{nurse.assignedVillages.join(", ")}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Assigned Patients", nurse.assignedPatients],
                  ["Pending Follow-ups", nurse.pendingFollowUps],
                  ["Completed Today", nurse.completedToday],
                  ["High-risk Follow-ups", nurse.highRiskFollowUps],
                ].map(([label, value]) => (
                  <div key={label} className="card-glass p-3">
                    <p className="text-label-xs text-outline">{label}</p>
                    <p className="mt-0.5 text-label-md font-bold text-on-surface">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
                <p className="text-label-sm text-outline">AI Plan: Visit {nurse.highRiskFollowUps} high-risk patients first, then complete routine follow-ups within 48 hours.</p>
              </div>
              <button className="gradient-button flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-label-md font-semibold text-white">
                <Users className="h-4 w-4" /> Optimize Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
