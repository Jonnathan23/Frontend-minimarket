import { useForm } from "react-hook-form";

import AuthForm from "../components/AuthForm";
import type { LoginUserDTO } from "../types/auth.types";




export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDTO>();

    const onSubmit = (data: LoginUserDTO) => {
        console.log(data);
    };
    

    return (
        <div className="p-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
                <p className="text-gray-500 mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AuthForm isRegister={false} register={register} errors={errors} />

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}
