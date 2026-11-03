'use client';

import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { checkSession, isCheckingSession } = useAuth();

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    if (isCheckingSession) {
        return (
            <div className="min-h-screen bg-base-200 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return <>{children}</>;
}