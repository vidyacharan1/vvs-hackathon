"use client";

import { useParams } from "next/navigation";
import { Phone, MapPin, Calendar, Sparkles, Clock, Pill, Stethoscope, Users } from "lucide-react";
import { patients, getFacilityName, getDoctorName, getNurseName } from "@/lib/demo-data";

export default function PatientProfilePage() {
  const params = useParams();
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) return <div className="p-8 text-center text-outline">Patient not found</div>;

  return (
    <div className="animate-fadeIn">
      <section className="pt-12 pb-8 hero-mesh border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <span className="text-primary font-label-sm uppercase tracking-widest block mb-2 font-semibold">PATIENT PROFILE</span>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mt-2">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed flex items-center justify-center text-2xl font-bold text-primary shadow-sm">{patient.name.split(" ").map(s => s[0]).join("").slice(0, 2)}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">{patient.name}</h1>
                  <span className={`pill pill-${patient.riskScore.toLowerCase()}`}>{patient.riskScore}</span>
                </div>
                <p className="text-body-lg text-on-surface-variant mt-1">{patient.age} years · {patient.gender} · {patient.village}</p>
              </div>
            </div>
            <button className="gradient-button text-white px-6 py-3 rounded-lg font-label-md font-semibold flex items-center gap-2 active:scale-90 transition-transform shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4" /> Summarize Patient Journey
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Phone", value: patient.phone, icon: Phone },
              { label: "Facility", value: getFacilityName(patient.facilityId), icon: MapPin },
              { label: "Last Visit", value: patient.lastVisit, icon: Calendar },
              { label: "Next Follow-up", value: patient.nextFollowUp, icon: Clock },
              { label: "Assigned Doctor", value: getDoctorName(patient.assignedDoctorId), icon: Stethoscope },
              { label: "Assigned Nurse", value: getNurseName(patient.assignedNurseId), icon: Users },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 rounded-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0"><s.icon className="w-6 h-6" /></div>
                <div><p className="text-primary font-label-sm uppercase tracking-widest">{s.label}</p><p className="font-label-md font-semibold">{s.value}</p></div>
              </div>
            ))}
          </div>

          <div>
            <span className="text-primary font-label-sm uppercase tracking-widest block mb-3">CONDITIONS</span>
            <h2 className="text-3xl font-bold text-on-surface mb-6">Conditions</h2>
            <div className="flex flex-wrap gap-2">
              {patient.conditions.map((c, i) => (
                <span key={i} className="inline-flex px-4 py-2 rounded-xl bg-primary-fixed text-primary text-label-xs font-medium">{c}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/10">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Visit Timeline</h2>
            </div>
            <div className="space-y-4">
              {[
                { date: patient.lastVisit, doctor: getDoctorName(patient.assignedDoctorId), summary: "Routine checkup. Vitals stable. Prescribed medications for ongoing management.", type: "Follow-up" },
                { date: "2026-06-15", doctor: getDoctorName(patient.assignedDoctorId), summary: "Initial consultation. Lab work ordered. Blood pressure and sugar levels elevated.", type: "Initial Visit" },
              ].map((visit, i) => (
                <div key={i} className="glass-card p-4 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-sm font-bold text-primary shrink-0">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-label-md font-medium">{visit.type}</p>
                        <span className="text-on-surface-variant font-label-md">{visit.date}</span>
                      </div>
                      <p className="text-on-surface-variant font-label-md mt-0.5">{visit.doctor}</p>
                      <p className="text-body-md mt-1.5">{visit.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-outline-variant/10">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <Pill className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Prescriptions</h2>
            </div>
            <div className="space-y-2">
              {[
                { medicine: "Paracetamol 650mg", dosage: "1 tablet thrice daily", duration: "5 days", status: "Active" },
                { medicine: "ORS", dosage: "As needed", duration: "3 days", status: "Active" },
                { medicine: "Iron Tablets", dosage: "1 tablet daily", duration: "30 days", status: "Active" },
              ].map((rx, i) => (
                <div key={i} className="glass-card p-3.5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Pill className="w-4 h-4 text-primary shrink-0" />
                    <div><p className="font-label-md font-medium">{rx.medicine}</p><p className="text-label-xs text-outline">{rx.dosage} · {rx.duration}</p></div>
                  </div>
                  <span className="pill pill-present">{rx.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-primary-fixed/20 border border-primary/10">
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-primary/10">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-primary">AI Patient Summary</h2>
            </div>
            <p className="text-body-md text-outline mb-4">Patient is managing {patient.conditions.join(" and ")}. Last visit showed stable vitals. Follow-up is {patient.followUpStatus === "overdue" ? "overdue" : patient.followUpStatus === "pending" ? "pending" : "completed"}. Risk level is {patient.riskScore}.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Last Visit Summary", value: "Vitals stable. Medications refilled. Patient advised to continue current regimen." },
                { label: "Follow-up Status", value: patient.followUpStatus === "overdue" ? "Overdue — immediate action required" : patient.followUpStatus === "pending" ? "Pending — scheduled" : "Completed" },
                { label: "Risk Reason", value: patient.riskScore === "Critical" || patient.riskScore === "High" ? "Multiple conditions, irregular follow-ups" : "Stable condition, regular follow-ups" },
                { label: "Next Recommended Action", value: patient.followUpStatus === "overdue" ? "Schedule home visit within 24 hours" : "Continue routine follow-up as scheduled" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-surface/60"><p className="text-primary font-label-sm uppercase tracking-widest">{s.label}</p><p className="text-label-sm mt-0.5">{s.value}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
