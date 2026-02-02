import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import type { CreateUserDTO } from "../../domain/entities/user.entity";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateUserDTO>();

    const onSubmit = (data: CreateUserDTO) => {
        setValue('us_estado', true);
        console.log(data);
    };

    return (
        <div className="p-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
                <p className="text-gray-500 mt-1">Registra un nuevo usuario administrativo</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AuthForm isRegister={true} register={register} errors={errors} />

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-100">
                    Registrar Usuario
                </button>

                <div className="pt-4 text-center border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="text-blue-600 font-bold hover:underline">
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
