"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Search, MapPin, Activity, Users, BedDouble, AlertTriangle } from "lucide-react";
import { facilities } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

function statusDotColor(status: string) {
  switch (status) {
    case "critical": return "bg-[#ef4444]";
    case "high": return "bg-[#f59e0b]";
    case "medium": return "bg-[#ca8a04]";
    default: return "bg-[#10b981]";
  }
}

function badgeClass(status: string) {
  switch (status) {
    case "critical": return "badge-critical";
    case "high": return "badge-high";
    case "medium": return "badge-medium";
    default: return "badge-low";
  }
}

function riskStyle(score: number) {
  if (score >= 70) return { container: "bg-[#fef2f2] text-[#dc2626]" };
  if (score >= 40) return { container: "bg-[#fff7ed] text-[#ea580c]" };
  return { container: "bg-[#f0fdf4] text-[#16a34a]" };
}

function FacilityCard({ f }: { f: Facility }) {
  const rs = riskStyle(f.riskScore);
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/facilities/${f.id}`}
        className="bg-white rounded-2xl p-5 border border-[#e4e4e7] hover:scale-[1.02] transition-all duration-300 group block"
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eef2ff] text-[#6366f1] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-wider">{f.type}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(f.status)}`} />
                <span className={badgeClass(f.status)}>
                  {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                </span>
              </div>
              <h3 className="text-base font-semibold">{f.name}</h3>
              <p className="text-sm text-[#a1a1aa] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 shrink-0" /> {f.village}, {f.mandal} · {f.district}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#eef2ff]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-[#6366f1] mb-1.5">
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-base font-bold">{f.todayOpd}</div>
            <div className="text-[10px] text-[#6366f1] uppercase tracking-wider font-semibold">OPD</div>
          </div>
          <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#f0fdf4]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-[#16a34a] mb-1.5">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-base font-bold">{f.doctorsPresent}/{f.totalDoctors}</div>
            <div className="text-[10px] text-[#16a34a] uppercase tracking-wider font-semibold">Doctors</div>
          </div>
          <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#eef2ff]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-[#6366f1] mb-1.5">
              <BedDouble className="w-4 h-4" />
            </div>
            <div className="text-base font-bold">{f.bedsOccupied}/{f.totalBeds}</div>
            <div className="text-[10px] text-[#6366f1] uppercase tracking-wider font-semibold">Beds</div>
          </div>
          <div className={`flex flex-col items-center text-center p-2.5 rounded-xl ${rs.container}`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 mb-1.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-base font-bold">{f.riskScore}%</div>
            <div className="text-[10px] uppercase tracking-wider font-semibold">Risk</div>
          </div>
        </div>
      </Link>
    </motion.div>
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
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      <section className="py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">All PHCs & CHCs</h2>
            <p className="text-sm text-[#a1a1aa] mt-1">
              {facilities.length} facilities · {facilities.filter(f => f.status === "critical" || f.status === "high").length} at risk
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa] pointer-events-none" />
            <input
              type="text"
              placeholder="Search facilities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="premium-input pl-10"
            />
          </div>
        </div>
      </section>

      <section className="py-6">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-5 border border-[#e4e4e7] flex flex-col items-center text-center py-12">
            <Building2 className="w-10 h-10 text-[#a1a1aa] mb-3" />
            <p className="text-base font-semibold">No facilities found</p>
            <p className="text-sm text-[#a1a1aa] mt-1">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((f) => <FacilityCard key={f.id} f={f} />)}
          </div>
        )}
      </section>
    </motion.div>
  );
}
