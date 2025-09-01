import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for Jalali dates and currency mapping
export function getJalaliDateRange(timeFilter: string): { start: string; end: string } {
  // Get current date in Persian calendar (approximate)
  const today = new Date();
  const currentYear = 1403; // Current Persian year
  
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
  
  // Convert to Persian calendar format (YYYY/MM/DD)
  // This is a simplified conversion - in production you'd use a proper Persian calendar library
  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();
  const endMonth = today.getMonth() + 1;
  const endDay = today.getDate();
  
  const startJalali = `${currentYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
  const endJalali = `${currentYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;
  
  return { start: startJalali, end: endJalali };
}

export function mapCurrencyToNavasanItem(symbol: string): string {
  // Map currency symbols to Navasan API item names
  const mapping: { [key: string]: string } = {
    // Major Currencies
    'USD': 'usd_sell',
    'EUR': 'eur', 
    'GBP': 'gbp',
    'JPY': 'jpy',
    'AED': 'aed',
    'USDT_IRT': 'usdt',
    
    // Additional Currencies from the data
    'KWD': 'kwd',
    'AUD': 'aud',
    'CAD': 'cad',
    'CNY': 'cny',
    'TRY': 'try',
    'SAR': 'sar',
    'CHF': 'chf',
    'INR': 'inr',
    'PKR': 'pkr',
    'IQD': 'iqd',
    'SYP': 'syp',
    'SEK': 'sek',
    'QAR': 'qar',
    'OMR': 'omr',
    'BHD': 'bhd',
    'AFN': 'afn',
    'MYR': 'myr',
    'THB': 'thb',
    'RUB': 'rub',
    'AZN': 'azn',
    'AMD': 'amd',
    'GEL': 'gel',

    // Gold and Precious Metals
    'IR_GOLD_18K': '18ayar',
    'IR_GOLD_24K': 'gold_24k',
    'IR_GOLD_MELTED': 'abshodeh',
    'XAUUSD': 'usd_xau',
    'IR_COIN_1G': 'gerami',
    'IR_COIN_QUARTER': 'rob',
    'IR_COIN_HALF': 'nim',
    'IR_COIN_EMAMI': 'coin_emami',
    'IR_COIN_BAHAR': 'bahar',

    // Cryptocurrencies
    'BTC': 'btc',
    'ETH': 'eth',
    'USDT': 'usdt',
    'XRP': 'xrp',
    'BNB': 'bnb',
    'SOL': 'sol',
    'USDC': 'usdt',
    'DOGE': 'doge',
    'ADA': 'ada',
    'TRX': 'trx',
    'LINK': 'link',
    'AVAX': 'avax',
    'XLM': 'xlm',
    'SHIB': 'shib',
    'DOT': 'dot',
    'LTC': 'ltc',
    'UNI': 'uni',
    'FIL': 'fil',
    'ATOM': 'atom',
  };
  
  return mapping[symbol] || 'usd_sell'; // Default fallback
}
