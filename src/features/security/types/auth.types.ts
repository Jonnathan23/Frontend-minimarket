import type { Role } from "./roles.types";


export interface User {
    us_id?: string;
    us_username: string;
    us_password_encriptado: string;
    us_nombre_completo?: string;
    us_estado: boolean;
    us_createdAt?: Date;
    us_updatedAt?: Date;
}

export interface LoginUserDTO {
    us_username: string;
    us_password_encriptado: string;
}

export interface CreateUserDTO {
    us_username: string;
    us_password_encriptado: string;
    us_nombre_completo: string;
    us_role_id: Role['ro_id'];
}

export interface AuthResponse {
    token: string;
}