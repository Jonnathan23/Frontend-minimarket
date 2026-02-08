import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import { AllRolesSchema } from "../schemas/roles.schema";
import type { AllRoles, CreateRoleDTO, Role, UpdateRoleDTO } from "../types/roles.types";


export const RolesImpl = {
    getAllRoles: async () => {
        try {
            const url = `/roles/`
            const dataResponse = await api.get<AllRoles>(url, AllRolesSchema)
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener los roles:", error);
            throw error;
        }
    },

    createRole: async (role: CreateRoleDTO) => {
        try {
            const url = `/roles/`
            const dataResponse = await api.post<ApiMessageResponse, CreateRoleDTO>(url, role)
            return dataResponse;
        } catch (error) {
            console.error("Error al crear el rol:", error);
            throw error;
        }
    },

    updateRole: async (role: UpdateRoleDTO) => {
        try {
            const url = `/roles/${role.ro_id}`
            const body: CreateRoleDTO = { ro_nombre_del_rol: role.ro_nombre_del_rol }

            const dataResponse = await api.put<ApiMessageResponse, CreateRoleDTO>(url, body)
            return dataResponse;
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
            throw error;
        }
    },

    deleteRole: async (roleId: Role['ro_id']) => {
        try {
            const url = `/roles/${roleId}`
            const dataResponse = await api.delete<ApiMessageResponse>(url)
            return dataResponse;
        } catch (error) {
            console.error("Error al eliminar el rol:", error);
            throw error;
        }
    },

}