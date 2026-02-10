
import { Package, History, ArrowUpRight, ArrowDownLeft, FileText } from "lucide-react";
import InventoryAdjustmentForm from "../components/InventoryAdjustmentForm";
import { useCreateInventoryAdjustment, useGetAllInventoryMovements } from "../hooks/useLogistics";
import type { CreateInventoryMovementDto, InventoryMovement } from "../types/inventory.types";

export default function InventoryPage() {

    // Hooks
    const { data: movements, isLoading: isLoadingList, isError, error } = useGetAllInventoryMovements();
    const { mutate: createAdjustment, isPending: isCreating } = useCreateInventoryAdjustment();

    const handleSubmit = (data: CreateInventoryMovementDto) => {
        createAdjustment(data);
    };

    // Render Conditional
    if (isLoadingList)
        return (
            <div className="p-8 space-y-4 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                    <div className="md:col-span-2 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );

    if (isError)
        return (
            <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
                <span>⚠️ Error al cargar inventario: {(error as Error).message}</span>
            </div>
        );

    return (
        <div className="animate-fadeIn pb-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Package className="text-orange-600" />
                    Kardex & Inventario
                </h1>
                <p className="text-gray-500 mt-1">
                    Gestiona ajustes de stock, entradas y salidas manuales.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Column */}
                <div className="lg:col-span-1">
                    <InventoryAdjustmentForm
                        isLoading={isCreating}
                        onSubmitProp={handleSubmit}
                    />
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <History size={18} />
                        Historial de Movimientos ({movements?.length || 0})
                    </h3>

                    <div className="grid gap-4">
                        {movements?.map((movement: InventoryMovement) => (
                            <div
                                key={movement.im_id}
                                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${movement.im_tipo === 'ENTRADA' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {movement.im_tipo === 'ENTRADA' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-800 text-lg">
                                                    {movement.product?.pr_name || "Producto Desconocido"}
                                                </h4>
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${movement.im_tipo === 'ENTRADA' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {movement.im_tipo}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                <FileText size={14} />
                                                <span className="italic">{movement.im_referencia}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-1">Cantidad</p>
                                        <div className={`flex items-center justify-end gap-1 text-xl font-bold ${movement.im_tipo === 'ENTRADA' ? 'text-emerald-600' : 'text-red-600'
                                            }`}>
                                            <span>
                                                {movement.im_tipo === 'ENTRADA' ? '+' : '-'}{movement.im_cantidad}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {movements?.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <History className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-500 font-medium">No hay movimientos de inventario.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
