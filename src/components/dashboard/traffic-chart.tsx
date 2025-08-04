"use client"

import * as React from "react"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface TrafficChartProps {
  data: { source: string; visitors: number; fill: string }[];
}

export default function TrafficChart({ data }: TrafficChartProps) {
  const chartConfig = React.useMemo(() => {
    return data.reduce((acc, item) => {
      acc[item.source.toLowerCase()] = {
        label: item.source,
        color: item.fill,
      }
      return acc
    }, {} as ChartConfig)
  }, [data])

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel 
                nameKey="visitors"
                className="rounded-lg border-border bg-background/90 shadow-lg backdrop-blur-sm"
            />}
          />
          <Pie
            data={data}
            dataKey="visitors"
            nameKey="source"
            innerRadius={60}
            strokeWidth={5}
            labelLine={false}
            label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
  
                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].source} ({(percent * 100).toFixed(0)}%)
                  </text>
                )
              }}
          >
             {data.map((entry) => (
                <Cell key={`cell-${entry.source}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
