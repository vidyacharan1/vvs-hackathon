"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { healthTrends } from "@/lib/demo-data";
import { TrendingUp } from "lucide-react";

const filters = ["Week", "Month", "Year"];

export default function HealthAnalytics() {
  const [activeFilter, setActiveFilter] = useState("Year");

  return (
    <div className="card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Health Analytics</h2>
            <p className="text-[11px] text-text-muted">OP Visits & Disease Trends</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-bg-base rounded-lg p-0.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                activeFilter === f
                  ? "bg-white text-text-primary shadow-sm border border-border"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={healthTrends} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="opVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b48b8" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#3b48b8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="chronicCases" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="followUps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f6" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#8b91aa" }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#8b91aa" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid #e2e6f0",
                borderRadius: 10,
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                fontSize: 12,
                padding: "8px 12px",
              }}
              cursor={{ stroke: "#cdd2ed", strokeDasharray: "3 3" }}
            />
            <Area
              type="monotone"
              dataKey="opVisits"
              name="OP Visits"
              stroke="#3b48b8"
              strokeWidth={2}
              fill="url(#opVisits)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: "#3b48b8" }}
            />
            <Area
              type="monotone"
              dataKey="chronicCases"
              name="Chronic Disease Cases"
              stroke="#e11d48"
              strokeWidth={2}
              fill="url(#chronicCases)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: "#e11d48" }}
            />
            <Area
              type="monotone"
              dataKey="followUps"
              name="Follow-up Visits"
              stroke="#0891b2"
              strokeWidth={2}
              fill="url(#followUps)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: "#0891b2" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        {[
          { name: "OP Visits", color: "#3b48b8" },
          { name: "Chronic Disease Cases", color: "#e11d48" },
          { name: "Follow-up Visits", color: "#0891b2" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] text-text-secondary">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
