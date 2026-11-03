'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { AuthCard } from './AuthCard';
import { FormField } from '@/src/shared/components/FormField';
import { TextInput } from '@/src/shared/components/TextInput';
import { FieldErrors, MIN_PASSWORD_LENGTH, User } from '../../domain/entities/user';

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

/** Reglas de dominio + regla propia de la UI (confirmar contraseña). */
function validate(values: RegisterFormValues): FieldErrors<RegisterFormValues> {
    const errors: FieldErrors<RegisterFormValues> = User.validateRegistration(values);

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña.';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    return errors;
}

export function RegisterForm() {
    const [values, setValues] = useState<RegisterFormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const { register, isLoading, errorMessage, resetError } = useAuth();
    const router = useRouter();

    const errors = submitted ? validate(values) : {};

    const handleChange = (field: keyof RegisterFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }));
        if (errorMessage) resetError();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        resetError();

        if (User.hasErrors(validate(values))) return;

        const success = await register({
            name: values.name,
            email: values.email,
            password: values.password,
        });
        if (success) {
            router.replace('/routines');
        }
    };

    const fieldProps = (field: keyof RegisterFormValues) => ({
        value: values[field],
        onChange: handleChange(field),
        error: errors[field],
        isValid: submitted && !errors[field],
    });

    return (
        <AuthCard
            title="Crea tu cuenta"
            subtitle="Regístrate para empezar a organizar tus rutinas"
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            submitLabel="Crear cuenta"
            loadingLabel="Creando cuenta..."
            isLoading={isLoading}
            footer={
                <>
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="link link-primary">
                        Inicia sesión
                    </Link>
                </>
            }
        >
            <FormField label="Nombre" htmlFor="register-name" error={errors.name}>
                <TextInput id="register-name" type="text" autoComplete="name" placeholder="Ana Pérez" {...fieldProps('name')} />
            </FormField>

            <FormField label="Correo" htmlFor="register-email" error={errors.email}>
                <TextInput id="register-email" type="email" autoComplete="email" placeholder="ana@correo.com" {...fieldProps('email')} />
            </FormField>

            <FormField
                label="Contraseña"
                htmlFor="register-password"
                error={errors.password}
                hint={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres.`}
            >
                <TextInput id="register-password" type="password" autoComplete="new-password" placeholder="********" {...fieldProps('password')} />
            </FormField>

            <FormField label="Confirmar contraseña" htmlFor="register-confirm" error={errors.confirmPassword}>
                <TextInput id="register-confirm" type="password" autoComplete="new-password" placeholder="********" {...fieldProps('confirmPassword')} />
            </FormField>
        </AuthCard>
    );
}
