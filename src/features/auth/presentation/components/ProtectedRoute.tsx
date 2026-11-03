'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isCheckingSession } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isCheckingSession && !user) {
            router.replace('/login');
        }
    }, [user, isCheckingSession, router]);

    if (isCheckingSession || !user) {
        return null;
    }

    return <>{children}</>;
}