"use client";

import KPICards from "@/components/dashboard/KPICards";
import MetricCards from "@/components/dashboard/MetricCards";
import HeroCrisisMessage from "@/components/dashboard/HeroCrisisMessage";
import FacilityRiskRanking from "@/components/dashboard/FacilityRiskRanking";
import AIDistrictBrief from "@/components/dashboard/AIDistrictBrief";
import DiseaseSpikeTrend from "@/components/dashboard/DiseaseSpikeTrend";
import MedicineStockAlerts from "@/components/dashboard/MedicineStockAlerts";
import FacilityHealthDistribution from "@/components/dashboard/FacilityHealthDistribution";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import RecentPatients from "@/components/dashboard/RecentPatients";
import CommunityHealth from "@/components/dashboard/CommunityHealth";
import AIAssistantPanel from "@/components/dashboard/AIAssistantPanel";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 relative">
      <div className="fixed inset-0 bg-grid bg-lavender-texture pointer-events-none -z-10" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#3b48b8]/3 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#5a2bae]/3 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="space-y-3">
        <div className="flex items-center justify-between animate-fadeIn">
          <div>
            <h1 className="text-[17px] font-bold text-[#0a0b2e] tracking-tight">Dashboard</h1>
            <p className="text-[13px] text-text-muted">Overview of your healthcare network</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-border text-[11px] text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              Live
            </div>
          </div>
        </div>

        <div className="animate-slideUp animate-stagger-1"><HeroCrisisMessage /></div>
        <div className="animate-slideUp animate-stagger-2"><KPICards /></div>
        <div className="animate-slideUp animate-stagger-3"><MetricCards /></div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-3 animate-slideUp animate-stagger-4"><FacilityRiskRanking /></div>
          <div className="animate-slideUp animate-stagger-5"><AIDistrictBrief /></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="animate-slideUp animate-stagger-6"><DiseaseSpikeTrend /></div>
          <div className="animate-slideUp animate-stagger-7"><MedicineStockAlerts /></div>
          <div className="animate-slideUp animate-stagger-8"><FacilityHealthDistribution /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="animate-slideUp animate-stagger-9"><UpcomingAppointments /></div>
          <div className="animate-slideUp animate-stagger-10"><RecentPatients /></div>
        </div>

        <div className="animate-slideUp animate-stagger-11"><CommunityHealth /></div>
        <div className="animate-slideUp animate-stagger-12"><AIAssistantPanel /></div>
      </div>
    </div>
  );
}
