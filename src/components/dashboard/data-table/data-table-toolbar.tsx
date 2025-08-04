"use client"

import { Table } from "@tanstack/react-table"
import { Download, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { exportToCsv, exportToPdf } from "@/lib/utils"
import { Campaign, columns } from "./columns"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleExportCsv = () => {
    exportToCsv(table.getCoreRowModel().rows.map(row => row.original) as Campaign[], columns, "campaigns")
  }

  const handleExportPdf = () => {
    exportToPdf(table.getCoreRowModel().rows.map(row => row.original) as Campaign[], columns, "campaigns", "Campaigns Report")
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Filter campaigns..."
            value={(table.getColumn("campaignName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("campaignName")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] pl-9 lg:w-[250px]"
            />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCsv}>Export to CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPdf}>Export to PDF</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
