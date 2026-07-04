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
    <select
      value={role}
      onChange={(e) => setRole(e.target.value as typeof role)}
      className="premium-select text-xs py-1.5 pl-2.5 pr-7"
    >
      {roles.map((r) => (
        <option key={r.value} value={r.value}>{r.label}</option>
      ))}
    </select>
  );
}
