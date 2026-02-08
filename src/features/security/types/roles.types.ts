import { z } from 'zod'
import type { AllRolesSchema, RoleSchema } from "../schemas/roles.schema";

export type Role = z.infer<typeof RoleSchema>;
export type AllRoles = z.infer<typeof AllRolesSchema>;


export interface CreateRoleDTO {
    ro_nombre_del_rol: string;
}

export interface UpdateRoleDTO {
    ro_id: string;
    ro_nombre_del_rol: string;
}

export const ROLES = {
    ADMIN: "ADMIN",
    VENDEDOR: "VENDEDOR",
    BODEGUERO: "BODEGUERO" // Asumo este rol para productos/proveedores
};