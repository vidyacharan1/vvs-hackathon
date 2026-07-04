"use client";

import { appointments } from "@/lib/demo-data";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const statusConfig = {
  confirmed: { label: "Confirmed", bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500", border: "border-emerald-200", gradient: "from-emerald-500 to-teal-600" },
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500", border: "border-amber-200", gradient: "from-amber-500 to-orange-500" },
  completed: { label: "Completed", bg: "bg-gray-50", text: "text-gray-500", dot: "bg-gray-400", border: "border-gray-200", gradient: "from-gray-400 to-gray-500" },
  cancelled: { label: "Cancelled", bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-500", border: "border-rose-200", gradient: "from-rose-500 to-pink-600" },
};

export default function UpcomingAppointments() {
  return (
    <div className="card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Upcoming Appointments</h2>
            <p className="text-[11px] text-text-muted">Today&apos;s schedule</p>
          </div>
        </div>
        <button className="text-[11px] text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1 group">
          View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="space-y-2 flex-1">
        {appointments.slice(0, 4).map((apt, idx) => {
          const sc = statusConfig[apt.status];
          return (
            <div
              key={apt.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-base transition-all duration-200 cursor-pointer group"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex flex-col items-center w-12 shrink-0 bg-bg-base rounded-lg py-1 group-hover:bg-white transition-colors">
                <span className="text-sm font-bold text-text-primary leading-none">{apt.time.split(" ")[0]}</span>
                <span className="text-[10px] font-semibold text-text-muted uppercase leading-none mt-0.5">{apt.time.split(" ")[1]}</span>
              </div>
              <div className="w-px h-9 bg-border shrink-0" />
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${sc.gradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {apt.patientAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-text-primary truncate">{apt.patientName}</p>
                <p className="text-[11px] text-text-muted truncate mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 inline" />
                  {apt.type} &middot; {apt.doctorName}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg ${sc.bg} ${sc.text} text-[11px] font-medium shrink-0 border ${sc.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {sc.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
