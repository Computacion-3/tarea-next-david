import { ProtectedRoute } from '@/src/features/auth/presentation/components/ProtectedRoute';
import { Header } from '@/src/features/auth/presentation/components/Header';

/** /profile también es privada y comparte el Header. */
export default function ProfileLayout({ children }: LayoutProps<'/profile'>) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-base-200">
                <Header />
                {children}
            </div>
        </ProtectedRoute>
    );
}
