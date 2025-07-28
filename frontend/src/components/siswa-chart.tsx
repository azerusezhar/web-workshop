"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface SiswaChartProps {
  data: Array<{
    kelas: string;
    laki: number;
    perempuan: number;
  }>;
}

export function SiswaChart({ data }: SiswaChartProps) {
  const chartData = data.map(item => ({
    month: item.kelas,
    desktop: item.laki,
    mobile: item.perempuan
  }))

  const chartConfig = {
    desktop: {
      label: "Laki-laki",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Perempuan",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 8)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
} 