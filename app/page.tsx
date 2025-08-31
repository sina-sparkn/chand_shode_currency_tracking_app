"use client";

import { useState, useEffect } from "react";
import { CurrencyGrid } from "@/components/currency-grid";
import { CurrencyDrawer } from "@/components/currency-drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { PWAInstallButton } from "@/components/pwa-install-button";
import { OfflineIndicator } from "@/components/offline-indicator";
import { ArrowUp, Github, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CurrencyData {
  symbol: string;
  name_en: string;
  name: string;
  price: number;
  change_value: number;
  change_percent: number;
  unit: string;
  date: string;
  time: string;
  time_unix: number;
  category: "gold" | "currency";
  icon: string;
  color: string;
}

export default function HomePage() {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Placeholder data for loading state
  const placeholderCurrencies: CurrencyData[] = [
    {
      symbol: "USD",
      name_en: "US Dollar",
      name: "دلار",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "currency",
      icon: "🇺🇸",
      color: "#3b82f6",
    },
    {
      symbol: "EUR",
      name_en: "Euro",
      name: "یورو",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "currency",
      icon: "🇪🇺",
      color: "#8b5cf6",
    },
    {
      symbol: "GBP",
      name_en: "British Pound",
      name: "پوند",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "currency",
      icon: "🇬🇧",
      color: "#ef4444",
    },
    {
      symbol: "JPY",
      name_en: "Japanese Yen",
      name: "ین",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "currency",
      icon: "🇯🇵",
      color: "#f59e0b",
    },
    {
      symbol: "AED",
      name_en: "UAE Dirham",
      name: "درهم",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "currency",
      icon: "🇦🇪",
      color: "#10b981",
    },
    {
      symbol: "USDT_IRT",
      name_en: "Tether Dollar",
      name: "دلار تتر",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "currency",
      icon: "₮",
      color: "#22c55e",
    },
    {
      symbol: "IR_GOLD_18K",
      name_en: "18K Gold",
      name: "طلا 18 عیار",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "تومان",
      date: "",
      time: "",
      time_unix: 0,
      category: "gold",
      icon: "🪙",
      color: "#eab308",
    },
    {
      symbol: "XAUUSD",
      name_en: "Gold Ounce",
      name: "انس طلا",
      price: 0,
      change_value: 0,
      change_percent: 0,
      unit: "دلار",
      date: "",
      time: "",
      time_unix: 0,
      category: "gold",
      icon: "⚱️",
      color: "#ca8a04",
    },
  ];

  const fetchCurrencyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/currencies");
      const data = await response.json();
      setCurrencies(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to fetch currency data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchCurrencyData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Use placeholder data during loading, real data when available
  const displayCurrencies = isLoading ? placeholderCurrencies : currencies;

  return (
    <main className="bg-background p-4" role="main">
      <div className="max-w-4xl mx-auto">
        {/* Offline Indicator */}
        <OfflineIndicator />

        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Cheghad???
            </h1>
            <p className="text-muted-foreground">
              made by{" "}
              <a
                className="hover:underline"
                target="_blank"
                href="https://github.com/sina-sparkn"
                rel="noopener noreferrer"
                aria-label="Visit Sina Zare's GitHub profile"
              >
                Sina zare
              </a>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 item-center">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={fetchCurrencyData}
                disabled={isLoading}
                className="border bg-white cursor-pointer hover:text-zinc-800 hover:dark:text-zinc-200 border-border rounded-full"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
            <PWAInstallButton />
          </div>
        </header>

        {/* Currency Grid */}
        <CurrencyGrid
          currencies={displayCurrencies}
          onCurrencySelect={setSelectedCurrency}
          isLoading={isLoading}
        />

        {/* Currency Detail Drawer */}
        <CurrencyDrawer
          currency={selectedCurrency}
          isOpen={!!selectedCurrency}
          onClose={() => setSelectedCurrency(null)}
        />

        <footer className="mt-16 border-t flex items-center justify-between py-5 pb-10">
          <a
            target="_blank"
            href="https://github.com/sina-sparkn/chand_shode_currency_tracking_app"
            rel="noopener noreferrer"
            aria-label="Give the project a star on GitHub"
          >
            <Button
              variant={"outline"}
              className="rounded-full hover:text-zinc-800 hover:dark:text-zinc-200 border-border cursor-pointer hover:scale-105 transition-all origin-left"
            >
              Give it a Star
              <Star className="text-yellow-500 fill-yellow-500 " />
            </Button>
          </a>
          <a href="#" aria-label="Back to top">
            <Button
              variant={"outline"}
              className="rounded-full hover:text-zinc-800 hover:dark:text-zinc-200 border-border cursor-pointer"
            >
              back to top
              <ArrowUp />
            </Button>
          </a>
        </footer>
      </div>
    </main>
  );
}
