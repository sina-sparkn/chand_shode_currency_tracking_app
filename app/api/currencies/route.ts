import { NextResponse } from "next/server";

const API_KEY = "BKW3R7AAPbusQ1Mru4nNJkLQ3fiZlmp7";
const API_URL = `https://BrsApi.ir/Api/Market/Gold_Currency.php?key=${API_KEY}`;

const currencyConfig = {
  // Currency symbols

  USD: {
    name_en: "US Dollar",
    icon: "https://www.worldometers.info/img/flags/us-flag.gif",
    color: "#3b82f6",
  },
  EUR: {
    name_en: "Euro",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/2560px-Flag_of_Europe.svg.png",
    color: "#8b5cf6",
  },
  GBP: {
    name_en: "British Pound",
    icon: "https://www.worldometers.info/img/flags/uk-flag.gif",
    color: "#ef4444",
  },
  JPY: {
    name_en: "Japanese Yen",
    icon: "https://www.worldometers.info/img/flags/ja-flag.gif",
    color: "#f59e0b",
  },
  AED: {
    name_en: "UAE Dirham",
    icon: "https://www.worldometers.info/img/flags/ae-flag.gif",
    color: "#10b981",
  },
  USDT_IRT: {
    name_en: "Tether Dollar",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/01/USDT_Logo.png",
    color: "#22c55e",
  },

  // Gold symbols
  IR_GOLD_18K: { name_en: "18K Gold", icon: "🪙", color: "#eab308" },
  IR_GOLD_24K: { name_en: "24K Gold", icon: "🪙", color: "#f59e0b" },
  IR_GOLD_MELTED: { name_en: "Melted Gold", icon: "🪙", color: "#dc2626" },
  XAUUSD: { name_en: "Gold Ounce", icon: "🪙", color: "#ca8a04" },
  IR_COIN_1G: { name_en: "1g Coin", icon: "🪙", color: "#eab308" },
  IR_COIN_QUARTER: { name_en: "Quarter Coin", icon: "🪙", color: "#f59e0b" },
  IR_COIN_HALF: { name_en: "Half Coin", icon: "🪙", color: "#ca8a04" },
  IR_COIN_EMAMI: { name_en: "Emami Coin", icon: "🪙", color: "#dc2626" },
  IR_COIN_BAHAR: { name_en: "Bahar Azadi Coin", icon: "🪙", color: "#ec4899" },

  // Cryptocurrency symbols
  BTC: {
    name_en: "Bitcoin",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    color: "#f7931a",
  },
  ETH: {
    name_en: "Ethereum",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png",
    color: "#627eea",
  },
  USDT: {
    name_en: "Tether",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/01/USDT_Logo.png",
    color: "#26a17b",
  },
  XRP: {
    name_en: "XRP",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/XRP_Ledger_logo.jpg",
    color: "#000000",
  },
  BNB: {
    name_en: "BNB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png",
    color: "#f3ba2f",
  },
  SOL: {
    name_en: "Solana",
    icon: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
    color: "#14f195",
  },
  USDC: {
    name_en: "USD Coin",
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    color: "#2775ca",
  },
  DOGE: {
    name_en: "Dogecoin",
    icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    color: "#c2a633",
  },
  ADA: {
    name_en: "Cardano",
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    color: "#0033ad",
  },
  TRX: {
    name_en: "TRON",
    icon: "https://cryptologos.cc/logos/tron-trx-logo.png",
    color: "#eb0029",
  },
  LINK: {
    name_en: "Chainlink",
    icon: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    color: "#2a5ada",
  },
  AVAX: {
    name_en: "Avalanche",
    icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    color: "#e84142",
  },
  XLM: {
    name_en: "Stellar",
    icon: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
    color: "#000000",
  },
  SHIB: {
    name_en: "Shiba Inu",
    icon: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    color: "#ff6b35",
  },
  DOT: {
    name_en: "Polkadot",
    icon: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    color: "#e6007a",
  },
  LTC: {
    name_en: "Litecoin",
    icon: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    color: "#a6a9aa",
  },
  UNI: {
    name_en: "Uniswap",
    icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    color: "#ff007a",
  },
  FIL: {
    name_en: "Filecoin",
    icon: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
    color: "#0090ff",
  },
  ATOM: {
    name_en: "Cosmos",
    icon: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
    color: "#2d3142",
  },
};

