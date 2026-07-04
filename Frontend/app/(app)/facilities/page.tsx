"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Search, MapPin, ChevronRight, Activity, Users, BedDouble, AlertTriangle } from "lucide-react";
import { facilities } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

function FacilityCard({ f }: { f: Facility }) {
  return (
    <Link
      href={`/facilities/${f.id}`}
      className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 group block"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-primary font-label-sm uppercase tracking-widest font-semibold">{f.type}</span>
              <span className={`pill pill-${f.status}`}>{f.status.charAt(0).toUpperCase() + f.status.slice(1)}</span>
            </div>
            <h3 className="text-xl font-semibold text-on-surface">{f.name}</h3>
            <p className="text-on-surface-variant font-label-md flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" /> {f.village}, {f.mandal} · {f.district}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-outline shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all hidden sm:block" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-primary-fixed/30">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Activity className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-on-surface">{f.todayOpd}</div>
          <div className="text-primary font-label-sm uppercase tracking-widest text-[10px]">OPD</div>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-secondary-fixed/30">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-2">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-on-surface">{f.doctorsPresent}/{f.totalDoctors}</div>
          <div className="text-secondary font-label-sm uppercase tracking-widest text-[10px]">Doctors</div>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-tertiary-fixed/30">
          <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-2">
            <BedDouble className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-on-surface">{f.bedsOccupied}/{f.totalBeds}</div>
          <div className="text-tertiary font-label-sm uppercase tracking-widest text-[10px]">Beds</div>
        </div>
        <div className={`flex flex-col items-center text-center p-3 rounded-xl ${
          f.riskScore >= 70 ? "bg-error/5" : f.riskScore >= 40 ? "bg-warning/5" : "bg-success/5"
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
            f.riskScore >= 70 ? "bg-error/10 text-error" : f.riskScore >= 40 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
          }`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className={`text-lg font-bold ${f.riskScore >= 70 ? "text-error" : f.riskScore >= 40 ? "text-warning" : "text-success"}`}>{f.riskScore}%</div>
          <div className={`font-label-sm uppercase tracking-widest text-[10px] ${
            f.riskScore >= 70 ? "text-error" : f.riskScore >= 40 ? "text-warning" : "text-success"
          }`}>Risk</div>
        </div>
      </div>
    </Link>
  );
}

export default function FacilitiesPage() {
  const [search, setSearch] = useState("");

  const filtered = facilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.village.toLowerCase().includes(search.toLowerCase()) ||
    f.mandal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">FACILITIES</span>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">All PHCs & CHCs</h1>
              <p className="text-body-lg text-on-surface-variant mt-3">
                {facilities.length} facilities · {facilities.filter(f => f.status === "critical" || f.status === "high").length} at risk
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search facilities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none text-body-md placeholder:text-outline/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          {filtered.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl flex flex-col items-center text-center">
              <Building2 className="w-12 h-12 text-outline mb-4" />
              <p className="text-xl font-semibold text-on-surface mb-1">No facilities found</p>
              <p className="text-on-surface-variant font-label-md">Try adjusting your search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filtered.map((f) => <FacilityCard key={f.id} f={f} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
