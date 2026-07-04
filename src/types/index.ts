export type Role = "district_officer" | "doctor" | "nurse"
export type RiskLevel = "low" | "medium" | "high" | "critical"
export type FacilityType = "phc" | "chc"
export type Gender = "male" | "female" | "other"
export type Status = "active" | "inactive" | "pending" | "completed"
export type AlertType = "medicine" | "doctor" | "disease" | "facility" | "patient" | "nurse"
export type AlertSeverity = "low" | "medium" | "high" | "critical"

export interface Facility {
  id: string
  name: string
  type: FacilityType
  district: string
  taluka: string
  village: string
  overallRisk: RiskLevel
  riskScore: number
  todayOPD: number
  weekAvgOPD: number
  doctorsPresent: number
  doctorsRequired: number
  nursesPresent: number
  nursesRequired: number
  totalBeds: number
  occupiedBeds: number
  highRiskPatients: number
  totalPatients: number
  medicineStock: number
  medicineRequired: number
  lastUpdated: string
  coordinates: { lat: number; lng: number }
  healthScore: number
  doctorAvailability: number
  nurseWorkload: number
  medicineRisk: number
  diseaseRisk: number
  bedOccupancy: number
  patientRisk: number
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: Gender
  village: string
  district: string
  conditions: string[]
  doctor: string
  doctorId: string
  nurse: string
  nurseId: string
  risk: RiskLevel
  lastVisit: string
  nextFollowUp: string
  status: Status
  phone: string
  bloodGroup: string
  vitals: Vital[]
  visits: Visit[]
  medicines: MedicinePrescription[]
  timeline: TimelineEvent[]
  aiSummary: string
  tasks: Task[]
  createdAt: string
}

export interface Vital {
  date: string
  bpSystolic: number
  bpDiastolic: number
  heartRate: number
  temperature: number
  oxygenSaturation: number
  bloodSugar: number
}

export interface Visit {
  date: string
  doctor: string
  reason: string
  diagnosis: string
  notes: string
}

export interface MedicinePrescription {
  name: string
  dosage: string
  frequency: string
  prescribedDate: string
  endDate: string
  refills: number
}

export interface TimelineEvent {
  date: string
  type: "visit" | "medicine" | "test" | "note" | "alert"
  description: string
  doctor?: string
}

export interface Task {
  id: string
  description: string
  dueDate: string
  completed: boolean
  assignedTo: string
}

export interface Doctor {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  facilityId: string
  facilityName: string
  present: boolean
  patientsSeen: number
  maxCapacity: number
  pendingReviews: number
  workload: number
  attendance: number
  avatar: string
  rating: number
  joinDate: string
}

export interface Nurse {
  id: string
  name: string
  email: string
  phone: string
  facilityId: string
  facilityName: string
  assignedVillages: string[]
  pendingFollowUps: number
  completedToday: number
  highRiskPatients: number
  totalPatients: number
  workload: number
  present: boolean
  avatar: string
  rating: number
}

export interface Medicine {
  id: string
  name: string
  category: string
  currentStock: number
  averageUsage: number
  daysLeft: number
  reorderLevel: number
  risk: RiskLevel
  unit: string
  facilityId: string
  facilityName: string
  expiryDate: string
  manufacturer: string
}

export interface DiseaseTrend {
  disease: string
  weekData: number[]
  currentWeek: number
  previousWeek: number
  change: number
  risk: RiskLevel
  facilities: { name: string; cases: number }[]
  villages: { name: string; cases: number }[]
  medicineImpact: number
}

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  description: string
  facilityId?: string
  facilityName?: string
  timestamp: string
  acknowledged: boolean
  resolved: boolean
}

export interface AIInsight {
  id: string
  type: AlertType
  title: string
  description: string
  recommendation: string
  severity: AlertSeverity
  timestamp: string
  acknowledged: boolean
  resolved: boolean
}

export interface ActionPlan {
  executiveSummary: string
  topIssues: { issue: string; severity: AlertSeverity; detail: string }[]
  doctorActions: { action: string; priority: "high" | "medium" | "low" }[]
  nurseActions: { action: string; priority: "high" | "medium" | "low" }[]
  medicineActions: { action: string; priority: "high" | "medium" | "low" }[]
  districtActions: { action: string; priority: "high" | "medium" | "low" }[]
  impactForecast: string
}

export interface DashboardSummary {
  totalFacilities: number
  criticalFacilities: number
  medicineAlerts: number
  doctorAbsence: number
  nurseOverload: number
  diseaseAlerts: number
  bedPressure: number
  highRiskPatients: number
  facilityRiskTrend: { date: string; low: number; medium: number; high: number; critical: number }[]
  medicineStockTrend: { date: string; stock: number; required: number }[]
  patientVisits: { date: string; opd: number; ipd: number }[]
  diseaseCases: { disease: string; cases: number; change: number }[]
  facilityRiskRanking: { id: string; name: string; riskScore: number; risk: RiskLevel; change: number }[]
  recentAlerts: Alert[]
  topCriticalFacilities: { id: string; name: string; type: FacilityType; riskScore: number; risk: RiskLevel }[]
}

export interface User {
  name: string
  role: Role
  email: string
  district: string
  avatar: string
}
