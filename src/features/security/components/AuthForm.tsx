import { type FieldErrors, type Path, type UseFormRegister } from 'react-hook-form';

import type { CreateUserDTO, LoginUserDTO } from '../types/auth.types';
import { ErrorFormMessage } from '../../../core/components/ErrorFormMessage';



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


    const getInputClass = (hasError: boolean) => `${inputStyles} ${hasError ? 'border-red-500 focus:ring-red-200' : ''}`;

    return (
        <div className="space-y-5">
            <article>
                <label className={labelStyles} htmlFor="username">Usuario</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Ej. admin_market"
                    className={getInputClass(!!errors.us_username)}
                    {...register('us_username' as Path<T>, {
                        required: "El nombre de usuario es obligatorio",
                        minLength: { value: 3, message: "Mínimo 3 caracteres" }
                    })}
                />
                <ErrorFormMessage>
                    {errors.us_username?.message as string}
                </ErrorFormMessage>
            </article>

            {isRegister && (
                <article>
                    <label className={labelStyles} htmlFor="nombre_completo">Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        placeholder="Juan Pérez"
                        className={getInputClass(!!errors['us_nombre_completo' as keyof FieldErrors<T>])}
                        {...register('us_nombre_completo' as Path<T>, {
                            required: "El nombre completo es obligatorio"
                        })}
                    />
                    <ErrorFormMessage>
                        {errors['us_nombre_completo' as keyof FieldErrors<T>]?.message as string}
                    </ErrorFormMessage>
                </article>
            )}

            <article>
                <label className={labelStyles} htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className={getInputClass(!!errors.us_password_encriptado)}
                    {...register('us_password_encriptado' as Path<T>, {
                        required: "La contraseña es obligatoria",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                />
                <ErrorFormMessage>
                    {errors.us_password_encriptado?.message as string}
                </ErrorFormMessage>
            </article>
        </div>
    );
}