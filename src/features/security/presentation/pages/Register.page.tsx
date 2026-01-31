import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import type { CreateUserDTO } from "../../domain/entities/user.entity";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserDTO>();

    const onSubmit = (data: CreateUserDTO) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthForm isRegister={true} register={register} errors={errors} />

                <div>
                    <button>Registrarse</button>
                </div>

                <div>
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/login">Iniciar Sesión</Link>
                </div>
            </form>
        </>
    );
}
