"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";

interface EditPatientModalProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    phone: string;
    village: string;
    facilityId: string;
    assignedDoctorId: string;
    assignedNurseId: string;
    riskScore: string;
    condition: string;
    conditions: string[];
    followUpStatus: string;
  };
  facilities: { id: string; name: string }[];
  onClose: () => void;
  onUpdated: () => void;
}

export function EditPatientModal({ patient, facilities, onClose, onUpdated }: EditPatientModalProps) {
  const [form, setForm] = useState({
    name: patient.name,
    age: patient.age.toString(),
    gender: patient.gender,
    phone: patient.phone,
    village: patient.village,
    facilityId: patient.facilityId,
    riskScore: patient.riskScore,
    condition: patient.condition,
    followUpStatus: patient.followUpStatus,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.age) return;
    setSubmitting(true);
    try {
      await fetch(`/api/v1/patients/${patient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          age: parseInt(form.age),
          gender: form.gender,
          phone: form.phone,
          village: form.village,
          facilityId: form.facilityId,
          riskScore: form.riskScore,
          condition: form.condition,
          followUpStatus: form.followUpStatus,
        }),
      });
      onUpdated();
      onClose();
    } catch {
      alert("Failed to update patient");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-brand-purple" />
            <h2 className="text-label-md font-bold">Edit Patient</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Age *
            <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Gender
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Phone
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Village
            <input value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Facility
            <select value={form.facilityId} onChange={(e) => setForm({ ...form, facilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="">Select facility</option>
              {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Risk Level
            <select value={form.riskScore} onChange={(e) => setForm({ ...form, riskScore: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Follow-up Status
            <select value={form.followUpStatus} onChange={(e) => setForm({ ...form, followUpStatus: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">
            Condition
            <input value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name || !form.age} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}
