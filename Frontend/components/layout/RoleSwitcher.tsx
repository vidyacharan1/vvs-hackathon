"use client";

import { useApp } from "@/lib/app-context";

const roles = [
  { value: "district_officer", label: "District Officer" },
  { value: "medical_officer", label: "Medical Officer" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
] as const;

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant/25 bg-surface-container-lowest/60">
        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-sm bg-primary" />
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as typeof role)}
          className="appearance-none bg-transparent text-label-sm font-medium text-on-surface pr-5 focus:outline-none cursor-pointer"
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-outline pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
    </div>
  );
}
