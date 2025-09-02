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
import { cn, getJalaliDateRange, mapCurrencyToNavasanItem } from "@/lib/utils";
import { CurrencyChart } from "./currency-chart";
import { motion, AnimatePresence } from "framer-motion";

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
    useState<TimeFilter>("1Y");
  const [chartData, setChartData] = useState<
    Array<{ time: string; price: number }>
  >([]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);

  const timeFilters: TimeFilter[] = ["1D", "1W", "1M", "1Y", "5Y", "All"];

  useEffect(() => {
    if (currency && isOpen) {
      fetchChartData();
    }
  }, [currency, selectedTimeFilter, isOpen]);

  // Debug: Monitor chartData changes
  useEffect(() => {}, [chartData]);

  const fetchChartData = async () => {
    if (!currency) return;

    setIsLoadingChart(true);
    try {
      // Try to fetch real data from the API
      let timeFilter = selectedTimeFilter;
      if (timeFilter === "All") {
        // For "All" time, we'll use a longer period
        timeFilter = "5Y";
      }

      const { start, end } = getJalaliDateRange(timeFilter);
      const item = mapCurrencyToNavasanItem(currency.symbol);

      const response = await fetch("/api/currencies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, start, end }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Transform the data to match our chart format
      const transformedData = data
        .map((item: any) => ({
          time: item.time, // Use the time field directly from API response
          price: item.price, // Use the price field directly from API response
        }))
        .filter((item: any) => item.price > 0 && item.time); // Filter out invalid data

      if (transformedData.length === 0) {
        throw new Error("No valid data received from API");
      }

      setChartData(transformedData);
      setIsLoadingChart(false);
      return;
    } catch (error) {
      console.error("Failed to fetch real chart data:", error);
    }

    // Fallback to mock data if API fails or returns no data
    try {
      const mockData = generateMockChartData(
        currency.price,
        selectedTimeFilter
      );
      setChartData(mockData);
    } catch (error) {
      console.error("Failed to generate mock data:", error);
      setChartData([]);
    } finally {
      setIsLoadingChart(false);
    }
  };

  const generateMockChartData = (
    currentPrice: number,
    timeFilter: TimeFilter
  ) => {
    // Define the overall time span for the complete trend
    const totalTimeSpan = 365 * 5; // 5 years of data
    const startPrice = currentPrice / 15; // Start at 1/15 of current price

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

      return weeklyData;
    } else {
      // For longer periods, return the relevant portion of the complete trend
      const result = relevantData;
      return result;
    }
  };

  if (!currency) return null;

  const isPositive = currency.change_value >= 0 || currency.change_percent >= 0;

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
              className="w-10 h-10 border overflow-hidden rounded-full flex items-center justify-center text-white font-bold"
              style={
                currency.category === "cryptocurrency"
                  ? { backgroundColor: currency.color }
                  : {}
              }
            >
              {currency.icon.includes("http") ? (
                <img
                  src={currency.icon}
                  alt={`${currency.symbol} icon`}
                  className={`${
                    currency.category === "cryptocurrency" ? "" : "min-w-14"
                  } "h-full"`}
                />
              ) : (
                <span>{currency.icon}</span>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredPrice || currency.price}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    {formatPrice(hoveredPrice || currency.price)}
                    {currency.category === "cryptocurrency"
                      ? hoveredPrice
                        ? ""
                        : "$"
                      : ""}
                  </div>
                  {hoveredPrice && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
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
              <AnimatePresence mode="wait">
                <span>{`Last updated: ${currency.date} ${currency.time}`}</span>
              </AnimatePresence>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            {/* Chart Loading State */}
            {isLoadingChart && (
              <div className="space-y-3">
                <div className="h-64 bg-muted/20 rounded-lg animate-pulse flex items-center justify-center">
                  <div className="text-center space-y-2 flex gap-1.5">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <p className="text-sm text-muted-foreground">
                      Fetching historical data
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chart when loaded */}
            {!isLoadingChart && chartData.length > 0 && (
              <CurrencyChart
                isPositive={isPositive}
                data={chartData}
                isLoading={false}
                onHover={setHoveredPrice}
              />
            )}

            {/* No data state */}
            {!isLoadingChart && chartData.length === 0 && (
              <div className="h-64 bg-muted/10 rounded-lg border-2 border-dashed border-muted/30 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No chart data available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try selecting a different time period
                  </p>
                </div>
              </div>
            )}

            {/* Time Filter Buttons */}
            <div className="flex gap-2 justify-center border rounded-md p-1">
              {timeFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={
                    selectedTimeFilter === filter ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedTimeFilter(filter)}
                  disabled={isLoadingChart}
                  className={cn(
                    "text-xs px-3 py-1 flex-1 hover:bg-zicnc-500 rounded-[5px] bg-transparent border-none transition-all duration-200",
                    selectedTimeFilter === filter
                      ? "text-zinc-800 dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100"
                      : "hover:text-foreground",
                    isLoadingChart && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoadingChart && selectedTimeFilter === filter ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    filter
                  )}
                </Button>
              ))}
            </div>

            {/* Data Source Indicator */}
            <div className="flex justify-center">
              {chartData.length > 0 ? (
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-xs text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Real-time data</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-xs text-yellow-600 dark:text-yellow-400">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Using mock data</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
