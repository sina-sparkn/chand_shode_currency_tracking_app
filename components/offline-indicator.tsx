"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, WifiOff } from "lucide-react";
import { usePWA } from "@/hooks/use-pwa";

export function OfflineIndicator() {
  const { isOffline, isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <Alert className="mb-4 text-orange-800">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        You are currently offline. Some features may be limited. Currency data
        will be updated when you're back online.
      </AlertDescription>
    </Alert>
  );
}
