"use client";

import type { CurrencyData } from "@/app/page";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Triangle, Dot, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface CurrencyTileProps {
  currency: CurrencyData;
  onClick: () => void;
  isLoading?: boolean;
  index?: number;
}

export function CurrencyTile({ currency, onClick, isLoading = false, index = 0 }: CurrencyTileProps) {
  const isPositive = currency.change_value >= 0;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return price.toLocaleString();
    } else if (price >= 1000) {
      return price.toLocaleString();
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isLoading ?
        { opacity: 0.7, y: 0, scale: 1 } :
        { opacity: 1, y: 0, scale: 1 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "p-4 cursor-pointer transition-all dark:bg-zinc-950 bg-white shadow-none duration-200 aspect-square border dark:border-zinc-800",
          isLoading && "animate-pulse"
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-2">
          <motion.div
            className="w-10 h-10 rounded-full overflow-hidden flex items-center border justify-center text-zinc-900 dark:text-white"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {currency.icon.includes("http") ? (
              <img
                src={currency.icon}
                alt={`${currency.symbol} icon`}
                className="min-w-14 h-full"
              />
            ) : (
              <span className={isLoading ? "opacity-50" : ""}>
                {currency.icon}
              </span>
            )}
          </motion.div>
          <motion.div
            className={cn(
              "flex items-center gap-1",
              isPositive
                ? Math.abs(currency.change_value) > 0
                  ? "text-destructive"
                  : "text-zinc-600"
                : "text-success"
            )}
            initial={{ opacity: 0, x: 10 }}
            animate={isLoading ? { opacity: 0.5, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            {isLoading ? (
              <div className="flex items-center gap-1">
                <Skeleton className="w-3 h-3 rounded" />
                <Skeleton className="w-8 h-3 rounded" />
              </div>
            ) : (
              <>
                {isPositive ? (
                  Math.abs(currency.change_value) > 0 ? (
                    <Triangle className="w-3 h-3 fill-destructive" />
                  ) : (
                    <Minus className="w-3 h-3 scale-y-200 text-zinc-600 fill-zinc-600" />
                  )
                ) : (
                  <Triangle className="w-3 h-3 rotate-180 fill-success" />
                )}
                <span className="text-xs font-medium ">
                  {Math.abs(currency.change_value).toLocaleString()}
                </span>
              </>
            )}
          </motion.div>
        </div>

        <div className="space-y-1 mt-auto">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isLoading ? { opacity: 0.7, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
          >
            <span className={cn("text-xs text-muted-foreground", isLoading && "opacity-70")}>
              {currency.name_en}
            </span>
            <span className="text-xs text-muted-foreground font-mono"></span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 flex-row-reverse text-left w-fit"
            initial={{ opacity: 0, y: 10 }}
            animate={isLoading ? { opacity: 0.7, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
          >
            <div className="text-2xl font-bold text-foreground flex">
              {isLoading ? (
                <Skeleton className="w-20 h-8 rounded" />
              ) : (
                formatPrice(currency.price)
              )}
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
