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
      console.log("Generated mock data:", {
        timeFilter: selectedTimeFilter,
        dataPoints: data.length,
        firstPrice: data[0]?.price,
        lastPrice: data[data.length - 1]?.price,
        sampleData: data.slice(0, 3),
      });
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
    console.log("Generating mock data for:", { currentPrice, timeFilter });

    // Define the overall time span for the complete trend
    const totalTimeSpan = 365 * 5; // 5 years of data
    const startPrice = currentPrice / 15; // Start at 1/15 of current price

    console.log("Price range:", {
      startPrice,
      currentPrice,
      totalGrowth: currentPrice - startPrice,
    });

    // Calculate data points for each time filter
    const dataPoints =
      timeFilter === "1D"
        ? 24
        : timeFilter === "1W"
          ? 7
          : timeFilter === "1M"
            ? 30
            : timeFilter === "1Y"
              ? 365
              : timeFilter === "5Y"
                ? 1825
                : 3650; // All time

    const data = [];

    // Generate the complete upward trend first
    const completeTrend = [];
    let price = startPrice;
    const totalGrowth = currentPrice - startPrice;

    // Create the complete 5-year trend
    for (let i = 0; i <= totalTimeSpan; i++) {
      const timeProgress = i / totalTimeSpan;

      // Smooth upward trend with some natural variation
      const baseGrowth = timeProgress * totalGrowth;
      const variation = (Math.random() - 0.5) * 0.1 * totalGrowth; // ±5% variation

      price = startPrice + baseGrowth + variation;

      // Add some realistic market movements
      if (Math.random() < 0.1) {
        // 10% chance of market event
        const eventImpact = (Math.random() - 0.5) * 0.2 * totalGrowth;
        price = price + eventImpact;
      }

      // Ensure price doesn't go below start or above current
      price = Math.max(startPrice * 0.8, Math.min(currentPrice * 1.2, price));

      completeTrend.push({
        time: new Date(
          Date.now() - (totalTimeSpan - i) * 86400000
        ).toISOString(),
        price: Math.round(price * 100) / 100,
      });
    }

    // Now extract the relevant portion based on time filter
    let startIndex, endIndex;

    if (timeFilter === "1D") {
      // Show last 24 hours (last 1 day of data)
      startIndex = Math.max(0, completeTrend.length - 1);
      endIndex = completeTrend.length;
    } else if (timeFilter === "1W") {
      // Show last 7 days
      startIndex = Math.max(0, completeTrend.length - 7);
      endIndex = completeTrend.length;
    } else if (timeFilter === "1M") {
      // Show last 30 days
      startIndex = Math.max(0, completeTrend.length - 30);
      endIndex = completeTrend.length;
    } else if (timeFilter === "1Y") {
      // Show last 365 days
      startIndex = Math.max(0, completeTrend.length - 365);
      endIndex = completeTrend.length;
    } else if (timeFilter === "5Y") {
      // Show last 5 years
      startIndex = Math.max(0, completeTrend.length - 1825);
      endIndex = completeTrend.length;
    } else {
      // Show all data
      startIndex = 0;
      endIndex = completeTrend.length;
    }

    // Extract the relevant portion and add more granular data for shorter time periods
    const relevantData = completeTrend.slice(startIndex, endIndex);

    if (timeFilter === "1D") {
      // For daily view, interpolate hourly data from the daily trend
      const dailyData = [];
      const basePrice = relevantData[0]?.price || currentPrice;
      const endPrice =
        relevantData[relevantData.length - 1]?.price || currentPrice;
      const priceChange = endPrice - basePrice;

      for (let i = 0; i <= 24; i++) {
        const hourProgress = i / 24;
        const interpolatedPrice = basePrice + priceChange * hourProgress;

        // Add some intraday volatility
        const intradayVariation = (Math.random() - 0.5) * 0.02 * basePrice;
        const finalPrice = interpolatedPrice + intradayVariation;

        dailyData.push({
          time: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
          price: Math.round(finalPrice * 100) / 100,
        });
      }
      console.log("Returning daily data:", {
        timeFilter,
        dataPoints: dailyData.length,
        firstPrice: dailyData[0]?.price,
        lastPrice: dailyData[dailyData.length - 1]?.price,
      });
      return dailyData;
    } else if (timeFilter === "1W") {
      // For weekly view, interpolate daily data from the weekly trend
      const weeklyData = [];
      const basePrice = relevantData[0]?.price || currentPrice;
      const endPrice =
        relevantData[relevantData.length - 1]?.price || currentPrice;
      const priceChange = endPrice - basePrice;

      for (let i = 0; i <= 7; i++) {
        const dayProgress = i / 7;
        const interpolatedPrice = basePrice + priceChange * dayProgress;

        // Add some daily volatility
        const dailyVariation = (Math.random() - 0.5) * 0.03 * basePrice;
        const finalPrice = interpolatedPrice + dailyVariation;

        weeklyData.push({
          time: new Date(Date.now() - (7 - i) * 86400000).toISOString(),
          price: Math.round(finalPrice * 100) / 100,
        });
      }
      console.log("Returning weekly data:", {
        timeFilter,
        dataPoints: weeklyData.length,
        firstPrice: weeklyData[0]?.price,
        lastPrice: weeklyData[weeklyData.length - 1]?.price,
      });
      return weeklyData;
    } else {
      // For longer periods, return the relevant portion of the complete trend
      const result = relevantData;
      console.log("Returning longer period data:", {
        timeFilter,
        dataPoints: result.length,
        firstPrice: result[0]?.price,
        lastPrice: result[result.length - 1]?.price,
      });
      return result;
    }
  };

  if (!currency) return null;

  const isPositive = currency.change_value >= 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10,
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
            <CurrencyChart
              isPositive={isPositive}
              data={chartData}
              isLoading={isLoadingChart}
            />

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
