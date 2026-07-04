"use client";

import { AlertTriangle, ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { diseaseSpikes, getFacilityName, healthTrends, villageConditions } from "@/lib/demo-data";

export default function DiseaseTrendsPage() {
  const criticalSpikes = diseaseSpikes.filter((item) => item.risk === "critical" || item.risk === "high").length;

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">Analytics</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">Disease Trends</h1>
          <p className="text-label-sm text-outline">Spike detection and village-level condition clusters.</p>
        </div>
        <div className="card-glass flex items-center gap-3 rounded-2xl px-3.5 py-2">
          <TrendingUp className="h-4 w-4 text-brand-purple" />
          <div>
            <p className="text-label-xs text-outline">Active High Spikes</p>
            <p className="text-label-md font-bold text-error">{criticalSpikes}</p>
          </div>
        </div>
      </div>

      <div className="card-glass p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline">7-month trend</p>
            <h2 className="text-headline-sm font-bold text-on-surface">Disease Trend Chart</h2>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-label-xs font-bold text-brand-purple">District view</span>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrends} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#e4e8f7" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5E668A" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5E668A" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #E4E8F7", borderRadius: 14 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="fever" stroke="#ef4444" strokeWidth={2} dot={false} name="Fever" />
              <Line type="monotone" dataKey="respiratory" stroke="#f97316" strokeWidth={2} dot={false} name="Respiratory" />
              <Line type="monotone" dataKey="hypertension" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Hypertension" />
              <Line type="monotone" dataKey="diabetes" stroke="#3b82f6" strokeWidth={2} dot={false} name="Diabetes" />
              <Line type="monotone" dataKey="diarrhea" stroke="#10b981" strokeWidth={2} dot={false} name="Diarrhea" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="card-glass p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-label-xs uppercase tracking-widest text-outline">Spike Matrix</p>
              <h2 className="text-headline-sm font-bold text-on-surface">This Week vs Last Week</h2>
            </div>
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {diseaseSpikes.map((disease) => (
              <div key={`${disease.condition}-${disease.facilityId}`} className="rounded-2xl border border-outline-variant/20 bg-white/70 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-label-md font-bold text-on-surface">{disease.condition}</p>
                    <p className="truncate text-[11px] text-outline">{getFacilityName(disease.facilityId)}</p>
                  </div>
                  <span className={`pill pill-${disease.risk}`}>{disease.risk}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-surface-container-lowest/80 p-2"><p className="text-[10px] text-outline">This Week</p><p className="text-label-md font-bold">{disease.thisWeek}</p></div>
                  <div className="rounded-xl bg-surface-container-lowest/80 p-2"><p className="text-[10px] text-outline">Last Week</p><p className="text-label-md font-bold">{disease.lastWeek}</p></div>
                  <div className="rounded-xl bg-surface-container-lowest/80 p-2">
                    <p className="text-[10px] text-outline">Change</p>
                    <p className={`flex items-center justify-center gap-1 text-label-md font-bold ${disease.increase > 50 ? "text-error" : disease.increase > 20 ? "text-warning" : "text-success"}`}>
                      {disease.increase >= 0 ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                      {disease.increase}%
                    </p>
                  </div>
                </div>
                <p className="mt-2 rounded-xl border border-warning/10 bg-warning/5 px-2.5 py-2 text-[11px] text-outline">Medicine pressure: {disease.linkedMedicine}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-4">
          <div className="mb-3">
            <p className="text-label-xs uppercase tracking-widest text-outline">Village Clusters</p>
            <h2 className="text-headline-sm font-bold text-on-surface">Condition Hotspots</h2>
          </div>
          <div className="space-y-2">
            {villageConditions.map((village) => (
              <div key={`${village.village}-${village.condition}`} className="flex items-center justify-between gap-3 rounded-2xl border border-outline-variant/20 bg-white/70 p-2.5">
                <div className="min-w-0">
                  <p className="truncate text-label-md font-bold text-on-surface">{village.village}</p>
                  <p className="truncate text-[11px] text-outline">{getFacilityName(village.facilityId)}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="rounded-full bg-brand-purple/10 px-2 py-1 text-[11px] font-bold text-brand-purple">{village.condition}</span>
                  <p className="mt-1 text-label-sm font-bold text-on-surface">{village.count} cases</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
