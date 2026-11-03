'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/use-auth';
import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { CATEGORY_OPTIONS } from '@/src/features/routines/presentation/viewmodels/routine-category.viewmodel';

/** Vista del perfil: datos del usuario autenticado + resumen de sus rutinas. */
export function ProfileView() {
    const router = useRouter();
    const { user, logout, isLoading } = useAuth();
    const { totalCount, countsByCategory, isInitialLoading } = useRoutines();

    if (!user) return null; // ProtectedRoute ya garantiza que exista

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    return (
        <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
            <header className="border-b border-base-300 pb-4 mt-2">
                <h1 className="text-2xl md:text-3xl font-bold">Mi perfil</h1>
                <p className="text-sm opacity-70 mt-1">Información de tu cuenta.</p>
            </header>

            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-primary text-primary-content w-24 rounded-full">
                            <span className="text-3xl">{user.initials}</span>
                        </div>
                    </div>

                    <div className="flex-1 w-full space-y-3 text-center sm:text-left">
                        <div>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-sm opacity-70 break-all">{user.email}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                            <Link href="/routines" className="btn btn-primary btn-sm">
                                Ver mis rutinas
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="btn btn-error btn-outline btn-sm"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Resumen</h2>
                <div className="stats stats-vertical sm:stats-horizontal w-full bg-base-100 shadow-sm border border-base-200">
                    <div className="stat">
                        <div className="stat-title">Rutinas</div>
                        <div className="stat-value text-primary">
                            {isInitialLoading ? <span className="loading loading-dots loading-sm"></span> : totalCount}
                        </div>
                        <div className="stat-desc">en total</div>
                    </div>
                    {CATEGORY_OPTIONS.slice(0, 3).map((category) => (
                        <div key={category.value} className="stat">
                            <div className="stat-title">{category.label}</div>
                            <div className="stat-value text-2xl">
                                {isInitialLoading ? '–' : countsByCategory[category.value]}
                            </div>
                            <div className="stat-desc">rutinas</div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
