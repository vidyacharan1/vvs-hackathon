"use client"

import { useAuth } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SimulationBanner } from "@/components/shared/simulation-banner"
import { Toaster } from "@/components/ui/toaster"
import { useStore } from "@/store/use-store"

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/", "/login", "/onboarding"]

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const { isSignedIn, isLoaded } = useAuth()
  const { sidebarCollapsed, simulationMode } = useStore()

  const isPublic = PUBLIC_ROUTES.some((r) => r === "/" ? pathname === "/" : pathname.startsWith(r))

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (!isSignedIn || isPublic) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar />
      <Header />

      <div
        className={cn(
          "pt-16 transition-[padding-left] duration-200 ease-in-out",
          sidebarCollapsed ? "lg:pl-[68px]" : "lg:pl-64"
        )}
      >
        <AnimatePresence mode="wait">
          {simulationMode && <SimulationBanner key="sim-banner" />}
        </AnimatePresence>

        <ScrollArea className={cn("h-[calc(100vh-4rem)]", simulationMode && "h-[calc(100vh-8rem)]")}>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="p-4 md:p-6 lg:p-8"
          >
            {children}
            <Toaster />
          </motion.main>
        </ScrollArea>
      </div>
    </div>
  )
}
