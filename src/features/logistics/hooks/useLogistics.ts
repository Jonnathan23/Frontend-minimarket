
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogisticsImpl } from "../services/logistics.service";
import type { CreateCashMovementDto } from "../types/cash.types";
import type { CreateInventoryMovementDto } from "../types/inventory.types";
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter";

// --- Cash Hooks ---
export const useGetAllCashMovements = () => {
    return useQuery({
        queryKey: ["cash-movements"],
        queryFn: () => LogisticsImpl.getAllCashMovements(),
        retry: 1,
    });
};

export const useCreateCashMovement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCashMovementDto) => LogisticsImpl.createCashMovement(data),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["cash-movements"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

// --- Inventory Hooks ---
export const useGetAllInventoryMovements = () => {
    return useQuery({
        queryKey: ["inventory-movements"],
        queryFn: () => LogisticsImpl.getAllInventoryMovements(),
        retry: 1,
    });
};

export const useCreateInventoryAdjustment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateInventoryMovementDto) => LogisticsImpl.createInventoryAdjustment(data),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["inventory-movements"] });
            // Also invalidate products to update stock if needed, assuming they share context or we want fresh stock
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};
