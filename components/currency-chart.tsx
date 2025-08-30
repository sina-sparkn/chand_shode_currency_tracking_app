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
              left: -52,
              right: 10,
              top: 12,
              bottom: 30,
            }}
          >
            <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[
                averagePrice,
                averagePrice / 1.05,
                averagePrice / 1.05,
                averagePrice + 1,
              ]}
            />
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="flex w-fit gap-2" />
              }
            />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Line
              fill="red"
              fillOpacity={0.4}
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
