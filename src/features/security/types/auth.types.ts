import type { z } from "zod";

import type { Role } from "./roles.types";
import type { UserSchema } from "../schemas/auth.schema";



export type User = z.infer<typeof UserSchema>;

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

export interface DecodedToken {
    id: string;
    role: string;
    exp: number;
    iat: number;
}