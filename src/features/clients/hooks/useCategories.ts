
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CategoriesImpl } from "../services/categories.service";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "../types/categories.types";
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter";

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => CategoriesImpl.getAllCategories(),
        retry: 1,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (category: CreateCategoryDto) => CategoriesImpl.createCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            ShowMessageAdapter.success("Categoría creada exitosamente");
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

interface UpdateCategoryOptions {
    id: string;
    data: UpdateCategoryDto;
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: UpdateCategoryOptions) =>
            CategoriesImpl.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            ShowMessageAdapter.success("Categoría actualizada exitosamente");
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => CategoriesImpl.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            ShowMessageAdapter.info("Categoría eliminada exitosamente");
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const useCategoriesHandlers = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

    const { mutate: createMutation, isPending: isCreating } = useCreateCategory();
    const { mutate: updateMutation, isPending: isUpdating } = useUpdateCategory();

    const isLoading = isCreating || isUpdating;

    const handleEditCategory = (category: Category) => {
        setIsEditing(true);
        setSelectedCategory(category);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedCategory(undefined);
    };

    const handleSubmitForm = (data: CreateCategoryDto) => {
        if (isEditing && selectedCategory) {
            updateMutation({ id: selectedCategory.ca_id, data });
        } else {
            createMutation(data);
        }
        handleCancelEdit();
    };

    return {
        handleEditCategory,
        handleCancelEdit,
        handleSubmitForm,
        isEditing,
        selectedCategory,
        isLoading,
    };
};
