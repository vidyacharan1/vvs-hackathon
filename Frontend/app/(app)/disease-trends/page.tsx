"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { healthTrends, diseaseSpikes, villageConditions, getFacilityName } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

function StatBox({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-[#e4e4e7]">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">{label}</div>
      <div className={`text-xl font-bold ${color || "text-[#18181b]"}`}>{value}</div>
    </div>
  );
}

export default function DiseaseTrendsPage() {
  return (
    <motion.div className="p-6 space-y-6 max-w-7xl mx-auto" initial="initial" animate="animate" variants={stagger}>
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-white border border-[#e4e4e7] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#18181b]" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Disease Trends</h2>
        </div>
        <p className="text-sm text-[#a1a1aa] ml-12">Disease spike detection and trend analysis across all facilities</p>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthTrends}>
              <defs>
                <linearGradient id="feverG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="respG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} />
              <Legend />
              <Area type="monotone" dataKey="fever" stroke="#ef4444" strokeWidth={2} fill="url(#feverG)" name="Fever" />
              <Area type="monotone" dataKey="respiratory" stroke="#f97316" strokeWidth={2} fill="url(#respG)" name="Respiratory" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Weekly Comparison</h2>
            <p className="text-sm text-[#a1a1aa] mt-1">This week vs last week disease spikes</p>
          </div>
          {diseaseSpikes.map((d) => (
            <div key={d.condition + d.facilityId} className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#18181b]">{d.condition}</span>
                <span className={`badge-${d.risk}`}>{d.risk.charAt(0).toUpperCase() + d.risk.slice(1)}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <StatBox label="This Week" value={d.thisWeek} />
                <StatBox label="Last Week" value={d.lastWeek} />
                <StatBox
                  label="Change %"
                  value={d.increase > 0 ? `+${d.increase}%` : `${d.increase}%`}
                  color={d.increase > 50 ? "#dc2626" : d.increase > 20 ? "#ea580c" : "#16a34a"}
                />
                <StatBox label="Facility" value={getFacilityName(d.facilityId)} />
              </div>
              <div className="mt-4 p-3 rounded-xl bg-[#fef2f2] border border-[#ef4444]/10 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#dc2626] shrink-0" />
                <p className="text-xs text-[#52525b]">Linked medicine pressure: {d.linkedMedicine}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Village Clusters</h2>
            <p className="text-sm text-[#a1a1aa] mt-1">Village-wise condition clusters</p>
          </div>
          {villageConditions.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#e4e4e7] flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#18181b]">{v.village}</p>
                <p className="text-xs text-[#a1a1aa] mt-0.5">{getFacilityName(v.facilityId)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex px-3 py-1 rounded-lg bg-[#f4f4f5] text-[#18181b] text-xs font-medium">{v.condition}</span>
                <span className="text-sm font-bold text-[#18181b]">{v.count} cases</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
