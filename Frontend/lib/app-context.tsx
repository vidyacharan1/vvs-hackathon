"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type AppRole =
  | "district_officer"
  | "medical_officer"
  | "doctor"
  | "nurse";

interface AppState {
  role: AppRole;
  selectedFacilityId?: string;
  simulationMode: "today" | "tomorrow";
}

interface AppContextType extends AppState {
  setRole: (role: AppRole) => void;
  setSimulationMode: (mode: "today" | "tomorrow") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    role: "district_officer",
    simulationMode: "today",
  });

  const setRole = (role: AppRole) => setState((prev) => ({ ...prev, role }));
  const setSimulationMode = (mode: "today" | "tomorrow") =>
    setState((prev) => ({ ...prev, simulationMode: mode }));

  return (
    <AppContext.Provider value={{ ...state, setRole, setSimulationMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
