"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  Pill,
  Brain,
  Heart,
  Activity,
  Search,
  Package,
  TrendingUp,
  BarChart3,
  Rocket,
  Shield,
  Stethoscope,
  Anchor,
  Home,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Globe,
  AtSign,
  Monitor,
} from "lucide-react";

function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-card").forEach((card) => {
      card.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-10");
      observerRef.current?.observe(card);
    });

    return () => observerRef.current?.disconnect();
  }, []);
}

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-7xl mx-auto">
        <div className="flex items-center h-10">
          <Image src="/logo.png" alt="Arogyam" width={140} height={35} className="object-contain" priority />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-primary font-bold border-b-2 border-primary pb-1 text-label-md" href="#features">Features</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-md" href="#how-it-works">How It Works</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-md" href="#modules">Modules</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-md" href="#insights">AI Insights</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-md" href="#contact">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-primary font-label-md px-4 py-2 hover:bg-surface-container-low rounded-lg transition-all">
            Login
          </Link>
          <Link href="/signup" className="gradient-button text-white font-label-md px-6 py-2 rounded-lg active:scale-90 transition-transform">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <header className="relative pt-16 pb-24 overflow-hidden hero-mesh">
      <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-flex items-center bg-surface-container-low px-4 py-1.5 rounded-full mb-6 border border-primary/10">
            <Sparkles className="w-[18px] h-[18px] text-primary mr-2" />
            <span className="text-primary font-label-sm">AI-POWERED HEALTHCARE MANAGEMENT</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight mb-6 tracking-tight">
            AI Healthcare Management for <span className="text-primary">Smarter Public Health</span> Operations
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
            Arogyam empowers districts, PHCs, and CHCs to monitor facilities, patients, medicine inventory, disease trends, and actionable AI insights — all from one intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="gradient-button text-white px-8 py-4 rounded-xl font-label-md flex items-center justify-center">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="border border-primary text-primary px-8 py-4 rounded-xl font-label-md hover:bg-primary/5 transition-all flex items-center justify-center"
            >
              <Monitor className="mr-2 w-5 h-5" /> View Dashboard
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 opacity-70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-status-success" />
              <span className="text-label-sm">Quick deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-status-success" />
              <span className="text-label-sm">Secure &amp; compliant</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="glass-card rounded-2xl p-4 overflow-hidden relative border border-outline-variant/30">
            <Image
              className="rounded-xl w-full h-auto shadow-2xl"
              alt="Healthcare dashboard interface showing charts and data visualizations"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnJdmDxOeWtSX1hVhMWd2IcQs57luhE_SMmlU04uIbbnFK2QqNysydD7Z8-9NhpW0gCyxZfUuaadGpnBsiv4d6U4kqR0NcVg9SuPZsBDBgY2qqWKTwAWS1JJ8iVt7rMU1gGWmsZ2PmTOGyPyTtzQyu3nbJneYLvNTkkeYfAmbT5HSiflacBTlbR0fNsjrPCfxTVkbBwqwEcXO1ZnFipGCp2ejPYUTvXFGEWBAUKrrq6cSa4oHwFXK2TA"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsSection() {
  return (
    <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface">126</div>
            <div className="text-on-surface-variant font-label-md">Facilities Monitored</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface">312</div>
            <div className="text-on-surface-variant font-label-md">High-risk Patients Tracked</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-4">
              <Pill className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface">23</div>
            <div className="text-on-surface-variant font-label-md">Medicine Alerts Detected</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed-dim flex items-center justify-center text-primary mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-on-surface">24/7</div>
            <div className="text-on-surface-variant font-label-md">AI Insights &amp; Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      iconBg: "bg-primary/10 text-primary",
      title: "District Command Center",
      desc: "Real-time overview of facilities, risks, alerts, and key health indicators at a district level.",
    },
    {
      icon: Activity,
      iconBg: "bg-secondary/10 text-secondary",
      title: "Facility Monitoring",
      desc: "Track performance, bed occupancy, OPD, and resource availability across all PHCs.",
    },
    {
      icon: Search,
      iconBg: "bg-brand-purple/10 text-brand-purple",
      title: "Patient CRM",
      desc: "Manage patients, follow-ups, referrals, and high-risk patient tracking seamlessly.",
    },
    {
      icon: Package,
      iconBg: "bg-tertiary/10 text-tertiary",
      title: "Inventory & Medicine Alerts",
      desc: "Monitor stock levels and get instant alerts for low or critical medicines automatically.",
    },
    {
      icon: TrendingUp,
      iconBg: "bg-status-warning/10 text-status-warning",
      title: "Disease Trend Intelligence",
      desc: "AI-driven trend analysis and outbreak detection for early healthcare intervention.",
    },
    {
      icon: Sparkles,
      iconBg: "bg-primary text-white",
      title: "AI Action Plans",
      desc: "Get actionable recommendations and AI-generated district health briefs instantly.",
      highlight: true,
    },
  ];

  return (
    <section className="py-24 bg-surface" id="features">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="mb-16">
          <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">EVERYTHING YOU NEED</span>
          <h2 className="text-3xl font-bold text-on-surface">Powerful Features for Proactive Healthcare</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 reveal-card ${f.highlight ? "border-2 border-primary/20 bg-primary/5" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 ${f.iconBg} rounded-lg flex items-center justify-center mb-6 ${f.highlight ? "shadow-lg shadow-primary/20" : ""}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">{f.title}</h3>
                <p className="text-on-surface-variant text-body-md">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden relative" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">SIMPLE &amp; EFFECTIVE</span>
          <h2 className="text-3xl font-bold text-on-surface">How Arogyam Works</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
          <div className="hidden md:block absolute top-12 left-24 right-24 h-px border-t-2 border-dashed border-outline-variant/50" />
          {[
            { num: "01", icon: BarChart3, title: "Monitor", desc: "Collect real-time data from facilities, patients, inventory, and field teams." },
            { num: "02", icon: Brain, title: "Analyze", desc: "AI analyzes data to detect risks, trends, and gaps across the entire district." },
            { num: "03", icon: Rocket, title: "Act", desc: "Get actionable insights and take informed actions that improve health outcomes." },
          ].map((step, i) => {
            const Icon = step.icon;
            const isLast = i === 2;
            return (
              <div key={step.title} className="flex-1 text-center group">
                <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mx-auto mb-8 relative z-20 group-hover:scale-110 transition-transform duration-300 ${isLast ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary"}`}>
                  <span className="text-3xl font-bold">{step.num}</span>
                </div>
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3">{step.title}</h3>
                <p className="text-on-surface-variant text-body-md px-4">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  const roles = [
    { icon: Shield, title: "District Officers", desc: "Oversee district health operations and make data-driven decisions.", bg: "bg-primary-fixed text-primary" },
    { icon: Stethoscope, title: "Medical Officers", desc: "Monitor facilities, review alerts, and ensure quality care standards.", bg: "bg-secondary-fixed text-secondary" },
    { icon: Anchor, title: "Doctors", desc: "Access patient data, manage cases, and improve outcomes quickly.", bg: "bg-tertiary-fixed text-tertiary" },
    { icon: Home, title: "Nurses", desc: "Update records, track patients, and support care delivery effectively.", bg: "bg-primary-fixed-dim text-primary" },
  ];

  return (
    <section className="py-24 bg-surface" id="modules">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-primary font-label-sm uppercase tracking-widest block mb-2">BUILT FOR EVERY ROLE</span>
            <h2 className="text-3xl font-bold text-on-surface">Who It&apos;s For</h2>
          </div>
          <p className="max-w-md text-on-surface-variant text-body-md">Custom-tailored dashboards and workflows for the entire healthcare hierarchy.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:bg-primary/5 transition-colors reveal-card">
                <div className={`w-16 h-16 rounded-full ${r.bg} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-on-surface mb-2">{r.title}</h4>
                <p className="text-on-surface-variant text-label-md">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DashboardPromo() {
  return (
    <section className="py-24 bg-brand-deep-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-secondary-fixed font-label-sm uppercase tracking-widest block mb-4">PRODUCT OVERVIEW</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">A Unified Dashboard for Complete Visibility</h2>
          <p className="text-surface-container-highest/80 text-body-lg mb-8">
            Arogyam&apos;s intuitive dashboard brings all critical health data, alerts, and insights into one place — so you can focus on what truly matters: better health outcomes.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-secondary-container" />
              Real-time facility &amp; patient overview
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-secondary-container" />
              Risk rankings and alerts at a glance
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-secondary-container" />
              Trends, charts, and AI-powered insights
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-secondary-container" />
              Custom filters and drill-down reports
            </li>
          </ul>
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-label-md hover:bg-white transition-colors"
          >
            Explore Dashboard
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl rounded-full" />
          <Image
            className="rounded-2xl shadow-3xl relative border border-white/10 w-full h-auto object-cover"
            alt="Modern medical equipment in a futuristic hospital setting"
            src="https://lh3.googleusercontent.com/aida/AP1WRLuxOQHe3exu6DwDL-qSj3-RtwDyxXJTfUj68MkQvUmq_H8YLz1jQ5mZL6Wcz8nkllvrvFXPsQWbHGcuObpD5g2yjrO7xuGyv1le8p-sQVLB4XKHvfpMJtBKCdMLj4R3rWJBD6zsAcHimi2GZlur-75lamN97y0f5bDws90547YETsseQzPazBZNP0qxQS2cYcG_zZVuaXpez6RmlLmxkwl0JvX_fvTX6INeMZrgtrFyhRqxm5RxxMi_msc"
            width={600}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" id="insights">
      <div className="max-w-4xl mx-auto px-4 md:px-10 text-center relative z-10">
        <div className="bg-primary/5 p-12 rounded-3xl border border-primary/20 backdrop-blur-xl">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-6">Ready to modernize healthcare operations?</h2>
          <p className="text-on-surface-variant text-body-lg mb-10">
            Join districts and healthcare teams using Arogyam to save time, reduce risks, and deliver better health outcomes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="gradient-button text-white px-10 py-5 rounded-xl font-label-md"
            >
              Login Now
            </Link>
            <Link href="/signup" className="bg-white border border-primary text-primary px-10 py-5 rounded-xl font-label-md hover:bg-primary/5 transition-all">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="py-12 bg-brand-deep-blue border-t border-outline/20" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-10 max-w-7xl mx-auto">
        <div>
          <div className="h-[28px] flex items-center mb-6">
            <Image src="/logo.png" alt="Arogyam" width={140} height={35} className="object-contain brightness-0 invert" priority />
          </div>
          <p className="text-surface-container-highest/70 text-body-md pr-8">
            AI-powered healthcare management system for smarter public health operations and better outcomes.
          </p>
          <div className="flex space-x-4 mt-6">
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary/20 transition-all" href="#">
              <Globe className="w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary/20 transition-all" href="#">
              <AtSign className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h5 className="text-on-tertiary-container font-bold mb-6">Product</h5>
          <ul className="space-y-3">
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#features">Features</a></li>
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#modules">Modules</a></li>
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#insights">AI Insights</a></li>
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="/dashboard">Dashboard</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-on-tertiary-container font-bold mb-6">Company</h5>
          <ul className="space-y-3">
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#">About Us</a></li>
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#">Contact</a></li>
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#">Careers</a></li>
            <li><a className="text-surface-container-highest/70 hover:text-white transition-colors text-body-md" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-on-tertiary-container font-bold mb-6">Contact Us</h5>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-surface-container-highest/70 text-body-md">
              <Mail className="w-5 h-5" /> hello@arogyam.health
            </li>
            <li className="flex items-center gap-3 text-surface-container-highest/70 text-body-md">
              <Phone className="w-5 h-5" /> +91 12345 67890
            </li>
            <li className="flex items-center gap-3 text-surface-container-highest/70 text-body-md">
              <MapPin className="w-5 h-5" /> Visakhapatnam, India
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-surface-container-highest/70 text-label-md">© 2026 Arogyam AI Healthcare. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a className="text-surface-container-highest/70 hover:text-white text-label-md" href="#">Privacy Policy</a>
          <a className="text-surface-container-highest/70 hover:text-white text-label-md" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  useScrollReveal();

  return (
    <>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <RolesSection />
      <DashboardPromo />
      <CTASection />
      <FooterSection />
    </>
  );
}
