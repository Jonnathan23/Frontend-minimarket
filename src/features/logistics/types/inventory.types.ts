import type { z } from "zod";
import type { AllInventoryMovementsSchema, InventoryMovementSchema } from "../schemas/inventory.schema";

export type InventoryMovement = z.infer<typeof InventoryMovementSchema>;
export type AllInventoryMovements = z.infer<typeof AllInventoryMovementsSchema>;

export type CreateInventoryMovementDto = Omit<InventoryMovement, "im_id" | "im_fecha" | "product">;
