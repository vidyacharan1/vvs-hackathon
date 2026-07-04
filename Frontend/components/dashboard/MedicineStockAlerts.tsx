"use client";

import { Pill } from "lucide-react";
import { facilities } from "@/lib/demo-data";

export default function MedicineStockAlerts() {
  const totalIssues = facilities.reduce((sum, f) => sum + f.medicineStockIssues, 0);
  const withIssues = facilities.filter((f) => f.medicineStockIssues > 0).length;

  const severityData = [
    { label: "Critical", count: 3, color: "bg-rose-500" },
    { label: "High", count: 4, color: "bg-orange-500" },
    { label: "Medium", count: 2, color: "bg-amber-500" },
    { label: "Low", count: 0, color: "bg-emerald-500" },
  ];

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Pill className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-[12px] font-bold text-[#0a0b2e]">Medicine Stock Alerts</h3>
          <p className="text-[10px] text-text-muted">By severity</p>
        </div>
      </div>
      <div className="text-center mb-3">
        <span className="text-2xl font-bold text-[#0a0b2e]">{totalIssues}</span>
        <span className="text-[11px] text-text-muted ml-1">issues across {withIssues} facilities</span>
      </div>
      <div className="space-y-1.5">
        {severityData.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-text-muted w-14">{s.label}</span>
            <div className="flex-1 h-2 bg-[#f0ebf8] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${s.color}`}
                style={{ width: `${(s.count / totalIssues) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-[#0a0b2e] w-4 text-right">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
