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
  );
}
