"use client";

import { useEffect, useRef, useState } from "react";
import { Users, CalendarCheck, AlertTriangle, TrendingUp } from "lucide-react";

const kpiData = [
  {
    label: "Total Patients",
    value: "12,548",
    numValue: 12548,
    trend: "+8% this month",
    icon: Users,
    trendColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 border-emerald-100",
    gradient: "from-[#3b48b8] to-[#5a2bae]",
  },
  {
    label: "Today's Appointments",
    value: "86",
    numValue: 86,
    trend: "12 pending",
    icon: CalendarCheck,
    trendColor: "text-text-muted",
    badgeBg: "bg-gray-50 border-gray-200",
    gradient: "from-[#3b48b8] to-[#5a2bae]",
  },
  {
    label: "High Risk Patients",
    value: "42",
    numValue: 42,
    trend: "+3 this week",
    icon: AlertTriangle,
    trendColor: "text-rose-500",
    badgeBg: "bg-rose-50 border-rose-100",
    gradient: "from-rose-500 to-pink-600",
  },
];

function AnimatedValue({ value, numValue }: { value: string; numValue: number }) {
  const [displayed, setDisplayed] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const target = numValue;
    const duration = 800;
    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayed(target);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [numValue, value]);

  return (
    <span className="text-2xl font-bold text-text-primary tracking-tight">
      {value.endsWith("%") ? `${displayed}%` : displayed.toLocaleString()}
    </span>
  );
}

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className="card-glass p-5 hover:scale-[1.02] transition-all cursor-default reveal-card" style={{ animationDelay: `${idx * 80}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold text-text-muted tracking-widest uppercase">{kpi.label}</span>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center shadow-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <AnimatedValue value={kpi.value} numValue={kpi.numValue} />
              <span className={`flex items-center gap-1.5 text-[12px] font-semibold ${kpi.trendColor} ${kpi.badgeBg} px-2.5 py-1 rounded-full border`}>
                <TrendingUp className="w-3 h-3" />
                {kpi.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
