"use client";

import { useState, useEffect } from "react";
import { Building2, X } from "lucide-react";

interface EditFacilityModalProps {
  facility: {
    id: string;
    name: string;
    facilityType: string;
    location: string;
    overallRisk: string;
    todayOpd: number;
    medicineRisk: string;
    diseaseSpike: string;
    bedOccupancy: number;
  };
  onClose: () => void;
  onUpdated: () => void;
}

export function EditFacilityModal({ facility, onClose, onUpdated }: EditFacilityModalProps) {
  const [form, setForm] = useState({
    name: facility.name,
    facilityType: facility.facilityType,
    location: facility.location,
    overallRisk: facility.overallRisk,
    todayOpd: facility.todayOpd.toString(),
    medicineRisk: facility.medicineRisk,
    diseaseSpike: facility.diseaseSpike,
    bedOccupancy: facility.bedOccupancy.toString(),
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.location) return;
    setSubmitting(true);
    try {
      await fetch(`/api/v1/facilities/${facility.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          facilityType: form.facilityType,
          location: form.location,
          overallRisk: form.overallRisk,
          todayOpd: parseInt(form.todayOpd) || 0,
          medicineRisk: form.medicineRisk,
          diseaseSpike: form.diseaseSpike,
          bedOccupancy: parseInt(form.bedOccupancy) || 0,
        }),
      });
      onUpdated();
      onClose();
    } catch {
      alert("Failed to update facility");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-brand-purple" />
            <h2 className="text-label-md font-bold">Edit Facility</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Type
            <select value={form.facilityType} onChange={(e) => setForm({ ...form, facilityType: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="PHC">PHC</option>
              <option value="CHC">CHC</option>
              <option value="DH">DH</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Location *
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Risk Level
            <select value={form.overallRisk} onChange={(e) => setForm({ ...form, overallRisk: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Today OPD
            <input type="number" value={form.todayOpd} onChange={(e) => setForm({ ...form, todayOpd: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Bed Occupancy %
            <input type="number" value={form.bedOccupancy} onChange={(e) => setForm({ ...form, bedOccupancy: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Medicine Risk
            <select value={form.medicineRisk} onChange={(e) => setForm({ ...form, medicineRisk: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Disease Spike
            <select value={form.diseaseSpike} onChange={(e) => setForm({ ...form, diseaseSpike: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name || !form.location} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}
