import { type FieldErrors, type Path, type UseFormRegister } from 'react-hook-form';

import type { CreateUserDTO, LoginUserDTO } from '../types/auth.types';
import { ErrorFormMessage } from '../../../core/components/ErrorFormMessage';
import { useGetAllRoles } from '../hooks/useRoles.use';
import type { Role } from '../types/roles.types';



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

    const { data: roles, isLoading: loadingRoles } = useGetAllRoles();


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

            {isRegister && (<>

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

                <article>
                    <label className={labelStyles} htmlFor="role">Asignar Rol</label>
                    <div className="relative">
                        <select
                            id="role"
                            disabled={loadingRoles}
                            className={`${getInputClass(!!errors['us_role_id' as keyof FieldErrors<T>])} appearance-none cursor-pointer`}
                            {...register('us_role_id' as Path<T>, {
                                required: "Debes asignar un rol al usuario"
                            })}
                        >
                            <option value="">-- Seleccionar Rol --</option>
                            {/* Mapeamos los roles traídos de la DB */}
                            {roles?.map((role: Role) => (
                                <option key={role.ro_id} value={role.ro_id}>
                                    {role.ro_nombre_del_rol}
                                </option>
                            ))}
                        </select>

                        {/* Icono de flechita para el select (decorativo) */}
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>

                    {loadingRoles && <p className="text-xs text-gray-400 mt-1">Cargando roles...</p>}

                    <ErrorFormMessage>
                        {errors['us_role_id' as keyof FieldErrors<T>]?.message as string}
                    </ErrorFormMessage>
                </article>
            </>
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