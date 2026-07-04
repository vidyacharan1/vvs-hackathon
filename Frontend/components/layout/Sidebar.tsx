"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Stethoscope, Sparkles,
  Building2, Package, TrendingUp, UserRound,
  HelpCircle, LogOut, ChevronRight,
} from "lucide-react";

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

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface/90 backdrop-blur-md flex flex-col border-r border-outline-variant/15 z-50">
      <div className="px-6 py-6 border-b border-outline-variant/10">
        <Image src="/logo.png" alt="CareGrid 360" width={140} height={38} className="object-contain" priority />
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary-container text-primary font-semibold active-nav-glow"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] shrink-0 transition-transform duration-200 ${
                isActive ? "" : "group-hover:scale-110"
              }`} />
              <span className="text-label-md flex-1">{item.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-outline-variant/10 space-y-1">
        <a className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all px-4 py-2.5 rounded-xl" href="#">
          <HelpCircle className="w-[18px] h-[18px]" />
          <span className="text-label-md flex-1">Help Center</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <a className="flex items-center gap-3 bg-brand-purple text-white hover:bg-brand-purple/90 transition-all px-4 py-2.5 rounded-xl font-medium shadow-sm shadow-brand-purple/20" href="#">
          <LogOut className="w-[18px] h-[18px]" />
          <span className="text-label-md flex-1">Log Out</span>
        </a>
      </div>
    </aside>
  );
}
