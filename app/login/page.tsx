'use client';

import { GuestRoute } from '@/src/features/auth/presentation/components/GuestRoute';
import { LoginForm } from '@/src/features/auth/presentation/components/LoginForm';

export default function LoginPage() {
    return (
        <GuestRoute>
            <LoginForm />
        </GuestRoute>
    );
}
