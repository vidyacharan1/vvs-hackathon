"use client";

import { useParams } from "next/navigation";
import { Phone, MapPin, Calendar, Clock, Stethoscope, Users, Sparkles, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { patients, getFacilityName, getDoctorName, getNurseName } from "@/lib/demo-data";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

export default function PatientProfilePage() {
  const params = useParams();
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) return <div className="p-8 text-center text-[#a1a1aa]">Patient not found</div>;

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="p-6 space-y-6 max-w-7xl mx-auto">
      <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f4f4f5] flex items-center justify-center text-xl font-bold text-[#18181b]">{patient.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
              <span className={`badge ${patient.riskScore === "Critical" ? "badge-critical" : patient.riskScore === "High" ? "badge-high" : patient.riskScore === "Medium" ? "badge-medium" : "badge-low"}`}>{patient.riskScore}</span>
            </div>
            <p className="text-sm text-[#a1a1aa]">{patient.age} years &middot; {patient.gender} &middot; {patient.village}</p>
          </div>
        </div>
        <button className="btn-primary"><Sparkles className="w-4 h-4" /> Summarize Patient Journey</button>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Phone", value: patient.phone, icon: Phone },
          { label: "Facility", value: getFacilityName(patient.facilityId), icon: MapPin },
          { label: "Last Visit", value: patient.lastVisit, icon: Calendar },
          { label: "Next Follow-up", value: patient.nextFollowUp, icon: Clock },
          { label: "Assigned Doctor", value: getDoctorName(patient.assignedDoctorId), icon: Stethoscope },
          { label: "Assigned Nurse", value: getNurseName(patient.assignedNurseId), icon: Users },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-[#e4e4e7] flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#f4f4f5] flex items-center justify-center shrink-0"><s.icon className="w-5 h-5 text-[#18181b]" /></div>
            <div><p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest">{s.label}</p><p className="text-sm font-medium">{s.value}</p></div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp}>
        <h2 className="text-xl font-bold tracking-tight mb-4">Conditions</h2>
        <div className="flex flex-wrap gap-2">
          {patient.conditions.map((c, i) => (
            <span key={i} className="rounded-xl bg-[#f4f4f5] text-sm font-medium px-4 py-2">{c}</span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
        <h2 className="text-xl font-bold tracking-tight mb-5 pb-4 border-b border-[#e4e4e7]">Visit Timeline</h2>
        <div className="space-y-4">
          {[
            { date: patient.lastVisit, doctor: getDoctorName(patient.assignedDoctorId), summary: "Routine checkup. Vitals stable. Prescribed medications for ongoing management.", type: "Follow-up" },
            { date: "2026-06-15", doctor: getDoctorName(patient.assignedDoctorId), summary: "Initial consultation. Lab work ordered. Blood pressure and sugar levels elevated.", type: "Initial Visit" },
          ].map((visit, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f4f4f5]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e4e4e7] flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium">{visit.type}</p>
                  <span className="text-xs text-[#a1a1aa]">{visit.date}</span>
                </div>
                <p className="text-xs text-[#a1a1aa] mt-0.5">{visit.doctor}</p>
                <p className="text-sm mt-1.5">{visit.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7]">
        <h2 className="text-xl font-bold tracking-tight mb-5 pb-4 border-b border-[#e4e4e7]">Prescriptions</h2>
        <div className="space-y-2">
          {[
            { medicine: "Paracetamol 650mg", dosage: "1 tablet thrice daily", duration: "5 days", status: "Active" },
            { medicine: "ORS", dosage: "As needed", duration: "3 days", status: "Active" },
            { medicine: "Iron Tablets", dosage: "1 tablet daily", duration: "30 days", status: "Active" },
          ].map((rx, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f4f4f5]">
              <div className="flex items-center gap-3">
                <Pill className="w-4 h-4 text-[#a1a1aa] shrink-0" />
                <div><p className="text-sm font-medium">{rx.medicine}</p><p className="text-xs text-[#a1a1aa]">{rx.dosage} &middot; {rx.duration}</p></div>
              </div>
              <span className="badge badge-present">{rx.status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 border border-[#e4e4e7] border-l-4 border-l-[#6366f1]">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#e4e4e7]">
          <Sparkles className="w-5 h-5 text-[#6366f1]" />
          <h2 className="text-xl font-bold tracking-tight">AI Patient Summary</h2>
        </div>
        <p className="text-sm text-[#52525b] mb-4">Patient is managing {patient.conditions.join(" and ")}. Last visit showed stable vitals. Follow-up is {patient.followUpStatus === "overdue" ? "overdue" : patient.followUpStatus === "pending" ? "pending" : "completed"}. Risk level is {patient.riskScore}.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Last Visit Summary", value: "Vitals stable. Medications refilled. Patient advised to continue current regimen." },
            { label: "Follow-up Status", value: patient.followUpStatus === "overdue" ? "Overdue &mdash; immediate action required" : patient.followUpStatus === "pending" ? "Pending &mdash; scheduled" : "Completed" },
            { label: "Risk Reason", value: patient.riskScore === "Critical" || patient.riskScore === "High" ? "Multiple conditions, irregular follow-ups" : "Stable condition, regular follow-ups" },
            { label: "Next Recommended Action", value: patient.followUpStatus === "overdue" ? "Schedule home visit within 24 hours" : "Continue routine follow-up as scheduled" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-[#f4f4f5] p-3"><p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest">{s.label}</p><p className="text-sm mt-0.5">{s.value}</p></div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
