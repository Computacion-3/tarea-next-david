'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Rutinas', href: '/routines' },
        { name: 'Ejercicios', href: '/exercises' },
        { name: 'Progreso', href: '/progress' },
    ];

    return (
        // Contenedor Flex en columna para apilar las dos barras
        <div className="w-full sticky top-0 z-50 flex flex-col">
            
            {/* 1. FILA SUPERIOR: z-20 y shadow-sm hacen que proyecte la "mini sombra" sobre los botones */}
            <div className="w-full bg-base-100 relative z-20 shadow-sm border-b border-base-200">
                <header className="navbar px-4 h-16 max-w-4xl mx-auto">
                    <div className="navbar-start flex items-center gap-2">
                        
                        {/* Menú Móvil */}
                        <div className="dropdown md:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-square" aria-label="Abrir menú">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <li key={link.name}>
                                            <Link 
                                                href={link.href} 
                                                className={isActive ? 'bg-neutral text-neutral-content focus:bg-neutral focus:text-neutral-content font-medium' : ''}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <span className="text-xl font-bold">GymRoutines</span>
                    </div>

                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                                <div className="bg-primary text-primary-content w-9 rounded-full">
                                    <span>AP</span>
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-44 p-2 shadow-lg">
                                <li><a>Mi perfil</a></li>
                                <li><Link href="/login">Cerrar sesión</Link></li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>

            {/* 2. FILA INFERIOR: z-10 y shadow-md proyecta la sombra principal hacia el fondo de la página */}
            <div className="w-full bg-base-100 relative z-10 shadow-md">
                <nav className="hidden md:block px-4 py-2 max-w-4xl mx-auto">
                    <ul className="menu menu-horizontal px-0 gap-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href} 
                                        className={
                                            isActive 
                                            // Sombra específica para el botón activo (shadow-md)
                                            ? 'bg-neutral text-neutral-content focus:bg-neutral focus:text-neutral-content font-medium shadow-md' 
                                            : 'hover:bg-base-200'
                                        }
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}