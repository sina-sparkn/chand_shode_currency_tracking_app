import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for Jalali dates and currency mapping
export function getJalaliDateRange(timeFilter: string): {
  start: string;
  end: string;
} {
  // Today's date in Persian calendar: 1404-06-10

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

  // Calculate start date by subtracting days
  // For simplicity, we'll use a basic calculation
  // In production, you'd want to use a proper Persian calendar library

  const year = new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    year: "numeric",
  });
  let day = new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    day: "numeric",
  });
  let month = new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    month: "numeric",
  });

  let startYear = Number(year);
  let startMonth = Number(month);
  let startDay = Number(day) - daysToSubtract;

  // Handle month/year rollbacks
  while (startDay <= 0) {
    startMonth--;
    if (startMonth <= 0) {
      startMonth = 12;
      startYear--;
    }

    // Approximate days in each Persian month
    const daysInMonth = startMonth <= 6 ? 31 : startMonth <= 11 ? 30 : 29;
    startDay += daysInMonth;
  }

  // Ensure we don't go below year 1400
  if (startYear < 1400) {
    startYear = 1400;
    startMonth = 1;
    startDay = 1;
  }

  const startJalali = `${startYear}-${String(startMonth).padStart(
    2,
    "0"
  )}-${String(startDay).padStart(2, "0")}`;
  const endJalali = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;

  console.log("Generated Jalali dates:", {
    start: startJalali,
    end: endJalali,
    timeFilter,
  });

  return { start: startJalali, end: endJalali };
}

export function mapCurrencyToNavasanItem(symbol: string): string {
  // Map currency symbols to Navasan API item names
  const mapping: { [key: string]: string } = {
    // Major Currencies
    USD: "usd_sell",
    EUR: "eur",
    GBP: "gbp",
    JPY: "jpy",
    AED: "aed",
    USDT_IRT: "usdt",

    // Additional Currencies from the data
    KWD: "kwd",
    AUD: "aud",
    CAD: "cad",
    CNY: "cny",
    TRY: "try",
    SAR: "sar",
    CHF: "chf",
    INR: "inr",
    PKR: "pkr",
    IQD: "iqd",
    SYP: "syp",
    SEK: "sek",
    QAR: "qar",
    OMR: "omr",
    BHD: "bhd",
    AFN: "afn",
    MYR: "myr",
    THB: "thb",
    RUB: "rub",
    AZN: "azn",
    AMD: "amd",
    GEL: "gel",

    // Gold and Precious Metals
    IR_GOLD_18K: "18ayar",
    IR_GOLD_24K: "gold_24k",
    IR_GOLD_MELTED: "abshodeh",
    XAUUSD: "usd_xau",
    IR_COIN_1G: "gerami",
    IR_COIN_QUARTER: "rob",
    IR_COIN_HALF: "nim",
    IR_COIN_EMAMI: "coin_emami",
    IR_COIN_BAHAR: "bahar",

    // Cryptocurrencies
    BTC: "btc",
    ETH: "eth",
    USDT: "usdt",
    XRP: "xrp",
    BNB: "bnb",
    SOL: "sol",
    USDC: "usdt",
    DOGE: "doge",
    ADA: "ada",
    TRX: "trx",
    LINK: "link",
    AVAX: "avax",
    XLM: "xlm",
    SHIB: "shib",
    DOT: "dot",
    LTC: "ltc",
    UNI: "uni",
    FIL: "fil",
    ATOM: "atom",
  };

  return mapping[symbol] || "usd_sell"; // Default fallback
}
