import { type FieldErrors, type Path, type UseFormRegister } from 'react-hook-form';
import type { CreateUserDTO, LoginUserDTO } from '../../domain/entities/user.entity';



interface AuthFormProps<T extends LoginUserDTO | CreateUserDTO> {
    isRegister: boolean;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
}

export default function AuthForm<T extends LoginUserDTO | CreateUserDTO>({ 
    isRegister, 
    register, 
    errors 
}: AuthFormProps<T>) {
    return (
        <div className="space-y-4"> {/* Estilos de Tailwind para separar inputs */}
            <article>
                <label htmlFor="username">Usuario</label>
                <input type="text" {...register('us_username' as Path<T>)} />
                {errors.us_username && <span>{errors.us_username?.message as string}</span>}
            </article>

            {isRegister && (
                <article>
                    <label htmlFor="nombre_completo">Nombre Completo</label>
                    <input type="text" {...register('us_nombre_completo' as Path<T>)} />
                    {errors['us_nombre_completo' as keyof FieldErrors<T>] && (
                        <span>{(errors['us_nombre_completo' as keyof FieldErrors<T>] as any)?.message}</span>
                    )}
                </article>
            )}

            <article>
                <label htmlFor="password">Contraseña</label>
                <input type="password" {...register('us_password_encriptado' as Path<T>)} />
                {errors.us_password_encriptado && <span>{errors.us_password_encriptado?.message as string}</span>}
            </article>

            {isRegister && (
                <article className="flex items-center gap-2">
                    <input type="checkbox" {...register('us_estado' as Path<T>)} defaultChecked={true} />
                    <label htmlFor="estado">Activar usuario inmediatamente</label>
                </article>
            )}
        </div>
    );
}