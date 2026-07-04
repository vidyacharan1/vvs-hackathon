export interface Facility {
  id: string;
  name: string;
  type: "PHC" | "CHC";
  district: string;
  village: string;
  status: "critical" | "high" | "medium" | "low";
  riskScore: number;
  todayOpd: number;
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
  village: string;
  riskScore: "Low" | "Medium" | "High";
  condition: string;
  lastVisit: string;
  avatar: string;
}

export interface AIInsight {
  id: string;
  message: string;
  priority: "high" | "medium" | "low";
  category: string;
  timestamp: string;
}

export interface HealthTrend {
  month: string;
  opVisits: number;
  chronicCases: number;
  followUps: number;
}

export interface CommunityMetric {
  label: string;
  value: number;
  target: number;
  color: string;
  icon: string;
}

export const dashboardSummary: DashboardSummary = {
  totalFacilities: 6,
  healthyFacilities: 2,
  warningFacilities: 3,
  criticalFacilities: 1,
  totalPatients: 1240,
  criticalPatients: 37,
  openAlerts: 22,
  medicineStockIssues: 9,
  doctorAbsenceAlerts: 2,
  nurseOverloadAlerts: 4,
  diseaseSpikeAlerts: 3,
  bedPressureAlerts: 2,
};

export const facilities: Facility[] = [
  {
    id: "1",
    name: "PHC Madhurawada",
    type: "PHC",
    district: "Visakhapatnam",
    village: "Madhurawada",
    status: "critical",
    riskScore: 87,
    todayOpd: 184,
    doctorsPresent: 2,
    totalDoctors: 3,
    nursesPresent: 4,
    totalNurses: 5,
    bedsOccupied: 16,
    totalBeds: 20,
    totalPatients: 320,
    criticalPatients: 14,
    openAlerts: 8,
    medicineStockIssues: 3,
    diseaseSpikeCount: 1,
  },
  {
    id: "2",
    name: "CHC Bheemili",
    type: "CHC",
    district: "Visakhapatnam",
    village: "Bheemili",
    status: "high",
    riskScore: 72,
    todayOpd: 142,
    doctorsPresent: 3,
    totalDoctors: 4,
    nursesPresent: 5,
    totalNurses: 6,
    bedsOccupied: 18,
    totalBeds: 30,
    totalPatients: 280,
    criticalPatients: 8,
    openAlerts: 5,
    medicineStockIssues: 2,
    diseaseSpikeCount: 1,
  },
  {
    id: "3",
    name: "PHC Gajuwaka",
    type: "PHC",
    district: "Visakhapatnam",
    village: "Gajuwaka",
    status: "high",
    riskScore: 65,
    todayOpd: 118,
    doctorsPresent: 1,
    totalDoctors: 2,
    nursesPresent: 3,
    totalNurses: 4,
    bedsOccupied: 10,
    totalBeds: 15,
    totalPatients: 210,
    criticalPatients: 6,
    openAlerts: 4,
    medicineStockIssues: 2,
    diseaseSpikeCount: 1,
  },
  {
    id: "4",
    name: "PHC Anandapuram",
    type: "PHC",
    district: "Visakhapatnam",
    village: "Anandapuram",
    status: "medium",
    riskScore: 45,
    todayOpd: 76,
    doctorsPresent: 2,
    totalDoctors: 2,
    nursesPresent: 3,
    totalNurses: 3,
    bedsOccupied: 5,
    totalBeds: 10,
    totalPatients: 180,
    criticalPatients: 4,
    openAlerts: 3,
    medicineStockIssues: 1,
    diseaseSpikeCount: 0,
  },
  {
    id: "5",
    name: "PHC Pendurthi",
    type: "PHC",
    district: "Visakhapatnam",
    village: "Pendurthi",
    status: "low",
    riskScore: 22,
    todayOpd: 52,
    doctorsPresent: 2,
    totalDoctors: 2,
    nursesPresent: 2,
    totalNurses: 2,
    bedsOccupied: 3,
    totalBeds: 10,
    totalPatients: 130,
    criticalPatients: 2,
    openAlerts: 1,
    medicineStockIssues: 0,
    diseaseSpikeCount: 0,
  },
  {
    id: "6",
    name: "CHC Narsipatnam",
    type: "CHC",
    district: "Visakhapatnam",
    village: "Narsipatnam",
    status: "low",
    riskScore: 18,
    todayOpd: 48,
    doctorsPresent: 3,
    totalDoctors: 3,
    nursesPresent: 4,
    totalNurses: 4,
    bedsOccupied: 4,
    totalBeds: 20,
    totalPatients: 120,
    criticalPatients: 3,
    openAlerts: 1,
    medicineStockIssues: 1,
    diseaseSpikeCount: 0,
  },
];

export const healthTrends: HealthTrend[] = [
  { month: "Jan", opVisits: 2840, chronicCases: 420, followUps: 1120 },
  { month: "Feb", opVisits: 3020, chronicCases: 445, followUps: 1180 },
  { month: "Mar", opVisits: 3180, chronicCases: 470, followUps: 1240 },
  { month: "Apr", opVisits: 2950, chronicCases: 458, followUps: 1190 },
  { month: "May", opVisits: 3410, chronicCases: 492, followUps: 1310 },
  { month: "Jun", opVisits: 3650, chronicCases: 518, followUps: 1420 },
  { month: "Jul", opVisits: 3890, chronicCases: 542, followUps: 1510 },
  { month: "Aug", opVisits: 3720, chronicCases: 530, followUps: 1480 },
  { month: "Sep", opVisits: 4050, chronicCases: 565, followUps: 1580 },
  { month: "Oct", opVisits: 4280, chronicCases: 590, followUps: 1650 },
  { month: "Nov", opVisits: 4450, chronicCases: 612, followUps: 1720 },
  { month: "Dec", opVisits: 4680, chronicCases: 640, followUps: 1810 },
];

