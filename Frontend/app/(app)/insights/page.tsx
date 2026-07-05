"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Copy, Sparkles } from "lucide-react";
import { aiInsights } from "@/lib/demo-data";
import type { FacilityStatus } from "@/lib/demo-data";
import { useAIDistrictBrief, useAlertFeed, useFacilities } from "@/lib/api";

const statusPillClass: Record<string, string> = {
  open: "pill pill-critical",
  acknowledged: "pill pill-medium",
  resolved: "pill pill-low",
};

function getFacilityName(facilityList: { id: string; name: string }[], id: string) {
  return facilityList.find((f) => f.id === id)?.name ?? id;
}

const filters = ["all", "critical", "high", "medium", "low"];

export default function InsightsPage() {
  const [filter, setFilter] = useState("all");
  const { data: alertFeed, refetch } = useAlertFeed();
  const { data: aiBrief, loading: briefLoading, generate } = useAIDistrictBrief();
  const { data: apiFacilities } = useFacilities();

  const displayInsights = useMemo(() => {
    if (alertFeed && alertFeed.length > 0) {
      return alertFeed.map((alert, i) => ({
        id: `alert-${i}`,
        message: alert.title,
        priority: alert.severity.toLowerCase() as "high" | "medium" | "low",
        category: "Alert",
        timestamp: alert.time,
        type: alert.title,
        facilityId: "phc-madhurawada",
        severity: alert.severity.toLowerCase() as FacilityStatus,
        createdAt: new Date().toISOString(),
        summary: alert.title,
        recommendation: "Review and take appropriate action.",
        status: "open" as const,
      }));
    }
    return aiInsights;
  }, [alertFeed]);

  const filtered = useMemo(() => filter === "all" ? displayInsights : displayInsights.filter((item) => item.severity === filter), [filter, displayInsights]);
  const openCount = displayInsights.filter((item) => item.status === "open").length;

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">AI</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">AI Insights Board</h1>
          <p className="text-label-sm text-outline">{displayInsights.length} insights, {openCount} open alerts.</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-outline-variant/20 bg-white/60 p-1.5">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-3 py-1.5 text-label-xs font-bold capitalize transition ${filter === item ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20" : "text-outline hover:bg-brand-purple/10 hover:text-brand-purple"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Critical", displayInsights.filter((item) => item.severity === "critical").length, "text-error"],
          ["High", displayInsights.filter((item) => item.severity === "high").length, "text-orange-600"],
          ["Open", openCount, "text-warning"],
          ["Resolved", displayInsights.filter((item) => item.status === "resolved").length, "text-success"],
        ].map(([label, value, color]) => (
          <div key={label} className="card-glass p-3">
            <p className="text-label-xs uppercase tracking-widest text-outline">{label}</p>
            <p className={`mt-1 text-2xl font-bold leading-none ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          {filtered.map((insight) => (
            <div key={insight.id} className={`card-glass min-w-0 border-l-4 p-4 ${insight.severity === "critical" ? "border-l-error" : insight.severity === "high" ? "border-l-orange-500" : insight.severity === "medium" ? "border-l-warning" : "border-l-success"}`}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10">
                    <AlertTriangle className="h-4 w-4 text-brand-purple" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-label-md font-bold text-on-surface">{insight.type}</p>
                      <span className={`pill pill-${insight.severity as FacilityStatus}`}>{insight.severity}</span>
                    </div>
                    <p className="truncate text-[11px] text-outline">{getFacilityName(apiFacilities ?? [], insight.facilityId)} - {insight.timestamp}</p>
                  </div>
                </div>
                <span className={statusPillClass[insight.status]}>{insight.status}</span>
              </div>
              <p className="line-clamp-2 text-label-sm leading-5 text-on-surface">{insight.summary}</p>
              <div className="mt-3 rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline">Recommended Action</p>
                <p className="line-clamp-2 text-label-sm text-brand-purple">{insight.recommendation}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => { fetch(`/api/v1/alerts/${insight.id}/acknowledge`, { method: "POST" }).then(() => refetch()); }} className="flex items-center gap-1.5 rounded-xl bg-surface-container-high px-2.5 py-1.5 text-label-xs font-bold hover:bg-brand-purple hover:text-white"><CheckCircle className="h-3.5 w-3.5" /> Acknowledge</button>
                <button onClick={() => { fetch(`/api/v1/alerts/${insight.id}/resolve`, { method: "POST" }).then(() => refetch()); }} className="flex items-center gap-1.5 rounded-xl bg-surface-container-high px-2.5 py-1.5 text-label-xs font-bold hover:bg-brand-purple hover:text-white"><CheckCircle className="h-3.5 w-3.5" /> Resolve</button>
                <button onClick={() => { navigator.clipboard.writeText(`${insight.type}: ${insight.summary}\nRecommendation: ${insight.recommendation}`); alert("Copied to clipboard!"); }} className="flex items-center gap-1.5 rounded-xl bg-surface-container-high px-2.5 py-1.5 text-label-xs font-bold hover:bg-brand-purple hover:text-white"><Copy className="h-3.5 w-3.5" /> Copy</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="card-glass p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-purple/10">
              <Sparkles className="h-4 w-4 text-brand-purple" />
            </div>
            <div>
              <h2 className="text-headline-sm font-bold text-on-surface">District Brief Queue</h2>
              <p className="text-label-xs text-outline">Top AI narrative for officers</p>
            </div>
          </div>
          {aiBrief ? (
            <div className="space-y-2">
              <div className="rounded-2xl border border-brand-purple/10 bg-brand-purple/5 p-2.5">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="truncate text-label-sm font-bold text-on-surface">{aiBrief.title}</p>
                  <span className="pill pill-low">{Math.round(aiBrief.confidence * 100)}%</span>
                </div>
                <p className="line-clamp-2 text-[11px] leading-4 text-outline">{aiBrief.summary}</p>
              </div>
              {aiBrief.actions.map((action, i) => (
                <div key={i} className="rounded-2xl border border-outline-variant/20 bg-white/70 p-2.5">
                  <p className="line-clamp-2 text-[11px] leading-4 text-outline">{action}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {displayInsights.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-2xl border border-outline-variant/20 bg-white/70 p-2.5">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="truncate text-label-sm font-bold text-on-surface">{item.category}</p>
                    <span className={`pill pill-${item.severity}`}>{item.severity}</span>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-4 text-outline">{item.message}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => generate()}
            disabled={briefLoading}
            className="gradient-button mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-label-md font-semibold text-white disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" /> {briefLoading ? "Generating..." : "Generate District Brief"}
          </button>
        </aside>
      </div>
    </div>
  );
}
