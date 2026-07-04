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
      className={`${collapsed ? "w-[68px]" : "w-60"} h-screen flex flex-col transition-all duration-300 ease-in-out shrink-0 relative bg-white border-r border-border`}
    >
      <div className="flex items-center justify-center h-16 shrink-0 border-b border-border">
        <div className={`flex items-center justify-center ${collapsed ? "w-10 h-10" : ""}`}>
          {collapsed ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b48b8] to-[#5a2bae] flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
          ) : (
            <Image src="/logo.png" alt="Arogyam" width={160} height={45} className="object-contain" priority />
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
                  ? "bg-gradient-to-r from-[#eef0fa] to-[#eef0fa]/50 text-[#3b48b8] font-semibold"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-base"
              }`}
            >
              {isActive && !collapsed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#3b48b8] rounded-r-full" />
              )}
              <Icon className={`w-[20px] h-[20px] shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              {!collapsed && isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3b48b8] animate-pulse-dot" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-text-muted hover:text-text-secondary hover:bg-bg-base transition-all group"
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
