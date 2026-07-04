"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, Users, Stethoscope, Heart,
  Pill, TrendingUp, Lightbulb, LogOut, HelpCircle
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Facilities", icon: Building2, href: "/facilities" },
  { label: "Patients", icon: Users, href: "/patients" },
  { label: "Doctors", icon: Stethoscope, href: "/doctors" },
  { label: "Nurses", icon: Heart, href: "/nurses" },
  { label: "Inventory", icon: Pill, href: "/inventory" },
  { label: "Disease Trends", icon: TrendingUp, href: "/disease-trends" },
  { label: "AI Insights", icon: Lightbulb, href: "/insights" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white border-r border-[#e4e4e7] flex flex-col z-50">
      <div className="flex items-center h-14 px-5 border-b border-[#e4e4e7]">
        <Image src="/logo.png" alt="Arogyam" width={100} height={28} className="object-contain" priority />
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#eef2ff] text-[#6366f1]"
                  : "text-[#52525b] hover:bg-[#f4f4f5] hover:text-[#18181b]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#e4e4e7] space-y-0.5">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#52525b] hover:bg-[#f4f4f5] hover:text-[#18181b] transition-all w-full">
          <HelpCircle className="w-4 h-4" />
          <span>Help Center</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#ef4444] hover:bg-[#fef2f2] transition-all w-full">
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
