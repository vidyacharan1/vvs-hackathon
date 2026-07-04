"use client";

import { BarChart3 } from "lucide-react";
import { facilities } from "@/lib/demo-data";

export default function FacilityHealthDistribution() {
  const statusCounts = { critical: 0, high: 0, medium: 0, low: 0 };
  facilities.forEach((f) => {
    statusCounts[f.status]++;
  });

  const statusData = [
    { label: "Critical", count: statusCounts.critical, color: "#dc2626", bg: "bg-rose-50" },
    { label: "High", count: statusCounts.high, color: "#ea580c", bg: "bg-orange-50" },
    { label: "Medium", count: statusCounts.medium, color: "#d97706", bg: "bg-amber-50" },
    { label: "Low", count: statusCounts.low, color: "#16a34a", bg: "bg-emerald-50" },
  ];

  return (
    <div className="card-glass p-5 reveal-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
          <BarChart3 className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-[12px] font-bold text-[#0a0b2e]">Facility Health</h3>
          <p className="text-[10px] text-text-muted">Distribution</p>
        </div>
      </div>
      <div className="space-y-2">
        {statusData.map((s) => (
          <div key={s.label} className={`rounded-xl p-2.5 ${s.bg} border border-transparent`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[11px] font-semibold text-text-secondary">{s.label}</span>
              </div>
              <span className="text-[15px] font-bold text-[#0a0b2e]">{s.count}</span>
            </div>
            <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(s.count / facilities.length) * 100}%`,
                  backgroundColor: s.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
