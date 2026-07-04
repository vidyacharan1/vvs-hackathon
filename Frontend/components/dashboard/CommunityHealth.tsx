"use client";

import { Heart, ShieldCheck, Activity, BarChart3 } from "lucide-react";
import { communityMetrics } from "@/lib/demo-data";

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  shield: ShieldCheck,
  activity: Activity,
};

export default function CommunityHealth() {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Community Health Overview</h2>
          <p className="text-[11px] text-text-muted">Key health indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {communityMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || Activity;
          return (
            <div key={metric.label} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: metric.color }} />
                  </div>
                  <span className="text-[13px] font-semibold text-text-primary">{metric.label}</span>
                </div>
                <span className="text-base font-bold text-text-primary tabular-nums">{metric.value}%</span>
              </div>
              <div className="h-2 bg-bg-base rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full animate-progress relative"
                  style={{
                    width: `${metric.value}%`,
                    backgroundColor: metric.color,
                    boxShadow: `0 0 10px ${metric.color}30`,
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
