"use client"

import { motion } from "framer-motion"
import { AlertTriangle, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/use-store"

export function SimulationBanner() {
  const { simulationDay, advanceSimulation, resetSimulation } = useStore()

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-amber-500/10 dark:from-amber-500/20 dark:via-amber-400/20 dark:to-amber-500/20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.05)_50%,transparent_75%)] bg-[length:400%_400%] animate-pulse-soft" />
      </div>
      <div className="relative flex items-center justify-between border-b border-amber-500/20 px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-amber-700 dark:text-amber-300">
              Simulation Mode
            </span>
            <span className="text-amber-600/70 dark:text-amber-400/70">•</span>
            <span className="text-amber-600 dark:text-amber-400">
              Day {simulationDay + 1}
            </span>
            <span className="hidden text-xs text-amber-600/50 dark:text-amber-400/50 sm:inline">
              — Data shown is simulated for preview purposes
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs text-amber-600 hover:bg-amber-500/10 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 rounded-lg"
            onClick={advanceSimulation}
          >
            <RotateCcw className="h-3 w-3" />
            Advance Day
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-7 w-7 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 rounded-lg"
            onClick={resetSimulation}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
