"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import Link from "next/link";
import { Activity, BedDouble, Building2, ChevronRight, MapPin, Search, Stethoscope, Users } from "lucide-react";
import { dashboardSummary, facilities } from "@/lib/demo-data";
import type { Facility, FacilityStatus } from "@/lib/demo-data";
import { useFacilities as useApiFacilities } from "@/lib/api";

const statusLabel: Record<FacilityStatus, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

function riskFromScore(score: number): FacilityStatus {
  if (score >= 85) return "critical";
  if (score >= 70) return "high";
  if (score >= 45) return "medium";
  return "low";
}

function StatChip({ label, value, icon: Icon }: { label: string; value: string | number; icon: ElementType }) {
  return (
    <div className="card-glass flex min-w-0 items-center gap-2 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10">
        <Icon className="h-4 w-4 text-brand-purple" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-label-xs uppercase tracking-widest text-outline">{label}</p>
        <p className="text-xl font-bold leading-none text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function FacilityRow({ facility, rank }: { facility: Facility; rank: number }) {
  const status = riskFromScore(facility.riskScore);

  return (
    <tr className="border-b border-outline-variant/10 transition hover:bg-brand-purple/5">
      <td className="w-10 px-3 py-2.5 text-label-sm font-bold text-outline">{rank}</td>
      <td className="min-w-0 px-3 py-2.5">
        <Link href={`/facilities/${facility.id}`} className="group block min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 sm:flex">
              <Building2 className="h-4 w-4 text-brand-purple" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-label-md font-bold text-on-surface group-hover:text-brand-purple">{facility.name}</p>
              <p className="truncate text-[11px] text-outline">{facility.type} - {facility.village}, {facility.mandal}</p>
            </div>
          </div>
        </Link>
      </td>
      <td className="hidden px-3 py-2.5 text-label-sm font-semibold text-outline md:table-cell">{facility.type}</td>
      <td className="hidden px-3 py-2.5 text-label-sm text-outline lg:table-cell">
        <span className="inline-flex items-center gap-1 truncate"><MapPin className="h-3 w-3 shrink-0" /> {facility.village}</span>
      </td>
      <td className="px-3 py-2.5"><span className={`pill pill-${status}`}>{statusLabel[status]}</span></td>
      <td className="px-3 py-2.5 text-label-md font-bold text-on-surface">{facility.todayOpd}</td>
      <td className="hidden px-3 py-2.5 text-label-sm text-on-surface md:table-cell">{facility.doctorsPresent}/{facility.totalDoctors}</td>
      <td className="hidden px-3 py-2.5 text-label-sm text-on-surface lg:table-cell">{facility.nursesPresent}/{facility.totalNurses}</td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-12 overflow-hidden rounded-full bg-outline-variant/20">
            <div className={`h-full rounded-full ${facility.bedOccupancyRate >= 85 ? "bg-error" : facility.bedOccupancyRate >= 70 ? "bg-warning" : "bg-success"}`} style={{ width: `${facility.bedOccupancyRate}%` }} />
          </div>
          <span className="text-label-xs font-bold text-on-surface">{facility.bedOccupancyRate}%</span>
        </div>
      </td>
      <td className="w-10 px-3 py-2.5">
        <Link href={`/facilities/${facility.id}`} className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple transition hover:bg-brand-purple hover:text-white">
          <ChevronRight className="h-4 w-4" />
        </Link>
      </td>
    </tr>
  );
}

export default function FacilitiesPage() {
  const [search, setSearch] = useState("");
  const { data: apiFacilities } = useApiFacilities();

  const displayFacilities = useMemo(() => {
    if (apiFacilities && apiFacilities.length > 0) {
      return apiFacilities.map((f) => ({
        id: f.id,
        name: f.name,
        type: f.facilityType as "PHC" | "CHC",
        district: "Visakhapatnam",
        mandal: f.location,
        village: f.location,
        status: f.overallRisk.toLowerCase() as FacilityStatus,
        riskScore: f.bedOccupancy,
        healthScore: 100 - f.bedOccupancy,
        todayOpd: f.todayOpd,
        avgOpd7day: f.avgOpd7day,
        doctorsPresent: f.doctorsPresent,
        totalDoctors: f.totalDoctors,
        nursesPresent: f.nursesPresent,
        totalNurses: f.totalNurses,
        bedsOccupied: f.bedsOccupied,
        totalBeds: f.totalBeds,
        bedOccupancyRate: f.bedOccupancy,
        totalPatients: f.totalPatients,
        criticalPatients: f.criticalPatients,
        openAlerts: f.openAlerts,
        medicineStockIssues: f.medicineStockIssues,
        diseaseSpikeCount: f.diseaseSpikeCount,
        diseaseSpikeRisk: f.diseaseSpikeRisk,
      })) as Facility[];
    }
    return facilities;
  }, [apiFacilities]);

  const liveSummary = useMemo(() => {
    if (displayFacilities.length > 0) {
      return {
        ...dashboardSummary,
        totalFacilities: displayFacilities.length,
        medicineStockIssues: displayFacilities.reduce((sum, f) => sum + f.medicineStockIssues, 0),
        diseaseSpikeAlerts: displayFacilities.reduce((sum, f) => sum + f.diseaseSpikeCount, 0),
        criticalPatients: displayFacilities.reduce((sum, f) => sum + f.criticalPatients, 0),
      };
    }
    return dashboardSummary;
  }, [displayFacilities]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...displayFacilities]
      .sort((a, b) => b.riskScore - a.riskScore)
      .filter((facility) => !query || `${facility.name} ${facility.village} ${facility.mandal} ${facility.type}`.toLowerCase().includes(query));
  }, [search, displayFacilities]);

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">Facilities</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">PHC / CHC Network</h1>
          <p className="text-label-sm text-outline">Compact operational view for Visakhapatnam district.</p>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Search facilities..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border border-outline-variant/30 bg-white/70 py-2.5 pl-9 pr-3 text-label-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatChip label="Total Facilities" value={liveSummary.totalFacilities} icon={Building2} />
        <StatChip label="Critical" value={liveSummary.criticalFacilities} icon={Activity} />
        <StatChip label="Open Alerts" value={liveSummary.openAlerts} icon={Users} />
        <StatChip label="Doctor Alerts" value={liveSummary.doctorAbsenceAlerts} icon={Stethoscope} />
        <StatChip label="Bed Pressure" value={liveSummary.bedPressureAlerts} icon={BedDouble} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-outline-variant/30 bg-white/85 p-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
        <div className="mb-3">
          <p className="text-label-xs uppercase tracking-widest text-outline">Risk Ranking</p>
          <h2 className="text-headline-sm font-bold text-on-surface">{filtered.length} facilities visible</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto min-w-[700px]">
            <thead>
              <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
                <th className="w-10 px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">#</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Facility</th>
                <th className="hidden px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Type</th>
                <th className="hidden px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Location</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Risk</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">OPD</th>
                <th className="hidden px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Docs</th>
                <th className="hidden px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Nurses</th>
                <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Beds</th>
                <th className="w-10 px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((facility, index) => <FacilityRow key={facility.id} facility={facility} rank={index + 1} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
