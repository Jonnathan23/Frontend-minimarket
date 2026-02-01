import { type FieldErrors, type Path, type UseFormRegister } from 'react-hook-form';

import type { CreateUserDTO, LoginUserDTO } from '../../domain/entities/user.entity';



// Definimos el tipo de la unión
type AuthFormData = LoginUserDTO | CreateUserDTO;

interface AuthFormProps<T extends AuthFormData> {
    isRegister: boolean;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
}

export default function AuthForm<T extends AuthFormData>({
    isRegister,
    register,
    errors
}: AuthFormProps<T>) {

    return (
        <div className="space-y-4">
            <article>
                <label htmlFor="username">Usuario</label>
                <input
                    type="text"
                    id="username"
                    {...register('us_username' as Path<T>)}
                />
                {/* Acceso seguro al mensaje de error sin 'any' */}
                {errors.us_username?.message && (
                    <span className="text-red-500">{String(errors.us_username.message)}</span>
                )}
            </article>

            {isRegister && (
                <article>
                    <label htmlFor="nombre_completo">Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        {...register('us_nombre_completo' as Path<T>)}
                    />
                    {/* Para campos que no están en la unión común, usamos esta sintaxis estricta */}
                    {errors['us_nombre_completo' as keyof FieldErrors<T>] && (
                        <span className="text-red-500">
                            {String(errors['us_nombre_completo' as keyof FieldErrors<T>]?.message)}
                        </span>
                    )}
                </article>
            )}

            <article>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    {...register('us_password_encriptado' as Path<T>)}
                />
                {errors.us_password_encriptado?.message && (
                    <span className="text-red-500">{String(errors.us_password_encriptado.message)}</span>
                )}
            </article>

            {isRegister && (
                <article className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="estado"
                        {...register('us_estado' as Path<T>)}
                        defaultChecked={true}
                    />
                    <label htmlFor="estado">Activo</label>
                </article>
            )}
        </div>
    );
}