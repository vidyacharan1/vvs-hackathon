"use client";

import { recentPatients } from "@/lib/demo-data";
import { Users as UsersIcon, MapPin } from "lucide-react";

const riskConfig = {
  Critical: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-600", border: "border-red-200", gradient: "from-red-600 to-rose-600" },
  High: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-500", border: "border-rose-200", gradient: "from-rose-500 to-pink-600" },
  Medium: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500", border: "border-amber-200", gradient: "from-amber-500 to-orange-500" },
  Low: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500", border: "border-emerald-200", gradient: "from-emerald-500 to-teal-600" },
};

export default function RecentPatients() {
  return (
    <div className="card-glass p-5 h-full flex flex-col reveal-card">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
          <UsersIcon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Recent Patients</h2>
          <p className="text-[11px] text-text-muted">Latest consultations</p>
        </div>
      </div>

      <div className="space-y-0.5 flex-1">
        {recentPatients.map((patient, idx) => {
          const rc = riskConfig[patient.riskScore];
          return (
            <div
              key={patient.id}
              className="flex items-center gap-3 py-2 px-2.5 rounded-xl hover:bg-bg-base transition-all duration-200 cursor-pointer -mx-2 group"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${rc.gradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {patient.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-text-primary truncate">{patient.name}</p>
                  <span className="text-[11px] text-text-muted shrink-0">{patient.age} yrs</span>
                </div>
                <p className="text-[11px] text-text-muted truncate mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 inline shrink-0" />
                  {patient.village} &middot; {patient.condition} &middot; {patient.lastVisit}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg ${rc.bg} ${rc.text} border ${rc.border} shrink-0`}>
                <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                {patient.riskScore}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
