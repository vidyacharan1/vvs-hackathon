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
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">INVENTORY</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">Medicine Inventory</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">{medicines.length} medicine records across all facilities</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border border-primary text-primary px-5 py-2.5 rounded-lg font-label-md font-medium flex items-center gap-2 hover:bg-primary/5 transition-all"><Plus className="w-4 h-4" /> Add Stock</button>
              <button className="border border-primary text-primary px-5 py-2.5 rounded-lg font-label-md font-medium flex items-center gap-2 hover:bg-primary/5 transition-all"><ArrowRightLeft className="w-4 h-4" /> Transfer Stock</button>
              <button className="gradient-button text-white px-5 py-2.5 rounded-lg font-label-md font-semibold flex items-center gap-2 active:scale-90 transition-transform"><Sparkles className="w-4 h-4" /> Generate Recommendation</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input type="text" placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none text-body-md placeholder:text-outline/50 transition-all" />
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
                    {["Medicine", "Facility", "Current Stock", "Daily Usage", "Days Left", "Reorder Level", "Risk", "Suggested Action"].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5 text-primary font-label-sm uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-b border-outline-variant/10 hover:bg-primary-fixed/30 transition-colors cursor-pointer">
                      <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center"><Pill className="w-4 h-4 text-primary" /></div><span className="font-label-md font-medium">{m.name}</span></div></td>
                      <td className="px-4 py-4 font-label-md">{getFacilityName(m.facilityId)}</td>
                      <td className="px-4 py-4 font-label-md font-semibold">{m.currentStock}</td>
                      <td className="px-4 py-4 font-label-md">{m.avgDailyUsage}/day</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-outline-variant/20 overflow-hidden">
                            <div className={`h-full rounded-full ${m.risk === "critical" ? "bg-error" : m.risk === "high" ? "bg-warning" : m.risk === "medium" ? "bg-primary" : "bg-success"}`}
                              style={{ width: `${Math.min(100, (m.daysLeft / 30) * 100)}%` }} />
                          </div>
                          <span className={`text-label-sm font-semibold ${m.daysLeft < 5 ? "text-error" : m.daysLeft < 10 ? "text-warning" : "text-success"}`}>{m.daysLeft.toFixed(1)}d</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-label-md">{m.reorderLevel}</td>
                      <td className="px-4 py-4"><span className={`pill ${m.risk === "critical" ? "pill-critical" : m.risk === "high" ? "pill-high" : m.risk === "medium" ? "pill-medium" : "pill-low"}`}>{m.risk.charAt(0).toUpperCase() + m.risk.slice(1)}</span></td>
                      <td className="px-4 py-4 text-label-sm text-outline max-w-[200px]">{m.suggestedAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
