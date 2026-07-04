"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, LockKeyhole, Mail, ShieldCheck, Stethoscope, User, Users } from "lucide-react";
import { useState } from "react";

const roles = [
  { id: "district_officer", label: "District Officer", desc: "Oversee all facilities", icon: ShieldCheck, color: "text-[#3b48b8]" },
  { id: "medical_officer", label: "Medical Officer", desc: "Manage PHC / CHC ops", icon: Building2, color: "text-[#5a2bae]" },
  { id: "doctor", label: "Doctor", desc: "Patient care & reviews", icon: Stethoscope, color: "text-[#0e8a6e]" },
  { id: "nurse", label: "Nurse", desc: "Field & follow-ups", icon: Users, color: "text-[#c2410c]" },
] as const;

const features = [
  { icon: "📊", text: "Real-time facility health monitoring" },
  { icon: "🤖", text: "AI-powered operational briefs" },
  { icon: "💊", text: "Medicine stock & disease alerts" },
  { icon: "🔐", text: "Role-based district command access" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [facility, setFacility] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f2f3f6]">
      <div className="pointer-events-none absolute inset-0 hero-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-4 py-8">
        <div className="flex w-full flex-col overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-[0_40px_100px_rgba(59,48,84,0.12)] backdrop-blur-3xl lg:flex-row">

          {/* ── Left panel ── */}
          <section className="relative flex min-h-[400px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#e8ecfb] via-[#f4f5fb] to-[#fafbff] p-10 lg:min-h-[680px] lg:w-[520px] lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#3b48b8]/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-[300px] w-[300px] rounded-full bg-[#7538c7]/[0.05] blur-3xl" />

            <Image src="/logo.png" alt="" fill sizes="50vw" className="object-contain object-center opacity-[0.04]" />

            <div className="relative z-10">
              <Image src="/logo.png" alt="Arogyam" width={200} height={56} priority className="h-12 w-auto object-contain" style={{ width: "auto" }} />

              <h1 className="mt-12 max-w-[340px] text-[2.5rem] font-black leading-[1.12] tracking-[-0.02em] text-[#0c0e2a]">
                Join the district health command.
              </h1>

              <p className="mt-4 max-w-[300px] text-[14px] leading-[1.7] text-[#5a5c72]">
                Create your account to access facility monitoring, patient CRM, medicine alerts, and AI-powered insights.
              </p>

              <div className="mt-8 space-y-3">
                {features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-white/80 text-[14px] shadow-sm">{f.icon}</span>
                    <span className="text-[13px] font-medium text-[#44465a]">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b48b8]/10">
                  <ShieldCheck className="h-[18px] w-[18px] text-[#3b48b8]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a1c2e]">Role-based access control</p>
                  <p className="mt-0.5 text-[11px] leading-[1.6] text-[#757684]">District Officers, Medical Officers, Doctors, and Nurses — each role sees exactly what they need.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Right panel ── */}
          <section className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-8 sm:px-12 lg:px-14 lg:py-10">
            <Link href="/" className="mb-6 inline-flex self-start lg:hidden">
              <Image src="/logo.png" alt="Arogyam" width={160} height={48} className="h-10 w-auto object-contain" style={{ width: "auto" }} />
            </Link>

            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#3b48b8]">Get started</p>
              <h2 className="mt-2 text-[1.65rem] font-extrabold tracking-[-0.01em] text-[#0c0e2a]">Create your account</h2>
              <p className="mt-1 text-[13px] text-[#757684]">Set up your district command access in seconds.</p>
            </div>

            <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9baa]" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-[44px] w-full rounded-xl border border-[#d8d9e6] bg-white/90 pl-10 pr-4 text-[13px] text-[#1a1c2e] outline-none transition-all placeholder:text-[#b0b1c0] focus:border-[#3b48b8]/50 focus:ring-4 focus:ring-[#3b48b8]/10"
                    placeholder="Dr. Kavya Menon"
                    type="text"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9baa]" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[44px] w-full rounded-xl border border-[#d8d9e6] bg-white/90 pl-10 pr-4 text-[13px] text-[#1a1c2e] outline-none transition-all placeholder:text-[#b0b1c0] focus:border-[#3b48b8]/50 focus:ring-4 focus:ring-[#3b48b8]/10"
                    placeholder="officer@arogyam.health"
                    type="email"
                  />
                </div>
              </div>

              {/* Role selector */}
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">I am a</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const active = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                          active
                            ? "border-[#3b48b8]/30 bg-[#3b48b8]/[0.04] shadow-[0_0_0_2px_rgba(59,72,184,0.12)]"
                            : "border-[#e0e1ec] bg-white/80 hover:border-[#c5c6d8] hover:bg-white"
                        }`}
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? "bg-[#3b48b8]/10" : "bg-[#f0f1f8] group-hover:bg-[#eaebf5]"}`}>
                          <Icon className={`h-4 w-4 transition-colors ${active ? r.color : "text-[#9a9baa] group-hover:text-[#6a6b80]"}`} />
                        </div>
                        <div className="min-w-0">
                          <p className={`truncate text-[12px] font-bold transition-colors ${active ? "text-[#1a1c2e]" : "text-[#44465a]"}`}>{r.label}</p>
                          <p className="truncate text-[10px] text-[#9a9baa]">{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">Facility</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9baa]" />
                  <select
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    className="h-[44px] w-full appearance-none rounded-xl border border-[#d8d9e6] bg-white/90 pl-10 pr-4 text-[13px] text-[#1a1c2e] outline-none transition-all focus:border-[#3b48b8]/50 focus:ring-4 focus:ring-[#3b48b8]/10"
                  >
                    <option value="">Select your facility</option>
                    <option value="phc-madhurawada">PHC Madhurawada</option>
                    <option value="chc-bheemunipatnam">CHC Bheemunipatnam</option>
                    <option value="phc-gajuwaka">PHC Gajuwaka</option>
                    <option value="phc-pendurthi">PHC Pendurthi</option>
                    <option value="phc-ananthapuram">PHC Ananthapuram</option>
                    <option value="chc-narsipatnam">CHC Narsipatnam</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">Password</label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9baa]" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[44px] w-full rounded-xl border border-[#d8d9e6] bg-white/90 pl-10 pr-3 text-[13px] text-[#1a1c2e] outline-none transition-all placeholder:text-[#b0b1c0] focus:border-[#3b48b8]/50 focus:ring-4 focus:ring-[#3b48b8]/10"
                      placeholder="Create"
                      type="password"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">Confirm</label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9baa]" />
                    <input
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="h-[44px] w-full rounded-xl border border-[#d8d9e6] bg-white/90 pl-10 pr-3 text-[13px] text-[#1a1c2e] outline-none transition-all placeholder:text-[#b0b1c0] focus:border-[#3b48b8]/50 focus:ring-4 focus:ring-[#3b48b8]/10"
                      placeholder="Re-enter"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="mt-1 inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2d3abf] to-[#5a2bae] text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(59,72,184,0.28)] transition-all hover:shadow-[0_16px_32px_rgba(59,72,184,0.38)] hover:brightness-110"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Link>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e4e5ee]" /></div>
              <div className="relative flex justify-center text-[11px]"><span className="bg-white/60 px-3 text-[#9a9baa] backdrop-blur-sm">or</span></div>
            </div>

            <p className="text-center text-[13px] text-[#757684]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#3b48b8] hover:underline">Log in instead</Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
