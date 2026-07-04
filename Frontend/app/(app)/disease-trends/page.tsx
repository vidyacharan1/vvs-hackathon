"use client";

import { TrendingUp, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { healthTrends, diseaseSpikes, villageConditions, getFacilityName } from "@/lib/demo-data";

export default function DiseaseTrendsPage() {
  return (
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">ANALYTICS</span>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">Disease Trends</h1>
          <p className="text-body-lg text-on-surface-variant mt-3">Disease spike detection and trend analysis across all facilities</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-12">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-on-surface">Disease Trend Chart</h2>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">WEEKLY COMPARISON</span>
              <h2 className="text-3xl font-bold text-on-surface mb-8">This Week vs Last Week</h2>
              <div className="space-y-4">
                {diseaseSpikes.map((d) => (
                  <div key={d.condition + d.facilityId} className="glass-card p-6 rounded-2xl hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${d.risk === "critical" ? "bg-error" : d.risk === "high" ? "bg-warning" : d.risk === "medium" ? "bg-primary" : "bg-success"}`} />
                        <span className="text-body-md font-bold">{d.condition}</span>
                      </div>
                      <span className={`pill pill-${d.risk}`}>{d.risk.charAt(0).toUpperCase() + d.risk.slice(1)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-primary-fixed/30">
                        <div className="text-primary font-label-sm uppercase tracking-widest">This Week</div>
                        <div className="text-3xl font-bold text-on-surface">{d.thisWeek}</div>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low">
                        <div className="text-primary font-label-sm uppercase tracking-widest">Last Week</div>
                        <div className="text-3xl font-bold text-on-surface">{d.lastWeek}</div>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low">
                        <div className="text-primary font-label-sm uppercase tracking-widest">Change</div>
                        <div className={`text-3xl font-bold flex items-center justify-center gap-0.5 ${d.increase > 50 ? "text-error" : d.increase > 20 ? "text-warning" : "text-success"}`}>
                          {d.increase > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}{d.increase}%
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-container-low">
                        <div className="text-primary font-label-sm uppercase tracking-widest">Facility</div>
                        <div className="text-label-sm font-semibold mt-0.5">{getFacilityName(d.facilityId)}</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-xl bg-warning/5 border border-warning/10 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                      <p className="text-label-xs text-outline">Linked medicine pressure: {d.linkedMedicine}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">VILLAGE CLUSTERS</span>
              <h2 className="text-3xl font-bold text-on-surface mb-8">Village-wise Condition Clusters</h2>
              <div className="space-y-2">
                {villageConditions.map((v, i) => (
                  <div key={i} className="glass-card p-4 rounded-2xl flex items-center justify-between hover:scale-[1.01] transition-transform duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                    <div>
                      <p className="font-label-md font-medium">{v.village}</p>
                      <p className="text-label-xs text-outline">{getFacilityName(v.facilityId)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex px-3 py-1.5 rounded-xl bg-primary-fixed text-primary text-label-xs font-medium">
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
      </section>
    </div>
  );
}
