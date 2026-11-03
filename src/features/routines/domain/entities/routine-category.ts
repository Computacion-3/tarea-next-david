/**
 * Categorías válidas de una rutina (regla de negocio).
 * Se usa `as const` para obtener un tipo unión a partir del arreglo.
 */
export const ROUTINE_CATEGORIES = ['fuerza', 'hipertrofia', 'cardio', 'funcional', 'movilidad'] as const;

export type RoutineCategory = (typeof ROUTINE_CATEGORIES)[number];

export function isRoutineCategory(value: unknown): value is RoutineCategory {
    return typeof value === 'string' && (ROUTINE_CATEGORIES as readonly string[]).includes(value);
}
