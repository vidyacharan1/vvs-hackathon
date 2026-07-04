"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSignIn, useAuth, useUser, useClerk } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Building2, Stethoscope, HeartPulse, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ROLE_DASHBOARD_ROUTES } from "@/lib/constants"
import type { Role } from "@/types"

const roles: { value: Role; label: string; icon: React.ElementType; description: string }[] = [
  { value: "district_officer", label: "District Officer", icon: Building2, description: "Oversee facilities, inventory & analytics" },
  { value: "doctor", label: "Doctor", icon: Stethoscope, description: "Manage patients, consultations & prescriptions" },
  { value: "nurse", label: "Nurse", icon: HeartPulse, description: "Register patients, vitals & bed management" },
]

const roleAccents: Record<string, string> = {
  district_officer: "ring-blue-500/30 border-blue-200 dark:border-blue-800",
  doctor: "ring-emerald-500/30 border-emerald-200 dark:border-emerald-800",
  nurse: "ring-pink-500/30 border-pink-200 dark:border-pink-800",
}

export default function LoginPage() {
  const router = useRouter()
  const { signIn, fetchStatus } = useSignIn()
  const { isLoaded, isSignedIn } = useAuth()
  const clerk = useClerk()
  const { user } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role>("district_officer")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard")
    }
  }, [isSignedIn, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || fetchStatus === "fetching") return
    setError("")

    if (!email.trim()) { setError("Email is required"); return }
    if (!password.trim()) { setError("Password is required"); return }

    setLoading(true)
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.error) throw result.error

      if (signIn.status === "complete") {
        const finalizeResult = await signIn.finalize()
        if (finalizeResult.error) throw finalizeResult.error

        const res = await fetch("/api/clerk/my-role")
        const data = await res.json()
        const role = (data?.role as string) || selectedRole
        router.push(ROLE_DASHBOARD_ROUTES[role] || "/dashboard")
      } else {
        setError("Additional verification required.")
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid email or password"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const RoleIcon = roles.find((r) => r.value === selectedRole)?.icon || Building2

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 dark:from-[#0a0a1a] dark:via-[#0f0f1a] dark:to-[#0a1a0f]">
      <div className="absolute inset-0 bg-[radial-gradient(at_20%_20%,rgba(59,130,246,0.06)_0px,transparent_50%),radial-gradient(at_80%_80%,rgba(16,185,129,0.06)_0px,transparent_50%)]" />
      <div className="absolute top-40 left-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-40 right-20 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-emerald-500 p-3 shadow-lg shadow-blue-500/20 ring-1 ring-white/20"
          >
            <HeartPulse className="h-full w-full text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Smart Health
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
          >
            AI-Powered Healthcare Management System
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-gray-200/60 bg-white/90 p-6 backdrop-blur-xl shadow-xl shadow-gray-200/50 dark:border-white/10 dark:bg-gray-900/80 dark:shadow-black/20"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {roles.find((r) => r.value === selectedRole)?.label} Login
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Sign in with your credentials
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon
                  const isSelected = selectedRole === r.value
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setSelectedRole(r.value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all duration-200",
                        isSelected
                          ? cn("bg-white shadow-md dark:bg-gray-800", roleAccents[r.value])
                          : "border-gray-200 bg-gray-50/50 hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isSelected ? "text-gray-900 dark:text-white" : "text-gray-400")} />
                      <span className={cn("text-[10px] font-medium leading-tight text-center", isSelected ? "text-gray-900 dark:text-white" : "text-gray-500")}>
                        {r.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex h-11 w-full items-center justify-center gap-2 rounded-xl font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                "bg-gradient-to-r from-blue-600 to-indigo-600",
                loading && "opacity-80"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="font-medium text-blue-600 hover:text-blue-700">Sign up</a>
          </p>
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Smart Health. All rights reserved.
        </p>
      </div>
    </div>
  )
}
