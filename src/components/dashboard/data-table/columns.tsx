"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type Campaign = {
  id: string
  campaignName: string
  status: "active" | "paused" | "completed" | "planning"
  startDate: string
  endDate: string
  budget: number
  revenue: number
}

const statusVariantMap: Record<Campaign["status"], "default" | "secondary" | "destructive" | "outline"> = {
    active: "default",
    completed: "secondary",
    paused: "outline",
    planning: "destructive"
}

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "campaignName",
    header: "Campaign",
    cell: ({ row }) => <div className="font-medium">{row.getValue("campaignName")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as Campaign["status"]
        return <Badge variant={statusVariantMap[status]}>{status}</Badge>
    },
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budget"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
   
        return <div className="text-right font-medium">{formatted}</div>
      },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
          const amount = parseFloat(row.getValue("revenue"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
     
          return <div className="text-right font-medium">{formatted}</div>
        },
  },
]
