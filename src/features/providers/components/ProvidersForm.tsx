
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Truck, PlusCircle, Save, X } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import type { CreateProviderDto, Provider } from "../types/providers.types";

interface ProvidersFormProps {
    isEditing?: boolean;
    provider?: Provider;
    isLoading: boolean;
    onCancel: () => void;
    onSubmitProp: (data: CreateProviderDto) => void;
}

export default function ProvidersForm({ isEditing = false, provider, onCancel, onSubmitProp, isLoading }: ProvidersFormProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProviderDto>();

    useEffect(() => {
        if (isEditing && provider) {
            reset({
                po_nombre: provider.po_nombre,
                po_RUC_NIT: provider.po_RUC_NIT,
                po_correo: provider.po_correo,
                po_direccion: provider.po_direccion,
                po_telefono: provider.po_telefono
            });
        } else {
            reset({
                po_nombre: "",
                po_RUC_NIT: "",
                po_correo: "",
                po_direccion: "",
                po_telefono: ""
            });
        }
    }, [isEditing, provider, reset]);

    const handleFormSubmit = (data: CreateProviderDto) => {
        onSubmitProp(data);
       // if (!isEditing) reset();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className={`p-2 rounded-lg ${isEditing ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600"}`}>
                    {isEditing ? <Truck size={20} /> : <PlusCircle size={20} />}
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    {isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        placeholder="Ej. Distribuidora S.A."
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.po_nombre ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                            }`}
                        {...register("po_nombre", { required: "El nombre es requerido", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                    />
                    <ErrorFormMessage>{errors.po_nombre?.message}</ErrorFormMessage>
                </div>

                {/* RUC/NIT */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RUC/NIT</label>
                    <input
                        type="text"
                        placeholder="Ej. 1729384756001"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.po_RUC_NIT ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                            }`}
                        {...register("po_RUC_NIT", { required: "RUC/NIT requerido", minLength: { value: 5, message: "Mínimo 5 caracteres" } })}
                    />
                    <ErrorFormMessage>{errors.po_RUC_NIT?.message}</ErrorFormMessage>
                </div>

                {/* Correo y Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                        <input
                            type="email"
                            placeholder="contacto@empresa.com"
                            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.po_correo ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                }`}
                            {...register("po_correo", {
                                required: "Correo requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Basic Email Regex
                                    message: "Correo inválido"
                                }
                            })}
                        />
                        <ErrorFormMessage>{errors.po_correo?.message}</ErrorFormMessage>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            type="tel"
                            placeholder="0991234567"
                            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.po_telefono ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                }`}
                            {...register("po_telefono", { required: "Teléfono requerido", minLength: { value: 7, message: "Mínimo 7 caracteres" } })}
                        />
                        <ErrorFormMessage>{errors.po_telefono?.message}</ErrorFormMessage>
                    </div>
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <textarea
                        rows={3}
                        placeholder="Ej. Calle Principal 123 y Secundaria"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.po_direccion ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                            }`}
                        {...register("po_direccion", { required: "Dirección requerida", minLength: { value: 5, message: "Mínimo 5 caracteres" } })}
                    />
                    <ErrorFormMessage>{errors.po_direccion?.message}</ErrorFormMessage>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm ${isEditing
                                ? ` ${isLoading ? "bg-amber-200 hover:bg-amber-400" : "bg-amber-500 hover:bg-amber-600"} shadow-amber-100`
                                : ` ${isLoading ? "bg-indigo-200 hover:bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"} shadow-indigo-100`
                            }`}
                    >
                        <Save size={18} />
                        {isEditing ? "Actualizar" : "Guardar"}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="cursor-pointer p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"
                            title="Cancelar edición"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}
