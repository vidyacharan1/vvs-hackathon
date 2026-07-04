"use client";

import { Sparkles, AlertCircle, Info, AlertTriangle, ArrowRight } from "lucide-react";
import { aiInsights } from "@/lib/demo-data";

const priorityConfig = {
  high: {
    icon: AlertCircle,
    dot: "bg-rose-500",
    label: "High",
    text: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    gradient: "from-rose-500 to-pink-600",
  },
  medium: {
    icon: AlertTriangle,
    dot: "bg-amber-500",
    label: "Medium",
    text: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    gradient: "from-amber-500 to-orange-500",
  },
  low: {
    icon: Info,
    dot: "bg-[#3b48b8]",
    label: "Info",
    text: "text-[#3b48b8]",
    bg: "bg-[#eef0fa]",
    border: "border-[#cdd2ed]",
    gradient: "from-[#3b48b8] to-[#5a2bae]",
  },
};

export default function AIInsights() {
  const insights = aiInsights.slice(0, 4);

  return (
    <div className="card p-4 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-primary">AI Health Insights</h2>
          <p className="text-[11px] text-text-muted">Real-time intelligence</p>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        {insights.map((insight, idx) => {
          const pc = priorityConfig[insight.priority];
          const Icon = pc.icon;
          return (
            <div
              key={insight.id}
              className={`${pc.bg} rounded-xl p-3 border ${pc.border} transition-all duration-200`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex gap-2.5">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${pc.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${pc.bg} ${pc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                      {pc.label}
                    </span>
                    <span className="text-[11px] text-text-muted">{insight.timestamp}</span>
                  </div>
                  <p className="text-[12px] text-text-secondary leading-relaxed">{insight.message}</p>
                  <button className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#3b48b8] hover:text-[#2f3a9a] mt-1.5 transition-colors group">
                    View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
