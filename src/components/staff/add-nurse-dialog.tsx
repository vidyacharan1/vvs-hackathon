"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, X, Loader2, HandHeart, AlertCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

const nurseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid phone required").max(15),
  facilityId: z.string().min(1, "Facility is required"),
})

type NurseFormData = z.infer<typeof nurseSchema>

interface AddNurseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddNurseDialog({ open, onOpenChange, onSuccess }: AddNurseDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [facilities, setFacilities] = useState<{ id: string; name: string }[]>([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NurseFormData>({
    defaultValues: { name: "", email: "", phone: "", facilityId: "" },
  })

  useEffect(() => {
    if (!open) return
    supabase.from("facilities").select("id, name").then(({ data }) => {
      if (data) setFacilities(data)
    })
  }, [open])

  useEffect(() => {
    if (open) { reset(); setError("") }
  }, [open, reset])

  const onSubmit = async (raw: Record<string, any>) => {
    const parsed = nurseSchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues.map((e: any) => e.message).join(", "))
      return
    }
    const data = parsed.data
    setSubmitting(true)
    setError("")

    try {
      const facility = facilities.find((f) => f.id === data.facilityId)
      const id = `nur-${Date.now()}`
      const { error: insertError } = await supabase.from("nurses").insert({
        id,
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        facility_id: data.facilityId,
        facility_name: facility?.name || "",
        assigned_villages: [],
        pending_follow_ups: 0,
        completed_today: 0,
        high_risk_patients: 0,
        total_patients: 0,
        workload: 0,
        present: true,
        rating: 0,
      })

      if (insertError) throw insertError

      toast({
        title: "Nurse added",
        description: `${data.name} has been added successfully.`,
      })
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to add nurse")
      toast({ title: "Error", description: err.message || "Failed to add nurse", variant: "destructive" })
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
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 via-pink-400/10 to-rose-500/10 shadow-sm ring-1 ring-pink-500/20">
                        <HandHeart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Add Nurse</h2>
                        <p className="text-xs text-muted-foreground">Add a new nurse to the system</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onOpenChange(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="e.g. Ananya Reddy" {...register("name")} />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (optional)</Label>
                        <Input id="email" type="email" placeholder="e.g. ananya@hospital.com" {...register("email")} />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="e.g. 9876543210" {...register("phone")} />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Facility</Label>
                      <Select onValueChange={(v) => setValue("facilityId", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select facility..." />
                        </SelectTrigger>
                        <SelectContent>
                          {facilities.map((f) => (
                            <SelectItem key={f.id} value={f.id}>
                              <div className="flex items-center gap-2">
                                <Building2 className="h-3.5 w-3.5" />
                                {f.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.facilityId && <p className="text-xs text-red-500">{errors.facilityId.message}</p>}
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
                      <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
                      <Button type="submit" size="sm" disabled={submitting} className="gap-1.5">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        {submitting ? "Adding..." : "Add Nurse"}
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
