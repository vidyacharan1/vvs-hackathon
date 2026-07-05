"use client";

import { useState } from "react";
import { Stethoscope, X } from "lucide-react";

interface AddDoctorModalProps {
  facilityId: string;
  facilities: { id: string; name: string }[];
  onClose: () => void;
  onCreated: () => void;
}

export function AddDoctorModal({ facilityId, facilities, onClose, onCreated }: AddDoctorModalProps) {
  const [form, setForm] = useState({ name: "", facilityId: facilityId, specialty: "General Medicine" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.facilityId) return;
    setSubmitting(true);
    try {
      await fetch("/api/v1/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      onCreated();
      onClose();
    } catch {
      alert("Failed to add doctor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-brand-purple" />
            <h2 className="text-label-md font-bold">Add Doctor</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Dr. full name" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Specialty
            <input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">
            Facility
            <select value={form.facilityId} onChange={(e) => setForm({ ...form, facilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Adding..." : "Add Doctor"}</button>
        </div>
      </div>
    </div>
  );
}
