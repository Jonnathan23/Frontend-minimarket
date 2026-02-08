import { z } from "zod";
import { CategorySchema } from "../schemas/categories.schema";

export type Category = z.infer<typeof CategorySchema>;

export interface CreateCategoryDto {
    ca_name: string;
    ca_descripcion: string;
}

export interface UpdateCategoryDto {
    ca_name: string;
    ca_descripcion: string;
}
