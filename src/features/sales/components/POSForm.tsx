
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, ShoppingCart, XCircle, RotateCcw } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import { useGetAllProducts } from "../../clients/hooks/useProducts";
import type { SalesDetailItem } from "../types/sales.types";

interface POSFormProps {
    activeItem: SalesDetailItem | null;
    onAddItem: (item: Omit<SalesDetailItem, "tempId">) => void;
    onUpdateItem: (item: SalesDetailItem) => void;
    onCancelEdit: () => void;
}

interface POSFormData {
    activeItem: SalesDetailItem | null | undefined;
    productId: string;
    quantity: number;
    price: number;
    subtotal: number; // Visual only
}

export default function POSForm({ activeItem, onAddItem, onUpdateItem, onCancelEdit }: POSFormProps) {

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<POSFormData>({
        defaultValues: {
            quantity: 1,
            price: 0,
            subtotal: 0
        }
    });

    const { data: products } = useGetAllProducts();
    const selectedProductId = watch("productId");
    const quantity = watch("quantity");
    const price = watch("price");

    // Effect: Populate form when editing an item
    useEffect(() => {
        if (activeItem) {
            setValue("productId", activeItem.product_id);
            setValue("quantity", activeItem.quantity);
            setValue("price", activeItem.price);
            setValue("subtotal", activeItem.subtotal);
        } else {
            // Reset if no active item (and maybe after successful add, treated in submit)
            // Note: We don't auto-reset here on null because we might want to keep the last selected product or just clear.
            // But usually, the parent handles the "ActiveItem" change.
        }
    }, [activeItem, setValue]);

    // Effect: Update price when product changes (only if not editing or explicit change)
    useEffect(() => {
        // If we are editing, we generally trust the item's price unless user changes product.
        // For simplicity: If product changes and matches a product in data, set price.
        if (selectedProductId && products) {
            const product = products.find(p => p.pr_id === selectedProductId);
            if (product) {
                // Only override price if we are NOT editing, OR if the product ID changed from the original active item
                /* 
                   Simplified logic: Always update unit price from catalog when product changes. 
                   User can't edit price manually here (it's readOnly), so it must come from catalog.
                */
                setValue("price", product.pr_price);
            }
        }
    }, [selectedProductId, products, setValue]);

    // Effect: Auto-calculate subtotal
    useEffect(() => {
        const sub = (Number(quantity) || 0) * (Number(price) || 0);
        setValue("subtotal", parseFloat(sub.toFixed(2)));
    }, [quantity, price, setValue]);


    const handleFormSubmit = (data: POSFormData) => {
        const product = products?.find(p => p.pr_id === data.productId);
        const productName = product?.pr_name || "Desconocido";

        if (activeItem) {
            // Update
            onUpdateItem({
                ...activeItem,
                product_id: data.productId,
                productName,
                quantity: Number(data.quantity),
                price: Number(data.price),
                subtotal: Number(data.subtotal)
            });
            // Form is reset by the parent via effect or we can reset here validation state
        } else {
            // Add
            onAddItem({
                product_id: data.productId,
                productName,
                quantity: Number(data.quantity),
                price: Number(data.price),
                subtotal: Number(data.subtotal)
            });
        }

        // Reset form for next entry
        reset({
            productId: "",
            quantity: 1,
            price: 0,
            subtotal: 0
        });
    };

    const handleCancel = () => {
        onCancelEdit();
        reset({
            productId: "",
            quantity: 1,
            price: 0,
            subtotal: 0
        });
    }

    const isEditing = !!activeItem;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className={`p-2 rounded-lg ${isEditing ? "bg-amber-100 text-amber-600" : "bg-cyan-100 text-cyan-600"}`}>
                    <ShoppingCart size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    {isEditing ? "Editar Ítem" : "Agregar Producto"}
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                {/* Product */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.productId ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-cyan-100 focus:border-cyan-500"
                            }`}
                        {...register("productId", { required: "Seleccione un producto" })}
                        defaultValue=""
                        disabled={isEditing} // Prevent changing product when editing to avoid complexity? Or allow it? Let's allow it but logic is simpler if we just update.
                    >
                        <option value="" disabled>Seleccione...</option>
                        {products?.map(p => (
                            <option key={p.pr_id} value={p.pr_id}>{p.pr_name} (Stock: {p.pr_stock}) - ${p.pr_price}</option>
                        ))}
                    </select>
                    <ErrorFormMessage>{errors.productId?.message}</ErrorFormMessage>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <input
                        type="number"
                        min="1"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.quantity ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-cyan-100 focus:border-cyan-500"
                            }`}
                        {...register("quantity", { required: "Requerido", min: { value: 1, message: "Mínimo 1" }, valueAsNumber: true })}
                    />
                    <ErrorFormMessage>{errors.quantity?.message}</ErrorFormMessage>
                </div>

                {/* Price (Read only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                    <div className="relative">
                        <span className="absolute left-4 top-2.5 text-gray-500">$</span>
                        <input
                            type="number"
                            readOnly
                            className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
                            {...register("price")}
                        />
                    </div>
                </div>

                {/* Subtotal */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtotal</label>
                    <div className="relative">
                        <span className="absolute left-4 top-2.5 text-gray-500">$</span>
                        <input
                            type="number"
                            readOnly
                            className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 font-bold"
                            {...register("subtotal")}
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="pt-2 flex gap-2">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-colors"
                        >
                            <XCircle size={18} />
                            Cancelar
                        </button>
                    )}

                    <button
                        type="submit"
                        className={`flex-1 ${isEditing ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-cyan-600 hover:bg-cyan-700 text-white"} flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm`}
                    >
                        {isEditing ? <RotateCcw size={18} /> : <PlusCircle size={18} />}
                        {isEditing ? "Actualizar" : "Agregar"}
                    </button>
                </div>

            </form>
        </div>
    );
}
