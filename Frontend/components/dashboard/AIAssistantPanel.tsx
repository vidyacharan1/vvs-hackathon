"use client";

import { useState } from "react";
import { Sparkles, Send, ChevronDown, Bot, Zap } from "lucide-react";

const suggestions = [
  "Show high-risk patients",
  "Predict disease outbreak",
  "Generate weekly report",
  "Vaccination analysis",
];

export default function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-bg-base transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="text-sm font-semibold text-text-primary">AI Assistant</span>
            <p className="text-[11px] text-text-muted">Ask me anything about your data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted bg-bg-base px-2 py-1 rounded-lg hidden sm:inline-flex items-center gap-1 border border-border">
            <Zap className="w-3 h-3" /> Press /
          </span>
          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="border-t border-border px-4 py-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gradient-to-br from-bg-base to-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex-1 border border-border">
              <p className="text-[13px] text-text-secondary leading-relaxed">
                Hello! I&apos;m your AI health assistant. I can help you analyze patient data, predict trends, and generate reports.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                className="text-[11px] text-text-secondary hover:text-[#3b48b8] bg-bg-base hover:bg-[#eef0fa] hover:border-[#cdd2ed] px-2.5 py-1 rounded-lg transition-all border border-border"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl border border-border focus-within:border-[#3b48b8]/40 focus-within:ring-2 focus-within:ring-[#3b48b8]/10 transition-all pl-3.5 pr-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-muted py-2.5 focus:outline-none"
            />
            <button className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] hover:from-[#2f3a9a] hover:to-[#4a2394] flex items-center justify-center transition-all active:scale-95">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
