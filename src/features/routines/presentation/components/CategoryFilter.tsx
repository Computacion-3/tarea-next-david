'use client';

import { RoutineCategory } from '../../domain/entities/routine-category';
import { CATEGORY_OPTIONS } from '../viewmodels/routine-category.viewmodel';

interface CategoryFilterProps {
    selected: RoutineCategory | null;
    onChange: (category: RoutineCategory | null) => void;
    counts: Record<RoutineCategory, number>;
    total: number;
}

/** Botones para filtrar por categoría. En móvil hacen wrap; en escritorio quedan en una fila. */
export function CategoryFilter({ selected, onChange, counts, total }: CategoryFilterProps) {
    const btnClass = (active: boolean) => `btn btn-sm ${active ? 'btn-primary' : 'btn-ghost bg-base-100'}`;

    return (
        <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
            <button type="button" className={btnClass(selected === null)} aria-pressed={selected === null} onClick={() => onChange(null)}>
                Todas
                <span className="badge badge-sm">{total}</span>
            </button>
            {CATEGORY_OPTIONS.map((option) => {
                const active = selected === option.value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        className={btnClass(active)}
                        aria-pressed={active}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                        <span className="badge badge-sm">{counts[option.value]}</span>
                    </button>
                );
            })}
        </div>
    );
}
