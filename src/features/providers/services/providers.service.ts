
import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import { AllProvidersSchema } from "../schemas/providers.schema";
import type { AllProviders, CreateProviderDto, UpdateProviderDto } from "../types/providers.types";

export const ProvidersImpl = {
    getAllProviders: async () => {
        try {
            const url = `/providers/`;
            const dataResponse = await api.get<AllProviders>(url, AllProvidersSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener los proveedores:", error);
            throw error;
        }
    },

    createProvider: async (provider: CreateProviderDto) => {
        try {
            const url = `/providers/`;
            const dataResponse = await api.post<ApiMessageResponse, CreateProviderDto>(url, provider);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear el proveedor:", error);
            throw error;
        }
    },

    updateProvider: async (providerId: string, provider: UpdateProviderDto) => {
        try {
            const url = `/providers/${providerId}`; // PATCH request
            const dataResponse = await api.patch<ApiMessageResponse, UpdateProviderDto>(url, provider);
            // Note: Api class might not have patch method exposed yet, checking api.ts next.
            // If not, I'll need to add it or use axios instance directly if exposed, or add patch to api.ts
            // Assuming api.patch exists for now based on standard Http methods provided in `api.ts` usually. 
            // WAIT, looking at api.ts content from previous steps... 
            // I recall get, post, put, delete. I need to check if patch is there.
            return dataResponse;
        } catch (error) {
            console.error("Error al actualizar el proveedor:", error);
            throw error;
        }
    },

    deleteProvider: async (providerId: string) => {
        try {
            const url = `/providers/${providerId}`;
            const dataResponse = await api.delete<ApiMessageResponse>(url);
            return dataResponse;
        } catch (error) {
            console.error("Error al eliminar el proveedor:", error);
            throw error;
        }
    },
};
