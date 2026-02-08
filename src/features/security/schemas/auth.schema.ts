import { object, string, array } from 'zod';


export const UserSchema = object({
    us_id: string(),
    us_username: string(),
    us_nombre_completo: string(),
    role: object({
        ro_nombre_del_rol: string()
    })
});

export const AllUsersSchema = array(UserSchema);

export const AuthResponseSchema = object({
    token: string()
});