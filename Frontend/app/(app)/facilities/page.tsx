"use client";

import Link from "next/link";
import { Building2, Search, MapPin, ChevronRight } from "lucide-react";
import { facilities } from "@/lib/demo-data";
import type { Facility } from "@/lib/demo-data";

function FacilityRow({ f }: { f: Facility }) {
  return (
    <Link href={`/facilities/${f.id}`} className="card-glass p-5 hover:shadow-lg hover:shadow-brand-purple/10 transition-all block">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-brand-purple" /></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-label-xs text-outline uppercase tracking-widest font-medium">{f.type}</span>
              <span className={`pill pill-${f.status}`}>{f.status.charAt(0).toUpperCase() + f.status.slice(1)}</span>
            </div>
            <h3 className="text-headline-sm font-bold text-on-surface mt-0.5">{f.name}</h3>
            <p className="text-label-sm text-outline flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {f.village}, {f.mandal} · {f.district}</p>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-4 gap-6">
          <div className="text-center"><p className="text-label-xs text-outline">OPD</p><p className="text-body-md font-semibold">{f.todayOpd}</p></div>
          <div className="text-center"><p className="text-label-xs text-outline">Doctors</p><p className="text-body-md font-semibold">{f.doctorsPresent}/{f.totalDoctors}</p></div>
          <div className="text-center"><p className="text-label-xs text-outline">Beds</p><p className="text-body-md font-semibold">{f.bedsOccupied}/{f.totalBeds}</p></div>
          <div className="text-center"><p className="text-label-xs text-outline">Risk</p><p className="text-body-md font-semibold">{f.riskScore}%</p></div>
        </div>
        <ChevronRight className="w-5 h-5 text-outline shrink-0 hidden md:block" />
      </div>
    </Link>
  );
}

export default function FacilitiesPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <p className="text-label-xs text-outline uppercase tracking-widest font-medium">FACILITIES</p>
        <h1 className="text-headline-lg font-bold text-on-surface mt-1">All PHCs & CHCs</h1>
        <p className="text-label-sm text-outline mt-0.5">{facilities.length} facilities in Visakhapatnam district</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
        <input type="text" placeholder="Search facilities..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 focus:ring-2 focus:ring-primary/15 focus:border-primary outline-none text-body-md placeholder:text-outline/50 transition-all" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facilities.map((f) => <FacilityRow key={f.id} f={f} />)}
      </div>
    </div>
  );
}
