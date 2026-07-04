"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowUpDown, Eye, MapPin, Stethoscope, HandHeart, Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterBar } from "@/components/shared/filter-bar"
import { Pagination } from "@/components/shared/pagination"
import { RiskBadge } from "@/components/shared/risk-badge"
import { FacilityCard } from "@/components/facilities/facility-card"
import type { Facility, RiskLevel, FacilityType } from "@/types"

interface FacilityTableProps {
  data: Facility[]
  className?: string
}

const columnHelper = createColumnHelper<Facility>()

const typeLabels: Record<FacilityType, { label: string; variant: "info" | "warning" }> = {
  phc: { label: "PHC", variant: "info" },
  chc: { label: "CHC", variant: "warning" },
}

export function FacilityTable({ data, className }: FacilityTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const uniqueDistricts = useMemo(() => [...new Set(data.map((f) => f.district))], [data])
  const uniqueRiskLevels: RiskLevel[] = ["low", "medium", "high", "critical"]

  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Facility Name
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate max-w-[200px]">{row.original.name}</p>
            <p className="text-xs text-muted-foreground truncate">{row.original.village}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("type", {
      header: () => <span className="text-xs font-semibold uppercase tracking-wider">Type</span>,
      cell: ({ getValue }) => {
        const type = typeLabels[getValue()]
        return <Badge variant={type.variant}>{type.label}</Badge>
      },
      filterFn: "equalsString",
    }),
    columnHelper.accessor("district", {
      header: () => <span className="text-xs font-semibold uppercase tracking-wider">District</span>,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{getValue()}</span>
      ),
      filterFn: "equalsString",
    }),
    columnHelper.accessor("taluka", {
      header: () => <span className="text-xs font-semibold uppercase tracking-wider">Taluka</span>,
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("riskScore", {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Risk Score
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ getValue }) => {
        const score = getValue()
        return (
          <div className="flex items-center gap-2 min-w-[120px]">
            <Progress
              value={score}
              className={cn(
                "h-1.5 w-16",
                score >= 80 && "[&>div]:bg-red-500",
                score >= 60 && score < 80 && "[&>div]:bg-orange-500",
                score >= 40 && score < 60 && "[&>div]:bg-amber-500",
                score < 40 && "[&>div]:bg-green-500"
              )}
            />
            <span className={cn(
              "text-xs font-medium tabular-nums",
              score >= 80 ? "text-red-600" : score >= 60 ? "text-orange-600" : score >= 40 ? "text-amber-600" : "text-green-600"
            )}>
              {score}%
            </span>
          </div>
        )
      },
      sortingFn: "basic",
    }),
    columnHelper.accessor("overallRisk", {
      header: () => <span className="text-xs font-semibold uppercase tracking-wider">Risk Level</span>,
      cell: ({ getValue }) => <RiskBadge level={getValue()} />,
      filterFn: "equalsString",
    }),
    columnHelper.accessor("doctorsPresent", {
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
          <Stethoscope className="h-3 w-3" /> Doctors
        </span>
      ),
      cell: ({ row }) => {
        const present = row.original.doctorsPresent
        const required = row.original.doctorsRequired
        return (
          <span className={cn(
            "text-sm tabular-nums",
            present < required && "text-orange-600 font-medium"
          )}>
            {present}/{required}
          </span>
        )
      },
    }),
    columnHelper.accessor("nursesPresent", {
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
          <HandHeart className="h-3 w-3" /> Nurses
        </span>
      ),
      cell: ({ row }) => {
        const present = row.original.nursesPresent
        const required = row.original.nursesRequired
        return (
          <span className={cn(
            "text-sm tabular-nums",
            present < required && "text-orange-600 font-medium"
          )}>
            {present}/{required}
          </span>
        )
      },
    }),
    columnHelper.accessor("occupiedBeds", {
      header: () => <span className="text-xs font-semibold uppercase tracking-wider">Beds Occ.</span>,
      cell: ({ row }) => {
        const occupied = row.original.occupiedBeds
        const total = row.original.totalBeds
        const pct = Math.round((occupied / total) * 100)
        return (
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm tabular-nums",
              pct > 85 ? "text-red-600 font-medium" : "text-muted-foreground"
            )}>
              {occupied}/{total}
            </span>
            <span className="text-[10px] text-muted-foreground">({pct}%)</span>
          </div>
        )
      },
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="text-xs font-semibold uppercase tracking-wider">Actions</span>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 rounded-lg"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/facilities/${row.original.id}`)
          }}
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      ),
    }),
  ], [router])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const filters = [
    {
      label: "All Types",
      value: (table.getColumn("type")?.getFilterValue() as string) || "",
      options: [
        { label: "All Types", value: "" },
        { label: "PHC", value: "phc" },
        { label: "CHC", value: "chc" },
      ],
      onChange: (v: string) => table.getColumn("type")?.setFilterValue(v || undefined),
    },
    {
      label: "District",
      value: (table.getColumn("district")?.getFilterValue() as string) || "",
      options: [
        { label: "All Districts", value: "" },
        ...uniqueDistricts.map((d) => ({ label: d, value: d })),
      ],
      onChange: (v: string) => table.getColumn("district")?.setFilterValue(v || undefined),
    },
    {
      label: "Risk Level",
      value: (table.getColumn("overallRisk")?.getFilterValue() as string) || "",
      options: [
        { label: "All Levels", value: "" },
        ...uniqueRiskLevels.map((l) => ({ label: l.charAt(0).toUpperCase() + l.slice(1), value: l })),
      ],
      onChange: (v: string) => table.getColumn("overallRisk")?.setFilterValue(v || undefined),
    },
  ]

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <SearchBar
          value={globalFilter}
          onChange={setGlobalFilter}
          placeholder="Search facilities..."
          className="w-full sm:w-72"
        />
        <FilterBar
          filters={filters}
          onClearAll={() => {
            setGlobalFilter("")
            table.resetColumnFilters()
          }}
        />
      </div>

      {/* Table with horizontal scroll */}
      <div className="rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b bg-muted/30">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No facilities found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b last:border-0 transition-colors hover:bg-muted/50 cursor-pointer"
                      onClick={() => router.push(`/facilities/${row.original.id}`)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      {/* Mobile Cards (hidden on very small screens when table might overflow too much) */}
      <div className="hidden">
        {table.getRowModel().rows.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-foreground">
            No facilities found matching your criteria.
          </div>
        ) : (
          table.getRowModel().rows.map((row, i) => (
            <FacilityCard
              key={row.original.id}
              facility={row.original}
              index={i}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        totalItems={table.getFilteredRowModel().rows.length}
        pageSize={table.getState().pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onPageSizeChange={(size) => table.setPageSize(size)}
      />
    </div>
  )
}
