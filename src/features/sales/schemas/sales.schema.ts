import { coerce, array, object, string, z } from "zod";

export const SaleDetailSchema = object({
    sd_product_id: string().uuid("Producto inválido"),
    sd_cantidad: coerce.number().int().positive("La cantidad debe ser mayor a 0"),
    sd_precio_unitario: coerce.number().positive("El precio debe ser mayor a 0"),
});

export const SaleSchema = object({
    sa_client_name: string().min(3, "Nombre del cliente requerido (min 3 caracteres)"),
    sa_client_ci: string().min(5, "CI/RUC requerido (min 5 caracteres)"),
    sa_fecha: string().or(z.date()), // Date or ISO string
    sa_total: coerce.number().min(0, "El total no puede ser negativo"),
    sa_medio_de_pago: z.enum(["EFECTIVO", "TARJETA", "TRANSFERENCIA"], {
        message: "Seleccione un medio de pago válido"
    }),
    details: array(SaleDetailSchema).min(1, "Debe agregar al menos un producto a la venta")
});
