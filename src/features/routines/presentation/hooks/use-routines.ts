'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fetchRoutines, createRoutineMutation } from '../store/routines.slice';
import { CreateRoutineParams } from '../../domain/repositories/routine.repository';
import { ROUTINE_CATEGORIES, RoutineCategory } from '../../domain/entities/routine-category';

/**
 * Hook fachada (Presentation Layer).
 *
 * Actúa como adaptador entre los componentes de React y el Store de Redux.
 * @param category Si se indica, `routines` solo contiene las rutinas de esa categoría.
 */
export function useRoutines(category: RoutineCategory | null = null) {
    const dispatch = useAppDispatch();

    const allRoutines = useAppSelector((state) => state.routines.items);
    const isLoading = useAppSelector((state) => state.routines.isLoading);
    const isMutating = useAppSelector((state) => state.routines.isMutating);
    const hasLoaded = useAppSelector((state) => state.routines.hasLoaded);
    const errorMessage = useAppSelector((state) => state.routines.errorMessage);

    // Carga inicial: solo una vez (hasLoaded evita un bucle infinito si la lista viene vacía o falla).
    useEffect(() => {
        if (!hasLoaded && !isLoading) {
            dispatch(fetchRoutines());
        }
    }, [dispatch, hasLoaded, isLoading]);

    const routines = useMemo(
        () => (category ? allRoutines.filter((r) => r.category === category) : allRoutines),
        [allRoutines, category],
    );

    /** Cantidad de rutinas por categoría (para los filtros y la página de categorías). */
    const countsByCategory = useMemo(() => {
        const counts = Object.fromEntries(ROUTINE_CATEGORIES.map((c) => [c, 0])) as Record<RoutineCategory, number>;
        for (const r of allRoutines) counts[r.category] += 1;
        return counts;
    }, [allRoutines]);

    const createRoutine = useCallback(async (params: CreateRoutineParams): Promise<boolean> => {
        const resultAction = await dispatch(createRoutineMutation(params));
        return createRoutineMutation.fulfilled.match(resultAction);
    }, [dispatch]);

    const reload = useCallback(() => {
        dispatch(fetchRoutines());
    }, [dispatch]);

    return {
        routines,
        totalCount: allRoutines.length,
        countsByCategory,
        isLoading: isLoading || isMutating,
        isInitialLoading: !hasLoaded || (isLoading && allRoutines.length === 0),
        errorMessage,
        reload,
        createRoutine,
    };
}
