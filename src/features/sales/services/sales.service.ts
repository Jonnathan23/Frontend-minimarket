
import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import type { CreateSaleDto } from "../types/sales.types";

export const SalesImpl = {
    createSale: async (sale: CreateSaleDto) => {
        try {
            // Updated to ensure it matches the requirement, assuming /sales base path 
            // If the user said /api/sales/, and base url is /api, then it's /sales/
            const url = `/sales/`;
            const dataResponse = await api.post<ApiMessageResponse, CreateSaleDto>(url, sale);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear la venta:", error);
            throw error;
        }
    }
};
