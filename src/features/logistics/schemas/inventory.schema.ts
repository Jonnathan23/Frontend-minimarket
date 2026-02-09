import { coerce, object, string, z } from "zod";

export const InventoryMovementSchema = object({
    im_id: string().uuid().optional(),
    im_fecha: string().optional(), // Backend usually sets this
    im_tipo: z.enum(["ENTRADA", "SALIDA"]),
    im_cantidad: coerce.number().int("Debe ser un número entero").positive("La cantidad debe ser positiva"),
    im_referencia: string().min(3, "La referencia debe tener al menos 3 caracteres"),

    // Virtual field for form handling, not necessarily in the movement object response structure from some endpoints
    productId: string().uuid("Seleccione un producto válido"),

    // Optional populated product field for lists
    product: object({
        pr_name: string(),
    }).optional()
});

export const AllInventoryMovementsSchema = InventoryMovementSchema.array();
