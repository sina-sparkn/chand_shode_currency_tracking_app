"use client";

import { useState, useEffect } from "react";
import type { CurrencyData } from "@/app/page";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CurrencyChart } from "./currency-chart";

interface CurrencyDrawerProps {
  currency: CurrencyData | null;
  isOpen: boolean;
  onClose: () => void;
}

type TimeFilter = "1D" | "1W" | "1M" | "1Y" | "5Y" | "All";

export function CurrencyDrawer({
  currency,
  isOpen,
  onClose,
}: CurrencyDrawerProps) {
  const [selectedTimeFilter, setSelectedTimeFilter] =
    useState<TimeFilter>("1D");
  const [chartData, setChartData] = useState<
    Array<{ time: string; price: number }>
  >([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  const timeFilters: TimeFilter[] = ["1D", "1W", "1M", "1Y", "5Y", "All"];

  useEffect(() => {
    if (currency && isOpen) {
      fetchChartData();
    }
  }, [currency, selectedTimeFilter, isOpen]);

  const fetchChartData = async () => {
    if (!currency) return;

    setIsLoadingChart(true);
    try {
      // Generate mock historical data for demonstration
      const data = generateMockChartData(currency.price, selectedTimeFilter);
      setChartData(data);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    } finally {
      setIsLoadingChart(false);
    }
  };

  const generateMockChartData = (
    currentPrice: number,
    timeFilter: TimeFilter
  ) => {
    const dataPoints =
      timeFilter === "1D"
        ? 24
        : timeFilter === "1W"
        ? 7
        : timeFilter === "1M"
        ? 30
        : 365;
    const data = [];

    for (let i = dataPoints; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const price = currentPrice * (1 + variation * (i / dataPoints));
      data.push({
        time: new Date(
          Date.now() - i * (timeFilter === "1D" ? 3600000 : 86400000)
        ).toISOString(),
        price: Math.max(0, price),
      });
    }

    return data;
  };

  if (!currency) return null;

  const isPositive = currency.change_value >= 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="pb-10 max-h-[80vh] bg-background rounded-t-3xl border-t px-5"
      >
        <SheetHeader className="flex flex-row items-center px-0 justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: currency.color }}
            >
              {currency.icon.includes("http") ? (
                <img
                  src={currency.icon}
                  alt={`${currency.symbol} icon`}
                  className="min-w-14 h-full"
                />
              ) : (
                currency.icon
              )}
            </div>
            <div>
              <SheetTitle className="text-foreground">
                {currency.name_en}
              </SheetTitle>
              <p className="text-sm text-muted-foreground font-mono">
                {currency.symbol}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Price Info */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">
              {formatPrice(currency.price)}
            </div>
            <div
              className={cn(
                "flex items-center gap-2",
                isPositive ? "text-destructive" : "text-success"
              )}
            >
              {isPositive ? (
                <Triangle className="w-4 h-4 fill-destructive" />
              ) : (
                <Triangle className="w-4 h-4 rotate-180 fill-success" />
              )}
              <span className="font-medium">
                {currency.change_value >= 0 ? "+" : ""}
                {formatPrice(currency.change_value)} (
                {currency.change_percent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {currency.date} {currency.time}
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <CurrencyChart data={chartData} isLoading={isLoadingChart} />

            {/* Time Filter Buttons */}
            <div className="flex gap-2 justify-center">
              {timeFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={
                    selectedTimeFilter === filter ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedTimeFilter(filter)}
                  className={cn(
                    "text-xs px-3 py-1 rounded-full hover:bg-zicnc-500",
                    selectedTimeFilter === filter
                      ? "bg-zinc-600 text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
