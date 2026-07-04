"use client";

import { Search, Bell, Sparkles, ChevronDown, MapPin } from "lucide-react";
import RoleSwitcher from "@/components/layout/RoleSwitcher";

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-30 shrink-0">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6 gap-3">
        <div className="hidden 2xl:block min-w-[250px]">
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] font-bold text-on-surface tracking-tight">District Dashboard</h1>
            <span className="h-4 w-px bg-outline-variant" />
            <span className="inline-flex items-center gap-1 text-[12px] text-outline">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Visakhapatnam District
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0 max-w-md">
          <div className="relative group w-full min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-outline group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search facilities, patients, alerts..."
              className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg text-[13px] text-on-surface placeholder:text-outline border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:block min-w-[150px] rounded-lg bg-white border border-outline-variant/40 px-1 py-0.5">
            <RoleSwitcher />
          </div>
          <button className="relative w-8 h-8 rounded-lg hover:bg-surface-container-low flex items-center justify-center transition-all hover:scale-105 active:scale-95">
            <Bell className="w-[16px] h-[16px] text-on-surface-variant" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-400 rounded-full ring-2 ring-white" />
          </button>

          <button className="flex items-center gap-1.5 bg-primary-fixed hover:bg-primary-fixed-dim text-primary text-[13px] font-semibold px-3 py-2 rounded-lg transition-all active:scale-95">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI</span>
          </button>

          <div className="flex items-center gap-2 pl-2.5 border-l border-outline-variant/40">
            <div className="w-7 h-7 rounded-lg brand-gradient-accent flex items-center justify-center text-[10px] font-bold text-white">
              KR
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold text-on-surface leading-tight">K. Ramesh</p>
              <p className="text-[11px] text-outline">District Officer</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-outline hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
