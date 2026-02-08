
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProductsImpl } from "../services/products.service";
import type { CreateProductDto, Product, UpdateProductDto } from "../types/products.types";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => ProductsImpl.getAllProducts(),
        retry: 1,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ product, categoryId }: { product: CreateProductDto; categoryId: string }) =>
            ProductsImpl.createProduct(product, categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            // Optionally invalidate categories if product count is tracked there, but usually not needed.
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            product,
            productId,
            categoryId,
        }: {
            product: UpdateProductDto;
            productId: string;
            categoryId: string;
        }) => ProductsImpl.updateProduct(product, productId, categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProductsImpl.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

export const useProductsHandlers = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const { mutate: createMutation, isPending: isCreating } = useCreateProduct();
    const { mutate: updateMutation, isPending: isUpdating } = useUpdateProduct();

    const isLoading = isCreating || isUpdating;

    const handleEditProduct = (product: Product) => {
        setIsEditing(true);
        setSelectedProduct(product);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedProduct(undefined);
    };

    const handleSubmitForm = (data: CreateProductDto | UpdateProductDto) => {
        // Logic to extract categoryId from data or context needs to be handled by the component calling this.
        // However, assuming the form provides the full DTO which includes pr_category_id.

        const categoryId = data.pr_category_id;

        if (!categoryId) {
            console.error("CategoryId is missing in product data");
            return;
        }

        if (isEditing && selectedProduct) {
            // For update, we might need to conform to UpdateProductDto
            // We cast data as UpdateProductDto since the form should provide compatible data
            const updateData = data as UpdateProductDto;

            updateMutation({
                product: updateData,
                productId: selectedProduct.pr_id!, // Assumed present if editing
                categoryId
            });
        } else {
            const createData = data as CreateProductDto;
            createMutation({ product: createData, categoryId });
        }
        handleCancelEdit();
    };

    return {
        handleEditProduct,
        handleCancelEdit,
        handleSubmitForm,
        isEditing,
        selectedProduct,
        isLoading,
    };
};