// Fallback icons for cryptocurrencies (in case external URLs are not accessible)
const cryptoFallbackIcons: { [key: string]: string } = {
  BTC: "₿",
  ETH: "Ξ",
  USDT: "₮",
  XRP: "✕",
  BNB: "🅱",
  SOL: "◎",
  USDC: "💲",
  DOGE: "Ð",
  ADA: "₳",
  TRX: "⚡",
  LINK: "🔗",
  AVAX: "❄",
  XLM: "★",
  SHIB: "🐕",
  DOT: "●",
  LTC: "Ł",
  UNI: "🦄",
  FIL: "��",
  ATOM: "⚛",
};

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "User-Agent": "Currency-Tracker-App/1.0",
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    const currencies: any[] = [];

    // Process currency data
    if (data.currency && Array.isArray(data.currency)) {
      data.currency.forEach((item: any) => {
        const config = currencyConfig[
          item.symbol as keyof typeof currencyConfig
        ] || {
          name_en: item.name_en,
          icon: item.symbol.slice(0, 2),
          color: "#64748b",
        };

        currencies.push({
          symbol: item.symbol,
          name_en: config.name_en,
          name: item.name,
          price: item.price,
          change_value: item.change_value,
          change_percent: item.change_percent,
          unit: item.unit,
          date: item.date,
          time: item.time,
          time_unix: item.time_unix,
          category: "currency" as const,
          icon: config.icon,
          color: config.color,
        });
      });
    }

    // Process gold data
    if (data.gold && Array.isArray(data.gold)) {
      data.gold.forEach((item: any) => {
        const config = currencyConfig[
          item.symbol as keyof typeof currencyConfig
        ] || {
          name_en: item.name_en,
          icon: item.symbol.slice(0, 2),
          color: "#eab308",
        };

        currencies.push({
          symbol: item.symbol,
          name_en: config.name_en,
          name: item.name,
          price: item.price,
          change_value: item.change_value,
          change_percent: item.change_percent,
          unit: item.unit,
          date: item.date,
          time: item.time,
          time_unix: item.time_unix,
          category: "gold" as const,
          icon: config.icon,
          color: config.color,
        });
      });
    }

    if (data.cryptocurrency && Array.isArray(data.cryptocurrency)) {
      data.cryptocurrency.forEach((item: any) => {
        const config = currencyConfig[
          item.symbol as keyof typeof currencyConfig
        ] || {
          name_en: item.name_en,
          icon: `https://cryptologos.cc/logos/${item.symbol.toLowerCase()}-${item.symbol.toLowerCase()}-logo.png`,
          color: "#64748b",
        };

        currencies.push({
          symbol: item.symbol,
          name_en: config.name_en,
          name: item.name,
          price: item.price,
          change_value: 0, // Cryptocurrencies typically don't have change_value, so we set it to 0
          change_percent: item.change_percent,
          unit: item.unit,
          date: item.date,
          time: item.time,
          time_unix: item.time_unix,
          category: "cryptocurrency" as const,
          icon: config.icon,
          color: config.color,
        });
      });
    }

    // If no data from API, return mock data
    if (currencies.length === 0) {
      const mockCurrencies = [
        {
          symbol: "USD",
          name_en: "US Dollar",
          name: "دلار",
          price: 98900,
          change_value: 0,
          change_percent: 0,
          unit: "تومان",
          date: "1404/06/07",
          time: "00:00",
          time_unix: 1756413000,
          category: "currency" as const,
          icon: "🇺🇸",
          color: "#3b82f6",
        },
        {
          symbol: "EUR",
          name_en: "Euro",
          name: "یورو",
          price: 116980,
          change_value: 0,
          change_percent: 0,
          unit: "تومان",
          date: "1404/06/07",
          time: "00:00",
          time_unix: 1756413000,
          category: "currency" as const,
          icon: "🇪🇺",
          color: "#8b5cf6",
        },
      ];
      return NextResponse.json(mockCurrencies);
    }

    return NextResponse.json(currencies); // Limit to 8 items for grid layout
  } catch (error) {
    console.error("Error fetching currency data:", error);

    const mockCurrencies = [
      {
        symbol: "USD",
        name_en: "US Dollar",
        name: "دلار",
        price: 98900,
        change_value: 1500,
        change_percent: 1.54,
        unit: "تومان",
        date: "1404/06/07",
        time: "14:30",
        time_unix: 1756465800,
        category: "currency" as const,
        icon: "🇺🇸",
        color: "#3b82f6",
      },
      {
        symbol: "EUR",
        name_en: "Euro",
        name: "یورو",
        price: 116980,
        change_value: -800,
        change_percent: -0.68,
        unit: "تومان",
        date: "1404/06/07",
        time: "14:30",
        time_unix: 1756465800,
        category: "currency" as const,
        icon: "🇪🇺",
        color: "#8b5cf6",
      },
      {
        symbol: "USDT_IRT",
        name_en: "Tether Dollar",
        name: "دلار تتر",
        price: 102750,
        change_value: 1378,
        change_percent: 1.36,
        unit: "تومان",
        date: "1404/06/07",
        time: "14:42",
        time_unix: 1756465965,
        category: "currency" as const,
        icon: "₮",
        color: "#22c55e",
      },
      {
        symbol: "XAUUSD",
        name_en: "Gold Ounce",
        name: "انس طلا",
        price: 3407,
        change_value: -9,
        change_percent: -0.29,
        unit: "دلار",
        date: "1404/06/07",
        time: "14:36",
        time_unix: 1756465608,
        category: "gold" as const,
        icon: "⚱️",
        color: "#ca8a04",
      },
    ];

    return NextResponse.json(mockCurrencies);
  }
}
