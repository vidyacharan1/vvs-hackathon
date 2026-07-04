"use client";

import { Search, Bell, Sparkles, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-30 shrink-0">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-2 flex-1 max-w-lg">
          <div className="relative group w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted group-focus-within:text-[#3b48b8] transition-colors" />
            <input
              type="text"
              placeholder="Search patients, reports..."
              className="w-full pl-9 pr-3 py-2 bg-bg-base rounded-lg text-[13px] text-text-primary placeholder:text-text-muted border border-border focus:outline-none focus:ring-2 focus:ring-[#3b48b8]/10 focus:border-[#3b48b8]/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="relative w-8 h-8 rounded-lg hover:bg-bg-base flex items-center justify-center transition-all hover:scale-105 active:scale-95">
            <Bell className="w-[16px] h-[16px] text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-400 rounded-full ring-2 ring-white" />
          </button>

          <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#3b48b8] to-[#5a2bae] hover:from-[#2f3a9a] hover:to-[#4a2394] text-white text-[13px] font-medium px-3 py-2 rounded-lg transition-all active:scale-95">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI</span>
          </button>

          <div className="flex items-center gap-2 pl-2.5 border-l border-border">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center text-[10px] font-bold text-white">
              DR
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold text-text-primary leading-tight">Dr. Arjun Mehta</p>
              <p className="text-[11px] text-text-muted">Medical Officer</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
