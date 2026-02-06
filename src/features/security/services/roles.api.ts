import { api } from "../../../core/api/config";
import { AllRolesSchema } from "../schemas/roles.schema";
import type { AllRoles } from "../types/roles.types";


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
    }
}