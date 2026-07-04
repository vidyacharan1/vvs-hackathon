export interface Facility {
  id: string;
  name: string;
  type: "PHC" | "CHC";
  district: string;
  mandal: string;
  village: string;
  status: "critical" | "high" | "medium" | "low";
  riskScore: number;
  todayOpd: number;
  avgOpd7day: number;
  doctorsPresent: number;
  totalDoctors: number;
  nursesPresent: number;
  totalNurses: number;
  bedsOccupied: number;
  totalBeds: number;
  totalPatients: number;
  criticalPatients: number;
  openAlerts: number;
  medicineStockIssues: number;
  diseaseSpikeCount: number;
  diseaseSpikeRisk: number;
  bedOccupancyRate: number;
  healthScore: number;
}

export interface DashboardSummary {
  totalFacilities: number;
  criticalFacilities: number;
  highFacilities: number;
  mediumFacilities: number;
  lowFacilities: number;
  totalPatients: number;
  criticalPatients: number;
  openAlerts: number;
  medicineStockIssues: number;
  doctorAbsenceAlerts: number;
  nurseOverloadAlerts: number;
  diseaseSpikeAlerts: number;
  bedPressureAlerts: number;
  totalBeds: number;
  occupiedBeds: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  village: string;
  facilityId: string;
  riskScore: "Critical" | "High" | "Medium" | "Low";
  condition: string;
  conditions: string[];
  assignedDoctorId: string;
  assignedNurseId: string;
  followUpStatus: "pending" | "completed" | "overdue";
  lastVisit: string;
  nextFollowUp: string;
  phone: string;
}

export interface Doctor {
  id: string;
  name: string;
  facilityId: string;
  specialty: string;
  attendance: "present" | "absent" | "leave";
  patientsSeenToday: number;
  maxCapacity: number;
  activePatients: number;
  highRiskPatients: number;
  pendingReviews: number;
  workloadStatus: "normal" | "high" | "critical";
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
  workloadStatus: "normal" | "high" | "critical";
}

export interface Medicine {
  id: string;
  name: string;
  facilityId: string;
  currentStock: number;
  avgDailyUsage: number;
  daysLeft: number;
  reorderLevel: number;
  risk: "critical" | "high" | "medium" | "low";
  suggestedAction: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  facilityId: string;
  doctorName: string;
  time: string;
  date: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  type: string;
}

export interface AIInsight {
  id: string;
  facilityId: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  summary: string;
  recommendation: string;
  createdAt: string;
  status: "open" | "acknowledged" | "resolved";
}

export interface HealthTrend {
  month: string;
  fever: number;
  respiratory: number;
  hypertension: number;
  diabetes: number;
  diarrhea: number;
}

export interface DiseaseSpike {
  condition: string;
  thisWeek: number;
  lastWeek: number;
  increase: number;
  risk: "critical" | "high" | "medium" | "low";
  linkedMedicine: string;
  facilityId: string;
}

export interface VillageCondition {
  village: string;
  condition: string;
  count: number;
  facilityId: string;
}

export const greetingMessage = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export const facilities: Facility[] = [
  {
    id: "fac-1",
    name: "PHC Madhurawada",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Madhurawada",
    village: "Madhurawada",
    status: "critical",
    riskScore: 88,
    todayOpd: 184,
    avgOpd7day: 105,
    doctorsPresent: 2,
    totalDoctors: 3,
    nursesPresent: 4,
    totalNurses: 5,
    bedsOccupied: 16,
    totalBeds: 20,
    totalPatients: 312,
    criticalPatients: 23,
    openAlerts: 7,
    medicineStockIssues: 3,
    diseaseSpikeCount: 2,
    diseaseSpikeRisk: 85,
    bedOccupancyRate: 80,
    healthScore: 32,
  },
  {
    id: "fac-2",
    name: "CHC Bheemili",
    type: "CHC",
    district: "Visakhapatnam",
    mandal: "Bheemili",
    village: "Bheemili",
    status: "high",
    riskScore: 72,
    todayOpd: 142,
    avgOpd7day: 98,
    doctorsPresent: 3,
    totalDoctors: 5,
    nursesPresent: 6,
    totalNurses: 8,
    bedsOccupied: 28,
    totalBeds: 40,
    totalPatients: 245,
    criticalPatients: 15,
    openAlerts: 5,
    medicineStockIssues: 2,
    diseaseSpikeCount: 1,
    diseaseSpikeRisk: 65,
    bedOccupancyRate: 70,
    healthScore: 45,
  },
  {
    id: "fac-3",
    name: "PHC Gajuwaka",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Gajuwaka",
    village: "Gajuwaka",
    status: "high",
    riskScore: 68,
    todayOpd: 98,
    avgOpd7day: 75,
    doctorsPresent: 1,
    totalDoctors: 2,
    nursesPresent: 3,
    totalNurses: 4,
    bedsOccupied: 10,
    totalBeds: 15,
    totalPatients: 178,
    criticalPatients: 11,
    openAlerts: 4,
    medicineStockIssues: 1,
    diseaseSpikeCount: 1,
    diseaseSpikeRisk: 55,
    bedOccupancyRate: 67,
    healthScore: 48,
  },
  {
    id: "fac-4",
    name: "PHC Anandapuram",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Anandapuram",
    village: "Anandapuram",
    status: "medium",
    riskScore: 45,
    todayOpd: 62,
    avgOpd7day: 55,
    doctorsPresent: 2,
    totalDoctors: 2,
    nursesPresent: 3,
    totalNurses: 3,
    bedsOccupied: 5,
    totalBeds: 10,
    totalPatients: 98,
    criticalPatients: 4,
    openAlerts: 2,
    medicineStockIssues: 0,
    diseaseSpikeCount: 0,
    diseaseSpikeRisk: 20,
    bedOccupancyRate: 50,
    healthScore: 68,
  },
  {
    id: "fac-5",
    name: "PHC Pendurthi",
    type: "PHC",
    district: "Visakhapatnam",
    mandal: "Pendurthi",
    village: "Pendurthi",
    status: "low",
    riskScore: 25,
    todayOpd: 41,
    avgOpd7day: 38,
    doctorsPresent: 2,
    totalDoctors: 2,
    nursesPresent: 4,
    totalNurses: 4,
    bedsOccupied: 3,
    totalBeds: 10,
    totalPatients: 65,
    criticalPatients: 2,
    openAlerts: 1,
    medicineStockIssues: 0,
    diseaseSpikeCount: 0,
    diseaseSpikeRisk: 10,
    bedOccupancyRate: 30,
    healthScore: 82,
  },
  {
    id: "fac-6",
    name: "CHC Narsipatnam",
    type: "CHC",
    district: "Visakhapatnam",
    mandal: "Narsipatnam",
    village: "Narsipatnam",
    status: "low",
    riskScore: 18,
    todayOpd: 35,
    avgOpd7day: 32,
    doctorsPresent: 4,
    totalDoctors: 4,
    nursesPresent: 7,
    totalNurses: 8,
    bedsOccupied: 8,
    totalBeds: 30,
    totalPatients: 78,
    criticalPatients: 1,
    openAlerts: 0,
    medicineStockIssues: 0,
    diseaseSpikeCount: 0,
    diseaseSpikeRisk: 5,
    bedOccupancyRate: 27,
    healthScore: 90,
  },
];

