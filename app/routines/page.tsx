'use client';

import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { RoutineCard } from '@/src/features/routines/presentation/components/RoutineCard';
import { RoutineForm } from '@/src/features/routines/presentation/components/RoutineForm';
import { Header } from '@/src/features/auth/presentation/components/Header';

export default function RoutinesCleanPage() {
    const { routines, isLoading, errorMessage, createRoutine } = useRoutines();

    return (
        // El contenedor padre ocupa toda la pantalla con un fondo gris claro (bg-base-200)
        <div className="min-h-screen bg-base-200">
            
            {/* El Header es independiente y proyecta su sombra sobre el fondo gris */}
            <Header />

            {/* El contenido principal retiene sus paddings pero se asienta sobre el gris */}
            <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
                
                <header className="border-b border-base-300 pb-4 mt-2">
                    <h1 className="text-3xl font-bold">Gestión de Rutinas</h1>
                    <p className="text-sm opacity-70 mt-1">
                        Crea y administra tus rutinas de entrenamiento.
                    </p>
                </header>

                <section>
                    <RoutineForm onSubmit={createRoutine} isLoading={isLoading} />
                </section>

                {errorMessage && (
                    <div role="alert" className="alert alert-error text-sm shadow-sm">
                        <span>{errorMessage}</span>
                    </div>
                )}

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
                        <div className="alert alert-info shadow-sm">
                            <span>No hay rutinas registradas aún.</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {routines.map((routine) => (
                                <RoutineCard key={routine.id} routine={routine} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}