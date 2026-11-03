'use client';

import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { FullScreenLoader } from '@/src/shared/components/FullScreenLoader';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { checkSession, isCheckingSession } = useAuth();

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    if (isCheckingSession) {
        return <FullScreenLoader label="Verificando sesión..." />;
    }

    return <>{children}</>;
}