export const appointments: Appointment[] = [
  {
    id: "A001",
    patientName: "Ananya Sharma",
    patientAvatar: "AS",
    doctorName: "Dr. Priya Patel",
    doctorSpecialty: "General Medicine",
    time: "09:00 AM",
    date: "Today",
    status: "confirmed",
    type: "Regular Checkup",
  },
  {
    id: "A002",
    patientName: "Rajesh Kumar",
    patientAvatar: "RK",
    doctorName: "Dr. Amit Singh",
    doctorSpecialty: "Cardiology",
    time: "09:30 AM",
    date: "Today",
    status: "pending",
    type: "Follow-up",
  },
  {
    id: "A003",
    patientName: "Meena Devi",
    patientAvatar: "MD",
    doctorName: "Dr. Sunita Rao",
    doctorSpecialty: "Gynecology",
    time: "10:00 AM",
    date: "Today",
    status: "confirmed",
    type: "Antenatal Care",
  },
  {
    id: "A004",
    patientName: "Vikram Reddy",
    patientAvatar: "VR",
    doctorName: "Dr. Rajesh Gupta",
    doctorSpecialty: "Orthopedics",
    time: "10:30 AM",
    date: "Today",
    status: "completed",
    type: "Consultation",
  },
  {
    id: "A005",
    patientName: "Lakshmi Narayan",
    patientAvatar: "LN",
    doctorName: "Dr. Priya Patel",
    doctorSpecialty: "General Medicine",
    time: "11:00 AM",
    date: "Today",
    status: "confirmed",
    type: "Diabetes Management",
  },
  {
    id: "A006",
    patientName: "Suresh Babu",
    patientAvatar: "SB",
    doctorName: "Dr. Amit Singh",
    doctorSpecialty: "Cardiology",
    time: "11:30 AM",
    date: "Today",
    status: "pending",
    type: "BP Checkup",
  },
];

export const recentPatients: Patient[] = [
  {
    id: "P001",
    name: "Mariyamma Devi",
    age: 62,
    gender: "Female",
    village: "Madhurawada",
    riskScore: "High",
    condition: "Diabetes Type 2",
    lastVisit: "2 days ago",
    avatar: "MD",
  },
  {
    id: "P002",
    name: "Venkata Ramana",
    age: 45,
    gender: "Male",
    village: "Bheemili",
    riskScore: "Medium",
    condition: "Hypertension",
    lastVisit: "5 days ago",
    avatar: "VR",
  },
  {
    id: "P003",
    name: "Saraswati Bai",
    age: 28,
    gender: "Female",
    village: "Gajuwaka",
    riskScore: "Low",
    condition: "Antenatal",
    lastVisit: "1 week ago",
    avatar: "SB",
  },
  {
    id: "P004",
    name: "Narayana Rao",
    age: 58,
    gender: "Male",
    village: "Anandapuram",
    riskScore: "High",
    condition: "Heart Disease",
    lastVisit: "3 days ago",
    avatar: "NR",
  },
  {
    id: "P005",
    name: "Padmavathi Amma",
    age: 70,
    gender: "Female",
    village: "Pendurthi",
    riskScore: "Medium",
    condition: "Arthritis",
    lastVisit: "4 days ago",
    avatar: "PA",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: "I001",
    message: "Diabetes cases increased 12% this week in PHC Madhurawada",
    priority: "high",
    category: "Disease Surveillance",
    timestamp: "2 hours ago",
  },
  {
    id: "I002",
    message: "28 patients missed follow-up appointments in the last 72 hours",
    priority: "high",
    category: "Patient Adherence",
    timestamp: "3 hours ago",
  },
  {
    id: "I003",
    message: "Vaccination coverage in Village B is below target at 68%",
    priority: "medium",
    category: "Immunization",
    timestamp: "5 hours ago",
  },
  {
    id: "I004",
    message: "High anemia risk detected in 34 pregnant women across 3 villages",
    priority: "medium",
    category: "Maternal Health",
    timestamp: "6 hours ago",
  },
  {
    id: "I005",
    message: "Dengue alert: 4 new suspected cases reported near Pendurthi",
    priority: "high",
    category: "Outbreak Alert",
    timestamp: "1 hour ago",
  },
  {
    id: "I006",
    message: "Medicine stock for insulin running low at CHC Bheemili",
    priority: "low",
    category: "Inventory",
    timestamp: "8 hours ago",
  },
];

export const communityMetrics: CommunityMetric[] = [
  {
    label: "Maternal Care",
    value: 82,
    target: 100,
    color: "#0ea5e9",
    icon: "heart",
  },
  {
    label: "Child Immunization",
    value: 91,
    target: 100,
    color: "#14b8a6",
    icon: "shield",
  },
  {
    label: "Chronic Disease Monitoring",
    value: 74,
    target: 100,
    color: "#8b5cf6",
    icon: "activity",
  },
];

export const greetingMessage = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};
