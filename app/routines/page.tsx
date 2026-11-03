import { Suspense } from 'react';
import { RoutinesView } from '@/src/features/routines/presentation/components/RoutinesView';

// RoutinesView usa useSearchParams, por eso va dentro de <Suspense>.
export default function RoutinesPage() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            }
        >
            <RoutinesView />
        </Suspense>
    );
}
