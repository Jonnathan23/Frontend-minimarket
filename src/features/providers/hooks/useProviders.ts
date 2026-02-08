
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProvidersImpl } from "../services/providers.service";
import type { CreateProviderDto, Provider, UpdateProviderDto } from "../types/providers.types";
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter";

export const useGetAllProviders = () => {
    return useQuery({
        queryKey: ["providers"],
        queryFn: () => ProvidersImpl.getAllProviders(),
        retry: 1,
    });
};

export const useCreateProvider = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (provider: CreateProviderDto) => ProvidersImpl.createProvider(provider),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["providers"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const useUpdateProvider = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProviderDto }) =>
            ProvidersImpl.updateProvider(id, data),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["providers"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const useDeleteProvider = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProvidersImpl.deleteProvider(id),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.info(message);
            queryClient.invalidateQueries({ queryKey: ["providers"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const useProvidersHandlers = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<Provider | undefined>(undefined);

    const { mutate: createMutation, isPending: isCreating } = useCreateProvider();
    const { mutate: updateMutation, isPending: isUpdating } = useUpdateProvider();

    const isLoading = isCreating || isUpdating;

    const handleEditProvider = (provider: Provider) => {
        setIsEditing(true);
        setSelectedProvider(provider);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedProvider(undefined);
    };

    const handleSubmitForm = (data: CreateProviderDto) => {
        if (isEditing && selectedProvider) {
            updateMutation({ id: selectedProvider.po_id, data: { ...data, po_id: selectedProvider.po_id } });
            handleCancelEdit();
        } else {
            createMutation(data);
        }
    };

    return {
        handleEditProvider,
        handleCancelEdit,
        handleSubmitForm,
        isEditing,
        selectedProvider,
        isLoading,
    };
};
