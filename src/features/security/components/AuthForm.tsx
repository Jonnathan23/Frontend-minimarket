import { type FieldErrors, type Path, type UseFormRegister } from 'react-hook-form';

import type { CreateUserDTO, LoginUserDTO } from '../types/auth.types';



// Definimos el tipo de la unión
type AuthFormData = LoginUserDTO | CreateUserDTO;

interface AuthFormProps<T extends AuthFormData> {
    isRegister: boolean;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
}

export default function AuthForm<T extends AuthFormData>({ isRegister, register, errors }: AuthFormProps<T>) {

    const inputStyles = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-700";
    const labelStyles = "block text-sm font-semibold text-gray-600 mb-1.5";
    const errorStyles = "text-xs text-red-500 mt-1 font-medium";


    return (
        <div className="space-y-5">
            <article>
                <label className={labelStyles} htmlFor="username">Usuario</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Ej. admin_market"
                    className={inputStyles}
                    {...register('us_username' as Path<T>)}
                />
                {errors.us_username?.message && <p className={errorStyles}>{String(errors.us_username.message)}</p>}
            </article>

            {isRegister && (
                <article>
                    <label className={labelStyles} htmlFor="nombre_completo">Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        placeholder="Juan Pérez"
                        className={inputStyles}
                        {...register('us_nombre_completo' as Path<T>)}
                    />
                    {errors['us_nombre_completo' as keyof FieldErrors<T>] && (
                        <p className={errorStyles}>{String(errors['us_nombre_completo' as keyof FieldErrors<T>]?.message)}</p>
                    )}
                </article>
            )}

            <article>
                <label className={labelStyles} htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className={inputStyles}
                    {...register('us_password_encriptado' as Path<T>)}
                />
                {errors.us_password_encriptado?.message && <p className={errorStyles}>{String(errors.us_password_encriptado.message)}</p>}
            </article>

            {isRegister && (
                <article className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <input
                        type="checkbox"
                        id="estado"
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        {...register('us_estado' as Path<T>)}
                        defaultChecked={true}
                    />
                    <label htmlFor="estado" className="text-sm font-medium text-blue-800 cursor-pointer">
                        Activar cuenta inmediatamente
                    </label>
                </article>
            )}
        </div>
    );
}