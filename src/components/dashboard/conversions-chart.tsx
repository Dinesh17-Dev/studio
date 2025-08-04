"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";

interface ConversionsChartProps {
    data: { campaign: string; conversions: number }[];
}

export default function ConversionsChart({ data }: ConversionsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
            dataKey="campaign"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
        />
        <YAxis 
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
        />
        <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            content={<ChartTooltipContent 
              labelClassName="font-bold"
              className="rounded-lg border-border bg-background/90 shadow-lg backdrop-blur-sm"
            />}
        />
        <Bar dataKey="conversions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
