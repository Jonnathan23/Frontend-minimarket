
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Save, Tags, X } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import type { Category, CreateCategoryDto } from "../types/categories.types";

interface CategoriesFormProps {
    isEditing?: boolean;
    category?: Category;
    isLoading: boolean;
    onCancel: () => void;
    onSubmitProp: (data: CreateCategoryDto) => void;
}

export default function CategoriesForm({ isEditing = false, category, onCancel, onSubmitProp, isLoading, }: CategoriesFormProps) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<CreateCategoryDto>();

    useEffect(() => {
        if (isEditing && category) {
            reset({
                ca_name: category.ca_name,
                ca_descripcion: category.ca_descripcion
            });
        } else {
            reset({ ca_name: "", ca_descripcion: "" });
        }
    }, [isEditing, category, reset]);

    const handleFormSubmit = (data: CreateCategoryDto) => {
        onSubmitProp(data);
        if (!isEditing) reset();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div
                    className={`p-2 rounded-lg ${isEditing ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                        }`}
                >
                    {isEditing ? <Tags size={20} /> : <PlusCircle size={20} />}
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    {isEditing ? "Editar Categoría" : "Nueva Categoría"}
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                {/* Nombre de Categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la Categoría
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. Bebidas, Carnes..."
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                            ${errors.ca_name
                                ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                            }`}
                        {...register("ca_name", {
                            required: "El nombre es requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            maxLength: { value: 50, message: "Máximo 50 caracteres" },
                        })}
                    />
                    <ErrorFormMessage>{errors.ca_name?.message}</ErrorFormMessage>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        placeholder="Breve descripción de la categoría"
                        rows={3}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                            ${errors.ca_descripcion
                                ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                            }`}
                        {...register("ca_descripcion", {
                            required: "La descripción es requerida",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            maxLength: { value: 100, message: "Máximo 100 caracteres" },
                        })}
                    />
                    <ErrorFormMessage>{errors.ca_descripcion?.message}</ErrorFormMessage>
                </div>

                <div className="flex gap-3 pt-2">
                    {/* Botón Principal */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"
                            } flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm
                            ${isEditing
                                ? ` ${isLoading
                                    ? "cursor-not-allowed bg-amber-200 hover:bg-amber-400"
                                    : "cursor-pointer bg-amber-500 hover:bg-amber-600"
                                } shadow-amber-100`
                                : ` ${isLoading
                                    ? "cursor-not-allowed bg-blue-200 hover:bg-blue-400"
                                    : "cursor-pointer bg-blue-600 hover:bg-blue-700"
                                } shadow-blue-100`
                            }`}
                    >
                        <Save size={18} />
                        {isEditing ? "Actualizar" : "Guardar"}
                    </button>

                    {/* Botón Cancelar */}
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
