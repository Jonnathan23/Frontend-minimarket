import { api } from "../../../core/api/config";
import { JwtAdapter } from "../../../core/utils/Jwt";
import { AllUsersSchema, AuthResponseSchema } from "../schemas/auth.schema";
import type { AuthResponse, CreateUserDTO, DecodedToken, LoginUserDTO, User } from "../types/auth.types";




export const AuthRepositoryImpl = {
    login: async (credentials: LoginUserDTO): Promise<void> => {
        try {
            const url = `auth/login`;
            const authResponse = await api.post<AuthResponse, LoginUserDTO>(url, credentials, AuthResponseSchema);
            const data = JwtAdapter.decodeToken<DecodedToken>(authResponse.token);           
            
            localStorage.setItem("token", authResponse.token);            
            localStorage.setItem("role", data.role || "INVITADO");
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
    },

    getAllUsers: async (): Promise<User[]> => {
        try {
            const url = `auth/users`;
            const users = await api.get<User[]>(url, AllUsersSchema);
            return users;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
}