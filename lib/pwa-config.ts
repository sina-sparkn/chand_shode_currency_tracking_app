export const PWA_CONFIG = {
  // App Information
  name: "Currency Tracker - cheghad???",
  shortName: "Currency Tracker",
  description: "Track currency and gold prices in real-time",
  
  // URLs
  startUrl: "/",
  scope: "/",
  
  // Display
  display: "standalone" as const,
  orientation: "portrait-primary" as const,
  
  // Colors
  themeColor: "#000000",
  backgroundColor: "#ffffff",
  
  // Icons
  icons: {
    "192": "/web-app-manifest-192x192.png",
    "512": "/web-app-manifest-512x512.png",
  },
  
  // Categories
  categories: ["finance", "business", "utilities"],
  
  // Language
  lang: "en",
  dir: "ltr",
  
  // Screenshots
  screenshots: [
    {
      src: "/screenshot.png",
      sizes: "1280x720",
      type: "image/png",
      formFactor: "wide" as const,
    },
  ],
  
  // Shortcuts
  shortcuts: [
    {
      name: "Refresh Prices",
      shortName: "Refresh",
      description: "Refresh currency prices",
      url: "/?refresh=true",
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
        },
      ],
    },
  ],
  
  // Service Worker
  sw: {
    enabled: true,
    cacheName: "currency-tracker-v1",
    urlsToCache: [
      "/",
      "/manifest.json",
      "/web-app-manifest-192x192.png",
      "/web-app-manifest-512x512.png",
      "/api/currencies",
    ],
  },
  
  // Cache Strategy
  cache: {
    strategy: "stale-while-revalidate" as const,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 100,
  },
  
  // Offline
  offline: {
    enabled: true,
    fallbackPage: "/",
    showOfflineIndicator: true,
  },
  
  // Notifications
  notifications: {
    enabled: true,
    title: "Currency Tracker",
    icon: "/web-app-manifest-192x192.png",
    badge: "/web-app-manifest-192x192.png",
    actions: [
      {
        action: "explore",
        title: "View Updates",
        icon: "/web-app-manifest-192x192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/web-app-manifest-192x192.png",
      },
    ],
  },
  
  // Background Sync
  backgroundSync: {
    enabled: true,
    tag: "background-sync",
  },
  
  // Update
  update: {
    checkInterval: 24 * 60 * 60 * 1000, // 24 hours
    showUpdatePrompt: true,
  },
};

export const getPWAConfig = () => {
  // You can override config based on environment variables
  const config = { ...PWA_CONFIG };
  
  if (process.env.NODE_ENV === "development") {
    config.sw.enabled = false; // Disable SW in development
  }
  
  return config;
};
