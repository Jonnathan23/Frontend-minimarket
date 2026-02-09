
import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import { AllCashMovementsSchema } from "../schemas/cash.schema";
import { AllInventoryMovementsSchema } from "../schemas/inventory.schema";
import type { AllCashMovements, CreateCashMovementDto } from "../types/cash.types";
import type { AllInventoryMovements, CreateInventoryMovementDto } from "../types/inventory.types";

export const LogisticsImpl = {
    // --- Cash ---
    getAllCashMovements: async () => {
        try {
            const url = `/cash/`;
            const dataResponse = await api.get<AllCashMovements>(url, AllCashMovementsSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener movimientos de caja:", error);
            throw error;
        }
    },

    createCashMovement: async (cashMovement: CreateCashMovementDto) => {
        try {
            const url = `/cash/cash`;
            const dataResponse = await api.post<ApiMessageResponse, CreateCashMovementDto>(url, cashMovement);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear movimiento de caja:", error);
            throw error;
        }
    },

    // --- Inventory ---
    getAllInventoryMovements: async () => {
        try {
            const url = `/inventory/`;
            const dataResponse = await api.get<AllInventoryMovements>(url, AllInventoryMovementsSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener movimientos de inventario:", error);
            throw error;
        }
    },

    createInventoryAdjustment: async (inventoryMovement: CreateInventoryMovementDto) => {
        try {
            // URL: /api/inventory/movement/:productId
            const { productId, ...body } = inventoryMovement;
            const url = `/inventory/movement/${productId}`;
            const dataResponse = await api.post<ApiMessageResponse, Omit<CreateInventoryMovementDto, "productId">>(url, body);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear ajuste de inventario:", error);
            throw error;
        }
    }
};
