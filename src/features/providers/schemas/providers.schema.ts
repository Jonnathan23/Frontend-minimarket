import { object, string } from "zod";


export const ProviderSchema = object({
    po_id: string(),
    po_nombre: string().min(3, "El nombre debe tener al menos 3 caracteres"),
    po_RUC_NIT: string().min(5, "El RUC/NIT debe tener al menos 5 caracteres"),
    po_correo: string().email("Formato de correo inválido"),
    po_direccion: string().min(5, "Dirección requerida (min 5 caracteres)"),
    po_telefono: string().min(7, "Teléfono inválido (min 7 caracteres)")
});

export const AllProvidersSchema = object({
    po_id: string(),
    po_nombre: string(),
    po_RUC_NIT: string(),
    po_correo: string().email(),
    po_direccion: string(),
    po_telefono: string()
}).array();
