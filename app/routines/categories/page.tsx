'use client';

import Link from 'next/link';
import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { CATEGORY_OPTIONS } from '@/src/features/routines/presentation/viewmodels/routine-category.viewmodel';
import { CategoryBadge } from '@/src/features/routines/presentation/components/CategoryBadge';

export default function CategoriesPage() {
    const { countsByCategory, isInitialLoading } = useRoutines();

    return (
        <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
            <header className="border-b border-base-300 pb-4 mt-2">
                <h1 className="text-2xl md:text-3xl font-bold">Categorías</h1>
                <p className="text-sm opacity-70 mt-1">Elige una categoría para ver sus rutinas.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORY_OPTIONS.map((category) => {
                    const count = countsByCategory[category.value];
                    return (
                        <Link
                            key={category.value}
                            href={`/routines?category=${category.value}`}
                            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="card-body p-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="card-title text-base">{category.label}</h2>
                                    <CategoryBadge label={category.label} badgeClass={category.badgeClass} />
                                </div>
                                <p className="text-sm opacity-70">{category.description}</p>
                                <p className="text-xs opacity-60 mt-2">
                                    {isInitialLoading ? (
                                        <span className="loading loading-dots loading-xs"></span>
                                    ) : (
                                        `${count} ${count === 1 ? 'rutina' : 'rutinas'}`
                                    )}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
