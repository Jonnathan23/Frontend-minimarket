import { useMutation } from "@tanstack/react-query"
import { AuthRepositoryImpl } from "../services/auth.api"
import type { CreateUserDTO, LoginUserDTO } from "../types/auth.types"
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter"



export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: LoginUserDTO) => AuthRepositoryImpl.login(credentials),
        onSuccess: () => { ShowMessageAdapter.success("Bienvenido al sistema"); },
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