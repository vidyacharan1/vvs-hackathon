"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import { cn, formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { RiskBadge } from "@/components/shared/risk-badge"
import { StatusBadge } from "@/components/shared/status-badge"
import { PatientFilters } from "@/components/patients/patient-filters"
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Eye,
  MoreHorizontal,
  Phone,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserCircle,
} from "lucide-react"
import type { Patient } from "@/types"

interface PatientTableProps {
  data: Patient[]
}

const columnHelper = createColumnHelper<Patient>()

export function PatientTable({ data }: PatientTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [isMobileView, setIsMobileView] = useState(false)

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Patient",
        cell: ({ row }) => {
          const patient = row.original
          const initials = patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
          return (
            <Link
              href={`/patients/${patient.id}`}
              className="flex items-center gap-3 group"
            >
              <Avatar className="h-9 w-9 ring-2 ring-background transition-shadow group-hover:ring-primary/30">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient.name}`} />
                <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                  {patient.name}
                </p>
                <p className="text-xs text-muted-foreground">{patient.age} years</p>
              </div>
            </Link>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            <span className="text-sm capitalize text-muted-foreground">{value}</span>
          )
        },
      }),
      columnHelper.accessor("village", {
        header: "Village",
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("conditions", {
        header: "Conditions",
        cell: ({ getValue }) => {
          const conditions = getValue()
          const visible = conditions.slice(0, 2)
          const remaining = conditions.length - 2
          return (
            <div className="flex items-center gap-1 max-w-[180px] flex-wrap">
              {visible.map((c) => (
                <Badge key={c} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal whitespace-nowrap">
                  {c}
                </Badge>
              ))}
              {remaining > 0 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                  +{remaining}
                </Badge>
              )}
            </div>
          )
        },
      }),
      columnHelper.accessor("doctor", {
        header: "Doctor",
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("risk", {
        header: "Risk",
        cell: ({ getValue }) => <RiskBadge level={getValue()} />,
        enableSorting: true,
      }),
      columnHelper.accessor("lastVisit", {
        header: "Last Visit",
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDate(getValue())}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("nextFollowUp", {
        header: "Next Follow-up",
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDate(getValue())}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/patients/${row.original.id}`} className="cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call Patient
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCircle className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  })

  const handleFilterChange = (key: string, value: string) => {
    if (!value || value === "all") {
      setColumnFilters((prev) => prev.filter((f) => f.id !== key))
    } else {
      setColumnFilters((prev) => {
        const existing = prev.find((f) => f.id === key)
        if (existing) {
          return prev.map((f) => (f.id === key ? { id: key, value } : f))
        }
        return [...prev, { id: key, value }]
      })
    }
  }

  const clearAllFilters = () => {
    setColumnFilters([])
    setGlobalFilter("")
  }

  const filters = [
    {
      label: "Risk Level",
      value: columnFilters.find((f) => f.id === "risk")?.value as string || "",
      options: [
        { label: "All Risks", value: "all" },
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Critical", value: "critical" },
      ],
      onChange: (v: string) => handleFilterChange("risk", v),
    },
    {
      label: "Status",
      value: columnFilters.find((f) => f.id === "status")?.value as string || "",
      options: [
        { label: "All Status", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
      ],
      onChange: (v: string) => handleFilterChange("status", v),
    },
    {
      label: "Gender",
      value: columnFilters.find((f) => f.id === "gender")?.value as string || "",
      options: [
        { label: "All Genders", value: "all" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      onChange: (v: string) => handleFilterChange("gender", v),
    },
  ]

  const hasFilters = columnFilters.length > 0 || globalFilter.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, village, doctor..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Columns</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Toggle Columns
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllLeafColumns().map((column) => {
                if (column.id === "actions") return null
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    className="capitalize"
                  >
                    {column.id === "name" ? "Patient" : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <PatientFilters
        filters={filters}
        onClearAll={clearAllFilters}
        className={hasFilters ? "" : "hidden"}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b bg-muted/30">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        "h-11 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                        header.column.getCanSort() && "cursor-pointer select-none hover:text-foreground transition-colors"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="inline-flex flex-col">
                            {{
                              asc: <ChevronUp className="h-3 w-3" />,
                              desc: <ChevronDown className="h-3 w-3" />,
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronsUpDown className="h-3 w-3 text-muted-foreground/50" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b last:border-0 transition-colors duration-150",
                    "hover:bg-muted/40",
                    expandedRow === row.id && "bg-muted/30",
                    row.original.risk === "critical" && "border-l-2 border-l-red-500",
                    row.original.risk === "high" && "border-l-2 border-l-orange-500",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} patients
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[80px] text-center">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {table.getRowModel().rows.map((row) => {
          const patient = row.original
          const initials = patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
          return (
            <motion.div
              key={patient.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-lg",
                  patient.risk === "critical" && "border-l-red-500 border-l-4",
                  patient.risk === "high" && "border-l-orange-500 border-l-4",
                )}
                onClick={() => setExpandedRow(expandedRow === patient.id ? null : patient.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-background">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient.name}`} />
                        <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient.age} yrs • {patient.village}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiskBadge level={patient.risk} showDot={false} />
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform duration-200",
                          expandedRow === patient.id && "rotate-180"
                        )}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedRow === patient.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-xs text-muted-foreground">Gender</span>
                              <p className="capitalize">{patient.gender}</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Doctor</span>
                              <p>{patient.doctor}</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Last Visit</span>
                              <p>{formatDate(patient.lastVisit)}</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Next Visit</span>
                              <p>{formatDate(patient.nextFollowUp)}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {patient.conditions.slice(0, 3).map((c) => (
                              <Badge key={c} variant="secondary" className="text-[10px]">
                                {c}
                              </Badge>
                            ))}
                            {patient.conditions.length > 3 && (
                              <Badge variant="outline" className="text-[10px]">
                                +{patient.conditions.length - 3}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <StatusBadge status={patient.status} />
                            <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                              <Link href={`/patients/${patient.id}`}>View Profile</Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
        {/* Mobile Pagination */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} patients
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 text-xs"
            >
              Prev
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
