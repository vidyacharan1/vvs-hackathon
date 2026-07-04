"use client";

import { AlertTriangle, Sparkles, ArrowRight } from "lucide-react";

export default function HeroCrisisMessage() {
  return (
    <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-rose-50 via-rose-50/80 to-amber-50/60 border border-rose-200/60 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.04),transparent_60%)] pointer-events-none" />
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="pill pill-critical">CRITICAL</span>
            <span className="text-[11px] text-rose-600 font-medium">Requires Immediate Action</span>
          </div>
          <h2 className="text-[15px] font-bold text-[#0a0b2e] mb-1">
            PHC Madhurawada requires immediate attention.
          </h2>
          <p className="text-[13px] text-text-secondary leading-relaxed max-w-2xl">
            Bed occupancy has reached 96%, doctor availability is down to 40%, and fever-linked OPD visits are rising sharply.
          </p>
          <button className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#3b48b8] to-[#5a2bae] hover:from-[#2f3a9a] hover:to-[#4a2394] text-white text-[12px] font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#3b48b8]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Generate AI Action Plan
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center px-4 border-l border-rose-200/40">
          <span className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider">Risk Score</span>
          <span className="text-3xl font-bold text-rose-600">87</span>
          <span className="text-[10px] text-rose-400">/100</span>
        </div>
      </div>
    </div>
  );
}
