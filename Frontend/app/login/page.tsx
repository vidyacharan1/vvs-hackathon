"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

const features = [
  { icon: "📊", text: "Real-time facility health monitoring" },
  { icon: "🤖", text: "AI-powered operational briefs" },
  { icon: "💊", text: "Medicine stock & disease alerts" },
  { icon: "🔐", text: "Role-based district command access" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f2f3f6]">
      <div className="pointer-events-none absolute inset-0 hero-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-4 py-8">
        <div className="flex w-full flex-col overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-[0_40px_100px_rgba(59,48,84,0.12)] backdrop-blur-3xl lg:flex-row">

          {/* ── Left panel ── */}
          <section className="relative flex min-h-[480px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#e8ecfb] via-[#f4f5fb] to-[#fafbff] p-10 lg:min-h-[640px] lg:w-[520px] lg:p-12">
            {/* Decorative blob */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#3b48b8]/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-[300px] w-[300px] rounded-full bg-[#7538c7]/[0.05] blur-3xl" />

            <Image src="/logo.png" alt="" fill sizes="50vw" className="object-contain object-center opacity-[0.04]" />

            <div className="relative z-10">
              <Image src="/logo.png" alt="Arogyam" width={200} height={56} priority className="h-12 w-auto object-contain" style={{ width: "auto" }} />

              <h1 className="mt-12 max-w-[340px] text-[2.5rem] font-black leading-[1.12] tracking-[-0.02em] text-[#0c0e2a]">
                Secure access for district healthcare teams.
              </h1>

              <p className="mt-4 max-w-[300px] text-[14px] leading-[1.7] text-[#5a5c72]">
                Monitor facilities, patient follow-ups, stock alerts, and AI-generated operational briefs — all in one place.
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
                  <p className="text-[13px] font-bold text-[#1a1c2e]">District Officer workspace</p>
                  <p className="mt-0.5 text-[11px] leading-[1.6] text-[#757684]">Role-aware access for PHC / CHC operations and district command decisions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Right panel ── */}
          <section className="flex flex-1 flex-col justify-center px-8 py-10 sm:px-12 lg:px-14">
            <Link href="/" className="mb-8 inline-flex self-start lg:hidden">
              <Image src="/logo.png" alt="Arogyam" width={160} height={48} className="h-10 w-auto object-contain" style={{ width: "auto" }} />
            </Link>

            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#3b48b8]">Welcome back</p>
              <h2 className="mt-2 text-[1.65rem] font-extrabold tracking-[-0.01em] text-[#0c0e2a]">Login to Arogyam</h2>
              <p className="mt-1 text-[13px] text-[#757684]">Use your district command credentials to continue.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-[#44465a]">Password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9baa]" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[44px] w-full rounded-xl border border-[#d8d9e6] bg-white/90 pl-10 pr-4 text-[13px] text-[#1a1c2e] outline-none transition-all placeholder:text-[#b0b1c0] focus:border-[#3b48b8]/50 focus:ring-4 focus:ring-[#3b48b8]/10"
                    placeholder="Enter password"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5 text-[12px]">
                <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-[#757684]">
                  <input
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-[#c5c5d4] accent-[#3b48b8]"
                  />
                  Remember device
                </label>
                <Link href="/dashboard" className="font-semibold text-[#3b48b8] hover:underline">Forgot password?</Link>
              </div>

              <Link
                href="/dashboard"
                className="mt-2 inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2d3abf] to-[#5a2bae] text-[13px] font-bold text-white shadow-[0_12px_24px_rgba(59,72,184,0.28)] transition-all hover:shadow-[0_16px_32px_rgba(59,72,184,0.38)] hover:brightness-110"
              >
                Continue to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e4e5ee]" /></div>
              <div className="relative flex justify-center text-[11px]"><span className="bg-white/60 px-3 text-[#9a9baa] backdrop-blur-sm">or</span></div>
            </div>

            <p className="text-center text-[13px] text-[#757684]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#3b48b8] hover:underline">Create one now</Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
