import { array, object, string } from 'zod';


export const RoleSchema = object({
    ro_id: string(),
    ro_nombre_del_rol: string()
})

export const AllRolesSchema = array(RoleSchema);