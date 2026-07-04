"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import type { Facility } from "@/lib/demo-data";

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
  critical: { label: "Critical", dot: "bg-red-500", text: "text-red-600" },
  high: { label: "High", dot: "bg-orange-500", text: "text-orange-600" },
  medium: { label: "Medium", dot: "bg-amber-500", text: "text-amber-600" },
  low: { label: "Low", dot: "bg-emerald-500", text: "text-emerald-600" },
};

export default function FacilityRiskTable({ facilities }: { facilities: Facility[] }) {
  return (
    <div className="space-y-4">
      {facilities.map((f) => {
        const sc = statusConfig[f.status];
        const bedPercent = Math.round((f.bedsOccupied / f.totalBeds) * 100);
        return (
          <Link
            key={f.id}
            href={`/facilities/${f.id}`}
            className="block bg-[#ecfdf5] rounded-2xl p-5 neu-sm hover:neu-convex transition-all duration-300 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-xl bg-[#ecfdf5] flex items-center justify-center shrink-0 neu-pressed">
                  <Building2 className={`w-5 h-5 ${f.type === "PHC" ? "text-emerald-600" : "text-blue-600"}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 truncate">{f.name}</span>
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-100/50 px-1.5 py-0.5 rounded-md">{f.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{f.village}, {f.district}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                <span className={`text-xs font-bold ${sc.text}`}>{sc.label}</span>
              </div>

              <div className="flex items-center gap-3 lg:gap-5 text-xs shrink-0 flex-wrap">
                <StatItem label="OPD" value={f.todayOpd} />
                <StatItem label="Dr" value={`${f.doctorsPresent}/${f.totalDoctors}`} />
                <StatItem label="Nurse" value={`${f.nursesPresent}/${f.totalNurses}`} />
                <StatItem label="Stock" value={f.medicineStockIssues} warn={f.medicineStockIssues > 0} />
                <StatItem label="Spike" value={f.diseaseSpikeCount} warn={f.diseaseSpikeCount > 0} />
                <StatItem label="Beds" value={`${bedPercent}%`} />
              </div>

              <ArrowUpRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors shrink-0" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function StatItem({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div className="flex items-center gap-1 bg-[#ecfdf5] px-2 py-1 rounded-lg neu-flat">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className={`font-semibold ${warn ? "text-amber-600" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}
