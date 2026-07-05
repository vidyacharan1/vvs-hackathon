"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Pill, Plus, Search, Sparkles, X } from "lucide-react";
import { facilities, medicines } from "@/lib/demo-data";
import { useInventoryAlerts, useInventoryStock, useFacilities as useApiFacilities } from "@/lib/api";
import { useApp } from "@/lib/app-context";

function getFacilityName(apiFacilityList: { id: string; name: string }[], id: string) {
  return apiFacilityList.find((f) => f.id === id)?.name ?? id;
}

const riskLabel = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

function AddStockModal({ onClose, facilities, onAdded }: { onClose: () => void; facilities: { id: string; name: string }[]; onAdded: () => void }) {
  const [form, setForm] = useState({ medicine: "", facilityId: "", quantity: "", batchNumber: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.medicine || !form.facilityId || !form.quantity) return;
    setSubmitting(true);
    try {
      await fetch("/api/v1/inventory/add-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicine: form.medicine, facilityId: form.facilityId, quantity: parseInt(form.quantity), batchNumber: form.batchNumber }),
      });
      onAdded();
      onClose();
    } catch {
      alert("Failed to add stock");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2"><Pill className="h-4 w-4 text-brand-purple" /><h2 className="text-label-md font-bold">Add Stock</h2></div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">Medicine *<input value={form.medicine} onChange={(e) => setForm({ ...form, medicine: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="e.g. Paracetamol 650mg" /></label>
          <label className="text-[12px] font-medium text-on-surface">Quantity *<input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">Facility<select value={form.facilityId} onChange={(e) => setForm({ ...form, facilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"><option value="">Select facility</option>{facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
          <label className="text-[12px] font-medium text-on-surface sm:col-span-2">Batch Number<input value={form.batchNumber} onChange={(e) => setForm({ ...form, batchNumber: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Optional" /></label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.medicine || !form.facilityId || !form.quantity} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Adding..." : "Add Stock"}</button>
        </div>
      </div>
    </div>
  );
}

function TransferStockModal({ onClose, facilities, onTransferred }: { onClose: () => void; facilities: { id: string; name: string }[]; onTransferred: () => void }) {
  const [form, setForm] = useState({ medicine: "", fromFacilityId: "", toFacilityId: "", quantity: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.medicine || !form.fromFacilityId || !form.toFacilityId || !form.quantity) return;
    setSubmitting(true);
    try {
      await fetch("/api/v1/inventory/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicine: form.medicine, fromFacilityId: form.fromFacilityId, toFacilityId: form.toFacilityId, quantity: parseInt(form.quantity) }),
      });
      onTransferred();
      onClose();
    } catch {
      alert("Failed to transfer stock");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="card-glass max-h-[88vh] w-full max-w-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-3">
          <div className="flex items-center gap-2"><ArrowRightLeft className="h-4 w-4 text-brand-purple" /><h2 className="text-label-md font-bold">Transfer Stock</h2></div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-surface-container-high"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-2.5 px-5 py-4 sm:grid-cols-2">
          <label className="text-[12px] font-medium text-on-surface">Medicine *<input value={form.medicine} onChange={(e) => setForm({ ...form, medicine: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="text-[12px] font-medium text-on-surface">Quantity *<input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="text-[12px] font-medium text-on-surface">From Facility *<select value={form.fromFacilityId} onChange={(e) => setForm({ ...form, fromFacilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"><option value="">Select source</option>{facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
          <label className="text-[12px] font-medium text-on-surface">To Facility *<select value={form.toFacilityId} onChange={(e) => setForm({ ...form, toFacilityId: e.target.value })} className="mt-1 w-full rounded-lg border border-outline-variant/30 bg-white/70 px-2.5 py-1.5 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"><option value="">Select destination</option>{facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
        </div>
        <div className="flex gap-2 border-t border-outline-variant/10 px-5 py-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-outline-variant/30 py-2 text-[13px] font-semibold hover:bg-surface-container-high">Cancel</button>
          <button onClick={handleSubmit} disabled={submitting || !form.medicine || !form.fromFacilityId || !form.toFacilityId || !form.quantity} className="gradient-button flex-1 rounded-lg py-2 text-[13px] font-bold text-white disabled:opacity-50">{submitting ? "Transferring..." : "Transfer"}</button>
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [showAddStock, setShowAddStock] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const { data: apiAlerts } = useInventoryAlerts();
  const { data: apiStock, refetch: refetchStock } = useInventoryStock();
  const { data: apiFacilities } = useApiFacilities();
  const { role } = useApp();

  const canManage = role === "district_officer";

  const displayMedicines = useMemo(() => {
    if (apiStock && apiStock.length > 0) {
      return apiStock.map((item) => ({
        id: item.id,
        name: item.name,
        facilityId: item.facilityId,
        currentStock: item.currentStock,
        avgDailyUsage: item.avgDailyUsage,
        daysLeft: item.daysLeft,
        reorderLevel: item.reorderLevel,
        risk: item.risk as "critical" | "high" | "medium" | "low",
        suggestedAction: item.suggestedAction || `Stock: ${item.currentStock} units, ${item.daysLeft.toFixed(1)} days left`,
      }));
    }
    if (apiAlerts && apiAlerts.length > 0) {
      return apiAlerts.map((alert, i) => ({
        id: `med-${i}`,
        name: alert.medicine,
        facilityId: facilities[i % facilities.length]?.id ?? "phc-madhurawada",
        currentStock: Math.round(alert.daysLeft * 30),
        avgDailyUsage: 30,
        daysLeft: alert.daysLeft,
        reorderLevel: 180,
        risk: alert.severity.toLowerCase() as "critical" | "high" | "medium" | "low",
        suggestedAction: `Transfer from nearby facilities. ${alert.facilities} facilities affected.`,
      }));
    }
    return medicines;
  }, [apiStock, apiAlerts]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return displayMedicines.filter((medicine) => {
      const matchesSearch = `${medicine.name} ${getFacilityName(apiFacilities ?? [], medicine.facilityId)} ${medicine.suggestedAction}`.toLowerCase().includes(query);
      const matchesFacility = facilityFilter === "all" || medicine.facilityId === facilityFilter;
      return matchesSearch && matchesFacility;
    });
  }, [facilityFilter, search, displayMedicines, apiFacilities]);

  const criticalCount = displayMedicines.filter((medicine) => medicine.risk === "critical").length;
  const highCount = displayMedicines.filter((medicine) => medicine.risk === "high").length;

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-xs uppercase tracking-widest text-outline">Inventory</p>
          <h1 className="text-headline-md font-bold text-on-surface md:text-headline-lg">Medicine Inventory</h1>
          <p className="text-label-sm text-outline">{displayMedicines.length} stock records, {criticalCount + highCount} urgent alerts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canManage && (
            <button onClick={() => setShowAddStock(true)} className="card-glass flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold"><Plus className="h-4 w-4" /> Add Stock</button>
          )}
          {canManage && (
            <button onClick={() => setShowTransfer(true)} className="card-glass flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold"><ArrowRightLeft className="h-4 w-4" /> Transfer</button>
          )}
          <button onClick={() => { fetch("/api/v1/ai/redistribution", { method: "POST" }).then((r) => r.json()).then((data) => alert(`AI Recommendation:\n${data.recommendation}\n\nImpact: ${data.impact}`)); }} className="gradient-button flex items-center gap-2 rounded-xl px-3.5 py-2 text-label-sm font-semibold text-white"><Sparkles className="h-4 w-4" /> Recommend</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Critical", criticalCount, "text-error"],
          ["High", highCount, "text-orange-600"],
          ["Medium", displayMedicines.filter((medicine) => medicine.risk === "medium").length, "text-warning"],
          ["Low", displayMedicines.filter((medicine) => medicine.risk === "low").length, "text-success"],
        ].map(([label, value, color]) => (
          <div key={label} className="card-glass p-3">
            <p className="text-label-xs uppercase tracking-widest text-outline">{label} Risk</p>
            <p className={`mt-1 text-2xl font-bold leading-none ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Search medicines, facility, action..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border border-outline-variant/30 bg-white/70 py-2.5 pl-9 pr-3 text-label-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <select
          value={facilityFilter}
          onChange={(event) => setFacilityFilter(event.target.value)}
          className="min-w-[190px] rounded-2xl border border-outline-variant/30 bg-white/70 px-3 py-2.5 text-label-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        >
          <option value="all">All Facilities</option>
          {(apiFacilities && apiFacilities.length > 0 ? apiFacilities : facilities).map((facility) => (
            <option key={facility.id} value={facility.id}>{facility.name}</option>
          ))}
        </select>
      </div>

      <div className="card-glass overflow-hidden p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-label-xs uppercase tracking-widest text-outline">Stock Risk</p>
            <h2 className="text-headline-sm font-bold text-on-surface">{filtered.length} visible medicines</h2>
          </div>
          <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-label-xs font-bold text-brand-purple">AI reorder ready</span>
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-y border-outline-variant/10 bg-surface-container-lowest/70">
              <th className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Medicine</th>
              <th className="hidden w-36 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline md:table-cell">Facility</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Stock</th>
              <th className="hidden w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline sm:table-cell">Usage</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Days</th>
              <th className="w-24 px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline">Risk</th>
              <th className="hidden px-2 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-outline lg:table-cell">Suggested Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((medicine) => (
              <tr key={medicine.id} className="border-b border-outline-variant/10 transition hover:bg-brand-purple/5">
                <td className="min-w-0 px-2 py-2.5">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10"><Pill className="h-4 w-4 text-brand-purple" /></div>
                    <div className="min-w-0">
                      <p className="truncate text-label-md font-bold text-on-surface">{medicine.name}</p>
                      <p className="truncate text-[11px] text-outline md:hidden">{getFacilityName(apiFacilities ?? [], medicine.facilityId)}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline md:table-cell"><span className="line-clamp-1">{getFacilityName(apiFacilities ?? [], medicine.facilityId)}</span></td>
                <td className="px-2 py-2.5 text-label-md font-bold text-on-surface">{medicine.currentStock}</td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline sm:table-cell">{medicine.avgDailyUsage}/day</td>
                <td className="px-2 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-12 overflow-hidden rounded-full bg-outline-variant/20">
                      <div className={`h-full rounded-full ${medicine.risk === "critical" ? "bg-error" : medicine.risk === "high" ? "bg-warning" : medicine.risk === "medium" ? "bg-primary" : "bg-success"}`} style={{ width: `${Math.min(100, (medicine.daysLeft / 16) * 100)}%` }} />
                    </div>
                    <span className="text-label-xs font-bold text-on-surface">{medicine.daysLeft.toFixed(1)}d</span>
                  </div>
                </td>
                <td className="px-2 py-2.5"><span className={`pill pill-${medicine.risk}`}>{riskLabel[medicine.risk]}</span></td>
                <td className="hidden px-2 py-2.5 text-label-sm text-outline lg:table-cell"><span className="line-clamp-1">{medicine.suggestedAction}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddStock && (
        <AddStockModal
          onClose={() => setShowAddStock(false)}
          facilities={apiFacilities ?? []}
          onAdded={() => refetchStock()}
        />
      )}
      {showTransfer && (
        <TransferStockModal
          onClose={() => setShowTransfer(false)}
          facilities={apiFacilities ?? []}
          onTransferred={() => refetchStock()}
        />
      )}
    </div>
  );
}
