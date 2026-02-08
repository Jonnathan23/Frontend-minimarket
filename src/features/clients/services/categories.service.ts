
import { api } from "../../../core/api/config";
import type { ApiMessageResponse } from "../../../core/types";
import { AllCategoriesSchema } from "../schemas/categories.schema";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "../types/categories.types";

export const CategoriesImpl = {
    getAllCategories: async () => {
        try {
            const url = `/categories/`;
            const dataResponse = await api.get<Category[]>(url, AllCategoriesSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw error;
        }
    },

    createCategory: async (category: CreateCategoryDto) => {
        try {
            const url = `/categories/`;
            const dataResponse = await api.post<ApiMessageResponse, CreateCategoryDto>(url, category);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            throw error;
        }
    },

    updateCategory: async (categoryId: string, category: UpdateCategoryDto) => {
        try {
            const url = `/categories/${categoryId}`;
            const dataResponse = await api.put<ApiMessageResponse, UpdateCategoryDto>(url, category);
            return dataResponse;
        } catch (error) {
            console.error("Error al actualizar la categoría:", error);
            throw error;
        }
    },

    deleteCategory: async (categoryId: string) => {
        try {
            const url = `/categories/${categoryId}`;
            const dataResponse = await api.delete<ApiMessageResponse>(url);
            return dataResponse;
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            throw error;
        }
    },
};
