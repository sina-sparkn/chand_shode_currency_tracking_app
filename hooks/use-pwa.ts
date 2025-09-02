import { useState, useEffect } from "react";

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOffline: boolean;
  isOnline: boolean;
  installPrompt: PWAInstallPrompt | null;
  showInstallPrompt: () => void;
  checkForUpdate: () => void;
  hasUpdate: boolean;
  updateApp: () => void;
}

export function usePWA(): PWAState {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(
    null
  );
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    // Check online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
    };

    // Check for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any);
      setIsInstallable(true);
    };

    // Check for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    // Register service worker with update detection
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          // console.log('SW registered: ', registration);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  setHasUpdate(true);
                  // console.log('New service worker available');
                }
              });
            }
          });

          // Handle service worker updates
          let refreshing = false;
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (!refreshing) {
              refreshing = true;
              window.location.reload();
            }
          });
        } catch (registrationError) {
          // console.log('SW registration failed: ', registrationError);
        }
      }
    };

    // Initialize
    checkInstalled();
    registerServiceWorker();

    // Event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check initial online status
    setIsOnline(navigator.onLine);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const showInstallPrompt = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choiceResult = await installPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      } catch (error) {
        console.error("Error showing install prompt:", error);
      }
    }
  };

  const checkForUpdate = async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      }
    }
  };

  const updateApp = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      });
    }
  };

  return {
    isInstalled,
    isInstallable,
    isOffline,
    isOnline,
    installPrompt,
    showInstallPrompt,
    checkForUpdate,
    hasUpdate,
    updateApp,
  };
}
