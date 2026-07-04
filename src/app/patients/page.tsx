"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { usePatients } from "@/hooks/use-patients"
import { PageHeader } from "@/components/layout/page-header"
import { PatientTable } from "@/components/patients/patient-table"
import { AddPatientDialog } from "@/components/patients/add-patient-dialog"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Users, Download, Filter, Plus } from "lucide-react"
import { useStore } from "@/store/use-store"

export default function PatientsPage() {
  const { data: patients, loading } = usePatients()
  const role = useStore((s) => s.role)
  const [addOpen, setAddOpen] = useState(false)

  if (loading) return <LoadingSkeleton type="table" />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient CRM"
        description={`${patients?.length || 0} patients under your care`}
        icon={Users}
      >
        <div className="flex items-center gap-2">
          {role === "district_officer" && (
            <Button variant="default" size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PatientTable data={patients || []} />
      </motion.div>

      <AddPatientDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={() => window.location.reload()} />
    </div>
  )
}
