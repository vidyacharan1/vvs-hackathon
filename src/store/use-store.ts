import { create } from "zustand"
import { Role, type Alert } from "@/types"

interface AppState {
  role: Role
  setRole: (role: Role) => void
  selectedFacilityId: string | null
  setSelectedFacilityId: (id: string | null) => void
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  simulationMode: boolean
  setSimulationMode: (mode: boolean) => void
  simulationDay: number
  setSimulationDay: (day: number) => void
  advanceSimulation: () => void
  resetSimulation: () => void
  notifications: Alert[]
  addNotification: (alert: Alert) => void
  acknowledgeNotification: (id: string) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  role: "district_officer" as Role,
  setRole: (role) => set({ role }),
  selectedFacilityId: null,
  setSelectedFacilityId: (id) => set({ selectedFacilityId: id }),
  theme: "light",
  setTheme: (theme) => {
    set({ theme })
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  },
  simulationMode: false,
  setSimulationMode: (mode) => set({ simulationMode: mode }),
  simulationDay: 0,
  setSimulationDay: (day) => set({ simulationDay: day }),
  advanceSimulation: () => set((state) => ({ simulationDay: state.simulationDay + 1 })),
  resetSimulation: () => set({ simulationDay: 0, simulationMode: false }),
  notifications: [],
  addNotification: (alert) => set((state) => ({ notifications: [alert, ...state.notifications].slice(0, 50) })),
  acknowledgeNotification: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, acknowledged: true } : n)
  })),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}))
