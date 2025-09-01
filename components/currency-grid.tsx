"use client";

import type { CurrencyData } from "@/app/page";
import { CurrencyTile } from "./currency-tile";

interface CurrencyGridProps {
  currencies: CurrencyData[];
  onCurrencySelect: (currency: CurrencyData) => void;
  isLoading: boolean;
}

export function CurrencyGrid({
  currencies,
  onCurrencySelect,
  isLoading,
}: CurrencyGridProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {currencies.map((currency, index) => (
          <div key={currency.symbol}>
            <CurrencyTile
              key={currency.symbol}
              currency={currency}
              onClick={() => {
                if (!isLoading) {
                  onCurrencySelect(currency);
                }
              }}
              isLoading={isLoading}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Loading overlay for tab switches */}
      {isLoading && currencies.length > 0 && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground font-medium">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
