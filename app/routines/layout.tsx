import { ProtectedRoute } from '@/src/features/auth/presentation/components/ProtectedRoute';

export default function RoutinesLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}