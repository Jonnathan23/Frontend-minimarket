
import { CircleDollarSign, Banknote, Calendar, ArrowRightLeft } from "lucide-react";
import CashForm from "../components/CashForm";
import { useCreateCashMovement, useGetAllCashMovements } from "../hooks/useLogistics";
import type { CashMovement, CreateCashMovementDto } from "../types/cash.types";

export default function CashPage() {

    // Hooks
    const { data: movements, isLoading: isLoadingList, isError, error } = useGetAllCashMovements();
    const { mutate: createMovement, isPending: isCreating } = useCreateCashMovement();

    const handleSubmit = (data: CreateCashMovementDto) => {
        createMovement(data);
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
                <span>⚠️ Error al cargar movimientos: {(error as Error).message}</span>
            </div>
        );

    return (
        <div className="animate-fadeIn pb-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <CircleDollarSign className="text-emerald-600" />
                    Gestión de Caja
                </h1>
                <p className="text-gray-500 mt-1">
                    Control de apertura, cierre y arqueos de caja diaria.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Column */}
                <div className="lg:col-span-1">
                    <CashForm
                        isLoading={isCreating}
                        onSubmitProp={handleSubmit}
                    />
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Banknote size={18} />
                        Movimientos del Día ({movements?.length || 0})
                    </h3>

                    <div className="grid gap-4">
                        {movements?.map((movement: CashMovement) => (
                            <div
                                key={movement.cm_id}
                                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-sm transition-all duration-200"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${movement.cm_tipo === 'APERTURA' ? 'bg-emerald-50 text-emerald-600' :
                                            movement.cm_tipo === 'CIERRE' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            <ArrowRightLeft size={20} />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${movement.cm_tipo === 'APERTURA' ? 'bg-emerald-100 text-emerald-700' :
                                                    movement.cm_tipo === 'CIERRE' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {movement.cm_tipo}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                <Calendar size={14} />
                                                <span>{new Date(movement.cm_fecha).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-1">Monto Registrado</p>
                                        <div className={`flex items-center justify-end gap-1 text-xl font-bold ${movement.cm_tipo === 'CIERRE' ? 'text-red-600' : 'text-emerald-600'
                                            }`}>
                                            <span>${Number(movement.cm_monto).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {movements?.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <Banknote className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-500 font-medium">No hay movimientos registrados.</p>
                            <p className="text-gray-400 text-sm mt-1">Registra la apertura de caja para comenzar.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
