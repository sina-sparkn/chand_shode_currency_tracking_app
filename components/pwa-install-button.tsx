"use client";

import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { usePWA } from "@/hooks/use-pwa";

export function PWAInstallButton() {
  const { isInstallable, isInstalled, showInstallPrompt } = usePWA();

  if (isInstalled) {
    return <></>;
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <a href="/cheghad.apk" download={"cheghad.apk"}>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer border-blue-500 text-blue-500 hover:scale-105 transition-all"
        // onClick={showInstallPrompt}
      >
        <Download className="h-4 w-4" />
        Download apk
      </Button>
    </a>
  );
}
