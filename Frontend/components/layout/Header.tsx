"use client";

import { Search, Bell, RefreshCw, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useApp } from "@/lib/app-context";
import RoleSwitcher from "./RoleSwitcher";

export default function Header() {
  const { simulationMode, setSimulationMode } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-3">
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center">
            <div className="group relative w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search patients, records, facilities..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 focus:bg-surface-container-lowest focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none text-label-md placeholder:text-outline/40 transition-all"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <button
            onClick={() => setSimulationMode(simulationMode === "today" ? "tomorrow" : "today")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-label-sm font-medium ${
              simulationMode === "tomorrow"
                ? "bg-primary/10 border-primary/20 text-primary"
                : "bg-surface-container-lowest/60 border-outline-variant/25 text-on-surface-variant hover:border-outline-variant/40"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-500 ${simulationMode === "tomorrow" ? "text-primary rotate-180" : ""}`} />
            {simulationMode === "tomorrow" ? "Tomorrow Mode" : "Simulate Tomorrow"}
          </button>
          <div className="flex items-center gap-0.5">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all">
              <SlidersHorizontal className="w-[18px] h-[18px]" />
            </button>
          </div>
          <div className="flex items-center gap-2.5 pl-3 border-l border-outline-variant/20">
            <div className="text-right hidden sm:block">
              <p className="text-label-sm font-semibold text-on-surface leading-tight">Dr. Arjun Mehta</p>
              <p className="text-label-xs text-outline">Medical Officer</p>
            </div>
            <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white text-xs font-bold shadow-sm">
              DR
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-outline hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
