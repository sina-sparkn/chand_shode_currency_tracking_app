"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

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

  const [averagePrice, setAveragePrice] = useState<number>(0);

  useEffect(() => {
    const averagePrice =
      data.reduce((sum, item) => sum + item.price, 0) / data.length;

    setAveragePrice(averagePrice);
  }, []);

  {
    return (
      <div className="w-full">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: -50,
              right: 10,
              top: 12,
              bottom: 30,
            }}
          >
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={false}
              ticks={[averagePrice, averagePrice - 1]}
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
}
