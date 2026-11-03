'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/src/features/auth/presentation/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [localError, setLocalError] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [hasEmptyFields, setHasEmptyFields] = useState(false);

    const { register, isLoading, errorMessage, resetError, user, isCheckingSession } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isCheckingSession && user) {
            router.replace('/routines');
        }
    }, [user, isCheckingSession, router]);

    if (isCheckingSession || user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");
        resetError();
        setPasswordMismatch(false);
        setHasEmptyFields(false);

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setLocalError("Por favor completa todos los campos.");
            setHasEmptyFields(true);
            return;
        }

        if (password !== confirmPassword) {
            setLocalError("Las contraseñas no coinciden.");
            setPasswordMismatch(true);
            return;
        }

        const success = await register({ name, email, password });
        if (success) {
            router.replace("/routines");
        }
    };

    return (
        <section className="bg-base-200 grid place-items-center px-4 py-10 min-h-[80vh]">
            <div className="card bg-base-100 w-full max-w-sm shadow-md">
                <form onSubmit={handleSubmit} className="card-body" noValidate>
                    <h2 className="card-title text-2xl justify-center">Crea tu cuenta</h2>
                    
                    <div className="flex flex-col gap-3">
                        <div className="form-control">
                            <label className="label"><span className="fieldset-legend">Nombre</span></label>
                            <input 
                                type="text" 
                                className={`input input-bordered w-full ${hasEmptyFields && !name.trim() ? 'input-error' : ''}`} 
                                placeholder="Ana Pérez" 
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="fieldset-legend">Correo</span></label>
                            <input 
                                type="email" 
                                className={`input input-bordered w-full ${hasEmptyFields && !email.trim() ? 'input-error' : ''}`} 
                                placeholder="ana@correo.com" 
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="fieldset-legend">Contraseña</span></label>
                            <input 
                                type="password" 
                                className={`input input-bordered w-full ${passwordMismatch || (hasEmptyFields && !password) ? 'input-error' : ''}`} 
                                placeholder="********" 
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="fieldset-legend">Confirmar contraseña</span></label>
                            <input 
                                type="password" 
                                className={`input input-bordered w-full ${passwordMismatch || (hasEmptyFields && !confirmPassword) ? 'input-error' : ''}`} 
                                placeholder="********" 
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {(localError || errorMessage) && (
                            <p className="label text-error text-xs">
                                {localError || errorMessage}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-2" disabled={isLoading}>
                        {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                    
                    <p className="text-center text-sm mt-2">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="link link-primary">
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}