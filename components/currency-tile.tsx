"use client";

import type { CurrencyData } from "@/app/page";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyTileProps {
  currency: CurrencyData;
  onClick: () => void;
}

export function CurrencyTile({ currency, onClick }: CurrencyTileProps) {
  const isPositive = currency.change_value >= 0;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + "M";
    } else if (price >= 1000) {
      return price.toLocaleString();
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const absChange = Math.abs(change);
    if (absChange >= 1000000) {
      return `${change >= 0 ? "+" : "-"}${(absChange / 1000000).toFixed(1)}M`;
    } else if (absChange >= 1000) {
      return `${change >= 0 ? "+" : "-"}${(absChange / 1000).toFixed(0)}K`;
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      signDisplay: "always",
    }).format(change);
  };

  return (
    <Card
      className="p-4 cursor-pointer transition-all duration-200 aspect-square bg-card border-border"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: currency.color }}
        >
          {currency.icon}
        </div>
        <div
          className={cn(
            "flex items-center gap-1",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-xs font-medium">
            {Math.abs(currency.change_percent).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="space-y-1 mt-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{currency.name}</span>
          <span className="text-xs text-muted-foreground font-mono"></span>
        </div>
        <div className="flex items-center gap-2 flex-row-reverse text-left w-fit">
          <div className="text-lg font-bold text-foreground">
            {formatPrice(currency.price)}
          </div>
          <span className="text-sm">تومان</span>{" "}
        </div>
      </div>
    </Card>
  );
}
