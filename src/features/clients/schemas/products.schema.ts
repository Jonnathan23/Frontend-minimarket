import { array, boolean, number, object, string } from "zod";


export const ProductSchema = object({
    pr_id: string(),
    pr_name: string(),
    pr_price: number(),
    pr_availability: boolean(),
    pr_category_id: string(),
    pr_stock: number(),
});

export const AllProductsSchema = array(ProductSchema);