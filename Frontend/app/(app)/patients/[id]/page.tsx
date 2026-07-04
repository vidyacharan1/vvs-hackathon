"use client";

import { useParams } from "next/navigation";
import { Phone, MapPin, Calendar, Sparkles, Clock, Pill, Stethoscope, Users } from "lucide-react";
import { patients, getFacilityName, getDoctorName, getNurseName } from "@/lib/demo-data";

export default function PatientProfilePage() {
  const params = useParams();
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) return <div className="p-8 text-center text-outline">Patient not found</div>;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <p className="text-label-xs text-outline uppercase tracking-widest font-medium">PATIENT PROFILE</p>
        <div className="flex items-start justify-between mt-1">
          <div className="flex items-center gap-4 mt-1">
            <div className="w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center text-lg font-bold text-brand-purple">{patient.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-headline-lg font-bold">{patient.name}</h1>
                <span className={`pill pill-${patient.riskScore.toLowerCase()}`}>{patient.riskScore}</span>
              </div>
              <p className="text-label-sm text-outline">{patient.age} years · {patient.gender} · {patient.village}</p>
            </div>
          </div>
          <button className="gradient-button text-white px-5 py-2.5 rounded-lg text-label-md font-semibold flex items-center gap-2 active:scale-95 transition-transform">
            <Sparkles className="w-4 h-4" /> Summarize Patient Journey
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Phone", value: patient.phone, icon: Phone },
          { label: "Facility", value: getFacilityName(patient.facilityId), icon: MapPin },
          { label: "Last Visit", value: patient.lastVisit, icon: Calendar },
          { label: "Next Follow-up", value: patient.nextFollowUp, icon: Clock },
          { label: "Assigned Doctor", value: getDoctorName(patient.assignedDoctorId), icon: Stethoscope },
          { label: "Assigned Nurse", value: getNurseName(patient.assignedNurseId), icon: Users },
        ].map((s) => (
          <div key={s.label} className="card-glass p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-brand-purple" /></div>
            <div><p className="text-label-xs text-outline">{s.label}</p><p className="text-label-md font-semibold">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-headline-sm font-bold mb-3">Conditions</h2>
        <div className="flex flex-wrap gap-2">
          {patient.conditions.map((c, i) => (
            <span key={i} className="inline-flex px-3 py-1.5 rounded-xl bg-brand-purple/10 text-brand-purple text-label-sm font-medium">{c}</span>
          ))}
        </div>
      </div>

      <div className="card-glass p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-brand-purple" />
          </div>
          <h2 className="text-headline-sm font-bold">Visit Timeline</h2>
        </div>
        <div className="space-y-3">
          {[
            { date: patient.lastVisit, doctor: getDoctorName(patient.assignedDoctorId), summary: "Routine checkup. Vitals stable. Prescribed medications for ongoing management.", type: "Follow-up" },
            { date: "2026-06-15", doctor: getDoctorName(patient.assignedDoctorId), summary: "Initial consultation. Lab work ordered. Blood pressure and sugar levels elevated.", type: "Initial Visit" },
          ].map((visit, i) => (
            <div key={i} className="card-glass p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-xs font-bold text-brand-purple">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><p className="text-label-md font-medium">{visit.type}</p><span className="text-label-xs text-outline">{visit.date}</span></div>
                  <p className="text-label-sm text-outline mt-0.5">{visit.doctor}</p>
                  <p className="text-body-md mt-1">{visit.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-glass p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
            <Pill className="w-5 h-5 text-brand-purple" />
          </div>
          <h2 className="text-headline-sm font-bold">Prescriptions</h2>
        </div>
        <div className="space-y-2">
          {[
            { medicine: "Paracetamol 650mg", dosage: "1 tablet thrice daily", duration: "5 days", status: "Active" },
            { medicine: "ORS", dosage: "As needed", duration: "3 days", status: "Active" },
            { medicine: "Iron Tablets", dosage: "1 tablet daily", duration: "30 days", status: "Active" },
          ].map((rx, i) => (
            <div key={i} className="card-glass rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Pill className="w-4 h-4 text-brand-purple" />
                <div><p className="text-label-md font-medium">{rx.medicine}</p><p className="text-label-xs text-outline">{rx.dosage} · {rx.duration}</p></div>
              </div>
              <span className="px-2 py-0.5 rounded text-label-xs font-medium bg-success/10 text-success">{rx.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-glass p-5 bg-brand-purple/5 border border-brand-purple/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brand-purple" />
          </div>
          <h2 className="text-headline-sm font-bold text-brand-purple">AI Patient Summary</h2>
        </div>
        <p className="text-body-md text-outline mb-3">Patient is managing {patient.conditions.join(" and ")}. Last visit showed stable vitals. Follow-up is {patient.followUpStatus === "overdue" ? "overdue" : patient.followUpStatus === "pending" ? "pending" : "completed"}. Risk level is {patient.riskScore}.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Last Visit Summary", value: "Vitals stable. Medications refilled. Patient advised to continue current regimen." },
            { label: "Follow-up Status", value: patient.followUpStatus === "overdue" ? "Overdue — immediate action required" : patient.followUpStatus === "pending" ? "Pending — scheduled" : "Completed" },
            { label: "Risk Reason", value: patient.riskScore === "Critical" || patient.riskScore === "High" ? "Multiple conditions, irregular follow-ups" : "Stable condition, regular follow-ups" },
            { label: "Next Recommended Action", value: patient.followUpStatus === "overdue" ? "Schedule home visit within 24 hours" : "Continue routine follow-up as scheduled" },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-lg bg-surface/60"><p className="text-label-xs text-outline">{s.label}</p><p className="text-label-sm mt-0.5">{s.value}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}
