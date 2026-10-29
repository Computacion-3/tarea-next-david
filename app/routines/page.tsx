'use client';

import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { RoutineCard } from '@/src/features/routines/presentation/components/RoutineCard';
import { RoutineForm } from '@/src/features/routines/presentation/components/RoutineForm';

export default function RoutinesCleanPage() {
    const { routines, isLoading, errorMessage, createRoutine } = useRoutines();

    return (
        <main className="p-6 max-w-4xl mx-auto space-y-6">
            <header className="navbar bg-base-100 shadow-sm px-4">
                <div className="flex-1 flex items-center gap-2">
                    <div className="dropdown hidden" data-only="mobile">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-square" aria-label="Abrir menú">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-48 p-2 shadow">
                        <li><a className="menu-active">Rutinas</a></li>
                        <li><a>Ejercicios</a></li>
                        <li><a>Progreso</a></li>
                    </ul>
                    </div>
                    <span className="text-xl font-bold">GymRoutines</span>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                    <div className="bg-primary text-primary-content w-9 rounded-full"><span>AP</span></div>
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-44 p-2 shadow">
                    <li><a>Mi perfil</a></li>
                    <li><a data-go="login">Cerrar sesión</a></li>
                    </ul>
                </div>
            </header>
            <ul className="menu menu-horizontal gap-1 px-0">
                <li><a className="menu-active">Rutinas</a></li>
                <li><a>Ejercicios</a></li>
                <li><a>Progreso</a></li>
            </ul>
            <header className="border-b border-base-200 pb-4">
                <h1 className="text-3xl font-bold">Gestión de Rutinas</h1>
                <p className="text-sm opacity-70 mt-1">
                    Crea y administra tus rutinas de entrenamiento.
                </p>
            </header>

            {/* Formulario */}
            <section>
                <RoutineForm onSubmit={createRoutine} isLoading={isLoading} />
            </section>

            {/* Error */}
            {errorMessage && (
                <div role="alert" className="alert alert-error text-sm">
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Listado */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Rutinas Disponibles</h2>
                    <span className="badge badge-neutral">
                        {routines.length} {routines.length === 1 ? 'rutina' : 'rutinas'}
                    </span>
                </div>

                {isLoading && routines.length === 0 ? (
                    <div className="flex justify-center items-center py-12 gap-3 text-sm opacity-60">
                        <span className="loading loading-spinner loading-md"></span>
                        <span>Cargando rutinas...</span>
                    </div>
                ) : routines.length === 0 ? (
                    <div className="alert alert-info">
                        <span>No hay rutinas registradas aún.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {routines.map((routine) => (
                            <RoutineCard key={routine.id} routine={routine} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
