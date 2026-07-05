const API_BASE = "/api/v1";

async function fetchJSON<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface DistrictDashboard {
  district: string;
  healthScore: number;
  metrics: {
    totalFacilities: number;
    medicineStockAlerts: number;
    diseaseSpikeAlerts: number;
    highRiskPatients: number;
    bedPressure: number;
  };
  facilitySummary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    totalPatients: number;
    criticalPatients: number;
    openAlerts: number;
  };
  aiRecommendations: string[];
  facilities: FacilityResponse[];
}

export interface FacilityResponse {
  id: string;
  name: string;
  facilityType: string;
  type: string;
  location: string;
  village: string;
  mandal: string;
  district: string;
  overallRisk: string;
  status: string;
  todayOpd: number;
  avgOpd7day: number;
  medicineRisk: string;
  diseaseSpike: string;
  bedOccupancy: number;
  riskScore: number;
  healthScore: number;
  doctorsPresent: number;
  totalDoctors: number;
  nursesPresent: number;
  totalNurses: number;
  bedsOccupied: number;
  totalBeds: number;
  bedOccupancyRate: number;
  totalPatients: number;
  criticalPatients: number;
  openAlerts: number;
  medicineStockIssues: number;
  diseaseSpikeCount: number;
  diseaseSpikeRisk: number;
  doctors?: DoctorResponse[];
  nurses?: NurseResponse[];
  patients?: PatientResponse[];
  medicines?: MedicineResponse[];
  insights?: InsightResponse[];
}

export interface InventoryAlert {
  medicine: string;
  severity: string;
  facilities: number;
  daysLeft: number;
}

export interface AlertFeed {
  title: string;
  severity: string;
  time: string;
}

export interface AIDistrictBrief {
  title: string;
  summary: string;
  actions: string[];
  confidence: number;
}

export interface PatientResponse {
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
  lastVisit: string;
  nextFollowUp: string;
  avatar: string;
}

export interface DoctorResponse {
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
}

export interface NurseResponse {
  id: string;
  name: string;
  facilityId: string;
  assignedVillages: string[];
  assignedPatients: number;
  pendingFollowUps: number;
  completedToday: number;
  highRiskFollowUps: number;
  workloadStatus: string;
}

export interface MedicineResponse {
  id: string;
  name: string;
  facilityId: string;
  currentStock: number;
  avgDailyUsage: number;
  daysLeft: number;
  reorderLevel: number;
  risk: string;
  suggestedAction: string;
}

export interface InsightResponse {
  id: string;
  message: string;
  priority: string;
  category: string;
  timestamp: string;
  type: string;
  facilityId: string;
  severity: string;
  createdAt: string;
  summary: string;
  recommendation: string;
  status: string;
}

export interface DiseaseSpike {
  condition: string;
  facilityId: string;
  thisWeek: number;
  lastWeek: number;
  increase: number;
  risk: string;
  linkedMedicine: string;
}

export interface HealthTrend {
  month: string;
  opVisits: number;
  chronicCases: number;
  followUps: number;
  fever: number;
  respiratory: number;
  hypertension: number;
  diabetes: number;
  diarrhea: number;
}

export interface VillageCondition {
  village: string;
  facilityId: string;
  condition: string;
  count: number;
}

