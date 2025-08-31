'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Download } from 'lucide-react';

interface UpdateNotificationProps {
    hasUpdate: boolean;
    onUpdate: () => void;
    onCheckUpdate: () => void;
}

export function UpdateNotification({ hasUpdate, onUpdate, onCheckUpdate }: UpdateNotificationProps) {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (hasUpdate) {
            setShowNotification(true);
        }
    }, [hasUpdate]);

    if (!showNotification) {
        return null;
    }

    return (
        <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg border-2 border-blue-500">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Download className="h-5 w-5" />
                    Update Available
                </CardTitle>
                <CardDescription>
                    A new version of the app is available. Update to get the latest features and improvements.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex gap-2">
                    <Button
                        onClick={onUpdate}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Update Now
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowNotification(false)}
                        className="flex-1"
                    >
                        Later
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    onClick={onCheckUpdate}
                    className="w-full text-sm text-gray-600"
                >
                    Check for updates
                </Button>
            </CardContent>
        </Card>
    );
}
