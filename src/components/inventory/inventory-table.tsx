"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { motion } from "framer-motion"
import { cn, formatNumber } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  ShoppingCart,
  Pill,
  Package,
  Building2,
  AlertTriangle,
  Clock,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Medicine } from "@/types"

interface InventoryTableProps {
  data: Medicine[]
  onAddStock?: (medicineId: string) => void
}

function getDaysLeftColor(days: number) {
  if (days > 30) return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
  if (days > 15) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20"
  if (days > 7) return "text-orange-600 bg-orange-50 dark:bg-orange-950/20"
  return "text-red-600 bg-red-50 dark:bg-red-950/20 animate-pulse"
}

function getStatus(daysLeft: number) {
  if (daysLeft > 30) return { label: "Adequate", variant: "success" as const }
  if (daysLeft > 15) return { label: "Moderate", variant: "warning" as const }
  if (daysLeft > 7) return { label: "Low Stock", variant: "warning" as const }
  return { label: "Critical", variant: "critical" as const }
}

export function InventoryTable({ data, onAddStock }: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [view, setView] = useState<"table" | "cards">("table")

  const filteredData = useMemo(() => {
    let items = data
    if (riskFilter !== "all") {
      items = items.filter((m) => m.risk === riskFilter)
    }
    if (statusFilter !== "all") {
      items = items.filter((m) => {
        const s = getStatus(m.daysLeft).label.toLowerCase().replace(" ", "")
        return statusFilter === s
      })
    }
    return items
  }, [data, riskFilter, statusFilter])

  const columns = useMemo<ColumnDef<Medicine>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Medicine Name
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2">
              <Pill className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-sm">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.category}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => <span className="text-sm">{row.original.category}</span>,
      },
      {
        accessorKey: "currentStock",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Current Stock
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => {
          const stock = row.original.currentStock
          const reorder = row.original.reorderLevel
          const pct = Math.min((stock / (reorder * 2)) * 100, 100)
          return (
            <div className="flex items-center gap-3 min-w-[140px]">
              <span className="font-medium text-sm w-12 text-right">{formatNumber(stock)}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    pct > 75 ? "bg-emerald-500" : pct > 50 ? "bg-yellow-500" : pct > 25 ? "bg-orange-500" : "bg-red-500"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "averageUsage",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Avg Usage
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => <span className="text-sm">{formatNumber(row.original.averageUsage)}/day</span>,
      },
      {
        accessorKey: "daysLeft",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Days Left
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => {
          const days = row.original.daysLeft
          return (
            <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", getDaysLeftColor(days))}>
              <Clock className="h-3 w-3" />
              {days} days
            </span>
          )
        },
      },
      {
        accessorKey: "reorderLevel",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reorder Level
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => <span className="text-sm font-medium">{formatNumber(row.original.reorderLevel)}</span>,
      },
      {
        accessorKey: "risk",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Risk
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => {
          const risk = row.original.risk
          const variants: Record<string, "low" | "medium" | "high" | "critical"> = {
            low: "low",
            medium: "medium",
            high: "high",
            critical: "critical",
          }
          return <Badge variant={variants[risk]}>{risk}</Badge>
        },
      },
      {
        id: "status",
        header: () => <span className="font-semibold text-xs uppercase tracking-wider">Status</span>,
        cell: ({ row }) => {
          const s = getStatus(row.original.daysLeft)
          return <Badge variant={s.variant}>{s.label}</Badge>
        },
      },
      {
        accessorKey: "facilityName",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-semibold text-xs uppercase tracking-wider"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Facility
            {column.getIsSorted() === "asc" ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === "desc" ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm">{row.original.facilityName}</span>
          </div>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button size="sm" variant="outline" className="h-8" onClick={() => onAddStock?.(row.original.id)}>
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            Order
          </Button>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medicine, category, facility..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="lowstock">Low Stock</SelectItem>
              <SelectItem value="adequate">Adequate</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setView("table")}>
                Table View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("cards")}>
                Cards View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {view === "table" ? (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b bg-muted/50">
                    {hg.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 text-left">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, idx) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {table.getRowModel().rows.map((row, idx) => {
            const m = row.original
            const s = getStatus(m.daysLeft)
            const pct = Math.min((m.currentStock / (m.reorderLevel * 2)) * 100, 100)
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="rounded-2xl border bg-card p-4 space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-2">
                      <Pill className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.category}</p>
                    </div>
                  </div>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stock</span>
                    <span className="font-medium">{formatNumber(m.currentStock)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        pct > 75 ? "bg-emerald-500" : pct > 50 ? "bg-yellow-500" : pct > 25 ? "bg-orange-500" : "bg-red-500"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Avg: {formatNumber(m.averageUsage)}/day</span>
                    <span className={cn("font-medium", m.daysLeft <= 7 ? "text-red-600" : m.daysLeft <= 15 ? "text-orange-600" : "text-emerald-600")}>
                      {m.daysLeft} days left
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    {m.facilityName}
                  </div>
                  <Button size="sm" variant="outline" className="h-8" onClick={() => onAddStock?.(m.id)}>
                    <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                    Order
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {filteredData.length} results
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
              size="icon-sm"
              onClick={() => table.setPageIndex(i)}
              className="text-xs hidden sm:inline-flex"
            >
              {i + 1}
            </Button>
          )).slice(Math.max(0, table.getState().pagination.pageIndex - 2), table.getState().pagination.pageIndex + 3)}
          <Button variant="outline" size="icon-sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
