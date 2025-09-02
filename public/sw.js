// Dynamic cache version based on build time or deployment
const CACHE_VERSION = "v1.2.0"; // Update this manually for each deployment
const CACHE_NAME = `currency-tracker-${CACHE_VERSION}`;

// Add timestamp for cache busting
const BUILD_TIME = Date.now();

const urlsToCache = [
  "/",
  "/manifest.json",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/api/currencies",
];

// Helper function to check if request should be handled by service worker
function shouldHandleRequest(request) {
  const url = new URL(request.url);

  // Only handle HTTP/HTTPS requests
  if (!url.protocol.startsWith("http")) {
    return false;
  }

  // Only handle GET requests for caching
  if (request.method !== "GET") {
    return false;
  }

  // Only handle requests from same origin or your API
  if (url.origin !== location.origin) {
    return false;
  }

  return true;
}

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  // Early return for requests we shouldn't handle
  if (!shouldHandleRequest(event.request)) {
    return; // Let the browser handle it normally
  }

  const url = new URL(event.request.url);

  // 🔹 If request is for your API → NetworkFirst with short cache
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update cache in background with short TTL
          if (response && response.status === 200 && response.ok) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Double-check it's still a GET request before caching
              if (event.request.method === "GET") {
                cache.put(event.request, cloned).catch((error) => {
                  console.warn("Failed to cache API response:", error);
                });
              }
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

  // 🔹 For HTML pages → NetworkFirst to ensure fresh content
  if (event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache fresh HTML content
          if (response && response.ok) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cloned).catch((error) => {
                console.warn("Failed to cache document:", error);
              });
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
    return;
  }

  // 🔹 For static assets (JS, CSS, images) → StaleWhileRevalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Update cache with fresh content
          if (networkResponse && networkResponse.ok) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cloned).catch((error) => {
                console.warn("Failed to cache static asset:", error);
              });
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Return cached version if network fails
          return cachedResponse;
        });

      // Return cached version immediately if available, then update in background
      return cachedResponse || fetchPromise;
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
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
      // Handle successful sync
      console.log("Background sync completed successfully");
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}
