import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AuthRepositoryImpl } from "../services/auth.api"
import type { CreateUserDTO, LoginUserDTO } from "../types/auth.types"
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter"
import { useNavigate } from "react-router-dom"
import type { UseFormReset } from "react-hook-form"


type resetForm = UseFormReset<CreateUserDTO>

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => AuthRepositoryImpl.getAllUsers(),

    })
}

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


export const useRegister = (resetForm: resetForm) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials: CreateUserDTO) => AuthRepositoryImpl.register(credentials),
        onSuccess: (data) => {
            resetForm();
            ShowMessageAdapter.success(data);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => { ShowMessageAdapter.error(error.message); }
    })
}

