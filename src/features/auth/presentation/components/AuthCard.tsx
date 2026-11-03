import type { FormEvent, ReactNode } from 'react';

interface AuthCardProps {
    title: string;
    subtitle: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    /** Error general (ej. "Correo o contraseña incorrectos" que viene del servidor). */
    errorMessage?: string | null;
    submitLabel: string;
    loadingLabel: string;
    isLoading: boolean;
    footer: ReactNode;
    children: ReactNode;
}

/** Tarjeta reutilizable para los formularios de login y registro. */
export function AuthCard({
    title,
    subtitle,
    onSubmit,
    errorMessage,
    submitLabel,
    loadingLabel,
    isLoading,
    footer,
    children,
}: AuthCardProps) {
    return (
        <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="card bg-base-100 w-full max-w-sm shadow-md">
                <form onSubmit={onSubmit} className="card-body gap-1" noValidate>
                    <h1 className="card-title text-2xl justify-center">{title}</h1>
                    <p className="text-center text-base-content/70 text-sm mb-2">{subtitle}</p>

                    {errorMessage && (
                        <div role="alert" className="alert alert-error alert-soft text-sm py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {children}

                    <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}>
                        {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                        {isLoading ? loadingLabel : submitLabel}
                    </button>

                    <p className="text-center text-sm mt-4">{footer}</p>
                </form>
            </div>
        </main>
    );
}
