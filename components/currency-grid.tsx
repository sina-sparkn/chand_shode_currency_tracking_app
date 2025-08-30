"use client";

import type { CurrencyData } from "@/app/page";
import { CurrencyTile } from "./currency-tile";
import { Skeleton } from "@/components/ui/skeleton";

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
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full aspect-square rounded-xl bg-zinc-200 dark:bg-card"
          />
        ))}
      </div>
    );
  }

  currencies;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {currencies.map((currency) => (
        <div key={currency.symbol}>
          <CurrencyTile
            key={currency.symbol}
            currency={currency}
            onClick={() => onCurrencySelect(currency)}
          />
        </div>
      ))}
    </div>
  );
}
