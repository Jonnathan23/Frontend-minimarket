import { api } from "../../../core/api/config";
import { AuthResponseSchema } from "../schemas/auth.schema";
import type { AuthResponse, CreateUserDTO, LoginUserDTO } from "../types/auth.types";




export const AuthRepositoryImpl = {
    login: async (credentials: LoginUserDTO) => {
        try {
            const url = `/login`;
            const authResponse = await api.post<AuthResponse, LoginUserDTO>(url, credentials, AuthResponseSchema);
            return authResponse;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    register: async (credentials: CreateUserDTO) => {
        try {
            const url = `/register`;
            const authResponse = await api.post<string, CreateUserDTO>(url, credentials);
            return authResponse;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}