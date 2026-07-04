"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  Search,
  Bell,
  Building2,
  Stethoscope,
  HeartPulse,
  LogOut,
  Settings,
  User,
  Sun,
  Moon,
  Sparkles,
  CalendarClock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  UserButton,
  SignInButton,
} from "@clerk/nextjs"
import { useStore } from "@/store/use-store"
import { useTheme } from "next-themes"
import { ROLE_LABELS, ROLE_ICONS } from "@/lib/constants"

const roleIconMap: Record<string, React.ElementType> = {
  Building2,
  Stethoscope,
  HeartPulse,
}

function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0 truncate">
      <Link href="/dashboard" className="hover:text-foreground transition-colors shrink-0">
        Home
      </Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/")
        const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        const isLast = i === segments.length - 1
        return (
          <span key={href} className="flex items-center gap-1.5">
            <span className="text-muted-foreground/40">/</span>
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

function NotificationsDropdown() {
  const { notifications, acknowledgeNotification } = useStore()
  const unread = notifications.filter((n) => !n.acknowledged).length

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-4.5 w-4.5" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unread > 0 && (
            <Badge variant="destructive" className="rounded-full px-1.5 py-0 text-[10px]">
              {unread} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <Bell className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          notifications.slice(0, 5).map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={cn(
                "flex flex-col items-start gap-1 px-4 py-3",
                !n.acknowledged && "bg-muted/50"
              )}
              onClick={() => acknowledgeNotification(n.id)}
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-medium">{n.title}</p>
                {!n.acknowledged && <span className="h-2 w-2 rounded-full bg-destructive" />}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{n.description}</p>
            </DropdownMenuItem>
          ))
        )}
        {notifications.length > 5 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs text-muted-foreground">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CommandPaletteTrigger() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 w-48 justify-between rounded-xl border-dashed text-muted-foreground md:flex"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search...</span>
            </span>
            <kbd className="pointer-events-none inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground/60">
              <span>Ctrl</span>K
            </kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Search (Ctrl+K)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Header() {
  const { user, isSignedIn } = useUser()
  const { setSidebarCollapsed } = useStore()
  const { simulationMode, simulationDay, setSimulationMode, advanceSimulation } = useStore()
  const { role } = useStore()

  const roleFromClerk = (user?.publicMetadata?.role as string) || role
  const RoleIcon = roleIconMap[ROLE_ICONS[roleFromClerk] || "Building2"]

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 lg:left-64 transition-[left] duration-200 ease-in-out",
        "lg:[&:has(~aside.w-\\[68px\\])]:left-[68px]"
      )}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 lg:flex"
          onClick={() => setSidebarCollapsed(false)}
        >
          <Menu className="h-4.5 w-4.5" />
        </Button>
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-1.5">
        <CommandPaletteTrigger />
        <NotificationsDropdown />
        {isSignedIn && (
          <>
            <div className="hidden md:flex">
              <Button
                variant="outline"
                size="sm"
                className="hidden h-9 gap-1.5 rounded-xl text-xs md:flex"
              >
                <RoleIcon className="h-3.5 w-3.5" />
                <span>{ROLE_LABELS[roleFromClerk]}</span>
              </Button>
            </div>
            <ThemeToggle />
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-7 w-7",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Profile"
                  labelIcon={<User className="h-4 w-4" />}
                  href="/profile"
                />
                <UserButton.Link
                  label="Settings"
                  labelIcon={<Settings className="h-4 w-4" />}
                  href="/settings"
                />
                <UserButton.Action label="signOut" />
              </UserButton.MenuItems>
            </UserButton>
          </>
        )}
        {!isSignedIn && (
          <SignInButton mode="modal">
            <Button size="sm" className="rounded-xl">
              Login
            </Button>
          </SignInButton>
        )}
      </div>
    </header>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4.5 w-4.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4.5 w-4.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{theme === "dark" ? "Light Mode" : "Dark Mode"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
