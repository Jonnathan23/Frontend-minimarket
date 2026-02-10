
import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import { AllCashMovementsSchema } from "../schemas/cash.schema";
import { AllInventoryMovementsSchema } from "../schemas/inventory.schema";
import type { AllCashMovements, CreateCashMovementDto } from "../types/cash.types";
import type { AllInventoryMovements, CreateInventoryMovementDto } from "../types/inventory.types";

export const LogisticsImpl = {
    
    getAllCashMovements: async () => {
        try {            
            const url = `/cash-movements/`;
            const dataResponse = await api.get<AllCashMovements>(url, AllCashMovementsSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener movimientos de caja:", error);
            throw error;
        }
    },

    createCashMovement: async (cashMovement: CreateCashMovementDto) => {
        try {
            const url = `/cash-movements/cash`;
            const dataResponse = await api.post<ApiMessageResponse, CreateCashMovementDto>(url, cashMovement);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear movimiento de caja:", error);
            throw error;
        }
    },

    getAllInventoryMovements: async () => {
        try {
            const url = `/inventory-movements/`;
            const dataResponse = await api.get<AllInventoryMovements>(url, AllInventoryMovementsSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener movimientos de inventario:", error);
            throw error;
        }
    },

    createInventoryAdjustment: async (inventoryMovement: CreateInventoryMovementDto) => {
        try {
            const { im_product_id, ...body } = inventoryMovement;
            
            const url = `/inventory-movements/movement/${im_product_id}`;
            
            const dataResponse = await api.post<ApiMessageResponse, Omit<CreateInventoryMovementDto, "im_product_id">>(url, body);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear ajuste de inventario:", error);
            throw error;
        }
    }
};
