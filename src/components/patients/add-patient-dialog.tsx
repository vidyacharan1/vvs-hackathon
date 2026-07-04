"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, X, Loader2, Users, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

const patientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(0, "Invalid age").max(150, "Invalid age"),
  gender: z.enum(["male", "female", "other"]),
  village: z.string().min(2, "Village is required"),
  district: z.string().min(2, "District is required"),
  phone: z.string().min(10, "Valid phone required").max(15),
  bloodGroup: z.string().optional(),
})

type PatientFormData = z.infer<typeof patientSchema>

interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddPatientDialog({ open, onOpenChange, onSuccess }: AddPatientDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: {
      name: "", age: 0, gender: "male", village: "", district: "", phone: "", bloodGroup: "",
    },
  })

  useEffect(() => {
    if (open) {
      reset()
      setError("")
    }
  }, [open, reset])

  const onSubmit = async (raw: Record<string, any>) => {
    const parsed = patientSchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues.map((e: any) => e.message).join(", "))
      return
    }
    const data = parsed.data
    setSubmitting(true)
    setError("")

    try {
      const id = `pat-${Date.now()}`
      const { error: insertError } = await supabase.from("patients").insert({
        id,
        name: data.name,
        age: data.age,
        gender: data.gender,
        village: data.village,
        district: data.district,
        phone: data.phone,
        blood_group: data.bloodGroup || null,
        conditions: [],
        risk: "low",
        status: "active",
        vitals: [],
        visits: [],
        medicines: [],
        timeline: [
          {
            date: new Date().toISOString().split("T")[0],
            type: "note",
            description: "Patient registered",
          },
        ],
        tasks: [],
      })

      if (insertError) throw insertError

      toast({
        title: "Patient added",
        description: `${data.name} has been registered successfully.`,
      })
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to add patient")
      toast({ title: "Error", description: err.message || "Failed to add patient", variant: "destructive" })
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-cyan-500/10 shadow-sm ring-1 ring-blue-500/20">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Add Patient</h2>
                        <p className="text-xs text-muted-foreground">Register a new patient</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onOpenChange(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="e.g. Rajesh Kumar" {...register("name")} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" min={0} max={150} {...register("age")} />
                        {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select defaultValue="male" onValueChange={(v) => setValue("gender", v as any)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="e.g. 9876543210" {...register("phone")} />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="village">Village / Town</Label>
                        <Input id="village" placeholder="e.g. Sarjapur" {...register("village")} />
                        {errors.village && <p className="text-xs text-red-500">{errors.village.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input id="district" placeholder="e.g. Bengaluru Urban" {...register("district")} />
                        {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group (optional)</Label>
                      <Select onValueChange={(v) => setValue("bloodGroup", v)}>
                        <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        {submitting ? "Adding..." : "Add Patient"}
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
