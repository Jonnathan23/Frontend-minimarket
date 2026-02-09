
import { useForm } from "react-hook-form";
import { CircleDollarSign, Save } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import type { CreateCashMovementDto } from "../types/cash.types";

interface CashFormProps {
    isLoading: boolean;
    onSubmitProp: (data: CreateCashMovementDto) => void;
}

export default function CashForm({ isLoading, onSubmitProp }: CashFormProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateCashMovementDto>({
        defaultValues: {
            cm_fecha: new Date().toISOString().split('T')[0], // Today YYYY-MM-DD
            cm_tipo: "APERTURA",
            cm_monto: 0
        }
    });

    const handleFormSubmit = (data: CreateCashMovementDto) => {
        onSubmitProp({ ...data, cm_monto: Number(data.cm_monto) });
        reset({
            cm_fecha: new Date().toISOString().split('T')[0],
            cm_tipo: "APERTURA",
            cm_monto: 0
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                    <CircleDollarSign size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    Movimiento de Caja
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                {/* Tipo de Movimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.cm_tipo ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                            }`}
                        {...register("cm_tipo", { required: "Seleccione un tipo" })}
                    >
                        <option value="APERTURA">APERTURA</option>
                        <option value="ARQUEO">ARQUEO</option>
                        <option value="CIERRE">CIERRE</option>
                    </select>
                    <ErrorFormMessage>{errors.cm_tipo?.message}</ErrorFormMessage>
                </div>

                {/* Monto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.cm_monto ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                            }`}
                        {...register("cm_monto", { required: "Requerido", min: { value: 0.01, message: "Mínimo 0.01" }, valueAsNumber: true })}
                    />
                    <ErrorFormMessage>{errors.cm_monto?.message}</ErrorFormMessage>
                </div>

                {/* Fecha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input
                        type="date"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.cm_fecha ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                            }`}
                        {...register("cm_fecha", { required: "Fecha requerida" })}
                    />
                    <ErrorFormMessage>{errors.cm_fecha?.message}</ErrorFormMessage>
                </div>

                {/* Botón */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "bg-emerald-200 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"} w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm shadow-emerald-100`}
                    >
                        <Save size={18} />
                        Registrar Movimiento
                    </button>
                </div>

            </form>
        </div>
    );
}
