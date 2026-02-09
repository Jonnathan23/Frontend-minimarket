import { array, object, string } from "zod";

export const CategorySchema = object({
    ca_id: string(),
    ca_name: string(),
    ca_descripcion: string()
});

export const AllCategoriesSchema = array(CategorySchema);