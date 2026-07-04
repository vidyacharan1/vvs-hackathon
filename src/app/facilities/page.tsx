"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useFacilities } from "@/hooks/use-facilities"
import { useStore } from "@/store/use-store"
import { PageHeader } from "@/components/layout/page-header"
import { FacilityTable } from "@/components/facilities/facility-table"
import { CreateFacilityDialog } from "@/components/facilities/create-facility-dialog"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Building2, Plus } from "lucide-react"

export default function FacilitiesPage() {
  const { data: facilities, loading } = useFacilities()
  const role = useStore((s) => s.role)
  const [showCreate, setShowCreate] = useState(false)

  if (loading) return <LoadingSkeleton type="table" />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facilities"
        description="Manage all Primary and Community Health Centers"
        icon={Building2}
      >
        {role === "district_officer" && (
          <Button size="sm" className="gap-1.5" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" />
            Create Facility
          </Button>
        )}
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <FacilityTable data={facilities || []} />
      </motion.div>

      <CreateFacilityDialog
        open={showCreate}
        onOpenChange={setShowCreate}
      />
    </div>
  )
}
