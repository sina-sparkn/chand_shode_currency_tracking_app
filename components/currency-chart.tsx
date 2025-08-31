"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
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
  isPositive: boolean;
}

const chartConfig = {
  price: {
    label: "price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CurrencyChart({
  data,
  isLoading,
  isPositive,
}: CurrencyChartProps) {
  if (isLoading) {
    return <Skeleton className="w-full bg-card" />;
  }

  const [averagePrice, setAveragePrice] = useState<number>(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const averagePrice =
        data.reduce((sum, item) => sum + item.price, 0) / data.length;
      setAveragePrice(averagePrice);
      console.log("Chart data updated:", {
        dataPoints: data.length,
        averagePrice,
        firstPrice: data[0]?.price,
        lastPrice: data[data.length - 1]?.price,
      });
    }
  }, [data]); // Add data as dependency

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: -52,
            right: 10,
            top: 12,
            bottom: 30,
          }}
        >
          <YAxis tickLine={false} axisLine={false} />
          <CartesianGrid vertical={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "#48a830" : "#dd003f"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="price"
            type="natural"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke={isPositive ? "#48a830" : "#dd003f"}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
