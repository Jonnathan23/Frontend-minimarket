
import { ShoppingBag, Calendar, DollarSign, User } from "lucide-react";
import PurchasesForm from "../components/PurchasesForm";
import { useGetAllPurchases, usePurchasesHandlers } from "../hooks/usePurchases";

export default function PurchasesPage() {

    // Hooks
    const { data: purchases, isLoading: isLoadingPurchases, isError, error } = useGetAllPurchases();
    const { handleSubmitForm, isLoading } = usePurchasesHandlers();

    // Render Conditional
    if (isLoadingPurchases)
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
                <span>⚠️ Error al cargar compras: {(error as Error).message}</span>
            </div>
        );

    return (
        <div className="animate-fadeIn pb-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingBag className="text-rose-600" />
                    Gestión de Compras del Proveedor
                </h1>
                <p className="text-gray-500 mt-1">
                    Registra el ingreso de mercadería y controla tus adquisiciones.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Column */}
                <div className="lg:col-span-1">
                    <PurchasesForm
                        isLoading={isLoading}
                        onSubmitProp={handleSubmitForm}
                    />
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <ShoppingBag size={18} />
                        Historial de Compras ({purchases?.length || 0})
                    </h3>

                    <div className="grid gap-4">
                        {purchases?.map((purchase) => (
                            <div
                                key={purchase.pu_id}
                                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-rose-200 hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                                            <Calendar size={20} />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-800 text-lg">
                                                    {purchase.pu_fecha ? new Date(purchase.pu_fecha).toLocaleDateString() : 'Fecha no válida'}
                                                </h4>
                                            </div>

                                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} />
                                                    <span className="font-medium">
                                                        {purchase.provider?.po_nombre || "Proveedor Desconocido"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-1">Total Compra</p>
                                        <div className="flex items-center justify-end gap-1 text-xl font-bold text-rose-600">
                                            <DollarSign size={20} strokeWidth={2.5} />
                                            <span>{Number(purchase.pu_total).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {purchases?.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <ShoppingBag className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-500 font-medium">No hay compras registradas.</p>
                            <p className="text-gray-400 text-sm mt-1">Usa el formulario para registrar un nuevo ingreso.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
