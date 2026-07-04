"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, X, Loader2, Package, Pill, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import type { Medicine } from "@/types"

const stockSchema = z.object({
  medicineId: z.string().min(1, "Please select a medicine"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
})

type StockFormData = z.infer<typeof stockSchema>

interface AddStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  preselectedMedicineId?: string
}

export function AddStockDialog({ open, onOpenChange, onSuccess, preselectedMedicineId }: AddStockDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StockFormData>({
    defaultValues: {
      medicineId: preselectedMedicineId || "",
      quantity: 0,
    },
  })

  const watchedMedicineId = watch("medicineId")

  useEffect(() => {
    if (!open) return
    supabase.from("medicines").select("*").then(({ data, error }) => {
      if (!error && data) {
        const mapped = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          currentStock: r.current_stock,
          averageUsage: r.average_usage,
          daysLeft: r.days_left,
          reorderLevel: r.reorder_level,
          risk: r.risk,
          unit: r.unit,
          facilityId: r.facility_id,
          facilityName: r.facility_name,
          expiryDate: r.expiry_date,
          manufacturer: r.manufacturer,
        }))
        setMedicines(mapped)
      }
    })
  }, [open])

  useEffect(() => {
    if (preselectedMedicineId) {
      setValue("medicineId", preselectedMedicineId)
    }
  }, [preselectedMedicineId, setValue])

  useEffect(() => {
    const med = medicines.find((m) => m.id === watchedMedicineId)
    setSelectedMedicine(med || null)
  }, [watchedMedicineId, medicines])

  useEffect(() => {
    reset({
      medicineId: preselectedMedicineId || "",
      quantity: 0,
    })
    setSelectedMedicine(null)
    setError("")
  }, [open, preselectedMedicineId, reset])

  const onSubmit = async (raw: Record<string, any>) => {
    const parsed = stockSchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues.map((e: any) => e.message).join(", "))
      return
    }

    const data = parsed.data
    setSubmitting(true)
    setError("")

    try {
      const existing = medicines.find((m) => m.id === data.medicineId)
      if (!existing) throw new Error("Medicine not found")

      const newStock = existing.currentStock + data.quantity
      const daysLeft = existing.averageUsage > 0 ? Math.floor(newStock / existing.averageUsage) : 999
      const risk = daysLeft <= 7 ? "critical" : daysLeft <= 15 ? "high" : daysLeft <= 30 ? "medium" : "low"

      const { error: updateError } = await supabase
        .from("medicines")
        .update({
          current_stock: newStock,
          days_left: daysLeft,
          risk,
        })
        .eq("id", data.medicineId)

      if (updateError) throw updateError

      toast({
        title: "Stock added",
        description: `Added ${data.quantity} units to ${existing.name}. New stock: ${newStock}`,
      })
      reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to add stock")
      toast({
        title: "Error",
        description: err.message || "Failed to add stock",
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
              className="relative w-full max-w-md"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-teal-500/10 shadow-sm ring-1 ring-emerald-500/20">
                        <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Add Stock</h2>
                        <p className="text-xs text-muted-foreground">Restock medicine inventory</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onOpenChange(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    <div className="space-y-2">
                      <Label>Medicine</Label>
                      <Select
                        value={watchedMedicineId}
                        onValueChange={(v) => setValue("medicineId", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a medicine..." />
                        </SelectTrigger>
                        <SelectContent>
                          {medicines.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name} ({m.facilityName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.medicineId && <p className="text-xs text-red-500">{errors.medicineId.message}</p>}
                    </div>

                    {selectedMedicine && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="rounded-xl bg-muted/50 p-3 space-y-1"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Current stock</span>
                          <span className="font-medium">{selectedMedicine.currentStock} {selectedMedicine.unit}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Reorder level</span>
                          <span className="font-medium">{selectedMedicine.reorderLevel}</span>
                        </div>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity to Add</Label>
                      <div className="relative">
                        <Pill className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="quantity"
                          type="number"
                          min={1}
                          placeholder="e.g. 100"
                          className="pl-10"
                          {...register("quantity")}
                        />
                      </div>
                      {errors.quantity && <p className="text-xs text-red-500">{errors.quantity.message}</p>}
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
                        {submitting ? "Adding..." : "Add Stock"}
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
