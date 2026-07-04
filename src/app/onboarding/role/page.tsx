"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Building2, Stethoscope, HeartPulse, Loader2, AlertCircle, ArrowRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Role } from "@/types"

const roles: { value: Role; label: string; icon: React.ElementType; description: string }[] = [
  { value: "district_officer", label: "District Officer", icon: Building2, description: "Oversee facilities, inventory & analytics" },
  { value: "doctor", label: "Doctor", icon: Stethoscope, description: "Manage patients, consultations & prescriptions" },
  { value: "nurse", label: "Nurse", icon: HeartPulse, description: "Register patients, vitals & bed management" },
]

export default function OnboardingRolePage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/sign-in")
    }
  }, [isSignedIn, router])

  if (!isSignedIn) return null

  const handleSubmit = async () => {
    if (!selectedRole) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/clerk/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      })

      if (!res.ok) throw new Error("Failed to save role")
      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 dark:from-[#0a0a1a] dark:via-[#0f0f1a] dark:to-[#0a1a0f]">
      <div className="absolute inset-0 bg-[radial-gradient(at_20%_20%,rgba(59,130,246,0.06)_0px,transparent_50%),radial-gradient(at_80%_80%,rgba(16,185,129,0.06)_0px,transparent_50%)]" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-[480px] rounded-2xl border border-gray-200/60 bg-white/90 p-8 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-gray-900/80"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select your role to get started</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-3 mb-8">
          {roles.map((r) => {
            const Icon = r.icon
            const isSelected = selectedRole === r.value
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setSelectedRole(r.value)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-gray-200 bg-gray-50/50 hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                )}
              >
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg",
                  isSelected ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-gray-700"
                )}>
                  <Icon className={cn("h-6 w-6", isSelected ? "text-blue-600" : "text-gray-400")} />
                </div>
                <div className="flex-1">
                  <p className={cn("text-base font-semibold", isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white")}>
                    {r.label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{r.description}</p>
                </div>
                {isSelected && <CheckCircle className="h-6 w-6 text-blue-600 shrink-0" />}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          disabled={!selectedRole || loading}
          onClick={handleSubmit}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Continue <ArrowRight className="h-5 w-5" /></>}
        </button>
      </motion.div>
    </div>
  )
}
