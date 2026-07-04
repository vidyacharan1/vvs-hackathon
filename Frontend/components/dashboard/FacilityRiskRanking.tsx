"use client";

import { ArrowRight, Building2, MapPin } from "lucide-react";
import { facilities } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

const riskPill: Record<string, { cls: string; dotCls: string }> = {
  critical: { cls: "pill pill-critical", dotCls: "pill-dot-critical" },
  high: { cls: "pill pill-high", dotCls: "pill-dot-high" },
  medium: { cls: "pill pill-medium", dotCls: "pill-dot-medium" },
  low: { cls: "pill pill-low", dotCls: "pill-dot-low" },
};

function BedOccupancyIndicator({ used, total }: { used: number; total: number }) {
  const pct = Math.round((used / total) * 100);
  const color =
    pct >= 90 ? "#dc2626" :
    pct >= 70 ? "#ea580c" :
    pct >= 50 ? "#d97706" :
    "#16a34a";

  const r = 14;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="circle-indicator shrink-0">
      <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r={r} fill="none" stroke="#f0ebf8" strokeWidth="3" />
        <circle
          cx="16" cy="16" r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90, 16, 16)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="text-[9px] font-bold" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function FacilityRiskRanking() {
  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-bold text-[#0a0b2e]">Facility Risk Ranking</h2>
          <p className="text-[11px] text-text-muted">All facilities sorted by risk score</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#3b48b8] to-[#5a2bae] hover:from-[#2f3a9a] hover:to-[#4a2394] text-white text-[11px] font-semibold px-3.5 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#3b48b8]/20">
          Open Critical Facility
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-1 overflow-x-auto scrollbar-thin -mx-5 px-5">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
              <th className="text-left pb-3 pr-3">Facility</th>
              <th className="text-left pb-3 pr-3">Type</th>
              <th className="text-left pb-3 pr-3">Location</th>
              <th className="text-center pb-3 pr-3">Risk</th>
              <th className="text-center pb-3 pr-3">Today&apos;s OPD</th>
              <th className="text-center pb-3 pr-3">Doctor Avail.</th>
              <th className="text-center pb-3 pr-3">Medicine Risk</th>
              <th className="text-center pb-3 pr-3">Disease Spike</th>
              <th className="text-center pb-3">Bed Occupancy</th>
            </tr>
          </thead>
          <tbody>
            {facilities
              .sort((a, b) => b.riskScore - a.riskScore)
              .map((f, idx) => {
                const pc = riskPill[f.status];
                const docPct = Math.round((f.doctorsPresent / f.totalDoctors) * 100);
                return (
                  <tr
                    key={f.id}
                    className={`group cursor-pointer transition-all duration-150 ${
                      idx < facilities.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0 ${
                          f.status === "critical" ? "from-rose-500 to-pink-600" :
                          f.status === "high" ? "from-orange-500 to-amber-600" :
                          f.status === "medium" ? "from-amber-500 to-yellow-600" :
                          "from-emerald-500 to-teal-600"
                        }`}>
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[13px] font-semibold text-[#0a0b2e] truncate group-hover:text-[#3b48b8] transition-colors">
                          {f.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-[11px] font-medium text-text-secondary bg-bg-base px-2 py-0.5 rounded-lg">{f.type}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-1 text-[11px] text-text-muted">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{f.village}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-center">
                      <span className={pc.cls}>
                        <span className={pc.dotCls} />
                        {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-center">
                      <span className="text-[13px] font-bold text-[#0a0b2e]">{f.todayOpd}</span>
                    </td>
                    <td className="py-3 pr-3 text-center">
                      <span className={`text-[13px] font-bold ${docPct < 50 ? "text-rose-600" : docPct < 75 ? "text-amber-600" : "text-emerald-600"}`}>
                        {docPct}%
                      </span>
                      <span className="text-[10px] text-text-muted ml-1">
                        ({f.doctorsPresent}/{f.totalDoctors})
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-center">
                      {f.medicineStockIssues > 0 ? (
                        <span className="pill pill-high"><span className="pill-dot-high" />{f.medicineStockIssues} issues</span>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-medium">Clear</span>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-center">
                      {f.diseaseSpikeCount > 0 ? (
                        <span className="pill pill-critical"><span className="pill-dot-critical" />{f.diseaseSpikeCount} spike{f.diseaseSpikeCount > 1 ? "s" : ""}</span>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-medium">None</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex justify-center">
                        <BedOccupancyIndicator used={f.bedsOccupied} total={f.totalBeds} />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
