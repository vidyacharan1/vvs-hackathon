"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Building2, MapPin, Plus, X, Loader2, CheckCircle2, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { FacilityType } from "@/types"

const facilitySchema = z.object({
  name: z.string().min(3, "Facility name must be at least 3 characters"),
  type: z.enum(["phc", "chc"]),
  district: z.string().min(2, "District is required"),
  taluka: z.string().min(2, "Taluka is required"),
  village: z.string().min(2, "Village is required"),
  totalBeds: z.coerce.number().min(1, "Must have at least 1 bed"),
  doctorsRequired: z.coerce.number().min(1, "Must have at least 1 doctor"),
  nursesRequired: z.coerce.number().min(1, "Must have at least 1 nurse"),
})

type FacilityFormData = z.infer<typeof facilitySchema>

interface CreateFacilityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateFacilityDialog({ open, onOpenChange, onSuccess }: CreateFacilityDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FacilityFormData>({
    defaultValues: {
      name: "",
      type: "phc",
      district: "",
      taluka: "",
      village: "",
      totalBeds: 10,
      doctorsRequired: 2,
      nursesRequired: 4,
    },
  })

  const selectedType = watch("type")

  const onSubmit = async (raw: Record<string, any>) => {
    const parsed = facilitySchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues.map((e: any) => e.message).join(", "))
      return
    }

    const data = parsed.data
    setSubmitting(true)
    setError("")

    try {
      const { error: insertError } = await supabase.from("facilities").insert({
        name: data.name,
        type: data.type,
        district: data.district,
        taluka: data.taluka,
        village: data.village,
        total_beds: data.totalBeds,
        doctors_required: data.doctorsRequired,
        nurses_required: data.nursesRequired,
        doctors_present: 0,
        nurses_present: 0,
        occupied_beds: 0,
        total_patients: 0,
        high_risk_patients: 0,
        medicine_stock: 0,
        medicine_required: 0,
        overall_risk: "low",
        risk_score: 0,
        health_score: 100,
        today_opd: 0,
        week_avg_opd: 0,
        doctor_availability: 0,
        nurse_workload: 0,
        medicine_risk: 0,
        disease_risk: 0,
        bed_occupancy: 0,
        patient_risk: 0,
      })

      if (insertError) throw insertError

      toast({
        title: "Facility created",
        description: `${data.name} has been added successfully.`,
      })
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to create facility")
      toast({
        title: "Error",
        description: err.message || "Failed to create facility",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED]/20 via-[#4648d4]/10 to-[#3B82F6]/10 shadow-sm ring-1 ring-[#7C3AED]/20">
                        <Building2 className="h-5 w-5 text-[#7C3AED] dark:text-[#A78BFA]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Create Facility</h2>
                        <p className="text-xs text-muted-foreground">Add a new healthcare facility</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onOpenChange(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Facility Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="name" placeholder="e.g. Primary Health Center - Sarjapur" className="pl-10" {...register("name")} />
                      </div>
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={selectedType} onValueChange={(v) => setValue("type", v as FacilityType)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phc">PHC (Primary)</SelectItem>
                            <SelectItem value="chc">CHC (Community)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input id="district" placeholder="e.g. Bengaluru Urban" className="pl-10" {...register("district")} />
                        </div>
                        {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taluka">Taluka</Label>
                        <Input id="taluka" placeholder="e.g. Anekal" {...register("taluka")} />
                        {errors.taluka && <p className="text-xs text-red-500">{errors.taluka.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="village">Village / Town</Label>
                        <Input id="village" placeholder="e.g. Sarjapur" {...register("village")} />
                        {errors.village && <p className="text-xs text-red-500">{errors.village.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="totalBeds">Total Beds</Label>
                        <Input id="totalBeds" type="number" min={1} {...register("totalBeds")} />
                        {errors.totalBeds && <p className="text-xs text-red-500">{errors.totalBeds.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctorsRequired">Doctors Required</Label>
                        <Input id="doctorsRequired" type="number" min={1} {...register("doctorsRequired")} />
                        {errors.doctorsRequired && <p className="text-xs text-red-500">{errors.doctorsRequired.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nursesRequired">Nurses Required</Label>
                        <Input id="nursesRequired" type="number" min={1} {...register("nursesRequired")} />
                        {errors.nursesRequired && <p className="text-xs text-red-500">{errors.nursesRequired.message}</p>}
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/20 px-3 py-2 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <div className="flex items-center justify-end gap-3 border-t border-border/50 pt-4">
                      <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" disabled={submitting} className="gap-1.5">
                        {submitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                        {submitting ? "Creating..." : "Create Facility"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
