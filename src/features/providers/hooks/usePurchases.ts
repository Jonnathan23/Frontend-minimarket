
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PurchasesImpl } from "../services/purchases.service";
import type { CreatePurchaseDto } from "../types/purchases.types";
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter";

export const useGetAllPurchases = () => {
    return useQuery({
        queryKey: ["purchases"],
        queryFn: () => PurchasesImpl.getAllPurchases(),
        retry: 1,
    });
};

interface CreatePurchaseParams {
    purchase: CreatePurchaseDto;
    providerId: string;
    productId: string;
}

export const useCreatePurchase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ purchase, providerId, productId }: CreatePurchaseParams) =>
            PurchasesImpl.createPurchase(purchase, providerId, productId),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["purchases"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const usePurchasesHandlers = () => {
    const { mutate: createMutation, isPending: isCreating } = useCreatePurchase();

    // As purchases are usually immutable logs, we probably don't need update/delete logic right now
    // based on the requirements.

    const isLoading = isCreating;

    const handleSubmitForm = (data: CreatePurchaseDto, providerId: string, productId: string) => {
        createMutation({ purchase: data, providerId, productId });
    };

    return {
        handleSubmitForm,
        isLoading,
    };
};
