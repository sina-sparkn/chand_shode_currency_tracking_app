"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CurrencyChartProps {
  data: Array<{ time: string; price: number }>;
  isLoading: boolean;
}

const chartConfig = {
  price: {
    label: "price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CurrencyChart({ data, isLoading }: CurrencyChartProps) {
  if (isLoading) {
    return <Skeleton className="w-full bg-card" />;
  }

  // const formatYAxisLabel = (value: number) => {
  //   if (value >= 1000000) {
  //     return `${(value / 1000000).toFixed(1)}M`;
  //   }
  //   if (value >= 1000) {
  //     return `${(value / 1000).toFixed(0)}K`;
  //   }
  //   return value.toLocaleString();
  // };

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 0,
            right: 10,
            top: 12,
            bottom: 30,
          }}
        >
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={16}
            tickSize={1}
            minTickGap={10}
          />
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent hideLabel className="flex w-fit gap-2" />
            }
          />
          <Line
            dataKey="price"
            type="natural"
            stroke="lightgreen"
            strokeWidth={2}
            height={100}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
