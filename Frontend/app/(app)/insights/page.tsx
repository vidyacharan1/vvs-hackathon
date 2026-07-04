"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Copy } from "lucide-react";
import { aiInsights, getFacilityName } from "@/lib/demo-data";

const statusPillClass: Record<string, string> = {
  open: "pill pill-critical",
  acknowledged: "pill pill-medium",
  resolved: "pill pill-low",
};

export default function InsightsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? aiInsights : aiInsights.filter((i) => i.severity === filter);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-xs text-outline uppercase tracking-widest font-medium">AI</p>
          <h1 className="text-headline-lg font-bold text-on-surface mt-1">AI Insights Board</h1>
          <p className="text-label-sm text-outline mt-0.5">{aiInsights.length} insights · {aiInsights.filter((i) => i.status === "open").length} open</p>
        </div>
        <div className="flex items-center gap-2">
          {["all", "critical", "high", "medium", "low"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-label-xs font-medium transition-all capitalize ${filter === f ? "bg-brand-purple/10 text-brand-purple" : "text-outline hover:bg-surface-container-high"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((insight) => (
          <div key={insight.id} className={`card-glass p-5 border-l-4 ${insight.severity === "critical" ? "border-l-error" : insight.severity === "high" ? "border-l-warning" : insight.severity === "medium" ? "border-l-primary" : "border-l-success"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-label-md font-bold">{insight.type}</p>
                    <span className={`pill pill-${insight.severity}`}>{insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}</span>
                  </div>
                  <p className="text-label-xs text-outline">{getFacilityName(insight.facilityId)} · {new Date(insight.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <span className={statusPillClass[insight.status]}>{insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}</span>
            </div>
            <p className="text-body-md text-on-surface mb-2">{insight.summary}</p>
            <div className="p-3 rounded-lg bg-brand-purple/5 border border-brand-purple/10">
              <p className="text-label-xs text-outline uppercase tracking-widest font-medium">Recommended Action</p>
              <p className="text-label-sm text-brand-purple mt-0.5">{insight.recommendation}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-higher transition-colors text-label-xs font-medium flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Acknowledge</button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-higher transition-colors text-label-xs font-medium flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Resolve</button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-higher transition-colors text-label-xs font-medium flex items-center gap-1.5"><Copy className="w-3.5 h-3.5" /> Copy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
