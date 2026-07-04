"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HeartPulse,
  LayoutDashboard,
  Building2,
  Users,
  Stethoscope,
  HandHeart,
  Pill,
  Activity,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  ClipboardList,
  BedDouble,
  Calendar,
  FileText,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser } from "@clerk/nextjs"
import { useStore } from "@/store/use-store"
import type { Role } from "@/types"

interface NavLink {
  href: string
  label: string
  icon: React.ElementType
  roles: Role[]
}

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["district_officer", "doctor", "nurse"] },
  { href: "/facilities", label: "Facilities", icon: Building2, roles: ["district_officer"] },
  { href: "/inventory", label: "Inventory", icon: Pill, roles: ["district_officer"] },
  { href: "/patients", label: "Patients", icon: Users, roles: ["district_officer", "doctor", "nurse"] },
  { href: "/staff/doctors", label: "Doctors", icon: Stethoscope, roles: ["district_officer"] },
  { href: "/staff/nurses", label: "Nurses", icon: HandHeart, roles: ["district_officer"] },
  { href: "/disease-trends", label: "Disease Trends", icon: Activity, roles: ["district_officer", "doctor"] },
  { href: "/insights", label: "AI Insights", icon: BrainCircuit, roles: ["district_officer", "doctor"] },
]

const doctorLinks: NavLink[] = [
  { href: "/dashboard/doctor", label: "Doctor Dashboard", icon: LayoutDashboard, roles: ["doctor"] },
  { href: "/patients", label: "Patient List", icon: Users, roles: ["doctor"] },
  { href: "/dashboard/doctor/consultations", label: "Consultations", icon: ClipboardList, roles: ["doctor"] },
  { href: "/inventory", label: "Medicine Stock", icon: Pill, roles: ["doctor"] },
  { href: "/disease-trends", label: "Disease Trends", icon: Activity, roles: ["doctor"] },
  { href: "/insights", label: "AI Insights", icon: BrainCircuit, roles: ["doctor"] },
]

const nurseLinks: NavLink[] = [
  { href: "/dashboard/nurse", label: "Nurse Dashboard", icon: LayoutDashboard, roles: ["nurse"] },
  { href: "/patients", label: "Patients", icon: Users, roles: ["nurse"] },
  { href: "/dashboard/nurse/beds", label: "Bed Management", icon: BedDouble, roles: ["nurse"] },
  { href: "/dashboard/nurse/tasks", label: "Pending Tasks", icon: ClipboardList, roles: ["nurse"] },
]

function RoleBadge({ role }: { role: Role }) {
  const colors: Record<string, string> = {
    district_officer: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    doctor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    nurse: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  }
  const labels: Record<string, string> = {
    district_officer: "DO",
    doctor: "DR",
    nurse: "NR",
  }
  return (
    <span className={cn("rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider", colors[role])}>
      {labels[role]}
    </span>
  )
}

function SidebarLink({ link, collapsed, isActive, role }: { link: NavLink; collapsed: boolean; isActive: boolean; role: Role }) {
  const Icon = link.icon
  const isDO = role === "district_officer"
  return (
    <Link href={link.href} className="block">
      <motion.div
        layout
        className={cn(
          "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? isDO
              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
              : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {isActive && isDO && (
          <motion.span
            layoutId="doActiveBorder"
            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-600 dark:bg-indigo-400"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        {isActive && !isDO && (
          <motion.div
            layoutId="activeSidebarIndicator"
            className="absolute inset-0 rounded-xl bg-blue-50 dark:bg-blue-950/30"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-3">
          <Icon className={cn("h-5 w-5 shrink-0", isActive && (isDO ? "text-indigo-700 dark:text-indigo-300" : "text-blue-700 dark:text-blue-300"))} />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {link.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const { sidebarCollapsed, setSidebarCollapsed, role: storeRole } = useStore()
  const role = (user?.publicMetadata?.role as Role) || storeRole
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const links = role === "district_officer" ? navLinks : role === "doctor" ? doctorLinks : nurseLinks
  const visibleLinks = links.filter((l) => l.roles.includes(role))

  const sidebarContent = (
    <div className={cn("flex h-full flex-col", sidebarCollapsed ? "w-[68px]" : "w-64")}>
      {role === "district_officer" ? (
        <>
          <div className="relative flex h-16 items-center gap-3 border-b border-indigo-500/10 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-indigo-500/5 to-transparent" />
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-indigo-500/5 blur-xl" />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-emerald-500 shadow-lg shadow-indigo-500/20">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col"
                >
                  <span className="text-sm font-bold tracking-tight leading-tight">District Health</span>
                  <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Administration</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-b border-indigo-500/10" />
        </>
      ) : (
        <>
          <div className="flex h-16 items-center gap-3 border-b border-border/50 px-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-500 to-emerald-500 shadow-lg shadow-blue-500/20">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1"
                >
                  <span className="text-lg font-bold tracking-tight">Smart Health</span>
                  <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    AI
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-b border-border/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <RoleBadge role={role} />
              {!sidebarCollapsed && (
                <span className="text-xs text-muted-foreground truncate">
                  {role === "doctor" ? "Doctor" : "Nurse"}
                </span>
              )}
            </div>
          </div>
        </>
      )}

      <ScrollArea className={cn("flex-1 px-3 py-4", role === "district_officer" && "")}>
        <div className="space-y-1">
          {visibleLinks.map((link) => (
            <SidebarLink
              key={link.href}
              link={link}
              collapsed={sidebarCollapsed}
              isActive={pathname === link.href || pathname.startsWith(link.href + "/")}
              role={role}
            />
          ))}
        </div>
      </ScrollArea>

      <div className={cn("border-t p-3", role === "district_officer" ? "border-indigo-500/10" : "border-border/50")}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "h-9 w-full rounded-xl hover:bg-accent",
            role === "district_officer" && "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
          )}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl border bg-background shadow-sm lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border/50 bg-background/95 backdrop-blur-xl lg:block",
          sidebarCollapsed ? "w-[68px]" : "w-64",
          "transition-[width] duration-200 ease-in-out"
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
