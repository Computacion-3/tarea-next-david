'use-client';

import { useAuth } from "@/src/features/auth/presentation/hooks/use-auth";

export default function Register() {
    const { register } = useAuth();
  return (
    <section data-screen="register" className="bg-base-200 grid place-items-center px-4 py-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-md">
        <form className="card-body" data-form="register" noValidate>
          <h2 className="card-title text-2xl justify-center">Crea tu cuenta</h2>
          
          <div className="flex flex-col gap-3">
            <div className="form-control">
              <label className="label">
                <span className="fieldset-legend">Nombre</span>
              </label>
              <input type="text" name="nombre" className="input input-bordered w-full" placeholder="Ana Pérez" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="fieldset-legend">Correo</span>
              </label>
              <input type="email" name="correo" className="input input-bordered w-full" placeholder="ana@correo.com" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="fieldset-legend">Contraseña</span>
              </label>
              <input type="password" name="password" className="input input-bordered w-full" data-pass="" placeholder="********" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="fieldset-legend">Confirmar contraseña</span>
              </label>
              <input type="password" name="confirmPassword" className="input input-bordered w-full" data-confirm="" placeholder="********" />
            </div>

            <p className="label text-error hidden" data-error="">Las contraseñas no coinciden.</p>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">Crear cuenta</button>
          
          <p className="text-center text-sm mt-2">
            ¿Ya tienes cuenta?{' '}
            <a className="link link-primary cursor-pointer" data-go="login">
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
