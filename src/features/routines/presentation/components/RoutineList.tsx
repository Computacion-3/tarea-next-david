import { RoutineItemViewModel } from '../viewmodels/routine.viewmodel';
import { RoutineCard } from './RoutineCard';

interface RoutineListProps {
    routines: RoutineItemViewModel[];
    isLoading: boolean;
    emptyMessage: string;
}

export function RoutineList({ routines, isLoading, emptyMessage }: RoutineListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12 gap-3 text-sm opacity-60">
                <span className="loading loading-spinner loading-md"></span>
                <span>Cargando rutinas...</span>
            </div>
        );
    }

    if (routines.length === 0) {
        return (
            <div role="status" className="alert alert-info alert-soft">
                <span>{emptyMessage}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {routines.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} />
            ))}
        </div>
    );
}
