import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for Jalali dates and currency mapping
export function getJalaliDateRange(timeFilter: string): { start: string; end: string } {
  const today = new Date();
  const currentYear = 1403; // Current Jalali year (approximate)
  
  let daysToSubtract = 0;
  
  switch (timeFilter) {
    case "1D":
      daysToSubtract = 1;
      break;
    case "1W":
      daysToSubtract = 7;
      break;
    case "1M":
      daysToSubtract = 30;
      break;
    case "1Y":
      daysToSubtract = 365;
      break;
    case "5Y":
      daysToSubtract = 1825;
      break;
    default:
      daysToSubtract = 365;
  }
  
  const startDate = new Date(today.getTime() - (daysToSubtract * 24 * 60 * 60 * 1000));
  
  // Convert to Jalali format (YYYY-MM-DD)
  const startJalali = `${currentYear}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
  const endJalali = `${currentYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  return { start: startJalali, end: endJalali };
}

export function mapCurrencyToNavasanItem(symbol: string): string {
  // Map currency symbols to Navasan API item names
  const mapping: { [key: string]: string } = {
    'USD': 'usd_sell',
    'EUR': 'eur_sell', 
    'GBP': 'gbp_sell',
    'JPY': 'jpy_sell',
    'AED': 'aed_sell',
    'USDT_IRT': 'usdt_sell',
    'IR_GOLD_18K': 'gold_18k',
    'IR_GOLD_24K': 'gold_24k',
    'XAUUSD': 'gold_ounce',
    'BTC': 'btc_sell',
    'ETH': 'eth_sell',
    'USDT': 'usdt_sell',
    'XRP': 'xrp_sell',
    'BNB': 'bnb_sell',
    'SOL': 'sol_sell',
    'USDC': 'usdc_sell',
    'DOGE': 'doge_sell',
    'ADA': 'ada_sell',
    'TRX': 'trx_sell',
    'LINK': 'link_sell',
    'AVAX': 'avax_sell',
    'XLM': 'xlm_sell',
    'SHIB': 'shib_sell',
    'DOT': 'dot_sell',
    'LTC': 'ltc_sell',
    'UNI': 'uni_sell',
    'FIL': 'fil_sell',
    'ATOM': 'atom_sell',
  };
  
  return mapping[symbol] || 'usd_sell'; // Default fallback
}
