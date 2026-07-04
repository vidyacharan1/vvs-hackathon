"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Pill, Plus, Search, Sparkles } from "lucide-react";
import { facilities, getFacilityName, medicines } from "@/lib/demo-data";

const riskLabel = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("all");

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return medicines.filter((medicine) => {
      const matchesSearch = `${medicine.name} ${getFacilityName(medicine.facilityId)} ${medicine.suggestedAction}`.toLowerCase().includes(query);
      const matchesFacility = facilityFilter === "all" || medicine.facilityId === facilityFilter;
      return matchesSearch && matchesFacility;
    });
  }, [facilityFilter, search]);

  const criticalCount = medicines.filter((medicine) => medicine.risk === "critical").length;
  const highCount = medicines.filter((medicine) => medicine.risk === "high").length;

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">Inventory</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">Medicine Inventory</h1>
          <p className="text-label-sm text-outline">{medicines.length} stock records, {criticalCount + highCount} urgent alerts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="card-glass flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold"><Plus className="h-4 w-4" /> Add Stock</button>
          <button className="card-glass flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold"><ArrowRightLeft className="h-4 w-4" /> Transfer</button>
          <button className="gradient-button flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold text-white"><Sparkles className="h-4 w-4" /> Recommend</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Critical", criticalCount, "text-error"],
          ["High", highCount, "text-orange-600"],
          ["Medium", medicines.filter((medicine) => medicine.risk === "medium").length, "text-warning"],
          ["Low", medicines.filter((medicine) => medicine.risk === "low").length, "text-success"],
        ].map(([label, value, color]) => (
          <div key={label} className="card-glass p-3">
            <p className="text-label-xs uppercase tracking-widest text-outline">{label} Risk</p>
            <p className={`mt-1 text-2xl font-bold leading-none ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Search medicines, facility, action..."
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
          {facilities.map((facility) => <option key={facility.id} value={facility.id}>{facility.name}</option>)}
        </select>
      </div>

      <div className="card-glass overflow-hidden p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline">Stock Risk</p>
            <h2 className="text-headline-sm font-bold text-on-surface">{filtered.length} visible medicines</h2>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-label-xs font-bold text-brand-purple">AI reorder ready</span>
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
              <th className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Medicine</th>
              <th className="hidden w-36 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Facility</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Stock</th>
              <th className="hidden w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline sm:table-cell">Usage</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Days</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Risk</th>
              <th className="hidden px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Suggested Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((medicine) => (
              <tr key={medicine.id} className="border-b border-outline-variant/10 transition hover:bg-brand-purple/5">
                <td className="min-w-0 px-2 py-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10"><Pill className="h-4 w-4 text-brand-purple" /></div>
                    <div className="min-w-0">
                      <p className="truncate text-label-md font-bold text-on-surface">{medicine.name}</p>
                      <p className="truncate text-[11px] text-outline md:hidden">{getFacilityName(medicine.facilityId)}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline md:table-cell"><span className="line-clamp-1">{getFacilityName(medicine.facilityId)}</span></td>
                <td className="px-2 py-2.5 text-label-md font-bold text-on-surface">{medicine.currentStock}</td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline sm:table-cell">{medicine.avgDailyUsage}/day</td>
                <td className="px-2 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-12 overflow-hidden rounded-full bg-outline-variant/20">
                      <div className={`h-full rounded-full ${medicine.risk === "critical" ? "bg-error" : medicine.risk === "high" ? "bg-warning" : medicine.risk === "medium" ? "bg-primary" : "bg-success"}`} style={{ width: `${Math.min(100, (medicine.daysLeft / 16) * 100)}%` }} />
                    </div>
                    <span className="text-label-xs font-bold text-on-surface">{medicine.daysLeft.toFixed(1)}d</span>
                  </div>
                </td>
                <td className="px-2 py-2.5"><span className={`pill pill-${medicine.risk}`}>{riskLabel[medicine.risk]}</span></td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline lg:table-cell"><span className="line-clamp-1">{medicine.suggestedAction}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
