"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Stethoscope,
  Users,
  FileText,
} from "lucide-react"
import type { Doctor } from "@/types"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table"

interface DoctorTableProps {
  data: Doctor[]
  onSelect: (doctor: Doctor) => void
}

type WorkloadLevel = "all" | "low" | "moderate" | "high"

export function DoctorTable({ data, onSelect }: DoctorTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [facilityFilter, setFacilityFilter] = useState<string>("all")

  const facilities = useMemo(() => {
    const set = new Set(data.map((d) => d.facilityName))
    return Array.from(set).sort()
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter((doctor) => {
      if (statusFilter !== "all") {
        if (statusFilter === "present" && !doctor.present) return false
        if (statusFilter === "absent" && doctor.present) return false
      }
      if (facilityFilter !== "all" && doctor.facilityName !== facilityFilter) return false
      if (globalFilter) {
        const q = globalFilter.toLowerCase()
        if (
          !doctor.name.toLowerCase().includes(q) &&
          !doctor.specialty.toLowerCase().includes(q) &&
          !doctor.facilityName.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [data, statusFilter, facilityFilter, globalFilter])

  const columns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        accessorFn: (row) => row.name,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-muted">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-tight">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
        enableSorting: true,
      },
      {
        id: "specialty",
        header: "Specialty",
        accessorFn: (row) => row.specialty,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm">{row.original.specialty}</span>
          </div>
        ),
        enableSorting: true,
      },
      {
        id: "facilityName",
        header: "Facility",
        accessorFn: (row) => row.facilityName,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.facilityName}</span>
        ),
        enableSorting: true,
      },
      {
        id: "present",
        header: "Status",
        accessorFn: (row) => (row.present ? "Present" : "Absent"),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                row.original.present ? "bg-emerald-500" : "bg-red-500"
              )}
            />
            <Badge
              variant={row.original.present ? "success" : "destructive"}
              className="text-xs font-medium"
            >
              {row.original.present ? "Present" : "Absent"}
            </Badge>
          </div>
        ),
        enableSorting: true,
      },
      {
        id: "patientsSeen",
        header: "Patients Seen",
        accessorFn: (row) => row.patientsSeen,
        cell: ({ row }) => {
          const pct = Math.round((row.original.patientsSeen / row.original.maxCapacity) * 100)
          return (
            <div className="flex items-center gap-3 min-w-[140px]">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{row.original.patientsSeen}</span>
                  <span className="text-xs text-muted-foreground">/ {row.original.maxCapacity}</span>
                </div>
                <Progress
                  value={pct}
                  className={cn(
                    "h-1.5",
                    pct >= 90
                      ? "[&>div]:bg-red-500"
                      : pct >= 70
                        ? "[&>div]:bg-amber-500"
                        : "[&>div]:bg-emerald-500"
                  )}
                />
              </div>
            </div>
          )
        },
        enableSorting: true,
      },
      {
        id: "pendingReviews",
        header: "Pending Reviews",
        accessorFn: (row) => row.pendingReviews,
        cell: ({ row }) => (
          <Badge
            variant={row.original.pendingReviews > 10 ? "destructive" : "warning"}
            className="text-xs font-medium"
          >
            <FileText className="h-3 w-3 mr-1" />
            {row.original.pendingReviews}
          </Badge>
        ),
        enableSorting: true,
      },
      {
        id: "workload",
        header: "Workload",
        accessorFn: (row) => row.workload,
        cell: ({ row }) => {
          const wl = row.original.workload
          return (
            <div className="flex items-center gap-3 min-w-[120px]">
              <Progress
                value={wl}
                className={cn(
                  "h-2",
                  wl >= 80
                    ? "[&>div]:bg-red-500"
                    : wl >= 50
                      ? "[&>div]:bg-amber-500"
                      : "[&>div]:bg-emerald-500"
                )}
              />
              <span
                className={cn(
                  "text-xs font-semibold min-w-[32px] text-right",
                  wl >= 80 ? "text-red-600" : wl >= 50 ? "text-amber-600" : "text-emerald-600"
                )}
              >
                {wl}%
              </span>
            </div>
          )
        },
        enableSorting: true,
      },
      {
        id: "attendance",
        header: "Attendance",
        accessorFn: (row) => row.attendance,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">{row.original.attendance}%</span>
          </div>
        ),
        enableSorting: true,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSelect(row.original)}>
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onSelect]
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
    initialState: { pagination: { pageSize: 8 } },
  })

  const SortHeader = ({ column, children }: { column: any; children: React.ReactNode }) => {
    const sorted = column.getIsSorted()
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 -ml-3 gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        {children}
        {sorted === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : sorted === "desc" ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
        )}
      </Button>
    )
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty, facility..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-10">
                <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={facilityFilter} onValueChange={setFacilityFilter}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue placeholder="Facility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Facilities</SelectItem>
                {facilities.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="rounded-xl border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b bg-muted/30">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-3 py-3 text-left">
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-3 py-16 text-center text-sm text-muted-foreground"
                      >
                        No doctors found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row, idx) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b last:border-0 transition-colors hover:bg-muted/30 cursor-pointer"
                        onClick={() => onSelect(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-3 py-3">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredData.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No doctors found matching your filters.
            </div>
          ) : (
            filteredData.map((doctor, idx) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => onSelect(doctor)}
              >
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-muted">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{doctor.name}</p>
                          <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "inline-block h-2.5 w-2.5 rounded-full",
                          doctor.present ? "bg-emerald-500" : "bg-red-500"
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-muted-foreground">Facility</div>
                      <div className="text-right font-medium truncate">{doctor.facilityName}</div>
                      <div className="text-muted-foreground">Patients</div>
                      <div className="text-right font-medium">
                        {doctor.patientsSeen}/{doctor.maxCapacity}
                      </div>
                      <div className="text-muted-foreground">Workload</div>
                      <div className="text-right">
                        <span
                          className={cn(
                            "font-semibold",
                            doctor.workload >= 80
                              ? "text-red-600"
                              : doctor.workload >= 50
                                ? "text-amber-600"
                                : "text-emerald-600"
                          )}
                        >
                          {doctor.workload}%
                        </span>
                      </div>
                      <div className="text-muted-foreground">Pending Reviews</div>
                      <div className="text-right font-medium">{doctor.pendingReviews}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                filteredData.length
              )}
            </span>{" "}
            of <span className="font-medium">{filteredData.length}</span> doctors
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">First page</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
                size="icon-sm"
                onClick={() => table.setPageIndex(i)}
                className="hidden sm:inline-flex"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Last page</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