export const dashboardSummary: DashboardSummary = {
  totalFacilities: facilities.length,
  criticalFacilities: facilities.filter((f) => f.status === "critical").length,
  highFacilities: facilities.filter((f) => f.status === "high").length,
  mediumFacilities: facilities.filter((f) => f.status === "medium").length,
  lowFacilities: facilities.filter((f) => f.status === "low").length,
  totalPatients: facilities.reduce((s, f) => s + f.totalPatients, 0),
  criticalPatients: facilities.reduce((s, f) => s + f.criticalPatients, 0),
  openAlerts: facilities.reduce((s, f) => s + f.openAlerts, 0),
  medicineStockIssues: facilities.reduce((s, f) => s + f.medicineStockIssues, 0),
  doctorAbsenceAlerts: 3,
  nurseOverloadAlerts: 2,
  diseaseSpikeAlerts: 2,
  bedPressureAlerts: 2,
  totalBeds: facilities.reduce((s, f) => s + f.totalBeds, 0),
  occupiedBeds: facilities.reduce((s, f) => s + f.bedsOccupied, 0),
};

export const doctors: Doctor[] = [
  { id: "doc-1", name: "Dr. Arjun Mehta", facilityId: "fac-1", specialty: "General Medicine", attendance: "present", patientsSeenToday: 28, maxCapacity: 40, activePatients: 45, highRiskPatients: 8, pendingReviews: 12, workloadStatus: "high" },
  { id: "doc-2", name: "Dr. Sneha Reddy", facilityId: "fac-1", specialty: "Pediatrics", attendance: "present", patientsSeenToday: 22, maxCapacity: 35, activePatients: 38, highRiskPatients: 5, pendingReviews: 9, workloadStatus: "normal" },
  { id: "doc-3", name: "Dr. Rajesh Kumar", facilityId: "fac-1", specialty: "General Medicine", attendance: "absent", patientsSeenToday: 0, maxCapacity: 40, activePatients: 32, highRiskPatients: 6, pendingReviews: 15, workloadStatus: "critical" },
  { id: "doc-4", name: "Dr. Priya Sharma", facilityId: "fac-2", specialty: "General Medicine", attendance: "present", patientsSeenToday: 20, maxCapacity: 35, activePatients: 30, highRiskPatients: 4, pendingReviews: 8, workloadStatus: "normal" },
  { id: "doc-5", name: "Dr. Amit Verma", facilityId: "fac-2", specialty: "Surgery", attendance: "present", patientsSeenToday: 12, maxCapacity: 25, activePatients: 22, highRiskPatients: 3, pendingReviews: 5, workloadStatus: "normal" },
  { id: "doc-6", name: "Dr. Sunita Patel", facilityId: "fac-2", specialty: "Pediatrics", attendance: "leave", patientsSeenToday: 0, maxCapacity: 30, activePatients: 28, highRiskPatients: 4, pendingReviews: 10, workloadStatus: "high" },
  { id: "doc-7", name: "Dr. Vijay Nair", facilityId: "fac-2", specialty: "General Medicine", attendance: "present", patientsSeenToday: 18, maxCapacity: 35, activePatients: 25, highRiskPatients: 2, pendingReviews: 6, workloadStatus: "normal" },
  { id: "doc-8", name: "Dr. Kavita Joshi", facilityId: "fac-2", specialty: "Gynecology", attendance: "present", patientsSeenToday: 15, maxCapacity: 30, activePatients: 20, highRiskPatients: 2, pendingReviews: 4, workloadStatus: "normal" },
  { id: "doc-9", name: "Dr. Rohan Desai", facilityId: "fac-3", specialty: "General Medicine", attendance: "present", patientsSeenToday: 24, maxCapacity: 35, activePatients: 35, highRiskPatients: 6, pendingReviews: 11, workloadStatus: "high" },
  { id: "doc-10", name: "Dr. Meera Iyer", facilityId: "fac-3", specialty: "Pediatrics", attendance: "absent", patientsSeenToday: 0, maxCapacity: 30, activePatients: 20, highRiskPatients: 3, pendingReviews: 7, workloadStatus: "critical" },
  { id: "doc-11", name: "Dr. Anil Rao", facilityId: "fac-4", specialty: "General Medicine", attendance: "present", patientsSeenToday: 18, maxCapacity: 35, activePatients: 22, highRiskPatients: 2, pendingReviews: 5, workloadStatus: "normal" },
  { id: "doc-12", name: "Dr. Deepa Menon", facilityId: "fac-4", specialty: "General Medicine", attendance: "present", patientsSeenToday: 14, maxCapacity: 30, activePatients: 18, highRiskPatients: 1, pendingReviews: 3, workloadStatus: "normal" },
  { id: "doc-13", name: "Dr. Suresh Babu", facilityId: "fac-5", specialty: "General Medicine", attendance: "present", patientsSeenToday: 12, maxCapacity: 30, activePatients: 15, highRiskPatients: 1, pendingReviews: 2, workloadStatus: "normal" },
  { id: "doc-14", name: "Dr. Lakshmi Devi", facilityId: "fac-5", specialty: "General Medicine", attendance: "present", patientsSeenToday: 10, maxCapacity: 25, activePatients: 12, highRiskPatients: 0, pendingReviews: 1, workloadStatus: "normal" },
  { id: "doc-15", name: "Dr. Venkat Rao", facilityId: "fac-6", specialty: "General Medicine", attendance: "present", patientsSeenToday: 14, maxCapacity: 30, activePatients: 18, highRiskPatients: 1, pendingReviews: 3, workloadStatus: "normal" },
  { id: "doc-16", name: "Dr. Padma Ch.", facilityId: "fac-6", specialty: "Pediatrics", attendance: "present", patientsSeenToday: 8, maxCapacity: 25, activePatients: 12, highRiskPatients: 0, pendingReviews: 2, workloadStatus: "normal" },
  { id: "doc-17", name: "Dr. Harish K.", facilityId: "fac-6", specialty: "Gynecology", attendance: "leave", patientsSeenToday: 0, maxCapacity: 25, activePatients: 15, highRiskPatients: 1, pendingReviews: 4, workloadStatus: "high" },
  { id: "doc-18", name: "Dr. Nandini Rao", facilityId: "fac-6", specialty: "General Medicine", attendance: "present", patientsSeenToday: 10, maxCapacity: 30, activePatients: 14, highRiskPatients: 0, pendingReviews: 2, workloadStatus: "normal" },
];

