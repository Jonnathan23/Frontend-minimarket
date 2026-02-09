import { z } from "zod";

import type { ProductSchema } from "../schemas/products.schema";


export type Product = z.infer<typeof ProductSchema>;

export interface CreateProductDto {
    pr_name: string;
    pr_price: number;
    pr_availability: boolean;
    pr_category_id: string;
    pr_stock: number;
}

export interface UpdateProductDto {
    pr_name: string;
    pr_price: number;
    pr_availability: boolean;
    pr_category_id: string;
    pr_stock: number;
}

export interface UpdateProductStockDto {
    pr_stock: number;
}