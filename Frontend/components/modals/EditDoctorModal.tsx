"use client";

import { useState } from "react";
import { Stethoscope, X } from "lucide-react";

interface EditDoctorModalProps {
  doctor: {
    id: string;
    name: string;
    facilityId: string;
    specialty: string;
    attendance: string;
    patientsSeenToday: number;
    maxCapacity: number;
    activePatients: number;
    highRiskPatients: number;
    pendingReviews: number;
    workloadStatus: string;
  };
  facilities: { id: string; name: string }[];
  onClose: () => void;
  onUpdated: () => void;
}

export function EditDoctorModal({ doctor, facilities, onClose, onUpdated }: EditDoctorModalProps) {
  const [form, setForm] = useState({
    name: doctor.name,
    facilityId: doctor.facilityId,
    specialty: doctor.specialty,
    attendance: doctor.attendance,
    maxCapacity: doctor.maxCapacity.toString(),
    workloadStatus: doctor.workloadStatus,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.facilityId) return;
    setSubmitting(true);
    try {
      await fetch(`/api/v1/doctors/${doctor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          facilityId: form.facilityId,
          specialty: form.specialty,
          attendance: form.attendance,
          maxCapacity: parseInt(form.maxCapacity) || 40,
          workloadStatus: form.workloadStatus,
        }),
      });
      onUpdated();
      onClose();
    } catch {
      alert("Failed to update doctor");
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
            <h2 className="text-label-md font-bold">Edit Doctor</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Specialty
            <input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Facility *
            <select value={form.facilityId} onChange={(e) => setForm({ ...form, facilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="">Select facility</option>
              {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Attendance
            <select value={form.attendance} onChange={(e) => setForm({ ...form, attendance: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="leave">On Leave</option>
            </select>
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Max Capacity
            <input type="number" value={form.maxCapacity} onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Workload Status
            <select value={form.workloadStatus} onChange={(e) => setForm({ ...form, workloadStatus: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15">
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name || !form.facilityId} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}
