"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { motion } from "framer-motion";
import {
  Building2, AlertTriangle, Pill, Users,
  Plus, Sparkles, ChevronRight,
  MapPin, Activity, ArrowUp, ArrowDown,
  X, HeartPulse, Thermometer, Stethoscope
} from "lucide-react";
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { dashboardSummary, facilities, healthTrends } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const statusDot = (s: string) => {
  const m: Record<string, string> = { critical: "bg-[#ef4444]", high: "bg-[#f59e0b]", medium: "bg-[#ca8a04]", low: "bg-[#10b981]" };
  return m[s] || "bg-[#a1a1aa]";
};

/* ─── Mini Sparkline ─── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v, i) => `${i * 20},${30 - v * 0.6}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" className="w-full h-8">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

/* ─── Premium KPI Card ─── */
function MetricCard({
  label, value, icon: Icon, trend, color, chart, detail,
}: {
  label: string; value: string | number; icon: React.ElementType;
  trend?: number; color: string; chart?: number[]; detail?: string;
}) {
  return (
    <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7] hover:shadow-lg hover:shadow-black/5 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md ${trend >= 0 ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-[#fef2f2] text-[#dc2626]"}`}>
            {trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight mb-0.5">{value}</div>
      <div className="text-xs text-[#a1a1aa] font-medium">{label}</div>
      {chart && <div className="mt-2 opacity-60"><Sparkline data={chart} color={color.includes("accent") ? "#6366f1" : "#a1a1aa"} /></div>}
      {detail && <div className="mt-2 text-[11px] text-[#a1a1aa]">{detail}</div>}
    </motion.div>
  );
}

/* ─── Facility Row ─── */
function FacilityRow({ f, rank }: { f: Facility; rank: number }) {
  return (
    <Link href={`/facilities/${f.id}`} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#f4f4f5] transition-colors group">
      <span className="w-5 text-xs font-semibold text-[#a1a1aa]">{rank}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(f.status)}`} />
          <span className="text-sm font-medium truncate">{f.name}</span>
          <span className="text-[11px] text-[#a1a1aa]">{f.type}</span>
        </div>
        <p className="text-xs text-[#a1a1aa] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{f.village}</p>
      </div>
      <div className="hidden sm:flex items-center gap-5">
        <div className="text-right"><p className="text-xs text-[#a1a1aa]">OPD</p><p className="text-sm font-semibold">{f.todayOpd}</p></div>
        <div className="text-right"><p className="text-xs text-[#a1a1aa]">Doctors</p><p className="text-sm font-semibold">{f.doctorsPresent}/{f.totalDoctors}</p></div>
        <div className="text-right"><p className="text-xs text-[#a1a1aa]">Beds</p><p className="text-sm font-semibold">{f.bedsOccupied}/{f.totalBeds}</p></div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`text-sm font-bold px-2 py-0.5 rounded-md ${
          f.riskScore >= 70 ? "text-[#dc2626] bg-[#fef2f2]" : f.riskScore >= 40 ? "text-[#ea580c] bg-[#fff7ed]" : "text-[#16a34a] bg-[#f0fdf4]"
        }`}>
          {f.riskScore}%
        </div>
        <ChevronRight className="w-4 h-4 text-[#d4d4d8] group-hover:text-[#6366f1] transition-colors" />
      </div>
    </Link>
  );
}

/* ─── Main Dashboard ─── */
export default function DashboardPage() {
  const { role, simulationMode } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const isDistrictOfficer = role === "district_officer";

  const sortedFacilities = useMemo(() => [...facilities].sort((a, b) => b.riskScore - a.riskScore), []);

  const pieData = useMemo(() => [
    { name: "Critical", value: dashboardSummary.criticalFacilities, color: "#ef4444" },
    { name: "High", value: dashboardSummary.highFacilities, color: "#f59e0b" },
    { name: "Medium", value: dashboardSummary.mediumFacilities, color: "#ca8a04" },
    { name: "Low", value: dashboardSummary.lowFacilities, color: "#10b981" },
  ], []);

  const bedData = useMemo(() => [
    { name: "Occupied", value: dashboardSummary.occupiedBeds, color: "#6366f1" },
    { name: "Available", value: dashboardSummary.totalBeds - dashboardSummary.occupiedBeds, color: "#e4e4e7" },
  ], []);

  const alerts = [
    { facility: "PHC Madhurawada", alert: "Paracetamol stock critical — 2.2 days remaining", severity: "critical" },
    { facility: "PHC Madhurawada", alert: "Fever cases up 104% week-over-week", severity: "critical" },
    { facility: "PHC Gajuwaka", alert: "Dr. Meera Iyer absent — zero pediatric coverage", severity: "critical" },
    { facility: "CHC Bheemili", alert: "Diarrhea cases up 73% — ORS demand increasing", severity: "high" },
    { facility: "PHC Madhurawada", alert: "Sr. Mary D. overloaded — 38 patients, 14 pending", severity: "high" },
  ];

  return (
    <motion.div initial="initial" animate="animate" className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* ─── Header ─── */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#a1a1aa] mt-0.5">
            {simulationMode === "tomorrow" ? "Simulating tomorrow" : `${dashboardSummary.totalFacilities} facilities · ${dashboardSummary.totalPatients} patients`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isDistrictOfficer && (
            <button onClick={() => setShowCreate(true)} className="btn-primary">
              <Plus className="w-3.5 h-3.5" /> New Facility
            </button>
          )}
          <button className="btn-secondary"><Sparkles className="w-3.5 h-3.5" /> Brief</button>
        </div>
      </motion.div>

      {/* ─── KPI Grid ─── */}
      <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Total Facilities" value={dashboardSummary.totalFacilities} icon={Building2} color="bg-[#eef2ff] text-[#6366f1]" chart={[4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 12]} detail="+2 this quarter" />
        <MetricCard label="Critical Facilities" value={dashboardSummary.criticalFacilities} icon={AlertTriangle} color="bg-[#fef2f2] text-[#dc2626]" trend={25} />
        <MetricCard label="Medicine Alerts" value={dashboardSummary.medicineStockIssues} icon={Pill} color="bg-[#fff7ed] text-[#ea580c]" trend={-12} chart={[3, 5, 4, 6, 5, 7, 6, 8, 7, 6, 5, 4]} />
        <MetricCard label="High-risk Patients" value={dashboardSummary.criticalPatients} icon={HeartPulse} color="bg-[#fef2f2] text-[#dc2626]" trend={8} />
        <MetricCard label="Doctor Absences" value={dashboardSummary.doctorAbsenceAlerts} icon={Stethoscope} color="bg-[#fff7ed] text-[#ea580c]" trend={-5} detail="3 present today" />
        <MetricCard label="Nurse Overloads" value={dashboardSummary.nurseOverloadAlerts} icon={Users} color="bg-[#fefce8] text-[#ca8a04]" trend={10} />
        <MetricCard label="Disease Spikes" value={dashboardSummary.diseaseSpikeAlerts} icon={Thermometer} color="bg-[#fef2f2] text-[#dc2626]" trend={104} />
        <MetricCard label="Bed Pressure" value={`${dashboardSummary.bedPressureAlerts}`} icon={Activity} color="bg-[#fff7ed] text-[#ea580c]" chart={[60, 65, 62, 70, 68, 72, 75, 78, 76, 74, 73, 71]} detail={`${dashboardSummary.occupiedBeds}/${dashboardSummary.totalBeds} filled`} />
      </motion.div>

      {/* ─── Charts Row ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disease Trend Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#e4e4e7]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold">Disease Trends</h2>
              <p className="text-xs text-[#a1a1aa]">7-month rolling view</p>
            </div>
            <Link href="/disease-trends" className="text-xs text-[#6366f1] font-medium hover:underline">View all</Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrends}>
                <defs>
                  <linearGradient id="fever" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} /><stop offset="100%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                  <linearGradient id="resp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity={0.15} /><stop offset="100%" stopColor="#f97316" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} />
                <Area type="monotone" dataKey="fever" stroke="#ef4444" strokeWidth={2} fill="url(#fever)" name="Fever" />
                <Area type="monotone" dataKey="respiratory" stroke="#f97316" strokeWidth={2} fill="url(#resp)" name="Respiratory" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Column: Pie + Radial */}
        <div className="space-y-4">
          <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
            <h2 className="text-sm font-semibold mb-3">Facility Risk</h2>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={22} outerRadius={38} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {pieData.map((e) => (
                  <div key={e.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</span>
                    <span className="font-semibold">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
            <h2 className="text-sm font-semibold mb-3">Bed Occupancy</h2>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bedData} cx="50%" cy="50%" innerRadius={18} outerRadius={32} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {bedData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold tracking-tight">{Math.round(dashboardSummary.occupiedBeds / dashboardSummary.totalBeds * 100)}%</div>
                <div className="text-xs text-[#a1a1aa]">{dashboardSummary.occupiedBeds}/{dashboardSummary.totalBeds} beds</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Facility Risk Ranking + Alerts ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e4e4e7]">
            <div>
              <h2 className="text-sm font-semibold">Facility Risk Ranking</h2>
              <p className="text-xs text-[#a1a1aa]">Sorted by risk score</p>
            </div>
            <Link href="/facilities" className="text-xs text-[#6366f1] font-medium hover:underline">All facilities</Link>
          </div>
          <div className="divide-y divide-[#e4e4e7]/50">
            {sortedFacilities.map((f, i) => <FacilityRow key={f.id} f={f} rank={i + 1} />)}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e4e4e7]">
            <h2 className="text-sm font-semibold">Recent Alerts</h2>
            <p className="text-xs text-[#a1a1aa]">{alerts.length} active</p>
          </div>
          <div className="divide-y divide-[#e4e4e7]/50">
            {alerts.map((a, i) => (
              <div key={i} className="px-5 py-3 hover:bg-[#fafafa] transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${a.severity === "critical" ? "bg-[#ef4444]" : "bg-[#f59e0b]"}`} />
                  <div className="min-w-0">
                    <p className="text-xs text-[#a1a1aa]">{a.facility}</p>
                    <p className="text-sm mt-0.5">{a.alert}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Create Modal ─── */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e4e7]">
              <h2 className="text-sm font-semibold">New PHC / CHC</h2>
              <button onClick={() => setShowCreate(false)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#f4f4f5] transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {["Facility Name", "Type", "District", "Mandal", "Village", "Total Beds", "Doctors", "Nurses"].map((f) => (
                <div key={f}>
                  <label className="text-xs font-medium mb-1 block">{f}</label>
                  <input type="text" placeholder={`Enter ${f.toLowerCase()}`} className="premium-input" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-t border-[#e4e4e7]">
              <button onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
              <button className="btn-primary flex-1">Create Facility</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
