import { ProtectedRoute } from '@/src/features/auth/presentation/components/ProtectedRoute';
import { Header } from '@/src/features/auth/presentation/components/Header';

export default function RoutinesLayout({ children }: LayoutProps<'/routines'>) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-base-200">
                <Header />
                {children}
            </div>
        </ProtectedRoute>
    );
}
