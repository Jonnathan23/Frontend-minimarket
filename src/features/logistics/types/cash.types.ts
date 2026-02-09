import type { z } from "zod";
import type { AllCashMovementsSchema, CashMovementSchema } from "../schemas/cash.schema";

export type CashMovement = z.infer<typeof CashMovementSchema>;
export type AllCashMovements = z.infer<typeof AllCashMovementsSchema>;

export type CreateCashMovementDto = Omit<CashMovement, "cm_id">;
