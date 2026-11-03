'use client';

import { useState } from "react";
import { useAuth } from "@/src/features/auth/presentation/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [hasEmptyFields, setHasEmptyFields] = useState(false);

    const { login, isLoading, errorMessage, resetError } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");
        resetError();
        setHasEmptyFields(false);

        // Validación de campos vacíos
        if (!email.trim() || !password.trim()) {
            setLocalError("Completa el correo y la contraseña.");
            setHasEmptyFields(true);
            return;
        }

        const success = await login({ email, password });
        if (success) {
            router.replace("/routines");
        }
    };

    return (
        <main className="bg-base-200 p-6 w-full flex justify-center items-center min-h-screen">
            <div className="card bg-base-100 w-96 shadow-md">
                <form onSubmit={handleSubmit} className="card-body" noValidate>
                    <h2 className="card-title justify-center">Gym Routines</h2>
                    <p className="text-center text-base-content/70 text-sm">
                        Inicia sesión para ver tus rutinas
                    </p>

                    <fieldset className="fieldset mt-2">
                        <legend className="fieldset-legend">Correo</legend>
                        <input
                            type="email"
                            // Validación visual con input-error
                            className={`input w-full ${hasEmptyFields && !email.trim() ? 'input-error' : ''}`}
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <legend className="fieldset-legend mt-2">Contraseña</legend>
                        <input
                            type="password"
                            // Validación visual con input-error
                            className={`input w-full ${hasEmptyFields && !password.trim() ? 'input-error' : ''}`}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {(localError || errorMessage) && (
                            <p className="label text-error mt-2 text-xs">
                                {localError || errorMessage}
                            </p>
                        )}
                    </fieldset>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>

                    <p className="text-center text-sm mt-4">
                        ¿No tienes cuenta?{" "}
                        <Link href="/register" className="link link-primary">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}