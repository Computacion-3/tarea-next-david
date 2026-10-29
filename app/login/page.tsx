'use-client';

import { useAuth } from "@/src/features/auth/presentation/hooks/use-auth"

export default function Login(){

    const { login } = useAuth();
    return(
        <main className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Gym Routines</h2>
                    <p className="text-center text-base-content/70 text-sm">Inicia sesión para ver tus rutinas</p>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Correo</legend>
                    <input type="email" className="input w-full" placeholder="tu@correo.com" required></input>
                    <legend className="fieldset-legend">Contraseña</legend>
                    <input type="password" className="input w-full" placeholder="********" required></input>
                    <p className="label text-error hidden" data-error="">Completa el correo y la contraseña.</p>
                    </fieldset>
                    <button className="btn btn-primary w-full mt-2">Iniciar sesión</button>
                    <p className="text-center text-sm mt-2">¿No tienes cuenta? <a className="link link-primary" data-go="register">Regístrate</a></p>
                </div>
            </div>
        </main>
    )
}