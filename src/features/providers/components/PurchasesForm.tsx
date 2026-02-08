
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Save } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import type { CreatePurchaseDto } from "../types/purchases.types";
import { useGetAllProviders } from "../hooks/useProviders";
import { useGetAllProducts } from "../../clients/hooks/useProducts";

interface PurchasesFormProps {
    isLoading: boolean;
    onSubmitProp: (data: CreatePurchaseDto, providerId: string, productId: string) => void;
}

interface PurchaseFormData {
    pu_fecha: string;
    pu_total: number;
    providerId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
}

export default function PurchasesForm({ isLoading, onSubmitProp }: PurchasesFormProps) {

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PurchaseFormData>({
        defaultValues: {
            pu_fecha: new Date().toISOString().split('T')[0],
            pu_total: 0,
            quantity: 1,
            unitPrice: 0
        }
    });

    const { data: providers } = useGetAllProviders();
    const { data: products } = useGetAllProducts();

    const quantity = watch("quantity");
    const unitPrice = watch("unitPrice");
    const selectedProductId = watch("productId");

    // Efecct: When Product changes, update Unit Price automatically
    useEffect(() => {
        if (!selectedProductId || !products) return;

        const product = products.find(p => p.pr_id === selectedProductId);
        if (product) {
            setValue("unitPrice", product.pr_price);
        }
    }, [selectedProductId, products, setValue]);

    // Effect: Auto-calculate total
    useEffect(() => {
        const total = (Number(quantity) || 0) * (Number(unitPrice) || 0);
        setValue("pu_total", parseFloat(total.toFixed(2)));
    }, [quantity, unitPrice, setValue]);

    const handleFormSubmit = (data: PurchaseFormData) => {
        const purchaseDto: CreatePurchaseDto = {
            pu_fecha: data.pu_fecha,
            pu_total: Number(data.pu_total),
            details: [
                {
                    pd_cantidad: Number(data.quantity),
                    pd_precio_unitario: Number(data.unitPrice)
                }
            ]
        };

        onSubmitProp(purchaseDto, data.providerId, data.productId);
        /*
        reset({
            pu_fecha: new Date().toISOString().split('T')[0],
            pu_total: 0,
            quantity: 1,
            unitPrice: 0,
            providerId: "",
            productId: ""
        });
                */
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                    <PlusCircle size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    Registrar Compra
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                {/* Proveedor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.providerId ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-rose-100 focus:border-rose-500"
                            }`}
                        {...register("providerId", { required: "Seleccione un proveedor" })}
                        defaultValue=""
                    >
                        <option value="" disabled>Seleccione...</option>
                        {providers?.map(p => (
                            <option key={p.po_id} value={p.po_id}>{p.po_nombre}</option>
                        ))}
                    </select>
                    <ErrorFormMessage>{errors.providerId?.message}</ErrorFormMessage>
                </div>

                {/* Producto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.productId ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-rose-100 focus:border-rose-500"
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

                {/* Fecha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Compra</label>
                    <input
                        type="date"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.pu_fecha ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-rose-100 focus:border-rose-500"
                            }`}
                        {...register("pu_fecha", { required: "Fecha requerida" })}
                    />
                    <ErrorFormMessage>{errors.pu_fecha?.message}</ErrorFormMessage>
                </div>

                {/* Detalles: Cantidad y Precio */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                        <input
                            type="number"
                            min="1"
                            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.quantity ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-rose-100 focus:border-rose-500"
                                }`}
                            {...register("quantity", { required: "Requerido", min: { value: 1, message: "Mínimo 1" }, valueAsNumber: true })}
                        />
                        <ErrorFormMessage>{errors.quantity?.message}</ErrorFormMessage>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unit.</label>
                        <input
                            type="number"
                            step="0.01"
                            readOnly
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                            {...register("unitPrice", { required: "Requerido", min: { value: 0.01, message: "Mínimo 0.01" }, valueAsNumber: true })}
                        />
                        <ErrorFormMessage>{errors.unitPrice?.message}</ErrorFormMessage>
                    </div>
                </div>

                {/* Total (Readonly calculated) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <div className="relative">
                        <span className="absolute left-4 top-2.5 text-gray-500">$</span>
                        <input
                            type="number"
                            readOnly
                            className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-bold"
                            {...register("pu_total")}
                        />
                    </div>
                </div>

                {/* Botón */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "bg-rose-200 cursor-not-allowed" : "bg-rose-600 hover:bg-rose-700 cursor-pointer"} w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm shadow-rose-100`}
                    >
                        <Save size={18} />
                        Registrar Compra
                    </button>
                </div>

            </form>
        </div>
    );
}
