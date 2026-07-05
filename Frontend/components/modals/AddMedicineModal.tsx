"use client";

import { useState } from "react";
import { Pill, X } from "lucide-react";

interface AddMedicineModalProps {
  facilityId: string;
  onClose: () => void;
  onCreated: () => void;
}

export function AddMedicineModal({ facilityId, onClose, onCreated }: AddMedicineModalProps) {
  const [form, setForm] = useState({ name: "", quantity: "", batchNumber: "", avgDailyUsage: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.quantity) return;
    setSubmitting(true);
    try {
      await fetch("/api/v1/inventory/add-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicine: form.name,
          facilityId: facilityId,
          quantity: parseInt(form.quantity),
          batchNumber: form.batchNumber,
        }),
      });
      onCreated();
      onClose();
    } catch {
      alert("Failed to add medicine stock");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-brand-purple" />
            <h2 className="text-label-md font-bold">Add Medicine Stock</h2>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">
            Medicine Name *
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="e.g. Paracetamol 650mg" />
          </label>
          <label className="text-[12px] font-medium text-on-surface">
            Quantity *
            <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">
            Batch Number
            <input value={form.batchNumber} onChange={(e) => setForm({ ...form, batchNumber: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Optional" />
          </label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.name || !form.quantity} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Adding..." : "Add Stock"}</button>
        </div>
      </div>
    </div>
  );
}
