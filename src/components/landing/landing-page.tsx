"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import { HeartPulse } from "lucide-react"

function MaterialIcon({ icon, className = "" }: { icon: string; className?: string }) {
  return (
    <span
      className={`material-symbols-outlined align-middle ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
    >
      {icon}
    </span>
  )
}

export function LandingPage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard")
    }
  }, [isSignedIn, router])

  if (isSignedIn) return null

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#1b1b23] font-['Inter']">
      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <UnifiedDashboardSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#c7c4d7]/30 bg-[#fcf8ff]/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-3 h-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4648d4]">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#1b1b23]">Arogyam</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-[#4648d4] font-semibold border-b-2 border-[#4648d4] pb-1 text-sm font-['Inter']" href="#features">Features</a>
          <a className="text-[#464554] hover:text-[#4648d4] transition-colors text-sm font-['Inter']" href="#how-it-works">How It Works</a>
          <a className="text-[#464554] hover:text-[#4648d4] transition-colors text-sm font-['Inter']" href="#modules">Modules</a>
          <a className="text-[#464554] hover:text-[#4648d4] transition-colors text-sm font-['Inter']" href="#ai-insights">AI Insights</a>
          <a className="text-[#464554] hover:text-[#4648d4] transition-colors text-sm font-['Inter']" href="#contact">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/sign-in">
            <button className="text-[#4648d4] font-medium text-sm px-4 py-2 hover:bg-[#f5f2fe] rounded-lg transition-all cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-gradient-to-r from-[#7C3AED] to-[#4648d4] text-white font-medium text-sm px-6 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <header className="relative pt-16 pb-24 overflow-hidden" style={{
      backgroundImage: "radial-gradient(at 0% 0%, rgba(70,72,212,0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(124,58,237,0.05) 0px, transparent 50%)"
    }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-flex items-center bg-[#f5f2fe] px-4 py-1.5 rounded-full mb-6 border border-[#4648d4]/10">
            <MaterialIcon icon="auto_awesome" className="text-[#4648d4] mr-2 !text-[18px]" />
            <span className="text-[#4648d4] text-xs font-semibold">AI-POWERED HEALTHCARE MANAGEMENT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-[48px] font-['Plus_Jakarta_Sans'] font-bold text-[#1b1b23] leading-tight mb-6">
            AI Healthcare Management for{" "}
            <span className="text-[#4648d4]">Smarter Public Health</span> Operations
          </h1>
          <p className="text-lg text-[#464554] mb-10 max-w-xl leading-relaxed">
            Arogyam empowers districts, PHCs, and CHCs to monitor facilities, patients, medicine inventory, disease trends, and actionable AI insights — all from one intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-[#7C3AED] to-[#4648d4] text-white px-8 py-4 rounded-xl text-sm font-medium flex items-center justify-center hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer">
                Get Started <MaterialIcon icon="arrow_forward" className="ml-2" />
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="border border-[#4648d4] text-[#4648d4] px-8 py-4 rounded-xl text-sm font-medium hover:bg-[#4648d4]/5 transition-all flex items-center justify-center cursor-pointer">
                <MaterialIcon icon="dashboard" className="mr-2" /> View Dashboard
              </button>
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 opacity-70">
            <div className="flex items-center gap-2">
              <MaterialIcon icon="check_circle" className="text-[#10B981] !text-[18px]" />
              <span className="text-xs">Quick deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon icon="check_circle" className="text-[#10B981] !text-[18px]" />
              <span className="text-xs">Secure &amp; compliant</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#4648d4]/10 rounded-full blur-3xl"></div>
          <div className="rounded-2xl bg-white/80 backdrop-blur-[10px] border border-[#e4e1ed]/30 shadow-[0_20px_25px_-5px_rgba(70,72,212,0.05),0_10px_10px_-5px_rgba(70,72,212,0.02)] p-4 overflow-hidden relative">
            <div className="rounded-xl bg-white/80 p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#4648d4] flex items-center justify-center">
                    <HeartPulse className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold font-['Plus_Jakarta_Sans']">Arogyam</span>
                </div>
                <span className="text-xs text-[#464554]">Live</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#464554]">Facilities</span>
                  <span className="font-semibold">126</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e4e1ed]">
                  <div className="h-1.5 rounded-full bg-[#10B981]" style={{ width: "72%" }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#464554]">AI Alerts</span>
                  <span className="font-semibold text-[#F59E0B]">23</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e4e1ed]">
                  <div className="h-1.5 rounded-full bg-[#F59E0B]" style={{ width: "34%" }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#464554]">Bed Occupancy</span>
                  <span className="font-semibold text-[#4648d4]">68%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e4e1ed]">
                  <div className="h-1.5 rounded-full bg-[#4648d4]" style={{ width: "68%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function StatsSection() {
  const stats = [
    { icon: "apartment", label: "Facilities Monitored", value: "126", bg: "bg-[#e1e0ff]", color: "text-[#4648d4]" },
    { icon: "group", label: "High-risk Patients Tracked", value: "312", bg: "bg-[#c9e6ff]", color: "text-[#006591]" },
    { icon: "medical_services", label: "Medicine Alerts Detected", value: "23", bg: "bg-[#ffdcc5]", color: "text-[#904900]" },
    { icon: "psychology", label: "AI Insights & Monitoring", value: "24/7", bg: "bg-[#c0c1ff]", color: "text-[#4648d4]" },
  ]
  return (
    <section className="py-12 bg-white border-y border-[#c7c4d7]/20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-4`}>
                <MaterialIcon icon={s.icon} />
              </div>
              <div className="text-[32px] font-bold font-['Plus_Jakarta_Sans']">{s.value}</div>
              <div className="text-[#464554] text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    { icon: "monitor_heart", title: "District Command Center", desc: "Real-time overview of facilities, risks, alerts, and key health indicators at a district level.", bg: "bg-[#4648d4]/10", color: "text-[#4648d4]" },
    { icon: "health_metrics", title: "Facility Monitoring", desc: "Track performance, bed occupancy, OPD, and resource availability across all PHCs.", bg: "bg-[#006591]/10", color: "text-[#006591]" },
    { icon: "person_search", title: "Patient CRM", desc: "Manage patients, follow-ups, referrals, and high-risk patient tracking seamlessly.", bg: "bg-[#7C3AED]/10", color: "text-[#7C3AED]" },
    { icon: "inventory_2", title: "Inventory & Medicine Alerts", desc: "Monitor stock levels and get instant alerts for low or critical medicines automatically.", bg: "bg-[#904900]/10", color: "text-[#904900]" },
    { icon: "query_stats", title: "Disease Trend Intelligence", desc: "AI-driven trend analysis and outbreak detection for early healthcare intervention.", bg: "bg-[#F59E0B]/10", color: "text-[#F59E0B]" },
    { icon: "auto_awesome", title: "AI Action Plans", desc: "Get actionable recommendations and AI-generated district health briefs instantly.", bg: "bg-[#4648d4]/10", color: "text-[#4648d4]" },
  ]
  return (
    <section className="py-24 bg-[#fcf8ff]" id="features">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="mb-16">
          <span className="text-[#4648d4] text-xs font-semibold uppercase tracking-widest block mb-2">EVERYTHING YOU NEED</span>
          <h2 className="text-[32px] font-bold font-['Plus_Jakarta_Sans']">Powerful Features for Proactive Healthcare</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-2xl bg-white/80 backdrop-blur-[10px] border border-[#e4e1ed]/30 shadow-[0_20px_25px_-5px_rgba(70,72,212,0.05),0_10px_10px_-5px_rgba(70,72,212,0.02)] p-8 hover:scale-[1.02] transition-transform duration-300 ${i === 5 ? 'border-2 border-[#4648d4]/20 bg-[#4648d4]/5' : ''}`}
            >
              <div className={`w-12 h-12 ${f.bg} ${f.color} rounded-lg flex items-center justify-center mb-6`}>
                <MaterialIcon icon={f.icon} />
              </div>
              <h3 className="text-xl font-semibold font-['Plus_Jakarta_Sans'] mb-3">{f.title}</h3>
              <p className="text-[#464554]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    { num: "01", icon: "analytics", title: "Monitor", desc: "Collect real-time data from facilities, patients, inventory, and field teams." },
    { num: "02", icon: "psychology", title: "Analyze", desc: "AI analyzes data to detect risks, trends, and gaps across the entire district." },
    { num: "03", icon: "rocket_launch", title: "Act", desc: "Get actionable insights and take informed actions that improve health outcomes." },
  ]
  return (
    <section className="py-24 bg-[#f5f2fe] overflow-hidden relative" id="how-it-works">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#4648d4] text-xs font-semibold uppercase tracking-widest block mb-2">SIMPLE &amp; EFFECTIVE</span>
          <h2 className="text-[32px] font-bold font-['Plus_Jakarta_Sans']">How Arogyam Works</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
          <div className="hidden md:block absolute top-12 left-24 right-24 h-px border-t-2 border-dashed border-[#c7c4d7]/50"></div>
          {steps.map((s, i) => (
            <div key={s.num} className="flex-1 text-center group">
              <div className={`w-24 h-24 rounded-full bg-white border-2 border-[#4648d4] text-[#4648d4] flex items-center justify-center mx-auto mb-8 relative z-20 group-hover:scale-110 transition-transform duration-300 ${i === 2 ? 'bg-[#4648d4] text-white' : ''}`}>
                <span className="text-5xl font-bold font-['Plus_Jakarta_Sans']">{s.num}</span>
              </div>
              <div className="bg-[#4648d4]/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon={s.icon} className="text-[#4648d4]" />
              </div>
              <h3 className="text-2xl font-semibold font-['Plus_Jakarta_Sans'] mb-3">{s.title}</h3>
              <p className="text-[#464554] px-4">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhoItsForSection() {
  const roles = [
    { icon: "policy", title: "District Officers", desc: "Oversee district health operations and make data-driven decisions.", hoverColor: "hover:bg-[#4648d4]/5" },
    { icon: "stethoscope", title: "Doctors", desc: "Access patient data, manage cases, and improve outcomes quickly.", hoverColor: "hover:bg-[#006591]/5" },
    { icon: "anchor", title: "Medical Officers", desc: "Monitor facilities, review alerts, and ensure quality care standards.", hoverColor: "hover:bg-[#904900]/5" },
    { icon: "home_health", title: "Nurses", desc: "Update records, track patients, and support care delivery effectively.", hoverColor: "hover:bg-[#c0c1ff]/5" },
  ]
  return (
    <section className="py-24 bg-[#fcf8ff]" id="modules">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-[#4648d4] text-xs font-semibold uppercase tracking-widest block mb-2">BUILT FOR EVERY ROLE</span>
            <h2 className="text-[32px] font-bold font-['Plus_Jakarta_Sans']">Who It&apos;s For</h2>
          </div>
          <p className="max-w-md text-[#464554]">Custom-tailored dashboards and workflows for the entire healthcare hierarchy.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((r) => (
            <div key={r.title} className={`rounded-2xl bg-white/80 backdrop-blur-[10px] border border-[#e4e1ed]/30 shadow-[0_20px_25px_-5px_rgba(70,72,212,0.05),0_10px_10px_-5px_rgba(70,72,212,0.02)] p-6 flex flex-col items-center text-center ${r.hoverColor} transition-colors`}>
              <div className="w-16 h-16 rounded-full bg-[#e1e0ff] text-[#4648d4] flex items-center justify-center mb-6">
                <MaterialIcon icon={r.icon} className="!text-[32px]" />
              </div>
              <h4 className="text-2xl font-semibold font-['Plus_Jakarta_Sans'] mb-2">{r.title}</h4>
              <p className="text-[#464554] text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UnifiedDashboardSection() {
  return (
    <section className="py-24 bg-[#1E1B4B] text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#c9e6ff] text-xs font-semibold uppercase tracking-widest block mb-4">PRODUCT OVERVIEW</span>
          <h2 className="text-5xl font-bold font-['Plus_Jakarta_Sans'] leading-tight mb-6">A Unified Dashboard for Complete Visibility</h2>
          <p className="text-[#e4e1ed]/80 text-lg mb-8">
            Arogyam&apos;s intuitive dashboard brings all critical health data, alerts, and insights into one place — so you can focus on what truly matters: better health outcomes.
          </p>
          <ul className="space-y-4 mb-10">
            {["Real-time facility & patient overview", "Risk rankings and alerts at a glance", "Trends, charts, and AI-powered insights", "Custom filters and drill-down reports"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <MaterialIcon icon="verified" className="text-[#39b8fd]" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/sign-in">
            <button className="bg-[#39b8fd] text-[#004666] px-8 py-4 rounded-xl text-sm font-medium hover:bg-white transition-colors cursor-pointer">
              Explore Dashboard
            </button>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#4648d4]/20 to-[#006591]/20 blur-2xl rounded-full"></div>
          <div className="rounded-2xl bg-white/5 p-2 backdrop-blur-sm border border-white/10 relative">
            <div className="rounded-xl bg-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-[#39b8fd]" />
                  <span className="font-semibold font-['Plus_Jakarta_Sans']">Arogyam AI</span>
                </div>
                <span className="text-xs text-[#c9e6ff]/60">Live Analytics</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Facilities", value: "126", color: "bg-[#4648d4]", width: "72%" },
                  { label: "Patients", value: "2,847", color: "bg-[#10B981]", width: "68%" },
                  { label: "AI Alerts", value: "23", color: "bg-[#F59E0B]", width: "34%" },
                  { label: "Bed Usage", value: "68%", color: "bg-[#7C3AED]", width: "55%" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-[#c9e6ff]/60">{stat.label}</p>
                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                    <div className="h-1 mt-2 bg-white/10 rounded-full">
                      <div className={`h-1 rounded-full ${stat.color}`} style={{ width: stat.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" id="ai-insights">
      <div className="max-w-4xl mx-auto px-4 md:px-10 text-center relative z-10">
        <div className="bg-[#4648d4]/5 p-12 rounded-3xl border border-[#4648d4]/20 backdrop-blur-xl">
          <div className="w-20 h-20 bg-[#4648d4] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#4648d4]/30">
            <MaterialIcon icon="shield_watch" className="text-white !text-[40px]" />
          </div>
          <h2 className="text-[32px] font-bold font-['Plus_Jakarta_Sans'] mb-6">Ready to modernize healthcare operations?</h2>
          <p className="text-[#464554] text-lg mb-10">Join districts and healthcare teams using Arogyam to save time, reduce risks, and deliver better health outcomes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-in">
              <button className="bg-gradient-to-r from-[#7C3AED] to-[#4648d4] text-white px-10 py-5 rounded-xl text-sm font-medium shadow-lg shadow-[#4648d4]/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer">
                Login Now
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="bg-white border border-[#4648d4] text-[#4648d4] px-10 py-5 rounded-xl text-sm font-medium hover:bg-[#4648d4]/5 transition-all cursor-pointer">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="py-12 bg-[#1E1B4B] text-white" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div>
          <div className="flex items-center gap-3 h-10 mb-4">
            <span className="text-lg font-bold font-['Plus_Jakarta_Sans']">Arogyam</span>
          </div>
          <p className="text-[#e4e1ed]/70 pr-8">AI-powered healthcare management system for smarter public health operations and better outcomes.</p>
          <div className="flex space-x-4 mt-6">
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#4648d4]/20 transition-all" href="#">
              <MaterialIcon icon="public" />
            </a>
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#4648d4]/20 transition-all" href="#">
              <MaterialIcon icon="alternate_email" />
            </a>
          </div>
        </div>
        {[
          { title: "Product", links: ["Features", "Modules", "AI Insights", "Dashboard"] },
          { title: "Company", links: ["About Us", "Contact", "Careers", "Privacy Policy"] },
        ].map((col) => (
          <div key={col.title}>
            <h5 className="text-[#fffbff] font-bold mb-6">{col.title}</h5>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a className="text-[#e4e1ed]/70 hover:text-white transition-colors" href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h5 className="text-[#fffbff] font-bold mb-6">Contact Us</h5>
          <ul className="space-y-4">
            {[
              { icon: "mail", text: "hello@arogyam.health" },
              { icon: "call", text: "+91 12345 67890" },
              { icon: "location_on", text: "Visakhapatnam, India" },
            ].map((c) => (
              <li key={c.text} className="flex items-center gap-3 text-[#e4e1ed]/70">
                <MaterialIcon icon={c.icon} />
                {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#e4e1ed]/70 text-xs">&copy; 2024 Arogyam AI Healthcare. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a className="text-[#e4e1ed]/70 hover:text-white text-xs" href="#">Privacy Policy</a>
          <a className="text-[#e4e1ed]/70 hover:text-white text-xs" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
