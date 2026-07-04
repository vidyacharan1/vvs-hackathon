export type FacilityStatus = "critical" | "high" | "medium" | "low";
export type StaffAttendance = "present" | "absent" | "on leave";
export type WorkloadStatus = "normal" | "high" | "critical";
export type FollowUpStatus = "completed" | "pending" | "overdue";

export interface Facility {
  id: string;
  name: string;
  type: "PHC" | "CHC";
  district: string;
  mandal: string;
  village: string;
  status: FacilityStatus;
  riskScore: number;
  healthScore: number;
  todayOpd: number;
  avgOpd7day: number;
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
}

export interface DashboardSummary {
  totalFacilities: number;
  healthyFacilities: number;
  warningFacilities: number;
  criticalFacilities: number;
  totalPatients: number;
  criticalPatients: number;
  openAlerts: number;
  medicineStockIssues: number;
  doctorAbsenceAlerts: number;
  nurseOverloadAlerts: number;
  diseaseSpikeAlerts: number;
  bedPressureAlerts: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  doctorName: string;
  doctorSpecialty: string;
  time: string;
  date: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  type: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  village: string;
  facilityId: string;
  assignedDoctorId: string;
  assignedNurseId: string;
  riskScore: "Critical" | "High" | "Medium" | "Low";
  condition: string;
  conditions: string[];
  followUpStatus: FollowUpStatus;
  lastVisit: string;
  nextFollowUp: string;
  avatar: string;
}

export interface Doctor {
  id: string;
  name: string;
  facilityId: string;
  specialty: string;
  attendance: StaffAttendance;
  patientsSeenToday: number;
  maxCapacity: number;
  activePatients: number;
  highRiskPatients: number;
  pendingReviews: number;
  workloadStatus: WorkloadStatus;
}

export interface Nurse {
  id: string;
  name: string;
  facilityId: string;
  assignedVillages: string[];
  assignedPatients: number;
  pendingFollowUps: number;
  completedToday: number;
  highRiskFollowUps: number;
  workloadStatus: WorkloadStatus;
}

export interface Medicine {
  id: string;
  name: string;
  facilityId: string;
  currentStock: number;
  avgDailyUsage: number;
  daysLeft: number;
  reorderLevel: number;
  risk: FacilityStatus;
  suggestedAction: string;
}

