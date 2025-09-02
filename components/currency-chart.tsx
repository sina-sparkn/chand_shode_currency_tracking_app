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
  onHover?: (price: number | null) => void;
}

const chartConfig = {
  price: {
    label: "price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Custom tooltip that also triggers hover events for price updates
function CustomTooltipWithHover({ active, payload, onHover }: any) {
  useEffect(() => {
    if (active && payload && payload.length > 0) {
      const price = payload[0].payload.price;
      onHover?.(price);
    } else if (!active) {
      onHover?.(null);
    }
  }, [active, payload, onHover]);

  if (!active || !payload || !payload.length) {
    return null;
  }

  const timeData = payload[0]?.payload?.time;

  // Format the date to show as "Aug 3" or handle Jalali dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    try {
      // Check if it's a Jalali date (YYYY-MM-DD format)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        // For Jalali dates, show as "MMM DD" format
        const [year, month, day] = dateString.split("-");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`;
      }

      // For ISO dates, parse and format normally
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If parsing fails, try to extract date from string
        return dateString.split("T")[0] || dateString;
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString || "N/A";
    }
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
                {item.name || "Price"}
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
  onHover,
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
    } else {
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
          <ChartTooltip
            cursor={false}
            content={<CustomTooltipWithHover onHover={onHover} />}
            trigger="hover"
            isAnimationActive={true}
            wrapperStyle={{ pointerEvents: "auto" }}
          />
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