export const nurses: Nurse[] = [
  { id: "nur-1", name: "Sister Mary D.", facilityId: "fac-1", assignedVillages: ["Madhurawada North", "Madhurawada South"], assignedPatients: 38, pendingFollowUps: 14, completedToday: 6, highRiskFollowUps: 5, workloadStatus: "critical" },
  { id: "nur-2", name: "Sister Anita K.", facilityId: "fac-1", assignedVillages: ["Madhurawada East"], assignedPatients: 28, pendingFollowUps: 9, completedToday: 5, highRiskFollowUps: 3, workloadStatus: "high" },
  { id: "nur-3", name: "Sister Rani P.", facilityId: "fac-1", assignedVillages: ["Madhurawada West"], assignedPatients: 25, pendingFollowUps: 7, completedToday: 4, highRiskFollowUps: 2, workloadStatus: "high" },
  { id: "nur-4", name: "Sister Geeta S.", facilityId: "fac-1", assignedVillages: ["Madhurawada Central"], assignedPatients: 22, pendingFollowUps: 5, completedToday: 8, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-5", name: "Sister Lakshmi N.", facilityId: "fac-1", assignedVillages: ["Rushikonda"], assignedPatients: 18, pendingFollowUps: 4, completedToday: 6, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-6", name: "Sister Usha R.", facilityId: "fac-2", assignedVillages: ["Bheemili Town", "Bheemili Rural"], assignedPatients: 35, pendingFollowUps: 12, completedToday: 5, highRiskFollowUps: 4, workloadStatus: "critical" },
  { id: "nur-7", name: "Sister Kamala D.", facilityId: "fac-2", assignedVillages: ["Thagarapuvalasa"], assignedPatients: 28, pendingFollowUps: 8, completedToday: 7, highRiskFollowUps: 2, workloadStatus: "normal" },
  { id: "nur-8", name: "Sister Radha K.", facilityId: "fac-2", assignedVillages: ["Kottavalasa"], assignedPatients: 20, pendingFollowUps: 6, completedToday: 5, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-9", name: "Sister Padmaja R.", facilityId: "fac-2", assignedVillages: ["Gollala", "Vepagunta"], assignedPatients: 32, pendingFollowUps: 10, completedToday: 4, highRiskFollowUps: 3, workloadStatus: "high" },
  { id: "nur-10", name: "Sister Lalitha S.", facilityId: "fac-3", assignedVillages: ["Gajuwaka Town"], assignedPatients: 30, pendingFollowUps: 9, completedToday: 5, highRiskFollowUps: 3, workloadStatus: "high" },
  { id: "nur-11", name: "Sister Savitha R.", facilityId: "fac-3", assignedVillages: ["Gajuwaka Rural", "Duvvada"], assignedPatients: 25, pendingFollowUps: 7, completedToday: 6, highRiskFollowUps: 2, workloadStatus: "normal" },
  { id: "nur-12", name: "Sister Vasantha K.", facilityId: "fac-3", assignedVillages: ["Kurmannapalem"], assignedPatients: 20, pendingFollowUps: 5, completedToday: 5, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-13", name: "Sister Aruna D.", facilityId: "fac-4", assignedVillages: ["Anandapuram", "Pendurthi North"], assignedPatients: 22, pendingFollowUps: 4, completedToday: 7, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-14", name: "Sister Bhanu M.", facilityId: "fac-4", assignedVillages: ["Kodavali", "Paradesipalem"], assignedPatients: 18, pendingFollowUps: 3, completedToday: 6, highRiskFollowUps: 0, workloadStatus: "normal" },
  { id: "nur-15", name: "Sister Ratna S.", facilityId: "fac-5", assignedVillages: ["Pendurthi"], assignedPatients: 15, pendingFollowUps: 2, completedToday: 8, highRiskFollowUps: 0, workloadStatus: "normal" },
  { id: "nur-16", name: "Sister Rohini T.", facilityId: "fac-5", assignedVillages: ["Kothavalasa", "Sabbavaram"], assignedPatients: 12, pendingFollowUps: 2, completedToday: 5, highRiskFollowUps: 0, workloadStatus: "normal" },
  { id: "nur-17", name: "Sister Jyothi K.", facilityId: "fac-6", assignedVillages: ["Narsipatnam Town", "Narsipatnam Rural"], assignedPatients: 24, pendingFollowUps: 6, completedToday: 7, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-18", name: "Sister Madhavi R.", facilityId: "fac-6", assignedVillages: ["Kotavur", "Chepulapalle"], assignedPatients: 18, pendingFollowUps: 4, completedToday: 6, highRiskFollowUps: 1, workloadStatus: "normal" },
  { id: "nur-19", name: "Sister Sita L.", facilityId: "fac-6", assignedVillages: ["Madugula"], assignedPatients: 14, pendingFollowUps: 3, completedToday: 5, highRiskFollowUps: 0, workloadStatus: "normal" },
  { id: "nur-20", name: "Sister Nirmala G.", facilityId: "fac-6", assignedVillages: ["Paderu", "Gudem"], assignedPatients: 20, pendingFollowUps: 5, completedToday: 4, highRiskFollowUps: 1, workloadStatus: "normal" },
];

export const medicines: Medicine[] = [
  { id: "med-1", name: "Paracetamol", facilityId: "fac-1", currentStock: 450, avgDailyUsage: 205, daysLeft: 2.2, reorderLevel: 1000, risk: "critical", suggestedAction: "Urgent restock from district reserve" },
  { id: "med-2", name: "ORS", facilityId: "fac-1", currentStock: 180, avgDailyUsage: 60, daysLeft: 3, reorderLevel: 500, risk: "high", suggestedAction: "Order 500 packets immediately" },
  { id: "med-3", name: "Amoxicillin", facilityId: "fac-1", currentStock: 120, avgDailyUsage: 25, daysLeft: 4.8, reorderLevel: 300, risk: "high", suggestedAction: "Restock 200 units" },
  { id: "med-4", name: "Iron Tablets", facilityId: "fac-1", currentStock: 800, avgDailyUsage: 40, daysLeft: 20, reorderLevel: 500, risk: "low", suggestedAction: "Monitor monthly" },
  { id: "med-5", name: "Insulin", facilityId: "fac-1", currentStock: 15, avgDailyUsage: 3, daysLeft: 5, reorderLevel: 30, risk: "medium", suggestedAction: "Order 20 vials" },
  { id: "med-6", name: "Antihypertensives", facilityId: "fac-1", currentStock: 320, avgDailyUsage: 15, daysLeft: 21.3, reorderLevel: 200, risk: "low", suggestedAction: "Routine restock" },
  { id: "med-7", name: "Paracetamol", facilityId: "fac-2", currentStock: 1200, avgDailyUsage: 150, daysLeft: 8, reorderLevel: 1000, risk: "medium", suggestedAction: "Order 500 units" },
  { id: "med-8", name: "ORS", facilityId: "fac-2", currentStock: 400, avgDailyUsage: 50, daysLeft: 8, reorderLevel: 500, risk: "medium", suggestedAction: "Order 200 packets" },
  { id: "med-9", name: "Amoxicillin", facilityId: "fac-2", currentStock: 250, avgDailyUsage: 30, daysLeft: 8.3, reorderLevel: 300, risk: "low", suggestedAction: "Routine restock" },
  { id: "med-10", name: "Iron Tablets", facilityId: "fac-2", currentStock: 1500, avgDailyUsage: 50, daysLeft: 30, reorderLevel: 500, risk: "low", suggestedAction: "Monitor monthly" },
  { id: "med-11", name: "Paracetamol", facilityId: "fac-3", currentStock: 300, avgDailyUsage: 100, daysLeft: 3, reorderLevel: 500, risk: "high", suggestedAction: "Restock 500 units urgently" },
  { id: "med-12", name: "ORS", facilityId: "fac-3", currentStock: 150, avgDailyUsage: 40, daysLeft: 3.75, reorderLevel: 300, risk: "high", suggestedAction: "Order 300 packets" },
  { id: "med-13", name: "Amoxicillin", facilityId: "fac-4", currentStock: 400, avgDailyUsage: 20, daysLeft: 20, reorderLevel: 200, risk: "low", suggestedAction: "No action needed" },
  { id: "med-14", name: "Paracetamol", facilityId: "fac-4", currentStock: 800, avgDailyUsage: 50, daysLeft: 16, reorderLevel: 500, risk: "low", suggestedAction: "Monitor" },
  { id: "med-15", name: "ORS", facilityId: "fac-5", currentStock: 600, avgDailyUsage: 25, daysLeft: 24, reorderLevel: 300, risk: "low", suggestedAction: "No action needed" },
  { id: "med-16", name: "Amoxicillin", facilityId: "fac-5", currentStock: 300, avgDailyUsage: 15, daysLeft: 20, reorderLevel: 200, risk: "low", suggestedAction: "No action needed" },
  { id: "med-17", name: "Paracetamol", facilityId: "fac-6", currentStock: 2000, avgDailyUsage: 80, daysLeft: 25, reorderLevel: 1000, risk: "low", suggestedAction: "No action needed" },
  { id: "med-18", name: "ORS", facilityId: "fac-6", currentStock: 700, avgDailyUsage: 30, daysLeft: 23.3, reorderLevel: 400, risk: "low", suggestedAction: "Monitor" },
  { id: "med-19", name: "Antihypertensives", facilityId: "fac-2", currentStock: 500, avgDailyUsage: 25, daysLeft: 20, reorderLevel: 300, risk: "low", suggestedAction: "No action needed" },
  { id: "med-20", name: "Insulin", facilityId: "fac-2", currentStock: 25, avgDailyUsage: 4, daysLeft: 6.25, reorderLevel: 30, risk: "medium", suggestedAction: "Order 15 vials" },
];

export const patients: Patient[] = [
  { id: "pat-1", name: "Rama Devi", age: 62, gender: "Female", village: "Madhurawada", facilityId: "fac-1", riskScore: "Critical", condition: "Hypertension + Diabetes", conditions: ["Hypertension", "Diabetes Type 2"], assignedDoctorId: "doc-1", assignedNurseId: "nur-1", followUpStatus: "overdue", lastVisit: "2026-07-01", nextFollowUp: "2026-07-04", phone: "9876543210" },
  { id: "pat-2", name: "Surya Narayana", age: 55, gender: "Male", village: "Madhurawada", facilityId: "fac-1", riskScore: "Critical", condition: "Fever (High Grade)", conditions: ["Fever", "Dehydration"], assignedDoctorId: "doc-1", assignedNurseId: "nur-1", followUpStatus: "pending", lastVisit: "2026-07-03", nextFollowUp: "2026-07-05", phone: "9876543211" },
  { id: "pat-3", name: "Lakshmi Kumari", age: 45, gender: "Female", village: "Madhurawada", facilityId: "fac-1", riskScore: "High", condition: "Anemia", conditions: ["Anemia"], assignedDoctorId: "doc-2", assignedNurseId: "nur-2", followUpStatus: "pending", lastVisit: "2026-07-02", nextFollowUp: "2026-07-06", phone: "9876543212" },
  { id: "pat-4", name: "Venkata Rao", age: 70, gender: "Male", village: "Madhurawada South", facilityId: "fac-1", riskScore: "Critical", condition: "COPD", conditions: ["COPD", "Hypertension"], assignedDoctorId: "doc-1", assignedNurseId: "nur-1", followUpStatus: "overdue", lastVisit: "2026-06-28", nextFollowUp: "2026-07-02", phone: "9876543213" },
  { id: "pat-5", name: "Anitha", age: 28, gender: "Female", village: "Madhurawada East", facilityId: "fac-1", riskScore: "Medium", condition: "Pregnancy", conditions: ["Pregnancy - 2nd Trimester"], assignedDoctorId: "doc-2", assignedNurseId: "nur-2", followUpStatus: "pending", lastVisit: "2026-07-01", nextFollowUp: "2026-07-15", phone: "9876543214" },
  { id: "pat-6", name: "Mohan Das", age: 35, gender: "Male", village: "Madhurawada", facilityId: "fac-1", riskScore: "High", condition: "Typhoid", conditions: ["Typhoid"], assignedDoctorId: "doc-1", assignedNurseId: "nur-3", followUpStatus: "pending", lastVisit: "2026-07-02", nextFollowUp: "2026-07-07", phone: "9876543215" },
  { id: "pat-7", name: "Sarada Devi", age: 58, gender: "Female", village: "Madhurawada West", facilityId: "fac-1", riskScore: "High", condition: "Diabetes", conditions: ["Diabetes Type 2"], assignedDoctorId: "doc-1", assignedNurseId: "nur-3", followUpStatus: "overdue", lastVisit: "2026-06-25", nextFollowUp: "2026-07-01", phone: "9876543216" },
  { id: "pat-8", name: "Ramana Murthy", age: 65, gender: "Male", village: "Madhurawada", facilityId: "fac-1", riskScore: "Critical", condition: "Stroke Recovery", conditions: ["Stroke (Recovery)", "Hypertension"], assignedDoctorId: "doc-1", assignedNurseId: "nur-4", followUpStatus: "pending", lastVisit: "2026-07-03", nextFollowUp: "2026-07-06", phone: "9876543217" },
  { id: "pat-9", name: "Padmavathi", age: 42, gender: "Female", village: "Bheemili", facilityId: "fac-2", riskScore: "High", condition: "Diarrhea", conditions: ["Diarrhea", "Dehydration"], assignedDoctorId: "doc-4", assignedNurseId: "nur-6", followUpStatus: "pending", lastVisit: "2026-07-03", nextFollowUp: "2026-07-05", phone: "9876543218" },
  { id: "pat-10", name: "Koteswara Rao", age: 60, gender: "Male", village: "Bheemili", facilityId: "fac-2", riskScore: "Medium", condition: "Hypertension", conditions: ["Hypertension"], assignedDoctorId: "doc-4", assignedNurseId: "nur-7", followUpStatus: "completed", lastVisit: "2026-06-30", nextFollowUp: "2026-07-28", phone: "9876543219" },
  { id: "pat-11", name: "Nagendra Babu", age: 38, gender: "Male", village: "Gajuwaka", facilityId: "fac-3", riskScore: "High", condition: "Fever", conditions: ["Fever"], assignedDoctorId: "doc-9", assignedNurseId: "nur-10", followUpStatus: "pending", lastVisit: "2026-07-03", nextFollowUp: "2026-07-06", phone: "9876543220" },
  { id: "pat-12", name: "Kameswari", age: 48, gender: "Female", village: "Gajuwaka", facilityId: "fac-3", riskScore: "Medium", condition: "Anemia", conditions: ["Anemia"], assignedDoctorId: "doc-9", assignedNurseId: "nur-11", followUpStatus: "completed", lastVisit: "2026-07-01", nextFollowUp: "2026-08-01", phone: "9876543221" },
  { id: "pat-13", name: "Siva Prasad", age: 52, gender: "Male", village: "Anandapuram", facilityId: "fac-4", riskScore: "Low", condition: "Routine Checkup", conditions: ["General Checkup"], assignedDoctorId: "doc-11", assignedNurseId: "nur-13", followUpStatus: "completed", lastVisit: "2026-07-02", nextFollowUp: "2027-01-02", phone: "9876543222" },
  { id: "pat-14", name: "Mangamma", age: 68, gender: "Female", village: "Anandapuram", facilityId: "fac-4", riskScore: "High", condition: "Diabetes", conditions: ["Diabetes Type 2", "Hypertension"], assignedDoctorId: "doc-12", assignedNurseId: "nur-13", followUpStatus: "pending", lastVisit: "2026-07-01", nextFollowUp: "2026-07-10", phone: "9876543223" },
  { id: "pat-15", name: "Subba Rao", age: 45, gender: "Male", village: "Pendurthi", facilityId: "fac-5", riskScore: "Low", condition: "Respiratory Infection", conditions: ["Respiratory Infection"], assignedDoctorId: "doc-13", assignedNurseId: "nur-15", followUpStatus: "completed", lastVisit: "2026-06-29", nextFollowUp: "2026-07-13", phone: "9876543224" },
  { id: "pat-16", name: "Narayana Murthy", age: 72, gender: "Male", village: "Narsipatnam", facilityId: "fac-6", riskScore: "Medium", condition: "Hypertension", conditions: ["Hypertension"], assignedDoctorId: "doc-15", assignedNurseId: "nur-17", followUpStatus: "completed", lastVisit: "2026-06-28", nextFollowUp: "2026-07-26", phone: "9876543225" },
  { id: "pat-17", name: "Bhavani Devi", age: 30, gender: "Female", village: "Narsipatnam", facilityId: "fac-6", riskScore: "Low", condition: "Pregnancy", conditions: ["Pregnancy - 3rd Trimester"], assignedDoctorId: "doc-16", assignedNurseId: "nur-18", followUpStatus: "pending", lastVisit: "2026-07-02", nextFollowUp: "2026-07-09", phone: "9876543226" },
  { id: "pat-18", name: "Chandrasekhar", age: 50, gender: "Male", village: "Madhurawada", facilityId: "fac-1", riskScore: "High", condition: "Diabetes", conditions: ["Diabetes Type 2"], assignedDoctorId: "doc-1", assignedNurseId: "nur-2", followUpStatus: "pending", lastVisit: "2026-07-03", nextFollowUp: "2026-07-08", phone: "9876543227" },
  { id: "pat-19", name: "Rajya Lakshmi", age: 35, gender: "Female", village: "Bheemili", facilityId: "fac-2", riskScore: "Medium", condition: "Anemia", conditions: ["Anemia"], assignedDoctorId: "doc-5", assignedNurseId: "nur-8", followUpStatus: "pending", lastVisit: "2026-07-02", nextFollowUp: "2026-07-16", phone: "9876543228" },
  { id: "pat-20", name: "Srinivasa Rao", age: 55, gender: "Male", village: "Gajuwaka", facilityId: "fac-3", riskScore: "High", condition: "COPD", conditions: ["COPD"], assignedDoctorId: "doc-9", assignedNurseId: "nur-12", followUpStatus: "overdue", lastVisit: "2026-06-27", nextFollowUp: "2026-07-02", phone: "9876543229" },
];

export const appointments: Appointment[] = [
  { id: "apt-1", patientId: "pat-1", patientName: "Rama Devi", facilityId: "fac-1", doctorName: "Dr. Arjun Mehta", time: "09:00 AM", date: "2026-07-04", status: "confirmed", type: "Follow-up" },
  { id: "apt-2", patientId: "pat-2", patientName: "Surya Narayana", facilityId: "fac-1", doctorName: "Dr. Arjun Mehta", time: "09:30 AM", date: "2026-07-04", status: "confirmed", type: "Follow-up" },
  { id: "apt-3", patientId: "pat-4", patientName: "Venkata Rao", facilityId: "fac-1", doctorName: "Dr. Arjun Mehta", time: "10:00 AM", date: "2026-07-04", status: "confirmed", type: "Emergency Review" },
  { id: "apt-4", patientId: "pat-3", patientName: "Lakshmi Kumari", facilityId: "fac-1", doctorName: "Dr. Sneha Reddy", time: "10:30 AM", date: "2026-07-04", status: "confirmed", type: "Follow-up" },
  { id: "apt-5", patientId: "pat-5", patientName: "Anitha", facilityId: "fac-1", doctorName: "Dr. Sneha Reddy", time: "11:00 AM", date: "2026-07-04", status: "confirmed", type: "Antenatal Checkup" },
  { id: "apt-6", patientId: "pat-6", patientName: "Mohan Das", facilityId: "fac-1", doctorName: "Dr. Arjun Mehta", time: "02:00 PM", date: "2026-07-04", status: "pending", type: "Follow-up" },
  { id: "apt-7", patientId: "pat-8", patientName: "Ramana Murthy", facilityId: "fac-1", doctorName: "Dr. Arjun Mehta", time: "03:00 PM", date: "2026-07-04", status: "confirmed", type: "Post-stroke Review" },
  { id: "apt-8", patientId: "pat-9", patientName: "Padmavathi", facilityId: "fac-2", doctorName: "Dr. Priya Sharma", time: "09:00 AM", date: "2026-07-04", status: "confirmed", type: "Follow-up" },
  { id: "apt-9", patientId: "pat-11", patientName: "Nagendra Babu", facilityId: "fac-3", doctorName: "Dr. Rohan Desai", time: "10:00 AM", date: "2026-07-04", status: "confirmed", type: "Follow-up" },
  { id: "apt-10", patientId: "pat-14", patientName: "Mangamma", facilityId: "fac-4", doctorName: "Dr. Deepa Menon", time: "11:00 AM", date: "2026-07-04", status: "pending", type: "Diabetes Review" },
];

export const aiInsights: AIInsight[] = [
  { id: "ai-1", facilityId: "fac-1", type: "Facility Risk", severity: "critical", summary: "PHC Madhurawada is critically overloaded with 184 OPD today (75% above 7-day average of 105). Doctor shortage and medicine stock depletion are compounding risks.", recommendation: "Immediate action: Transfer 1 doctor from CHC Bheemili, urgent restock of Paracetamol and ORS, deploy 1 additional nurse from district pool.", createdAt: "2026-07-04T06:30:00Z", status: "open" },
  { id: "ai-2", facilityId: "fac-1", type: "Medicine Stock-out", severity: "critical", summary: "Paracetamol stock will last 2.2 days at current consumption. ORS will last 3 days. Fever cases are up 104% week-over-week.", recommendation: "Transfer 500 paracetamol and 300 ORS packets from CHC Narsipatnam surplus stock.", createdAt: "2026-07-04T06:30:00Z", status: "open" },
  { id: "ai-3", facilityId: "fac-1", type: "Doctor Absence", severity: "high", summary: "Dr. Rajesh Kumar (General Medicine) is absent today. His 32 active patients need reassignment.", recommendation: "Redistribute 12 pending reviews to Dr. Arjun Mehta. High-risk patients to be seen first.", createdAt: "2026-07-04T07:00:00Z", status: "open" },
  { id: "ai-4", facilityId: "fac-1", type: "Nurse Overload", severity: "high", summary: "Sr. Mary D. has 38 assigned patients with 14 pending follow-ups — highest workload at PHC Madhurawada.", recommendation: "Transfer 8 low-risk follow-ups to Sr. Geeta S. who has the lightest load (5 pending).", createdAt: "2026-07-04T07:00:00Z", status: "open" },
  { id: "ai-5", facilityId: "fac-1", type: "Patient Follow-up", severity: "high", summary: "8 high-risk patients are overdue for follow-up. 3 patients have not been visited in over 10 days.", recommendation: "Nurse Mary D. to prioritize home visits to Venkata Rao (COPD) and Rama Devi (Hypertension+Diabetes) today.", createdAt: "2026-07-04T07:30:00Z", status: "open" },
  { id: "ai-6", facilityId: "fac-1", type: "Disease Spike", severity: "critical", summary: "Fever cases at PHC Madhurawada jumped from 41 last week to 84 this week (104% increase). Paracetamol and ORS demand is surging.", recommendation: "Open 2 additional fever OPD slots. Activate village health volunteers for fever surveillance in Madhurawada North and South.", createdAt: "2026-07-04T06:00:00Z", status: "open" },
  { id: "ai-7", facilityId: "fac-2", type: "Disease Spike", severity: "high", summary: "Diarrhea cases in Bheemili increased from 22 to 38 week-over-week (+73%). Linked to ORS consumption spike.", recommendation: "Pre-position ORS stock in Bheemili. Deploy nurse team for village-level ORS distribution.", createdAt: "2026-07-04T06:00:00Z", status: "open" },
  { id: "ai-8", facilityId: "fac-3", type: "Doctor Absence", severity: "critical", summary: "Dr. Meera Iyer (Pediatrics) absent at PHC Gajuwaka. Zero pediatric coverage today.", recommendation: "Refer pediatric emergencies to CHC Bheemili. Dr. Rohan Desai to handle routine cases.", createdAt: "2026-07-04T07:00:00Z", status: "open" },
  { id: "ai-9", facilityId: "fac-1", type: "District Brief", severity: "high", summary: "District Visakhapatnam: 2 critical facilities, 2 high-risk facilities. Total 19 open alerts. Bed occupancy at 65% district-wide.", recommendation: "Weekly district review: Focus on PHC Madhurawada and CHC Bheemili resource allocation.", createdAt: "2026-07-04T08:00:00Z", status: "open" },
  { id: "ai-10", facilityId: "fac-2", type: "Nurse Overload", severity: "medium", summary: "Sr. Usha R. workload at CHC Bheemili is high with 35 assigned patients and 12 pending follow-ups.", recommendation: "Redistribute 4 follow-ups from Sr. Usha to Sr. Radha K. who has 6 pending only.", createdAt: "2026-07-04T07:30:00Z", status: "open" },
];

export const healthTrends: HealthTrend[] = [
  { month: "Jan", fever: 120, respiratory: 80, hypertension: 200, diabetes: 180, diarrhea: 90 },
  { month: "Feb", fever: 110, respiratory: 90, hypertension: 195, diabetes: 185, diarrhea: 85 },
  { month: "Mar", fever: 140, respiratory: 100, hypertension: 205, diabetes: 190, diarrhea: 95 },
  { month: "Apr", fever: 160, respiratory: 85, hypertension: 210, diabetes: 195, diarrhea: 110 },
  { month: "May", fever: 180, respiratory: 70, hypertension: 215, diabetes: 200, diarrhea: 130 },
  { month: "Jun", fever: 220, respiratory: 95, hypertension: 220, diabetes: 205, diarrhea: 150 },
  { month: "Jul", fever: 200, respiratory: 110, hypertension: 225, diabetes: 210, diarrhea: 140 },
];

export const diseaseSpikes: DiseaseSpike[] = [
  { condition: "Fever", thisWeek: 84, lastWeek: 41, increase: 104, risk: "critical", linkedMedicine: "Paracetamol, ORS", facilityId: "fac-1" },
  { condition: "Diarrhea", thisWeek: 38, lastWeek: 22, increase: 73, risk: "high", linkedMedicine: "ORS", facilityId: "fac-2" },
  { condition: "Fever", thisWeek: 45, lastWeek: 28, increase: 61, risk: "high", linkedMedicine: "Paracetamol", facilityId: "fac-3" },
  { condition: "Respiratory", thisWeek: 25, lastWeek: 18, increase: 39, risk: "medium", linkedMedicine: "Amoxicillin", facilityId: "fac-1" },
  { condition: "Hypertension", thisWeek: 56, lastWeek: 48, increase: 17, risk: "low", linkedMedicine: "Antihypertensives", facilityId: "fac-1" },
];

export const villageConditions: VillageCondition[] = [
  { village: "Madhurawada North", condition: "Fever", count: 28, facilityId: "fac-1" },
  { village: "Madhurawada South", condition: "Fever", count: 22, facilityId: "fac-1" },
  { village: "Madhurawada East", condition: "Diarrhea", count: 12, facilityId: "fac-1" },
  { village: "Madhurawada West", condition: "Respiratory", count: 15, facilityId: "fac-1" },
  { village: "Bheemili Town", condition: "Diarrhea", count: 20, facilityId: "fac-2" },
  { village: "Bheemili Rural", condition: "Fever", count: 18, facilityId: "fac-2" },
  { village: "Gajuwaka Town", condition: "Fever", count: 25, facilityId: "fac-3" },
  { village: "Gajuwaka Rural", condition: "Respiratory", count: 10, facilityId: "fac-3" },
];

export const getFacilityPatients = (facilityId: string) => patients.filter((p) => p.facilityId === facilityId);
export const getFacilityDoctors = (facilityId: string) => doctors.filter((d) => d.facilityId === facilityId);
export const getFacilityNurses = (facilityId: string) => nurses.filter((n) => n.facilityId === facilityId);
export const getFacilityMedicines = (facilityId: string) => medicines.filter((m) => m.facilityId === facilityId);
export const getFacilityAppointments = (facilityId: string) => appointments.filter((a) => a.facilityId === facilityId);
export const getFacilityInsights = (facilityId: string) => aiInsights.filter((i) => i.facilityId === facilityId);
export const getFacilityName = (facilityId: string) => facilities.find((f) => f.id === facilityId)?.name ?? "Unknown";
export const getDoctorName = (doctorId: string) => doctors.find((d) => d.id === doctorId)?.name ?? "Unknown";
export const getNurseName = (nurseId: string) => nurses.find((n) => n.id === nurseId)?.name ?? "Unknown";
