const CACHE_NAME = "currency-tracker-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/api/currencies",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 🔹 If request is for your API → NetworkFirst
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update cache in background
          if (response && response.status === 200) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cloned);
            });
          }
          return response;
        })
        .catch(() => {
          // If offline → use cached response
          return caches.match(event.request);
        })
    );
    return;
  }

  // 🔹 Otherwise (static files) → CacheFirst
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request)
            .then((response) => {
              // Make sure response is valid and cloneable
              if (response && response.ok && response.type === "basic") {
                const cloned = response.clone();

                if (event.request.url.startsWith("http")) {
                  caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, cloned);
                  });
                }
              }
              return response;
            })
            .catch(() => {
              return caches.match(event.request); // fallback if fetch fails
            })
        );
      })
      .catch(() => {
        if (event.request.destination === "document") {
          return caches.match("/");
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline data
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New currency update available!",
    icon: "/web-app-manifest-192x192.png",
    badge: "/web-app-manifest-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
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
  };

  event.waitUntil(
    self.registration.showNotification("Currency Tracker", options)
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

async function doBackgroundSync() {
  try {
    // Sync currency data when back online
    const response = await fetch("/api/currencies");
    if (response.ok) {
      console.log("Background sync completed");
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}
