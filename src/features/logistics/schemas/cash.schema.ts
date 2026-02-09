import { coerce, object, string, z } from "zod";

export const CashMovementSchema = object({
    cm_id: string().uuid().optional(),
    cm_fecha: string().or(z.date()), // ISO String or Date object
    cm_tipo: z.enum(["APERTURA", "ARQUEO", "CIERRE"]),
    cm_monto: coerce.number().positive("El monto debe ser positivo"),
});

export const AllCashMovementsSchema = CashMovementSchema.array();
