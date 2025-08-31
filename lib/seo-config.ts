export const seoConfig = {
  site: {
    name: "چقدر شد؟",
    description: "قیمت لحظه‌ای ارز، طلا و سکه در ایران. پیگیری نرخ ارز، قیمت طلا و سکه با به‌روزرسانی خودکار.",
    url: "https://cheghadshod.ir",
    logo: "https://cheghadshod.ir/web-app-manifest-512x512.png",
    language: "fa-IR",
    region: "IR",
    country: "Iran",
  },
  
  author: {
    name: "Sina Zare",
    url: "https://github.com/sina-sparkn",
    twitter: "@sina_sparkn",
  },
  
  keywords: {
    primary: [
      "قیمت ارز", "قیمت طلا", "قیمت سکه", "نرخ ارز", "ارز دیجیتال", "طلا و جواهر"
    ],
    secondary: [
      "currency prices", "gold prices", "exchange rates", "Iran currency", "Iran gold",
      "real-time prices", "financial tracker", "PWA", "cheghadshod", "چقدر شد"
    ],
    longTail: [
      "قیمت دلار امروز", "قیمت یورو", "قیمت طلای 18 عیار", "قیمت سکه تمام",
      "نرخ ارز بانک مرکزی", "قیمت ارز دیجیتال", "طلا و جواهر تهران"
    ]
  },
  
  social: {
    twitter: {
      card: "summary_large_image",
      creator: "@sina_sparkn",
      site: "@cheghadshod",
    },
    facebook: {
      appId: "your-facebook-app-id",
    },
    linkedin: {
      company: "cheghadshod",
    }
  },
  
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    bing: "your-bing-verification-code",
  },
  
  analytics: {
    googleAnalytics: "your-ga4-id",
    googleTagManager: "your-gtm-id",
    yandexMetrika: "your-yandex-id",
  },
  
  performance: {
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ],
    dnsPrefetch: [
      "//fonts.googleapis.com",
      "//fonts.gstatic.com",
    ],
  },
  
  structuredData: {
    organization: {
      "@type": "Organization",
      "name": "چقدر شد؟",
      "url": "https://cheghadshod.ir",
      "logo": "https://cheghadshod.ir/web-app-manifest-512x512.png",
      "sameAs": [
        "https://github.com/sina-sparkn/chand_shode_currency_tracking_app"
      ]
    },
    
    webApplication: {
      "@type": "WebApplication",
      "name": "چقدر شد؟",
      "alternateName": "Currency & Gold Tracker",
      "description": "قیمت لحظه‌ای ارز، طلا و سکه در ایران",
      "url": "https://cheghadshod.ir",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IRR"
      }
    }
  }
};

export const generateStructuredData = (type: keyof typeof seoConfig.structuredData) => {
  return seoConfig.structuredData[type];
};

export const generateMetaTags = (customData?: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}) => {
  const data = {
    title: customData?.title || seoConfig.site.name,
    description: customData?.description || seoConfig.site.description,
    keywords: customData?.keywords || [...seoConfig.keywords.primary, ...seoConfig.keywords.secondary],
    image: customData?.image || seoConfig.site.logo,
    url: customData?.url || seoConfig.site.url,
  };
  
  return {
    title: `${data.title} | ${seoConfig.site.name}`,
    description: data.description,
    keywords: data.keywords.join(", "),
    image: data.image,
    url: data.url,
  };
};
