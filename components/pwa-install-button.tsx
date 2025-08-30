"use client";

import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { usePWA } from "@/hooks/use-pwa";

export function PWAInstallButton() {
    const { isInstallable, isInstalled, showInstallPrompt } = usePWA();

    if (isInstalled) {
        return (
            <></>
        );
    }

    if (!isInstallable) {
        return null;
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={showInstallPrompt}
            className="rounded-full cursor-pointer shadow-none bg-white hover:text-blue-500 dark:border-blue-500 text-blue-500"
        >
            <Download className="h-4 w-4" />
            Install
        </Button>
    );
}
