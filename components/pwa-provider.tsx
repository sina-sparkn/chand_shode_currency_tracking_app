'use client';

import { ReactNode } from 'react';
import { usePWA } from '@/hooks/use-pwa';
import { UpdateNotification } from '@/components/update-notification';

interface PWAProviderProps {
    children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
    const { hasUpdate, updateApp, checkForUpdate } = usePWA();

    return (
        <>
            {children}
            <UpdateNotification
                hasUpdate={hasUpdate}
                onUpdate={updateApp}
                onCheckUpdate={checkForUpdate}
            />
        </>
    );
}
