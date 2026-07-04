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
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">AI</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">AI Insights Board</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">{aiInsights.length} insights · {aiInsights.filter((i) => i.status === "open").length} open</p>
            </div>
            <div className="flex items-center gap-2 p-1 rounded-lg bg-surface-container-high/50">
              {["all", "critical", "high", "medium", "low"].map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-label-xs font-semibold transition-all capitalize ${filter === f ? "bg-primary-fixed text-primary shadow-sm" : "text-outline hover:text-on-surface"}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((insight) => (
              <div key={insight.id} className={`glass-card p-6 rounded-2xl border-l-4 hover:scale-[1.01] transition-transform duration-300 ${insight.severity === "critical" ? "border-l-error" : insight.severity === "high" ? "border-l-warning" : insight.severity === "medium" ? "border-l-primary" : "border-l-success"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${insight.severity === "critical" ? "bg-error-container text-on-error-container" : insight.severity === "high" ? "bg-warning/10 text-warning" : insight.severity === "medium" ? "bg-primary-fixed text-primary" : "bg-success/10 text-success"}`}>
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-label-md font-bold">{insight.type}</p>
                        <span className={`pill pill-${insight.severity}`}>{insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}</span>
                      </div>
                      <p className="text-label-xs text-outline">{getFacilityName(insight.facilityId)} · {new Date(insight.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={statusPillClass[insight.status]}>{insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}</span>
                </div>
                <p className="text-body-md text-on-surface mb-4">{insight.summary}</p>
                <div className="rounded-xl bg-primary-fixed/30 border border-primary/10 p-4">
                  <p className="text-primary font-label-sm uppercase tracking-widest">Recommended Action</p>
                  <p className="text-label-sm text-primary mt-0.5">{insight.recommendation}</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-higher text-label-xs font-semibold transition-all active:scale-95"><CheckCircle className="w-3.5 h-3.5" /> Acknowledge</button>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-higher text-label-xs font-semibold transition-all active:scale-95"><CheckCircle className="w-3.5 h-3.5" /> Resolve</button>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-higher text-label-xs font-semibold transition-all active:scale-95"><Copy className="w-3.5 h-3.5" /> Copy</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
