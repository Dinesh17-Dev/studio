"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
};

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
            dataKey="month"
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
            tickFormatter={(value) => `$${(value as number) / 1000}k`}
            />
            <Tooltip
            content={<ChartTooltipContent 
                formatter={(value) => `$${(value as number).toLocaleString()}`} 
                labelClassName="font-bold"
                className="rounded-lg border-border bg-background/90 shadow-lg backdrop-blur-sm"
            />} 
            />
            <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4, fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
            />
        </LineChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
