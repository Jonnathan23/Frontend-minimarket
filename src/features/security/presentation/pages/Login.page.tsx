import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import type { LoginUserDTO } from "../../domain/entities/user.entity";
import { useForm } from "react-hook-form";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDTO>();

    const onSubmit = (data: LoginUserDTO) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthForm isRegister={false} register={register} errors={errors} />

                <div>
                    <button>Iniciar Sesión</button>
                </div>

                <div>
                    <p>¿No tienes una cuenta?</p>
                    <Link to="/register">Registrarse</Link>
                </div>
            </form>
        </>
    );
}
