"use client";

import { useState, useEffect } from "react";
import { CurrencyGrid } from "@/components/currency-grid";
import { CurrencyDrawer } from "@/components/currency-drawer";
import { RefreshCw } from "lucide-react";
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
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">cheghad???</h1>
            <div className="text-zinc-500">
              made by{" "}
              <a
                className="hover:underline"
                target="_blank"
                href="https://github.com/sina-sparkn"
              >
                sina
              </a>
            </div>
          </div>
          {/* <Button
            variant="outline"
            size="icon"
            onClick={fetchCurrencyData}
            disabled={isLoading}
            className="border-border bg-transparent"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button> */}
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
      </div>
    </div>
  );
}
