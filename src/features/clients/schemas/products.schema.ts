import { array, boolean, number, object, string, coerce } from "zod";


export const ProductSchema = object({
    pr_id: string().uuid().optional(),
    pr_name: string().min(3),
    pr_price: coerce.number().positive(), // Sequelize returns DECIMAL as string
    pr_availability: boolean(),
    pr_category_id: string().uuid(),
    pr_stock: number().int().nonnegative().default(0),
});

export const AllProductsSchema = array(ProductSchema);