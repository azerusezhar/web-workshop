"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface GenderChartProps {
  data: {
    gender: string;
    jumlah: number;
  }[];
}

export function GenderChart({ data }: GenderChartProps) {
  const chartData = data.map((item, index) => {
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    return {
      browser: item.gender,
      visitors: item.jumlah,
      fill: colors[index % colors.length]
    }
  })

  const chartConfig = {
    visitors: {
      label: "Jumlah",
    },
    ...Object.fromEntries(
      data.map((item, index) => {
        const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
        return [
          item.gender,
          {
            label: item.gender,
            color: colors[index % colors.length]
          }
        ]
      })
    )
  } satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
      </PieChart>
    </ChartContainer>
  )
} 