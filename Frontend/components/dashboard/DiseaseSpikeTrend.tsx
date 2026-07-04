"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", spikes: 2 },
  { month: "Feb", spikes: 1 },
  { month: "Mar", spikes: 3 },
  { month: "Apr", spikes: 4 },
  { month: "May", spikes: 2 },
  { month: "Jun", spikes: 5 },
];

export default function DiseaseSpikeTrend() {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-[12px] font-bold text-[#0a0b2e]">Disease Spike Trend</h3>
          <p className="text-[10px] text-text-muted">Last 6 months</p>
        </div>
      </div>
      <div className="h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 2, right: 2, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0ebf8" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#8b8baa" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#8b8baa" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid #e8e2f0",
                borderRadius: 10,
                fontSize: 11,
                padding: "4px 8px",
              }}
            />
            <Bar dataKey="spikes" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