export interface AIInsight {
  id: string;
  message: string;
  priority: "high" | "medium" | "low";
  category: string;
  timestamp: string;
  type: string;
  facilityId: string;
  severity: FacilityStatus;
  createdAt: string;
  summary: string;
  recommendation: string;
  status: "open" | "acknowledged" | "resolved";
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

export interface DiseaseSpike {
  condition: string;
  facilityId: string;
  thisWeek: number;
  lastWeek: number;
  increase: number;
  risk: FacilityStatus;
  linkedMedicine: string;
}

export interface VillageCondition {
  village: string;
  facilityId: string;
  condition: string;
  count: number;
}

export interface CommunityMetric {
  label: string;
  value: number;
  target: number;
  color: string;
  icon: string;
}

export const facilities: Facility[] = [
  {
    id: "phc-madhurawada",
    name: "PHC Madhurawada",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Visakhapatnam Urban",
    village: "Madhurawada",
    status: "critical",
    riskScore: 94,
    healthScore: 32,
    todayOpd: 312,
    avgOpd7day: 238,
    doctorsPresent: 1,
    totalDoctors: 3,
    nursesPresent: 4,
    totalNurses: 5,
    bedsOccupied: 19,
    totalBeds: 20,
    bedOccupancyRate: 96,
    totalPatients: 320,
    criticalPatients: 23,
    openAlerts: 8,
    medicineStockIssues: 3,
    diseaseSpikeCount: 2,
    diseaseSpikeRisk: 88,
  },
  {
    id: "chc-bheemunipatnam",
    name: "CHC Bheemunipatnam",
    type: "CHC",
    district: "Visakhapatnam",
    mandal: "Bheemunipatnam",
    village: "Bheemunipatnam",
    status: "high",
    riskScore: 82,
    healthScore: 49,
    todayOpd: 248,
    avgOpd7day: 206,
    doctorsPresent: 3,
    totalDoctors: 5,
    nursesPresent: 6,
    totalNurses: 8,
    bedsOccupied: 33,
    totalBeds: 40,
    bedOccupancyRate: 82,
    totalPatients: 280,
    criticalPatients: 19,
    openAlerts: 5,
    medicineStockIssues: 4,
    diseaseSpikeCount: 1,
    diseaseSpikeRisk: 67,
  },
  {
    id: "phc-gajuwaka",
    name: "PHC Gajuwaka",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Gajuwaka",
    village: "Gajuwaka",
    status: "high",
    riskScore: 78,
    healthScore: 54,
    todayOpd: 276,
    avgOpd7day: 214,
    doctorsPresent: 2,
    totalDoctors: 4,
    nursesPresent: 5,
    totalNurses: 6,
    bedsOccupied: 14,
    totalBeds: 18,
    bedOccupancyRate: 78,
    totalPatients: 210,
    criticalPatients: 17,
    openAlerts: 4,
    medicineStockIssues: 2,
    diseaseSpikeCount: 1,
    diseaseSpikeRisk: 58,
  },
  {
    id: "phc-ananthapuram",
    name: "PHC Ananthapuram",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Ananthapuram",
    village: "Ananthapuram",
    status: "medium",
    riskScore: 56,
    healthScore: 72,
    todayOpd: 198,
    avgOpd7day: 174,
    doctorsPresent: 2,
    totalDoctors: 2,
    nursesPresent: 4,
    totalNurses: 4,
    bedsOccupied: 8,
    totalBeds: 14,
    bedOccupancyRate: 56,
    totalPatients: 180,
    criticalPatients: 11,
    openAlerts: 3,
    medicineStockIssues: 1,
    diseaseSpikeCount: 0,
    diseaseSpikeRisk: 28,
  },
  {
    id: "phc-pendurthi",
    name: "PHC Pendurthi",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Pendurthi",
    village: "Pendurthi",
    status: "low",
    riskScore: 42,
    healthScore: 84,
    todayOpd: 162,
    avgOpd7day: 151,
    doctorsPresent: 2,
    totalDoctors: 2,
    nursesPresent: 3,
    totalNurses: 3,
    bedsOccupied: 6,
    totalBeds: 14,
    bedOccupancyRate: 42,
    totalPatients: 130,
    criticalPatients: 7,
    openAlerts: 1,
    medicineStockIssues: 0,
    diseaseSpikeCount: 0,
    diseaseSpikeRisk: 18,
  },
  {
    id: "chc-narsipatnam",
    name: "CHC Narsipatnam",
    type: "CHC",
    district: "Visakhapatnam",
    mandal: "Narsipatnam",
    village: "Narsipatnam",
    status: "low",
    riskScore: 36,
    healthScore: 88,
    todayOpd: 134,
    avgOpd7day: 128,
    doctorsPresent: 4,
    totalDoctors: 4,
    nursesPresent: 7,
    totalNurses: 7,
    bedsOccupied: 18,
    totalBeds: 50,
    bedOccupancyRate: 36,
    totalPatients: 120,
    criticalPatients: 5,
    openAlerts: 1,
    medicineStockIssues: 1,
    diseaseSpikeCount: 0,
    diseaseSpikeRisk: 14,
  },
];

export const doctors: Doctor[] = [
  { id: "doc-1", name: "Dr. Kavya Menon", facilityId: "phc-madhurawada", specialty: "General Medicine", attendance: "present", patientsSeenToday: 58, maxCapacity: 42, activePatients: 138, highRiskPatients: 23, pendingReviews: 18, workloadStatus: "critical" },
  { id: "doc-2", name: "Dr. Rajesh Kumar", facilityId: "phc-madhurawada", specialty: "Family Medicine", attendance: "absent", patientsSeenToday: 0, maxCapacity: 40, activePatients: 92, highRiskPatients: 15, pendingReviews: 14, workloadStatus: "high" },
  { id: "doc-3", name: "Dr. Prakash Rao", facilityId: "chc-bheemunipatnam", specialty: "Emergency Medicine", attendance: "present", patientsSeenToday: 46, maxCapacity: 48, activePatients: 121, highRiskPatients: 19, pendingReviews: 11, workloadStatus: "high" },
  { id: "doc-4", name: "Dr. Meera Shah", facilityId: "phc-gajuwaka", specialty: "Pediatrics", attendance: "present", patientsSeenToday: 52, maxCapacity: 44, activePatients: 113, highRiskPatients: 17, pendingReviews: 14, workloadStatus: "high" },
  { id: "doc-5", name: "Dr. Nikhil Reddy", facilityId: "phc-pendurthi", specialty: "General Medicine", attendance: "on leave", patientsSeenToday: 0, maxCapacity: 40, activePatients: 74, highRiskPatients: 7, pendingReviews: 6, workloadStatus: "normal" },
  { id: "doc-6", name: "Dr. Ananya Iyer", facilityId: "chc-narsipatnam", specialty: "Public Health", attendance: "present", patientsSeenToday: 31, maxCapacity: 45, activePatients: 65, highRiskPatients: 5, pendingReviews: 4, workloadStatus: "normal" },
];

export const nurses: Nurse[] = [
  { id: "nurse-1", name: "Sr. Lakshmi Devi", facilityId: "phc-madhurawada", assignedVillages: ["Madhurawada", "Rushikonda"], assignedPatients: 82, pendingFollowUps: 29, completedToday: 17, highRiskFollowUps: 11, workloadStatus: "critical" },
  { id: "nurse-2", name: "Sr. Mary D.", facilityId: "phc-madhurawada", assignedVillages: ["Madhurawada", "Yendada"], assignedPatients: 76, pendingFollowUps: 24, completedToday: 12, highRiskFollowUps: 8, workloadStatus: "high" },
  { id: "nurse-3", name: "Sr. Revathi", facilityId: "chc-bheemunipatnam", assignedVillages: ["Bheemunipatnam", "Tagarapuvalasa"], assignedPatients: 73, pendingFollowUps: 18, completedToday: 21, highRiskFollowUps: 8, workloadStatus: "high" },
  { id: "nurse-4", name: "Sr. Asha", facilityId: "phc-gajuwaka", assignedVillages: ["Gajuwaka", "Malkapuram"], assignedPatients: 69, pendingFollowUps: 23, completedToday: 14, highRiskFollowUps: 10, workloadStatus: "high" },
  { id: "nurse-5", name: "Sr. Jyothi", facilityId: "phc-pendurthi", assignedVillages: ["Pendurthi"], assignedPatients: 48, pendingFollowUps: 7, completedToday: 16, highRiskFollowUps: 3, workloadStatus: "normal" },
  { id: "nurse-6", name: "Sr. Padma", facilityId: "phc-ananthapuram", assignedVillages: ["Ananthapuram", "Gavaravaram"], assignedPatients: 61, pendingFollowUps: 15, completedToday: 19, highRiskFollowUps: 7, workloadStatus: "high" },
  { id: "nurse-7", name: "Sr. Sunitha", facilityId: "chc-narsipatnam", assignedVillages: ["Narsipatnam", "Devarapalle"], assignedPatients: 54, pendingFollowUps: 11, completedToday: 20, highRiskFollowUps: 4, workloadStatus: "normal" },
];

export const patients: Patient[] = [
  { id: "pat-001", name: "Sabrina Rao", age: 39, gender: "Female", phone: "+91 98765 12001", village: "Madhurawada", facilityId: "phc-madhurawada", assignedDoctorId: "doc-1", assignedNurseId: "nurse-1", riskScore: "High", condition: "Fever with dehydration", conditions: ["Fever", "Dehydration"], followUpStatus: "pending", lastVisit: "2026-07-04", nextFollowUp: "2026-07-05", avatar: "SR" },
  { id: "pat-002", name: "Anil Varma", age: 62, gender: "Male", phone: "+91 98765 12002", village: "Madhurawada", facilityId: "phc-madhurawada", assignedDoctorId: "doc-1", assignedNurseId: "nurse-1", riskScore: "High", condition: "Diabetes and hypertension", conditions: ["Diabetes", "Hypertension"], followUpStatus: "overdue", lastVisit: "2026-07-01", nextFollowUp: "2026-07-03", avatar: "AV" },
  { id: "pat-003", name: "Lakshmi Devi", age: 28, gender: "Female", phone: "+91 98765 12003", village: "Bheemunipatnam", facilityId: "chc-bheemunipatnam", assignedDoctorId: "doc-3", assignedNurseId: "nurse-3", riskScore: "Medium", condition: "Pregnancy risk and anemia", conditions: ["Pregnancy risk", "Anemia"], followUpStatus: "pending", lastVisit: "2026-07-03", nextFollowUp: "2026-07-06", avatar: "LD" },
  { id: "pat-004", name: "Rafiq Khan", age: 45, gender: "Male", phone: "+91 98765 12004", village: "Gajuwaka", facilityId: "phc-gajuwaka", assignedDoctorId: "doc-4", assignedNurseId: "nurse-4", riskScore: "High", condition: "ARI and asthma", conditions: ["ARI", "Asthma"], followUpStatus: "pending", lastVisit: "2026-07-04", nextFollowUp: "2026-07-05", avatar: "RK" },
  { id: "pat-005", name: "Mariyamma Devi", age: 62, gender: "Female", phone: "+91 98765 12005", village: "Pendurthi", facilityId: "phc-pendurthi", assignedDoctorId: "doc-5", assignedNurseId: "nurse-5", riskScore: "High", condition: "Diabetes Type 2", conditions: ["Diabetes Type 2"], followUpStatus: "completed", lastVisit: "2026-07-02", nextFollowUp: "2026-07-12", avatar: "MD" },
  { id: "pat-006", name: "Venkata Ramana", age: 45, gender: "Male", phone: "+91 98765 12006", village: "Bheemunipatnam", facilityId: "chc-bheemunipatnam", assignedDoctorId: "doc-3", assignedNurseId: "nurse-3", riskScore: "Medium", condition: "Hypertension", conditions: ["Hypertension"], followUpStatus: "completed", lastVisit: "2026-06-30", nextFollowUp: "2026-07-14", avatar: "VR" },
  { id: "pat-007", name: "Saraswati Bai", age: 28, gender: "Female", phone: "+91 98765 12007", village: "Gajuwaka", facilityId: "phc-gajuwaka", assignedDoctorId: "doc-4", assignedNurseId: "nurse-4", riskScore: "Low", condition: "Antenatal care", conditions: ["Antenatal"], followUpStatus: "completed", lastVisit: "2026-06-29", nextFollowUp: "2026-07-20", avatar: "SB" },
];

export const recentPatients: Patient[] = patients.filter((patient) => patient.riskScore !== "Critical").slice(0, 5);

export const dashboardSummary: DashboardSummary = {
  totalFacilities: facilities.length,
  healthyFacilities: facilities.filter((f) => f.status === "low").length,
  warningFacilities: facilities.filter((f) => f.status === "medium").length,
  criticalFacilities: facilities.filter((f) => f.status === "critical").length,
  totalPatients: facilities.reduce((sum, f) => sum + f.totalPatients, 0),
  criticalPatients: facilities.reduce((sum, f) => sum + f.criticalPatients, 0),
  openAlerts: facilities.reduce((sum, f) => sum + f.openAlerts, 0),
  medicineStockIssues: facilities.reduce((sum, f) => sum + f.medicineStockIssues, 0),
  doctorAbsenceAlerts: doctors.filter((d) => d.attendance === "absent").length,
  nurseOverloadAlerts: nurses.filter((n) => n.workloadStatus === "critical").length,
  diseaseSpikeAlerts: facilities.reduce((sum, f) => sum + f.diseaseSpikeCount, 0),
  bedPressureAlerts: facilities.filter((f) => f.bedOccupancyRate >= 80).length,
};

export const medicines: Medicine[] = [
  { id: "med-1", name: "Paracetamol 650mg", facilityId: "phc-madhurawada", currentStock: 68, avgDailyUsage: 31, daysLeft: 2.2, reorderLevel: 180, risk: "critical", suggestedAction: "Transfer 300 strips from CHC Narsipatnam today." },
  { id: "med-2", name: "ORS packets", facilityId: "phc-madhurawada", currentStock: 92, avgDailyUsage: 30, daysLeft: 3.0, reorderLevel: 220, risk: "high", suggestedAction: "Move buffer stock from PHC Pendurthi." },
  { id: "med-3", name: "Amoxicillin", facilityId: "chc-bheemunipatnam", currentStock: 140, avgDailyUsage: 42, daysLeft: 3.3, reorderLevel: 260, risk: "high", suggestedAction: "Emergency warehouse refill within 24 hours." },
  { id: "med-4", name: "Iron tablets", facilityId: "chc-bheemunipatnam", currentStock: 310, avgDailyUsage: 38, daysLeft: 8.1, reorderLevel: 250, risk: "low", suggestedAction: "Monitor weekly." },
  { id: "med-5", name: "Insulin vials", facilityId: "phc-gajuwaka", currentStock: 42, avgDailyUsage: 9, daysLeft: 4.7, reorderLevel: 70, risk: "medium", suggestedAction: "Reorder within 48 hours." },
  { id: "med-6", name: "Zinc tablets", facilityId: "chc-narsipatnam", currentStock: 220, avgDailyUsage: 14, daysLeft: 15.7, reorderLevel: 110, risk: "low", suggestedAction: "Maintain current level." },
];

export const healthTrends: HealthTrend[] = [
  { month: "Jan", opVisits: 2840, chronicCases: 420, followUps: 1120, fever: 38, respiratory: 21, hypertension: 48, diabetes: 42, diarrhea: 16 },
  { month: "Feb", opVisits: 3020, chronicCases: 445, followUps: 1180, fever: 42, respiratory: 24, hypertension: 51, diabetes: 44, diarrhea: 18 },
  { month: "Mar", opVisits: 3180, chronicCases: 470, followUps: 1240, fever: 49, respiratory: 27, hypertension: 54, diabetes: 47, diarrhea: 20 },
  { month: "Apr", opVisits: 2950, chronicCases: 458, followUps: 1190, fever: 46, respiratory: 25, hypertension: 53, diabetes: 46, diarrhea: 17 },
  { month: "May", opVisits: 3410, chronicCases: 492, followUps: 1310, fever: 58, respiratory: 31, hypertension: 57, diabetes: 49, diarrhea: 19 },
  { month: "Jun", opVisits: 3650, chronicCases: 518, followUps: 1420, fever: 66, respiratory: 39, hypertension: 61, diabetes: 52, diarrhea: 22 },
  { month: "Jul", opVisits: 3890, chronicCases: 542, followUps: 1510, fever: 84, respiratory: 52, hypertension: 65, diabetes: 56, diarrhea: 19 },
];

export const diseaseSpikes: DiseaseSpike[] = [
  { condition: "Fever", facilityId: "phc-madhurawada", thisWeek: 84, lastWeek: 41, increase: 104, risk: "critical", linkedMedicine: "Paracetamol, ORS" },
  { condition: "Dengue", facilityId: "chc-bheemunipatnam", thisWeek: 26, lastWeek: 11, increase: 136, risk: "high", linkedMedicine: "ORS, platelet kits" },
  { condition: "ARI", facilityId: "phc-gajuwaka", thisWeek: 52, lastWeek: 37, increase: 41, risk: "medium", linkedMedicine: "Salbutamol, Amoxicillin" },
  { condition: "Diarrhea", facilityId: "phc-pendurthi", thisWeek: 19, lastWeek: 22, increase: -14, risk: "low", linkedMedicine: "ORS, Zinc" },
];

export const villageConditions: VillageCondition[] = [
  { village: "Madhurawada", facilityId: "phc-madhurawada", condition: "Fever", count: 48 },
  { village: "Rushikonda", facilityId: "phc-madhurawada", condition: "Dehydration", count: 19 },
  { village: "Bheemunipatnam", facilityId: "chc-bheemunipatnam", condition: "Dengue watch", count: 26 },
  { village: "Gajuwaka", facilityId: "phc-gajuwaka", condition: "ARI", count: 31 },
  { village: "Pendurthi", facilityId: "phc-pendurthi", condition: "Diarrhea", count: 12 },
];

export const appointments: Appointment[] = [
  { id: "A001", patientName: "Sabrina Rao", patientAvatar: "SR", doctorName: "Dr. Kavya Menon", doctorSpecialty: "General Medicine", time: "09:00 AM", date: "Today", status: "confirmed", type: "Fever review" },
  { id: "A002", patientName: "Anil Varma", patientAvatar: "AV", doctorName: "Dr. Kavya Menon", doctorSpecialty: "General Medicine", time: "09:30 AM", date: "Today", status: "pending", type: "Diabetes follow-up" },
  { id: "A003", patientName: "Lakshmi Devi", patientAvatar: "LD", doctorName: "Dr. Prakash Rao", doctorSpecialty: "Emergency Medicine", time: "10:00 AM", date: "Today", status: "confirmed", type: "ANC review" },
  { id: "A004", patientName: "Rafiq Khan", patientAvatar: "RK", doctorName: "Dr. Meera Shah", doctorSpecialty: "Pediatrics", time: "10:30 AM", date: "Today", status: "completed", type: "Respiratory consult" },
  { id: "A005", patientName: "Mariyamma Devi", patientAvatar: "MD", doctorName: "Dr. Nikhil Reddy", doctorSpecialty: "General Medicine", time: "11:00 AM", date: "Today", status: "confirmed", type: "Diabetes management" },
  { id: "A006", patientName: "Venkata Ramana", patientAvatar: "VR", doctorName: "Dr. Prakash Rao", doctorSpecialty: "Emergency Medicine", time: "11:30 AM", date: "Today", status: "pending", type: "BP checkup" },
];

export const aiInsights: AIInsight[] = [
  {
    id: "I001",
    message: "PHC Madhurawada is critical due to 96% bed occupancy and reduced doctor availability.",
    priority: "high",
    category: "Facility Risk",
    timestamp: "4 min ago",
    type: "Facility Risk Insight",
    facilityId: "phc-madhurawada",
    severity: "critical",
    createdAt: "2026-07-05T09:10:00+05:30",
    summary: "Bed occupancy is at 96% with doctor capacity under pressure.",
    recommendation: "Send doctor support, route stable patients to nurse-led screening, and prepare diversion protocol.",
    status: "open",
  },
  {
    id: "I002",
    message: "23 medicine stock alerts detected across 9 facilities, led by Paracetamol and ORS.",
    priority: "high",
    category: "Inventory",
    timestamp: "12 min ago",
    type: "Medicine Stock-out Alert",
    facilityId: "phc-madhurawada",
    severity: "high",
    createdAt: "2026-07-05T09:02:00+05:30",
    summary: "Paracetamol and ORS will breach stock-out threshold within 72 hours.",
    recommendation: "Approve transfer from PHC Pendurthi and CHC Narsipatnam stock buffers.",
    status: "open",
  },
  {
    id: "I003",
    message: "Dengue cases increased 136% week over week in Bheemunipatnam and nearby clusters.",
    priority: "high",
    category: "Disease Surveillance",
    timestamp: "28 min ago",
    type: "Disease Spike Alert",
    facilityId: "chc-bheemunipatnam",
    severity: "high",
    createdAt: "2026-07-05T08:46:00+05:30",
    summary: "Dengue cases are rising across Bheemunipatnam, Gajuwaka, and Madhurawada.",
    recommendation: "Activate fever desk, local surveillance, and ORS buffer distribution.",
    status: "acknowledged",
  },
  {
    id: "I004",
    message: "Nurse follow-up backlog is rising for high-risk respiratory patients in Gajuwaka.",
    priority: "medium",
    category: "Workload",
    timestamp: "41 min ago",
    type: "Nurse Overload Alert",
    facilityId: "phc-gajuwaka",
    severity: "medium",
    createdAt: "2026-07-05T08:33:00+05:30",
    summary: "Follow-up backlog is rising for high-risk respiratory patients.",
    recommendation: "Optimize field route and reassign stable follow-ups to available nurses.",
    status: "open",
  },
  {
    id: "I005",
    message: "CHC Narsipatnam can donate buffer stock without breaching reserve levels.",
    priority: "low",
    category: "Supply Chain",
    timestamp: "1 hr ago",
    type: "Stock Transfer Opportunity",
    facilityId: "chc-narsipatnam",
    severity: "low",
    createdAt: "2026-07-05T08:00:00+05:30",
    summary: "Narsipatnam has adequate Zinc and Paracetamol buffer stock.",
    recommendation: "Use as first transfer source for PHC Madhurawada demand surge.",
    status: "resolved",
  },
];

export const communityMetrics: CommunityMetric[] = [
  { label: "Maternal Care", value: 82, target: 100, color: "#0ea5e9", icon: "heart" },
  { label: "Child Immunization", value: 91, target: 100, color: "#14b8a6", icon: "shield" },
  { label: "Chronic Disease Monitoring", value: 74, target: 100, color: "#8b5cf6", icon: "activity" },
];

export function getFacilityName(id: string) {
  return facilities.find((facility) => facility.id === id)?.name ?? "Unknown facility";
}

export function getDoctorName(id: string) {
  return doctors.find((doctor) => doctor.id === id)?.name ?? "Unassigned doctor";
}

export function getNurseName(id: string) {
  return nurses.find((nurse) => nurse.id === id)?.name ?? "Unassigned nurse";
}

export function getFacilityDoctors(facilityId: string) {
  return doctors.filter((doctor) => doctor.facilityId === facilityId);
}

export function getFacilityNurses(facilityId: string) {
  return nurses.filter((nurse) => nurse.facilityId === facilityId);
}

export function getFacilityMedicines(facilityId: string) {
  return medicines.filter((medicine) => medicine.facilityId === facilityId);
}

export function getFacilityPatients(facilityId: string) {
  return patients.filter((patient) => patient.facilityId === facilityId);
}

export function getFacilityInsights(facilityId: string) {
  return aiInsights.filter((insight) => insight.facilityId === facilityId);
}

export const greetingMessage = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};
