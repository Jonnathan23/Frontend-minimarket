import type { z } from "zod";
import type { SaleSchema, SaleDetailSchema } from "../schemas/sales.schema";

export type Sale = z.infer<typeof SaleSchema>;
export type SaleDetail = z.infer<typeof SaleDetailSchema>;

export type CreateSaleDto = Sale; // The schema now defines the exact creation structure

// Frontend specific type for the Reducer/UI
export interface SalesDetailItem {
    tempId: string; // Generated on the frontend
    product_id: string; // The ID of the product
    productName: string; // for UI display
    quantity: number;
    price: number;
    subtotal: number;
}
