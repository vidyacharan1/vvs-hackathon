"use client";

import { Sparkles, CheckCircle2, ArrowRight, Zap, Clock, ShieldCheck, Pill } from "lucide-react";

const actions = [
  {
    icon: Pill,
    label: "Transfer 400 Paracetamol tablets to PHC Madhurawada.",
    priority: "high",
  },
  {
    icon: CheckCircle2,
    label: "Reassign 5 low-risk follow-ups from Nurse Lakshmi to Nurse Sravani.",
    priority: "medium",
  },
  {
    icon: Clock,
    label: "Add fever triage desk tomorrow morning at PHC Madhurawada.",
    priority: "high",
  },
  {
    icon: ShieldCheck,
    label: "Notify Medical Officer about fever cluster in Pendurthi region.",
    priority: "medium",
  },
];

const impactMetrics = [
  { label: "Stock-out avoided", value: "2", unit: "medicines", icon: Pill },
  { label: "High-risk follow-ups prioritized", value: "8", unit: "patients", icon: CheckCircle2 },
  { label: "Doctor workload reduced", value: "18%", unit: "", icon: Zap },
  { label: "Medicine availability improved", value: "2.8", unit: "days", icon: Clock },
];

export default function AIDistrictBrief() {
  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center shadow-lg shadow-[#3b48b8]/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[#0a0b2e]">AI District Brief</h2>
          <p className="text-[11px] text-text-muted">Recommended actions</p>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div
              key={idx}
              className={`rounded-xl p-3 border transition-all duration-200 ${
                action.priority === "high"
                  ? "bg-rose-50/60 border-rose-200/60"
                  : "bg-[#eef0fa]/60 border-[#cdd2ed]/60"
              }`}
            >
              <div className="flex gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  action.priority === "high"
                    ? "bg-gradient-to-br from-rose-500 to-pink-600"
                    : "bg-gradient-to-br from-[#3b48b8] to-[#5a2bae]"
                }`}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[12px] text-text-secondary leading-relaxed">{action.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Forecast */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#eef0fa]/80 to-[#f5f0ff]/80 border border-[#cdd2ed]/40">
        <div className="flex items-center gap-1.5 mb-3">
          <Zap className="w-4 h-4 text-[#3b48b8]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3b48b8]">Impact Forecast</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {impactMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#3b48b8]" />
                </div>
                <div>
                  <span className="text-[15px] font-bold text-[#0a0b2e] leading-none">{m.value}</span>
                  {m.unit && <span className="text-[10px] text-text-muted ml-0.5">{m.unit}</span>}
                  <p className="text-[10px] text-text-muted leading-tight">{m.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#3b48b8] to-[#5a2bae] hover:from-[#2f3a9a] hover:to-[#4a2394] text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#3b48b8]/20">
        <Sparkles className="w-3.5 h-3.5" />
        Generate District Brief
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
