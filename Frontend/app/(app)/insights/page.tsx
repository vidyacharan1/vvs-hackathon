"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Copy } from "lucide-react";
import { aiInsights, getFacilityName } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

const severityColors: Record<string, { accent: string; iconBg: string; iconText: string }> = {
  critical: { accent: "border-l-[#ef4444]", iconBg: "bg-[#fef2f2]", iconText: "text-[#ef4444]" },
  high: { accent: "border-l-[#f59e0b]", iconBg: "bg-[#fffbeb]", iconText: "text-[#f59e0b]" },
  medium: { accent: "border-l-[#ca8a04]", iconBg: "bg-[#fefce8]", iconText: "text-[#ca8a04]" },
  low: { accent: "border-l-[#10b981]", iconBg: "bg-[#f0fdf4]", iconText: "text-[#10b981]" },
};

const statusStyles: Record<string, string> = {
  open: "bg-[#fef2f2] text-[#ef4444]",
  acknowledged: "bg-[#fefce8] text-[#ca8a04]",
  resolved: "bg-[#f0fdf4] text-[#10b981]",
};

export default function InsightsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? aiInsights : aiInsights.filter((i) => i.severity === filter);

  return (
    <motion.div className="p-6 space-y-6 max-w-7xl mx-auto" initial="initial" animate="animate" variants={stagger}>
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">AI Insights Board</h2>
          <p className="text-sm text-[#a1a1aa] mt-1">{aiInsights.length} insights &middot; {aiInsights.filter((i) => i.status === "open").length} open</p>
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#f4f4f5]">
          {["all", "critical", "high", "medium", "low"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                filter === f ? "bg-white text-[#18181b] shadow-sm" : "text-[#a1a1aa] hover:text-[#52525b]"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((insight) => {
          const colors = severityColors[insight.severity] || severityColors.low;
          return (
            <div
              key={insight.id}
              className={`bg-white rounded-2xl p-5 border border-[#e4e4e7] border-l-4 ${colors.accent}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${colors.iconBg} ${colors.iconText} flex items-center justify-center`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#18181b]">{insight.type}</span>
                      <span className={`badge-${insight.severity}`}>{insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}</span>
                    </div>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">
                      {getFacilityName(insight.facilityId)} &middot; {new Date(insight.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${statusStyles[insight.status] || ""}`}>
                  {insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-[#52525b] mb-4 leading-relaxed">{insight.summary}</p>
              <div className="rounded-xl bg-[#eef2ff]/50 border border-[#6366f1]/10 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6366f1] mb-1">Recommended Action</p>
                <p className="text-sm text-[#18181b]">{insight.recommendation}</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button className="btn-secondary inline-flex items-center gap-1.5 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Acknowledge</button>
                <button className="btn-secondary inline-flex items-center gap-1.5 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Resolve</button>
                <button className="btn-secondary inline-flex items-center gap-1.5 text-xs"><Copy className="w-3.5 h-3.5" /> Copy</button>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
