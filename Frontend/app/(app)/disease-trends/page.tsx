"use client";

import { TrendingUp, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { healthTrends, diseaseSpikes, villageConditions, getFacilityName } from "@/lib/demo-data";

export default function DiseaseTrendsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <p className="text-label-xs text-outline uppercase tracking-widest font-medium">ANALYTICS</p>
        <h1 className="text-headline-lg font-bold text-on-surface mt-1">Disease Trends</h1>
        <p className="text-label-sm text-outline mt-0.5">Disease spike detection and trend analysis across all facilities</p>
      </div>

      <div className="card-glass p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-brand-purple" />
          </div>
          <h2 className="text-headline-sm font-bold">Disease Trend Chart (7-month)</h2>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-outline)" }} />
              <YAxis tick={{ fontSize: 12, fill: "var(--color-outline)" }} />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-outline-variant)", borderRadius: "12px" }} />
              <Legend />
              <Line type="monotone" dataKey="fever" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Fever" />
              <Line type="monotone" dataKey="respiratory" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name="Respiratory" />
              <Line type="monotone" dataKey="hypertension" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Hypertension" />
              <Line type="monotone" dataKey="diabetes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Diabetes" />
              <Line type="monotone" dataKey="diarrhea" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Diarrhea" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-headline-sm font-bold mb-4">This Week vs Last Week</h2>
          <div className="space-y-3">
            {diseaseSpikes.map((d) => (
              <div key={d.condition + d.facilityId} className="card-glass p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${d.risk === "critical" ? "bg-error" : d.risk === "high" ? "bg-warning" : d.risk === "medium" ? "bg-primary" : "bg-success"}`} />
                    <span className="text-body-md font-bold">{d.condition}</span>
                  </div>
                  <span className={`pill pill-${d.risk}`}>{d.risk.charAt(0).toUpperCase() + d.risk.slice(1)}</span>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="card-glass p-2"><p className="text-label-xs text-outline">This Week</p><p className="text-headline-sm font-bold text-on-surface">{d.thisWeek}</p></div>
                  <div className="card-glass p-2"><p className="text-label-xs text-outline">Last Week</p><p className="text-headline-sm font-bold text-outline">{d.lastWeek}</p></div>
                  <div className="card-glass p-2"><p className="text-label-xs text-outline">Change</p><p className={`text-headline-sm font-bold ${d.increase > 50 ? "text-error" : d.increase > 20 ? "text-warning" : "text-success"} flex items-center justify-center gap-1`}>{d.increase > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}{d.increase}%</p></div>
                  <div className="card-glass p-2"><p className="text-label-xs text-outline">Facility</p><p className="text-label-sm font-semibold mt-1">{getFacilityName(d.facilityId)}</p></div>
                </div>
                <div className="mt-2 p-2 rounded-lg bg-warning/5 border border-warning/10 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                  <p className="text-label-xs text-outline">Linked medicine pressure: {d.linkedMedicine}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-headline-sm font-bold mb-4">Village-wise Condition Clusters</h2>
          <div className="space-y-2">
            {villageConditions.map((v, i) => (
              <div key={i} className="card-glass p-3 flex items-center justify-between">
                <div><p className="text-label-md font-medium">{v.village}</p><p className="text-label-xs text-outline">{getFacilityName(v.facilityId)}</p></div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-purple/10 text-brand-purple text-label-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-purple" />
                    {v.condition}
                  </span>
                  <span className="text-body-md font-bold">{v.count} cases</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
