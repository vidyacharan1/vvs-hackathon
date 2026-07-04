"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { useInventory } from "@/hooks/use-inventory"
import { PageHeader } from "@/components/layout/page-header"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { AddStockDialog } from "@/components/inventory/add-stock-dialog"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Pill, AlertTriangle, Package, TrendingDown, Download, Plus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"]

export default function InventoryPage() {
  const { data: medicines, loading } = useInventory()
  const [stockDialogOpen, setStockDialogOpen] = useState(false)
  const [selectedMedicineId, setSelectedMedicineId] = useState<string | undefined>(undefined)

  const handleAddStock = useCallback((medicineId?: string) => {
    setSelectedMedicineId(medicineId)
    setStockDialogOpen(true)
  }, [])

  if (loading) return <LoadingSkeleton type="table" />

  const criticalItems = medicines?.filter(m => m.risk === "critical").length || 0
  const lowStock = medicines?.filter(m => m.daysLeft < 15).length || 0
  const totalItems = medicines?.length || 0

  const riskDistribution = [
    { name: "Low", value: medicines?.filter(m => m.risk === "low").length || 0 },
    { name: "Medium", value: medicines?.filter(m => m.risk === "medium").length || 0 },
    { name: "High", value: medicines?.filter(m => m.risk === "high").length || 0 },
    { name: "Critical", value: medicines?.filter(m => m.risk === "critical").length || 0 },
  ]

  const topCritical = medicines?.filter(m => m.risk === "critical" || m.risk === "high")
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 10) || []

  return (
    <div className="space-y-6">
      <PageHeader title="Medicine Inventory" description="Track stock levels across all facilities" icon={Pill}>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={() => handleAddStock()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2.5"><Package className="h-5 w-5 text-blue-600" /></div>
            <div><p className="text-xs text-muted-foreground">Total Items</p><p className="text-2xl font-bold">{totalItems}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-2.5"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
            <div><p className="text-xs text-muted-foreground">Critical</p><p className="text-2xl font-bold text-red-600">{criticalItems}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 p-2.5"><TrendingDown className="h-5 w-5 text-amber-600" /></div>
            <div><p className="text-xs text-muted-foreground">Low Stock (&lt;15 days)</p><p className="text-2xl font-bold text-amber-600">{lowStock}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-xl bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 p-2.5"><Package className="h-5 w-5 text-[#7C3AED] dark:text-[#A78BFA]" /></div>
            <div><p className="text-xs text-muted-foreground">Adequate Stock</p><p className="text-2xl font-bold text-[#7C3AED] dark:text-[#A78BFA]">{totalItems - lowStock}</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Top Critical Items" subtitle="Items with lowest days of stock">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCritical.slice(0, 7)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="daysLeft" name="Days Left" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <div className="lg:col-span-1">
          <ChartCard title="Risk Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {riskDistribution.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <InventoryTable data={medicines || []} onAddStock={handleAddStock} />
      </motion.div>

      <AddStockDialog
        open={stockDialogOpen}
        onOpenChange={setStockDialogOpen}
        onSuccess={() => window.location.reload()}
        preselectedMedicineId={selectedMedicineId}
      />
    </div>
  )
}
