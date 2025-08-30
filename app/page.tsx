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

  return (
    <div className="bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Offline Indicator */}
        <OfflineIndicator />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold  text-foreground">
              cheghad???
            </h1>
            <div className="text-muted-foreground">
              made by{" "}
              <a
                className="hover:underline"
                target="_blank"
                href="https://github.com/sina-sparkn"
              >
                Sina zare
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 item-center">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={fetchCurrencyData}
                disabled={isLoading}
                className="border bg-white cursor-pointer hover:text-zinc-200 border-border rounded-full"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
            <PWAInstallButton />
          </div>
        </div>

        {/* Currency Grid */}
        <CurrencyGrid
          currencies={currencies}
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
            target="-blank"
            href="https://github.com/sina-sparkn/chand_shode_currency_tracking_app"
          >
            <Button
              variant={"outline"}
              className="rounded-full border-border cursor-pointer hover:scale-105 transition-all origin-left"
            >
              Give it a Star
              <Star className="text-yellow-500 fill-yellow-500 " />
            </Button>
          </a>
          <a href="#">
            <Button
              variant={"outline"}
              className="rounded-full border-border cursor-pointer"
            >
              back to top
              <ArrowUp />
            </Button>
          </a>
        </footer>
      </div>
    </div>
  );
}
