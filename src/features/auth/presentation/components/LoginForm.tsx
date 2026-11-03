'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { AuthCard } from './AuthCard';
import { FormField } from '@/src/shared/components/FormField';
import { TextInput } from '@/src/shared/components/TextInput';
import { User } from '../../domain/entities/user';

export function LoginForm() {
    const [values, setValues] = useState({ email: '', password: '' });
    const [submitted, setSubmitted] = useState(false);

    const { login, isLoading, errorMessage, resetError } = useAuth();
    const router = useRouter();

    // Tras el primer intento, los errores se recalculan en vivo mientras el usuario escribe.
    const errors = submitted ? User.validateLogin(values) : {};

    const handleChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }));
        if (errorMessage) resetError();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        resetError();

        if (User.hasErrors(User.validateLogin(values))) return;

        const success = await login(values);
        if (success) {
            router.replace('/routines');
        }
    };

    return (
        <AuthCard
            title="Gym Routines"
            subtitle="Inicia sesión para ver tus rutinas"
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            submitLabel="Iniciar sesión"
            loadingLabel="Iniciando sesión..."
            isLoading={isLoading}
            footer={
                <>
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="link link-primary">
                        Regístrate
                    </Link>
                </>
            }
        >
            <FormField label="Correo" htmlFor="login-email" error={errors.email}>
                <TextInput
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                    isValid={submitted && !errors.email}
                />
            </FormField>

            <FormField label="Contraseña" htmlFor="login-password" error={errors.password}>
                <TextInput
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    value={values.password}
                    onChange={handleChange('password')}
                    error={errors.password}
                    isValid={submitted && !errors.password}
                />
            </FormField>
        </AuthCard>
    );
}
