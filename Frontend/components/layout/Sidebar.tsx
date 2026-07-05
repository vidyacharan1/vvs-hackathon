"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Sparkles,
  Building2,
  Package,
  TrendingUp,
  UserRound,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/facilities", label: "Facilities", icon: Building2 },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/nurses", label: "Nurses", icon: UserRound },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/disease-trends", label: "Disease Trends", icon: TrendingUp },
  { href: "/insights", label: "AI Insights", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${collapsed ? "w-[68px]" : "w-64"} h-screen flex flex-col transition-all duration-300 ease-in-out shrink-0 relative bg-white/90 backdrop-blur-xl border-r border-outline-variant/30 shadow-[10px_0_40px_rgba(70,72,212,0.06)]`}
    >
      <div className="flex items-center justify-center h-16 shrink-0 border-b border-outline-variant/30">
        <div className={`flex items-center justify-center ${collapsed ? "w-10 h-10" : ""}`}>
          {collapsed ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
          ) : (
            <Image src="/logo.png" alt="Arogyam" width={160} height={40} className="object-contain" style={{ width: "auto" }} priority />
          )}
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${collapsed ? "justify-center" : ""} ${
                isActive
                  ? "active-nav-glow bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-[0_12px_28px_rgba(70,72,212,0.20)]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {isActive && !collapsed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white/90 rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.55)]" />
              )}
              <Icon className={`w-[20px] h-[20px] shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              {!collapsed && isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-3 pb-3 space-y-3">
          <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary-fixed to-white p-3 shadow-[0_14px_30px_rgba(70,72,212,0.08)]">
            <div className="w-9 h-9 rounded-xl brand-gradient-accent text-white flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-[12px] font-bold leading-snug text-on-surface">AI-Powered Healthcare for a Healthier Tomorrow</p>
          </div>

        </div>
      )}

      <div className="px-3 py-3 border-t border-outline-variant/30">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-outline hover:text-on-surface-variant hover:bg-surface-container-low transition-all group"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>
    </aside>
  );
}
