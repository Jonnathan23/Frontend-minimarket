import { array, coerce, object, string, z } from "zod";

export const PurchaseDetailSchema = object({
    pd_cantidad: coerce.number().int().positive("La cantidad debe ser un entero positivo"),
    pd_precio_unitario: coerce.number().positive("El precio debe ser positivo")
});

export const PurchaseSchema = object({
    pu_id: string().uuid().optional(),
    pu_fecha: string().or(z.date()), // Backend expects ISO string but form might give Date
    pu_total: coerce.number().positive("El total debe ser positivo"),
    details: array(PurchaseDetailSchema).min(1, "Debe agregar al menos un detalle de compra")
});

export const AllPurchasesSchema = array(object({
    pu_id: string().uuid(),
    pu_fecha: string(),
    pu_total: coerce.number(),
    provider: object({
        po_nombre: string()
    }).optional() // Backend might return populated provider
}));
