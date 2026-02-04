import { useMutation } from "@tanstack/react-query"
import { AuthRepositoryImpl } from "../services/auth.api"
import type { CreateUserDTO, LoginUserDTO } from "../types/auth.types"
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter"
import { useNavigate } from "react-router-dom"



export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: LoginUserDTO) => AuthRepositoryImpl.login(credentials),
        onSuccess: () => {
            navigate("/");
            ShowMessageAdapter.success("Bienvenido al sistema");
        },
        onError: (error) => { ShowMessageAdapter.error(error.message); }
    })
}


export const useRegister = () => {
    return useMutation({
        mutationFn: (credentials: CreateUserDTO) => AuthRepositoryImpl.register(credentials),
        onSuccess: (data) => { ShowMessageAdapter.success(data); },
        onError: (error) => { ShowMessageAdapter.error(error.message); }
    })
}