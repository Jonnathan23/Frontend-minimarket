import { object, string, boolean } from 'zod';


export const UserSchema = object({
    us_id: string().optional(),
    us_username: string(),
    us_password_encriptado: string(),
    us_nombre_completo: string(),
    us_estado: boolean().optional()
});

export const AuthResponseSchema = object({
    token: string(),
});