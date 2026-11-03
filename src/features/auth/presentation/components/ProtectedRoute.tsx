'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { FullScreenLoader } from '@/src/shared/components/FullScreenLoader';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isCheckingSession } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isCheckingSession && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isCheckingSession, router]);

    if (isCheckingSession || !isAuthenticated) {
        return <FullScreenLoader label="Redirigiendo..." />;
    }

    return <>{children}</>;
}
