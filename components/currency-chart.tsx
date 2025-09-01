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

// Custom tooltip component that shows date and price
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  // Get the time from the first payload item's payload (which contains the original data)
  const timeData = payload[0]?.payload?.time;

  // Format the date to show as "Aug 3"
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium">{formatDate(timeData)}</div>
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => (
          <div
            key={item.dataKey}
            className="flex w-full flex-wrap items-center gap-2"
          >
            <div className="flex flex-1 justify-between leading-none items-center">
              <span className="text-muted-foreground">
                {item.name || 'Price'}
              </span>
              <span className="text-foreground font-mono font-medium tabular-nums ml-2">
                {item.value?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={!isPositive ? "#48a830" : "#dd003f"}
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
            stroke={!isPositive ? "#48a830" : "#dd003f"}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
