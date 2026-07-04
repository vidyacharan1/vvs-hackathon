"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Pill, Search, Plus, ArrowRightLeft, Sparkles,
  Package, AlertTriangle, AlertCircle,
  TrendingDown
} from "lucide-react";
import { medicines, getFacilityName, facilities } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

const riskStyles: Record<string, { label: string; text: string; bg: string; border: string; dot: string; bar: string }> = {
  critical: { label: "Critical", text: "text-[#dc2626]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]", dot: "bg-[#ef4444]", bar: "bg-[#ef4444]" },
  high: { label: "High", text: "text-[#ea580c]", bg: "bg-[#fff7ed]", border: "border-[#fed7aa]", dot: "bg-[#f59e0b]", bar: "bg-[#f59e0b]" },
  medium: { label: "Medium", text: "text-[#ca8a04]", bg: "bg-[#fefce8]", border: "border-[#fef08a]", dot: "bg-[#ca8a04]", bar: "bg-[#ca8a04]" },
  low: { label: "Low", text: "text-[#16a34a]", bg: "bg-[#f0fdf4]", border: "border-[#bbf7d0]", dot: "bg-[#10b981]", bar: "bg-[#10b981]" },
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("all");

  const filtered = medicines.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFacility = facilityFilter === "all" || m.facilityId === facilityFilter;
    return matchesSearch && matchesFacility;
  });

  const stats = useMemo(() => ({
    total: medicines.length,
    critical: medicines.filter((m) => m.risk === "critical").length,
    high: medicines.filter((m) => m.risk === "high").length,
    lowStock: medicines.filter((m) => m.daysLeft < 5).length,
    totalStock: medicines.reduce((s, m) => s + m.currentStock, 0),
  }), []);

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medicine Inventory</h1>
            <p className="text-sm text-[#a1a1aa] mt-0.5">{medicines.length} records across all facilities</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary"><Plus className="w-3.5 h-3.5" /> Add Stock</button>
            <button className="btn-secondary"><ArrowRightLeft className="w-3.5 h-3.5" /> Transfer</button>
            <button className="btn-primary"><Sparkles className="w-3.5 h-3.5" /> Recommend</button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-5 gap-3">
          {[
            { label: "Total Items", value: stats.total, color: "text-[#a1a1aa]", icon: null },
            { label: "Critical", value: stats.critical, color: "text-[#dc2626]", icon: AlertTriangle },
            { label: "High Risk", value: stats.high, color: "text-[#ea580c]", icon: AlertCircle },
            { label: "<5 Days Left", value: stats.lowStock, color: "text-[#dc2626]", icon: TrendingDown },
            { label: "Total Units", value: stats.totalStock.toLocaleString(), color: "text-[#a1a1aa]", icon: null },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-[#e4e4e7]">
              {s.icon ? (
                <div className={`flex items-center gap-1.5 text-xs font-medium ${s.color} mb-1`}>
                  <s.icon className="w-3.5 h-3.5" /> {s.label}
                </div>
              ) : (
                <p className="text-xs font-medium text-[#a1a1aa] mb-1">{s.label}</p>
              )}
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
            <input type="text" placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)} className="premium-input pl-10" />
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
                  <th>Medicine</th>
                  <th>Facility</th>
                  <th>Current Stock</th>
                  <th>Daily Usage</th>
                  <th>Days Left</th>
                  <th>Reorder Level</th>
                  <th>Risk</th>
                  <th>Suggested Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-[#a1a1aa] py-16">
                      <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-medium">No medicines match your search</p>
                      <p className="text-xs mt-1">Try a different name or facility</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((m) => {
                    const rStyle = riskStyles[m.risk];
                    return (
                      <tr key={m.id} className="hover:bg-[#fafafa] transition-colors">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${rStyle.bg} ${rStyle.text}`}>
                              <Pill className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">{m.name}</span>
                          </div>
                        </td>
                        <td><span className="text-sm">{getFacilityName(m.facilityId)}</span></td>
                        <td>
                          <span className="text-sm font-semibold">{m.currentStock.toLocaleString()}</span>
                          <span className="text-xs text-[#a1a1aa] ml-1">units</span>
                        </td>
                        <td>
                          <span className="text-sm">{m.avgDailyUsage}</span>
                          <span className="text-xs text-[#a1a1aa]">/day</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 rounded-full bg-[#e4e4e7] overflow-hidden">
                              <div className={`h-full rounded-full ${rStyle.bar}`} style={{ width: `${Math.min(100, (m.daysLeft / 30) * 100)}%` }} />
                            </div>
                            <span className={`text-xs font-semibold ${m.daysLeft < 5 ? "text-[#dc2626]" : m.daysLeft < 10 ? "text-[#ea580c]" : "text-[#16a34a]"}`}>
                              {m.daysLeft.toFixed(1)}d
                            </span>
                          </div>
                        </td>
                        <td><span className="text-sm">{m.reorderLevel.toLocaleString()}</span></td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${rStyle.bg} ${rStyle.text} ${rStyle.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${rStyle.dot}`} />
                            {rStyle.label}
                          </span>
                        </td>
                        <td><span className="text-sm text-[#a1a1aa] block max-w-[200px]">{m.suggestedAction}</span></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
