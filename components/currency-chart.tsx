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
    label: "قیمت",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CurrencyChart({ data, isLoading }: CurrencyChartProps) {
  if (isLoading) {
    return <Skeleton className="w-full bg-card" />;
  }

  const formatXAxisLabel = (tickItem: string) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 0,
            right: 0,
            top: 12,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent hideLabel className="flex w-fit gap-2" />
            }
          />
          <Line
            dataKey="price"
            type="bumpX"
            stroke="lightgreen"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
