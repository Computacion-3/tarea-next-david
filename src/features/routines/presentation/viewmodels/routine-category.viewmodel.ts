import { ROUTINE_CATEGORIES, RoutineCategory } from '../../domain/entities/routine-category';

export interface RoutineCategoryViewModel {
    readonly value: RoutineCategory;
    readonly label: string;
    readonly description: string;
    /** Clase de daisyUI para el badge. Debe ser un string literal para que Tailwind la detecte. */
    readonly badgeClass: string;
}

const CATEGORY_UI: Record<RoutineCategory, Omit<RoutineCategoryViewModel, 'value'>> = {
    fuerza: { label: 'Fuerza', description: 'Cargas altas y pocas repeticiones.', badgeClass: 'badge-error' },
    hipertrofia: { label: 'Hipertrofia', description: 'Volumen moderado para ganar masa muscular.', badgeClass: 'badge-primary' },
    cardio: { label: 'Cardio', description: 'Resistencia cardiovascular e intervalos.', badgeClass: 'badge-info' },
    funcional: { label: 'Funcional', description: 'Movimientos compuestos y circuitos.', badgeClass: 'badge-warning' },
    movilidad: { label: 'Movilidad', description: 'Estiramientos y rango de movimiento.', badgeClass: 'badge-success' },
};

export function toCategoryViewModel(category: RoutineCategory): RoutineCategoryViewModel {
    return { value: category, ...CATEGORY_UI[category] };
}

/** Lista de categorías lista para pintar (selects, filtros, tarjetas). */
export const CATEGORY_OPTIONS: readonly RoutineCategoryViewModel[] = ROUTINE_CATEGORIES.map(toCategoryViewModel);
