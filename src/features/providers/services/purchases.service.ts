
import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import { AllPurchasesSchema } from "../schemas/purchases.schema";
import type { AllPurchases, CreatePurchaseDto } from "../types/purchases.types";

export const PurchasesImpl = {
    getAllPurchases: async () => {
        try {
            const url = `/purchases/`;
            // Note: Schema might need adjustment if backend returns different structure for list vs detail
            // But proceeding with AllPurchasesSchema for now.
            const dataResponse = await api.get<AllPurchases>(url, AllPurchasesSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener las compras:", error);
            throw error;
        }
    },

    createPurchase: async (purchase: CreatePurchaseDto, providerId: string, productId: string) => {
        try {
            // URL: /api/purchases/purchase/:providerId/product/:productId
            const url = `/purchases/purchase/${providerId}/product/${productId}`;
            const dataResponse = await api.post<ApiMessageResponse, CreatePurchaseDto>(url, purchase);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear la compra:", error);
            throw error;
        }
    },

    // Additional methods like deletePurchase could be added here if backend supports it
};
