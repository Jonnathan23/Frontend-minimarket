import type { z } from "zod";
import type { AllPurchasesSchema, PurchaseSchema } from "../schemas/purchases.schema";

export type Purchase = z.infer<typeof PurchaseSchema>;
export type AllPurchases = z.infer<typeof AllPurchasesSchema>;

export type CreatePurchaseDto = Omit<Purchase, "pu_id">;
// Purchases usually aren't updated in full, but if needed:
// export type UpdatePurchaseDto = Partial<CreatePurchaseDto>;