export const api = {
  dashboard: {
    getDistrict: () => fetchJSON<DistrictDashboard>("/dashboard/district"),
    getEnriched: () => fetchJSON<DistrictDashboard>("/dashboard/enriched"),
  },
  facilities: {
    list: () => fetchJSON<FacilityResponse[]>("/facilities/enriched"),
    detail: (id: string) => fetchJSON<FacilityResponse>(`/facilities/enriched/${id}`),
    create: (data: { name: string; facilityType: string; location: string; todayOpd?: number; bedOccupancy?: number }) =>
      fetchJSON<FacilityResponse>("/facilities", { method: "POST", body: JSON.stringify(data) }),
    medicines: (id: string) => fetchJSON<MedicineResponse[]>(`/facilities/enriched/${id}/medicines`),
    insights: (id: string) => fetchJSON<InsightResponse[]>(`/facilities/enriched/${id}/insights`),
    patients: (id: string) => fetchJSON<PatientResponse[]>(`/facilities/enriched/${id}/patients`),
    doctors: (id: string) => fetchJSON<DoctorResponse[]>(`/facilities/enriched/${id}/doctors`),
    nurses: (id: string) => fetchJSON<NurseResponse[]>(`/facilities/enriched/${id}/nurses`),
  },
  patients: {
    list: () => fetchJSON<PatientResponse[]>("/patients"),
    detail: (id: string) => fetchJSON<PatientResponse>(`/patients/${id}`),
    create: (data: { name: string; age: number; gender: string; phone?: string; village?: string; facilityId?: string; riskScore?: string; condition?: string; conditions?: string[] }) =>
      fetchJSON<PatientResponse>("/patients", { method: "POST", body: JSON.stringify(data) }),
  },
  doctors: {
    list: () => fetchJSON<DoctorResponse[]>("/doctors"),
    detail: (id: string) => fetchJSON<DoctorResponse>(`/doctors/${id}`),
    create: (data: { name: string; facilityId: string; specialty?: string }) =>
      fetchJSON<DoctorResponse>("/doctors", { method: "POST", body: JSON.stringify(data) }),
  },
  nurses: {
    list: () => fetchJSON<NurseResponse[]>("/nurses"),
    detail: (id: string) => fetchJSON<NurseResponse>(`/nurses/${id}`),
    create: (data: { name: string; facilityId: string; assignedVillages?: string[] }) =>
      fetchJSON<NurseResponse>("/nurses", { method: "POST", body: JSON.stringify(data) }),
  },
  inventory: {
    alerts: () => fetchJSON<InventoryAlert[]>("/inventory/alerts"),
    addStock: (data: { medicine: string; facilityId: string; quantity: number; batchNumber?: string }) =>
      fetchJSON<{ status: string; message: string }>("/inventory/add-stock", { method: "POST", body: JSON.stringify(data) }),
    transfer: (data: { medicine: string; fromFacilityId: string; toFacilityId: string; quantity: number }) =>
      fetchJSON<{ status: string; message: string }>("/inventory/transfer", { method: "POST", body: JSON.stringify(data) }),
  },
  alerts: {
    feed: () => fetchJSON<AlertFeed[]>("/alerts"),
    acknowledge: (id: string) =>
      fetchJSON<{ status: string; newStatus: string }>(`/alerts/${id}/acknowledge`, { method: "POST" }),
    resolve: (id: string) =>
      fetchJSON<{ status: string; newStatus: string }>(`/alerts/${id}/resolve`, { method: "POST" }),
  },
  diseaseTrends: {
    spikes: () => fetchJSON<DiseaseSpike[]>("/disease-trends/spikes"),
    healthTrends: () => fetchJSON<HealthTrend[]>("/disease-trends/health-trends"),
    villages: () => fetchJSON<VillageCondition[]>("/disease-trends/villages"),
  },
  ai: {
    districtBrief: () =>
      fetchJSON<AIDistrictBrief>("/ai/district-brief", { method: "POST" }),
    redistribution: () =>
      fetchJSON<{ recommendation: string; impact: string; confidence: number }>("/ai/redistribution", { method: "POST" }),
    optimizeNurses: () =>
      fetchJSON<{ status: string; recommendation: string; actions: string[]; confidence: number }>("/ai/optimize-nurses", { method: "POST" }),
    rebalanceDoctors: () =>
      fetchJSON<{ status: string; recommendation: string; actions: string[]; confidence: number }>("/ai/rebalance-doctors", { method: "POST" }),
    analyzeLoad: () =>
      fetchJSON<{ status: string; analysis: { overloaded: string[]; underutilized: string[]; suggestion: string }; confidence: number }>("/ai/analyze-load", { method: "POST" }),
  },
};
