
import { useForm } from "react-hook-form";
import { Package, Save } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import type { CreateInventoryMovementDto } from "../types/inventory.types";
import { useGetAllProducts } from "../../clients/hooks/useProducts";

interface InventoryFormProps {
    isLoading: boolean;
    onSubmitProp: (data: CreateInventoryMovementDto) => void;
}

export default function InventoryAdjustmentForm({ isLoading, onSubmitProp }: InventoryFormProps) {

    // We add productId to the form data manually as it's part of our extended DTO for the form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateInventoryMovementDto & { productId: string }>({
        defaultValues: {
            im_tipo: "ENTRADA",
            im_cantidad: 1,
            im_referencia: "",
            productId: ""
        }
    });

    const { data: products } = useGetAllProducts();

    const handleFormSubmit = (data: CreateInventoryMovementDto & { productId: string }) => {
        onSubmitProp({
            ...data,
            im_cantidad: Number(data.im_cantidad)
        });
        reset({
            im_tipo: "ENTRADA",
            im_cantidad: 1,
            im_referencia: "",
            productId: ""
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                    <Package size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    Ajuste de Inventario
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                {/* Producto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.productId ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-orange-100 focus:border-orange-500"
                            }`}
                        {...register("productId", { required: "Seleccione un producto" })}
                        defaultValue=""
                    >
                        <option value="" disabled>Seleccione...</option>
                        {products?.map(p => (
                            <option key={p.pr_id} value={p.pr_id}>{p.pr_name} (Stock: {p.pr_stock})</option>
                        ))}
                    </select>
                    <ErrorFormMessage>{errors.productId?.message}</ErrorFormMessage>
                </div>

                {/* Tipo de Ajuste */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Ajuste</label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.im_tipo ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-orange-100 focus:border-orange-500"
                            }`}
                        {...register("im_tipo", { required: "Seleccione un tipo" })}
                    >
                        <option value="ENTRADA">ENTRADA (Aumentar Stock)</option>
                        <option value="SALIDA">SALIDA (Disminuir Stock)</option>
                    </select>
                    <ErrorFormMessage>{errors.im_tipo?.message}</ErrorFormMessage>
                </div>

                {/* Cantidad */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <input
                        type="number"
                        min="1"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.im_cantidad ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-orange-100 focus:border-orange-500"
                            }`}
                        {...register("im_cantidad", { required: "Requerido", min: { value: 1, message: "Mínimo 1" }, valueAsNumber: true })}
                    />
                    <ErrorFormMessage>{errors.im_cantidad?.message}</ErrorFormMessage>
                </div>

                {/* Referencia */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referencia / Motivo</label>
                    <textarea
                        rows={2}
                        placeholder="Ej. Rotura en almacén, Regalo promocional..."
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.im_referencia ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-orange-100 focus:border-orange-500"
                            }`}
                        {...register("im_referencia", { required: "Referencia requerida", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                    />
                    <ErrorFormMessage>{errors.im_referencia?.message}</ErrorFormMessage>
                </div>

                {/* Botón */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "bg-orange-200 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 cursor-pointer"} w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm shadow-orange-100`}
                    >
                        <Save size={18} />
                        Guardar Ajuste
                    </button>
                </div>

            </form>
        </div>
    );
}
