'use client';

import { GuestRoute } from '@/src/features/auth/presentation/components/GuestRoute';
import { RegisterForm } from '@/src/features/auth/presentation/components/RegisterForm';

export default function RegisterPage() {
    return (
        <GuestRoute>
            <RegisterForm />
        </GuestRoute>
    );
}
