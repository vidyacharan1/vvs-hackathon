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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as typeof role)}
        className="appearance-none w-full bg-transparent text-text-muted text-xs rounded-lg px-2 py-1.5 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
      >
        {roles.map((r) => (
          <option key={r.value} value={r.value} className="bg-white text-text-primary">
            {r.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
