import { useForm } from "react-hook-form";
import type { CreateUserDTO } from "../types/auth.types";
import AuthForm from "../components/AuthForm";
import { useRegister } from "../hooks/useAuth.use";



export default function RegisterPage() {

    //* Hooks
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserDTO>();
    const { mutate, isPending } = useRegister();


    //* Events
    const onSubmit = (data: CreateUserDTO) => { mutate(data); };

    return (
        <section className="grow flex items-center justify-center p-4">
            <div className="p-8 w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
                    <p className="text-gray-500 mt-1">Registra un nuevo usuario administrativo</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <AuthForm isRegister={true} register={register} errors={errors} />

                    <button disabled={isPending} className={` ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"} w-full text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-100`}>
                        {isPending ? "Registrando..." : "Registrar Usuario"}
                    </button>
                </form>
            </div>
        </section>
    );
}
