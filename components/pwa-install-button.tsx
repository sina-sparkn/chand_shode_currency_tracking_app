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
    <Button
      variant="outline"
      size="sm"
      className="cursor-pointer bg-white hover:text-zinc-800 hover:dark:text-zinc-200 hover:bg-white darlhover:text- rounded-full hover:scale-105 transition-all"
      onClick={showInstallPrompt}
    >
      <Download className="h-4 w-4" />
      Install
    </Button>
  );
}
