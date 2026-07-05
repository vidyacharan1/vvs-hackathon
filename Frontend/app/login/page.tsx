import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8faff,#fbfcff)] px-4 py-8 text-text-primary">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/70 bg-white/72 shadow-[0_30px_90px_rgba(59,48,84,0.14)] backdrop-blur-2xl lg:grid-cols-[1fr_440px]">
          <section className="relative hidden min-h-[620px] overflow-hidden bg-gradient-to-br from-[#eef0fa] via-white to-[#f8faff] p-10 lg:block">
            <Image src="/logo.png" alt="" fill sizes="50vw" className="object-contain object-center opacity-[0.08]" />
            <div className="relative z-10">
              <Image src="/logo.png" alt="Arogyam" width={210} height={60} priority className="h-14 w-auto object-contain" style={{ width: "auto" }} />
              <h1 className="mt-16 max-w-xl text-5xl font-black leading-tight tracking-tight text-[#0a0b2e]">
                Secure access for district healthcare teams.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-8 text-text-secondary">
                Sign in to monitor facilities, patient follow-ups, stock alerts, disease trends, and AI-generated operational briefs.
              </p>
            </div>
            <div className="absolute bottom-10 left-10 right-10 z-10 rounded-3xl border border-[#dfe3fb] bg-white/75 p-5 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[#3b48b8]" />
                <div>
                  <p className="text-sm font-black text-text-primary">District Officer workspace</p>
                  <p className="mt-1 text-[13px] leading-6 text-text-muted">Role-aware access for PHC / CHC operations, staff workload, and district command decisions.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10">
            <Link href="/" className="mb-10 inline-flex lg:hidden">
              <Image src="/logo.png" alt="Arogyam" width={180} height={52} className="h-11 w-auto object-contain" style={{ width: "auto" }} />
            </Link>
            <div className="mb-8">
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#3b48b8]">Welcome back</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a0b2e]">Login to Arogyam</h2>
              <p className="mt-2 text-[13px] leading-6 text-text-muted">Use your district command credentials to continue.</p>
            </div>

            <form className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-[12px] font-bold text-text-secondary">Email</span>
                <span className="relative block">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input className="h-12 w-full rounded-2xl border border-border bg-white/85 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#3b48b8]/40 focus:ring-4 focus:ring-[#3b48b8]/10" placeholder="officer@arogyam.health" type="email" />
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] font-bold text-text-secondary">Password</span>
                <span className="relative block">
                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input className="h-12 w-full rounded-2xl border border-border bg-white/85 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#3b48b8]/40 focus:ring-4 focus:ring-[#3b48b8]/10" placeholder="Enter password" type="password" />
                </span>
              </label>

              <div className="flex items-center justify-between text-[12px]">
                <label className="inline-flex items-center gap-2 font-semibold text-text-muted">
                  <input type="checkbox" className="h-4 w-4 rounded border-border accent-[#3b48b8]" />
                  Remember device
                </label>
                <Link href="/dashboard" className="font-bold text-[#3b48b8]">Forgot password?</Link>
              </div>

              <Link href="/dashboard" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3b48b8] to-[#5a2bae] text-sm font-black text-white shadow-[0_18px_36px_rgba(59,72,184,0.24)] transition-all hover:-translate-y-0.5">
                Continue to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
