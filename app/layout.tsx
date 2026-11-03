import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/src/store/StoreProvider";
import { AuthProvider } from "@/src/features/auth/presentation/components/AuthProvider";

export const metadata: Metadata = {
    title: "GymRoutines",
    description: "Gestiona tus rutinas de entrenamiento",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="es" className="h-full antialiased">
            <body className="min-h-full flex flex-col bg-base-200">
                <StoreProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
