
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ProductsImpl } from "../services/products.service";
import type { CreateProductDto, Product, UpdateProductDto } from "../types/products.types";
import { ShowMessageAdapter } from "../../../core/utils/MessageAdapter";

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
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

interface UpdateProductParams {
    product: UpdateProductDto;
    productId: string;
    categoryId: string;
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ product, productId, categoryId }: UpdateProductParams) =>
            ProductsImpl.updateProduct(product, productId, categoryId),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.success(message);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProductsImpl.deleteProduct(id),
        onSuccess: ({ message }) => {
            ShowMessageAdapter.info(message);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            ShowMessageAdapter.error(error.message);
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
        const categoryId = data.pr_category_id;

        if (!categoryId) {
            console.error("CategoryId is missing in product data");
            return;
        }

        if (isEditing && selectedProduct) {
            const updateData = data as UpdateProductDto;

            updateMutation({
                product: updateData,
                productId: selectedProduct.pr_id!,
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
