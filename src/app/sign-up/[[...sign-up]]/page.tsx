"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Stethoscope, HeartPulse, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, ArrowRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
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

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, fetchStatus } = useSignUp()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role>("district_officer")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"role" | "form" | "verify">("role")
  const [code, setCode] = useState("")
  const [success, setSuccess] = useState(false)

  const handleStart = () => {
    if (!selectedRole) return
    setStep("form")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (fetchStatus === "fetching") return
    setError("")

    if (!email.trim()) { setError("Email is required"); return }
    if (!password.trim()) { setError("Password is required"); return }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return }

    setLoading(true)
    try {
      const createResult = await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      })
      if (createResult.error) throw createResult.error

      const sendResult = await signUp.verifications.sendEmailCode()
      if (sendResult.error) throw sendResult.error

      setStep("verify")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (fetchStatus === "fetching") return
    setError("")

    setLoading(true)
    try {
      const verifyResult = await signUp.verifications.verifyEmailCode({ code })
      if (verifyResult.error) throw verifyResult.error

      if (signUp.status !== "complete") {
        setError("Verification failed. Please try again.")
        return
      }

      const finalizeResult = await signUp.finalize()
      if (finalizeResult.error) throw finalizeResult.error

      await fetch("/api/clerk/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      })

      router.push("/sign-in")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Verification failed"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 dark:from-[#0a0a1a] dark:via-[#0f0f1a] dark:to-[#0a1a0f]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200/60 bg-white/90 p-10 backdrop-blur-xl shadow-xl"
        >
          <CheckCircle className="h-16 w-16 text-emerald-500" />
          <h2 className="text-xl font-semibold text-gray-900">Account created!</h2>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    )
  }

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
            Create Account
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
          >
            Join Smart Health
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-gray-200/60 bg-white/90 p-6 backdrop-blur-xl shadow-xl shadow-gray-200/50 dark:border-white/10 dark:bg-gray-900/80 dark:shadow-black/20"
        >
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

          {step === "role" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Your Role</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Choose your role in the healthcare system</p>
              </div>
              <div className="space-y-2 mb-6">
                {roles.map((r) => {
                  const Icon = r.icon
                  const isSelected = selectedRole === r.value
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setSelectedRole(r.value)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                        isSelected
                          ? cn("bg-white shadow-md dark:bg-gray-800", roleAccents[r.value])
                          : "border-gray-200 bg-gray-50/50 hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        isSelected ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-gray-700"
                      )}>
                        <Icon className={cn("h-5 w-5", isSelected ? "text-blue-600" : "text-gray-400")} />
                      </div>
                      <div className="flex-1">
                        <p className={cn("text-sm font-medium", isSelected ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300")}>{r.label}</p>
                        <p className="text-xs text-gray-400">{r.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={handleStart}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-center text-xs text-gray-500">
                Already have an account?{" "}
                <a href="/sign-in" className="font-medium text-blue-600 hover:text-blue-700">Sign in</a>
              </p>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Details</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enter your information to create an account</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">Role</label>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                    {(() => {
                      const Icon = roles.find((r) => r.value === selectedRole)?.icon
                      return Icon ? <Icon className="h-4 w-4 text-blue-600" /> : null
                    })()}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {roles.find((r) => r.value === selectedRole)?.label}
                    </span>
                    <button type="button" onClick={() => setStep("role")} className="ml-auto text-xs text-blue-600 hover:text-blue-700">
                      Change
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    />
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
                      placeholder="At least 8 characters"
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
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create Account <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-gray-500">
                Already have an account?{" "}
                <a href="/sign-in" className="font-medium text-blue-600 hover:text-blue-700">Sign in</a>
              </p>
            </motion.div>
          )}

          {step === "verify" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Verify Email</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enter the verification code sent to {email}</p>
              </div>
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">Verification Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-center text-lg tracking-[0.5em] text-gray-900 placeholder:text-sm placeholder:tracking-normal placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verify & Create Account <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            </motion.div>
          )}
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Smart Health. All rights reserved.
        </p>
      </div>
    </div>
  )
}
