import { api } from "../../../core/api/config";
import { AuthResponseSchema } from "../schemas/auth.schema";
import type { AuthResponse, CreateUserDTO, LoginUserDTO } from "../types/auth.types";




export const AuthRepositoryImpl = {
    login: async (credentials: LoginUserDTO): Promise<void> => {
        try {
            const url = `auth/login`;
            const authResponse = await api.post<AuthResponse, LoginUserDTO>(url, credentials, AuthResponseSchema);
            localStorage.setItem("token", authResponse.token);
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    register: async (credentials: CreateUserDTO): Promise<string> => {
        try {
            const url = `auth/register`;
            const authResponse = await api.post<string, CreateUserDTO>(url, credentials);
            return authResponse;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}