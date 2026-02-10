import { string, z } from "zod";

export const InventoryMovementSchema = z.object({
    im_id: string(),
    im_fecha: string().optional(),
    im_tipo: z.enum(["ENTRADA", "SALIDA"]),

    // 👇 CORRECCIÓN AQUÍ: Usar el nombre real de la columna de BD
    im_product_id: string().uuid("Seleccione un producto válido"),

    im_cantidad: z.coerce.number().int("Debe ser un número entero").positive("La cantidad debe ser positiva"),
    im_referencia: string().min(3, "La referencia debe tener al menos 3 caracteres"),

    // Objeto anidado (Opcional, pero ideal para mostrar nombres en la tabla)
    product: z.object({
        pr_name: z.string(),
    }).optional()
});

export const AllInventoryMovementsSchema = z.array(InventoryMovementSchema);