'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRoutines } from '../hooks/use-routines';
import { isRoutineCategory, RoutineCategory } from '../../domain/entities/routine-category';
import { toCategoryViewModel } from '../viewmodels/routine-category.viewmodel';
import { RoutineForm } from './RoutineForm';
import { RoutineList } from './RoutineList';
import { CategoryFilter } from './CategoryFilter';

/**
 * Vista principal de rutinas. La categoría activa vive en la URL (?category=cardio)
 * para que se pueda compartir el enlace y para que la página de Categorías pueda enlazar aquí.
 */
export function RoutinesView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const param = searchParams.get('category');
    const selectedCategory: RoutineCategory | null = isRoutineCategory(param) ? param : null;

    const { routines, totalCount, countsByCategory, isLoading, isInitialLoading, errorMessage, createRoutine } =
        useRoutines(selectedCategory);

    const handleCategoryChange = (category: RoutineCategory | null) => {
        const url = category ? `${pathname}?category=${category}` : pathname;
        router.replace(url, { scroll: false });
    };

    const selectedLabel = selectedCategory ? toCategoryViewModel(selectedCategory).label : null;

    return (
        <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
            <header className="border-b border-base-300 pb-4 mt-2">
                <h1 className="text-2xl md:text-3xl font-bold">Gestión de rutinas</h1>
                <p className="text-sm opacity-70 mt-1">Crea y administra tus rutinas de entrenamiento.</p>
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="text-xl font-semibold">
                        {selectedLabel ? `Rutinas de ${selectedLabel}` : 'Rutinas disponibles'}
                    </h2>
                    <span className="badge badge-neutral">
                        {routines.length} {routines.length === 1 ? 'rutina' : 'rutinas'}
                    </span>
                </div>

                <CategoryFilter
                    selected={selectedCategory}
                    onChange={handleCategoryChange}
                    counts={countsByCategory}
                    total={totalCount}
                />

                <RoutineList
                    routines={routines}
                    isLoading={isInitialLoading}
                    emptyMessage={
                        selectedLabel
                            ? `No hay rutinas en la categoría ${selectedLabel}.`
                            : 'No hay rutinas registradas aún.'
                    }
                />
            </section>
        </main>
    );
}
