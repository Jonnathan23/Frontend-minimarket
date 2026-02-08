
import { api } from "../../../core/api/config";
import { AllProductsSchema } from "../schemas/products.schema";
import type { CreateProductDto, Product, UpdateProductDto } from "../types/products.types";

export const ProductsImpl = {
    getAllProducts: async () => {
        try {
            const url = `/products/`;
            const dataResponse = await api.get<Product[]>(url, AllProductsSchema);
            return dataResponse;
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            throw error;
        }
    },

    createProduct: async (product: CreateProductDto, categoryId: string) => {
        try {
            // URL: /api/products/category/:categoryId
            const url = `/products/category/${categoryId}`;
            const dataResponse = await api.post<string, CreateProductDto>(url, product);
            return dataResponse;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    },

    updateProduct: async (product: UpdateProductDto, productId: string, categoryId: string) => {
        try {
            // URL: /api/products/:productId/category/:categoryId
            const url = `/products/${productId}/category/${categoryId}`;
            const dataResponse = await api.put<string, UpdateProductDto>(url, product);
            return dataResponse;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error;
        }
    },

    deleteProduct: async (productId: string) => {
        try {
            // URL: /api/products/:productId
            const url = `/products/${productId}`;
            const dataResponse = await api.delete<string>(url);
            return dataResponse;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error;
        }
    },
};
