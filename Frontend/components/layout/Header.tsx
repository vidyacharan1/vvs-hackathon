"use client";

import { Search, Bell, RefreshCw, ChevronDown } from "lucide-react";
import { useApp } from "@/lib/app-context";
import RoleSwitcher from "./RoleSwitcher";

export default function Header() {
  const { simulationMode, setSimulationMode } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-[#e4e4e7]">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#e4e4e7] bg-white text-sm placeholder:text-[#a1a1aa] outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/10 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleSwitcher />
          <button
            onClick={() => setSimulationMode(simulationMode === "today" ? "tomorrow" : "today")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              simulationMode === "tomorrow"
                ? "bg-[#eef2ff] text-[#6366f1]"
                : "text-[#52525b] hover:bg-[#f4f4f5]"
            }`}
          >
            <RefreshCw className={`w-3 h-3 transition-transform duration-500 ${simulationMode === "tomorrow" ? "rotate-180" : ""}`} />
            {simulationMode === "tomorrow" ? "Tomorrow" : "Simulate"}
          </button>
          <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#a1a1aa] hover:text-[#52525b] hover:bg-[#f4f4f5] transition-all">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full ring-1 ring-white" />
          </button>
          <div className="flex items-center gap-2 pl-3 ml-2 border-l border-[#e4e4e7]">
            <div className="w-7 h-7 rounded-lg bg-[#f4f4f5] flex items-center justify-center text-[11px] font-bold text-[#52525b]">
              DR
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold leading-tight">Dr. Arjun Mehta</p>
              <p className="text-[11px] text-[#a1a1aa]">Medical Officer</p>
            </div>
            <ChevronDown className="w-3 h-3 text-[#a1a1aa]" />
          </div>
        </div>
      </div>
    </header>
  );
}
