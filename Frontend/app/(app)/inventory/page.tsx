"use client";

import { useState } from "react";
import { Pill, Search, Plus, ArrowRightLeft, Sparkles } from "lucide-react";
import { medicines, getFacilityName, facilities } from "@/lib/demo-data";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("all");

  const filtered = medicines.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFacility = facilityFilter === "all" || m.facilityId === facilityFilter;
    return matchesSearch && matchesFacility;
  });

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">INVENTORY</p>
          <h1 className="text-headline-lg font-bold text-on-surface mt-1">Medicine Inventory</h1>
          <p className="text-label-sm text-outline mt-0.5">{medicines.length} medicine records across all facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="card-glass px-4 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all"><Plus className="w-4 h-4" /> Add Stock</button>
          <button className="card-glass px-4 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 hover:shadow-md transition-all"><ArrowRightLeft className="w-4 h-4" /> Transfer Stock</button>
          <button className="gradient-button text-white px-5 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 active:scale-95 transition-transform"><Sparkles className="w-4 h-4" /> Generate Stock Recommendation</button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input type="text" placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/50 transition-all" />
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
                {["Medicine", "Facility", "Current Stock", "Daily Usage", "Days Left", "Reorder Level", "Risk", "Suggested Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-label-xs text-outline uppercase tracking-widest font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center"><Pill className="w-4 h-4 text-brand-purple" /></div><span className="text-label-md font-medium">{m.name}</span></div></td>
                  <td className="px-4 py-3 text-label-md">{getFacilityName(m.facilityId)}</td>
                  <td className="px-4 py-3 text-label-md font-semibold">{m.currentStock}</td>
                  <td className="px-4 py-3 text-label-md">{m.avgDailyUsage}/day</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-outline-variant/20 overflow-hidden">
                        <div className={`h-full rounded-full ${m.risk === "critical" ? "bg-error" : m.risk === "high" ? "bg-warning" : m.risk === "medium" ? "bg-primary" : "bg-success"}`}
                          style={{ width: `${Math.min(100, (m.daysLeft / 30) * 100)}%` }} />
                      </div>
                      <span className={`text-label-sm font-semibold ${m.daysLeft < 5 ? "text-error" : m.daysLeft < 10 ? "text-warning" : "text-success"}`}>{m.daysLeft.toFixed(1)}d</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-label-md">{m.reorderLevel}</td>
                  <td className="px-4 py-3"><span className={`pill ${m.risk === "critical" ? "pill-critical" : m.risk === "high" ? "pill-high" : m.risk === "medium" ? "pill-medium" : "pill-low"}`}>{m.risk.charAt(0).toUpperCase() + m.risk.slice(1)}</span></td>
                  <td className="px-4 py-3 text-label-sm text-outline max-w-[200px]">{m.suggestedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
