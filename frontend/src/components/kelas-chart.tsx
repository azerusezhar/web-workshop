"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface KelasChartProps {
  data: {
    kelas: string;
    jumlah: number;
  }[];
  title?: string;
  description?: string;
}

export function KelasChart({ data, title = "Distribusi Siswa per Kelas", description = "Statistik jumlah siswa per kelas" }: KelasChartProps) {
  const chartData = data.map(item => ({
    month: item.kelas,
    desktop: item.jumlah
  }))

  const chartConfig = {
    desktop: {
      label: "Jumlah Siswa",
      color: "var(--chart-1)",
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
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
} 