
import { useReducer } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { posReducer, initialPOSState } from "../reducers/pos.reducer";
import { SalesImpl } from "../services/sales.service";
import type { CreateSaleDto, SalesDetailItem } from "../types/sales.types";
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter";

export interface ClientSaleData {
    sa_client_name: string;
    sa_client_ci: string;
    sa_medio_de_pago: "EFECTIVO" | "TARJETA" | "TRANSFERENCIA";
}

export const usePOS = () => {
    const [state, dispatch] = useReducer(posReducer, initialPOSState);
    const queryClient = useQueryClient();

    // Derived state
    const activeItem = state.activeId ? (state.items.find(i => i.tempId === state.activeId) || null) : null;
    const total = state.items.reduce((acc, item) => acc + item.subtotal, 0);

    // Mutation
    const { mutate: createSale, isPending: isCreatingSale } = useMutation({
        mutationFn: (data: CreateSaleDto) => SalesImpl.createSale(data),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            dispatch({ type: 'RESET_SALE' });
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            // Also invalidate products to update stock
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });

    // Actions
    const addItem = (item: Omit<SalesDetailItem, "tempId">) => {
        // Generate temp ID
        const newItem: SalesDetailItem = {
            ...item,
            tempId: crypto.randomUUID()
        };
        dispatch({ type: 'ADD_DETAIL', payload: newItem });
    };

    const updateItem = (item: SalesDetailItem) => {
        dispatch({ type: 'UPDATE_DETAIL', payload: item });
    };

    const deleteItem = (tempId: string) => {
        dispatch({ type: 'DELETE_DETAIL', payload: { tempId } });
    };

    const selectItem = (tempId: string) => {
        dispatch({ type: 'SET_ACTIVE_ID', payload: { tempId } });
    };

    const cancelEdit = () => {
        dispatch({ type: 'RESET_ACTIVE_ID' });
    };

    // Updated confirmSale to accept client data
    const confirmSale = (clientData: ClientSaleData) => {
        if (state.items.length === 0) {
            ShowMessageAdapter.error("Agregue productos a la venta");
            return;
        }

        const saleDto: CreateSaleDto = {
            sa_client_name: clientData.sa_client_name,
            sa_client_ci: clientData.sa_client_ci,
            sa_medio_de_pago: clientData.sa_medio_de_pago,
            sa_fecha: new Date().toISOString(), // Current timestamp
            sa_total: total,
            details: state.items.map(item => ({
                sd_product_id: item.product_id,
                sd_cantidad: item.quantity,
                sd_precio_unitario: item.price
            }))
        };

        createSale(saleDto);
    };

    return {
        // State
        items: state.items,
        activeItem,
        total,
        isCreatingSale,

        // Actions
        addItem,
        updateItem,
        deleteItem,
        selectItem,
        cancelEdit,
        confirmSale
    };
};
