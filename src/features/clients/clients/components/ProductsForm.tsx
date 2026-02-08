
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Package, PlusCircle, Save, X } from "lucide-react";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import type { CreateProductDto, Product, UpdateProductDto } from "../types/products.types";
import { useGetAllCategories } from "../hooks/useCategories";

interface ProductsFormProps {
    isEditing?: boolean;
    product?: Product;
    isLoading: boolean;
    onCancel: () => void;
    onSubmitProp: (data: CreateProductDto | UpdateProductDto) => void;
}

export default function ProductsForm({ isEditing = false, product, onCancel, onSubmitProp, isLoading, }: ProductsFormProps) {
    const { data: categories } = useGetAllCategories();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<CreateProductDto>();

    useEffect(() => {
        if (isEditing && product) {
            reset({
                pr_name: product.pr_name,
                pr_price: product.pr_price,
                pr_stock: product.pr_stock,
                pr_availability: product.pr_availability,
                pr_category_id: product.pr_category_id,
            });
        } else {
            reset({
                pr_name: "",
                pr_price: 0,
                pr_stock: 0,
                pr_availability: true,
                pr_category_id: "",
            });
        }
    }, [isEditing, product, reset]);

    const handleFormSubmit = (data: CreateProductDto) => {
        // Convertir strings a números si es necesario (aunque html input type number y la validación ayudan)
        const formattedData: CreateProductDto = {
            ...data,
            pr_price: Number(data.pr_price),
            pr_stock: Number(data.pr_stock),
        };
        onSubmitProp(formattedData);
        if (!isEditing) reset();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div
                    className={`p-2 rounded-lg ${isEditing ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                        }`}
                >
                    {isEditing ? <Package size={20} /> : <PlusCircle size={20} />}
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    {isEditing ? "Editar Producto" : "Nuevo Producto"}
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                {/* Categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <select
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                            ${errors.pr_category_id
                                ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                            }`}
                        {...register("pr_category_id", {
                            required: "La categoría es requerida",
                        })}
                        defaultValue=""
                    >
                        <option value="" disabled>Seleccione una categoría</option>
                        {categories?.map((cat) => (
                            <option key={cat.ca_id} value={cat.ca_id}>
                                {cat.ca_name}
                            </option>
                        ))}
                    </select>
                    <ErrorFormMessage>{errors.pr_category_id?.message}</ErrorFormMessage>
                </div>

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. Coca Cola 1.5L"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                            ${errors.pr_name
                                ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                            }`}
                        {...register("pr_name", {
                            required: "El nombre es requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                        })}
                    />
                    <ErrorFormMessage>{errors.pr_name?.message}</ErrorFormMessage>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                                ${errors.pr_price
                                    ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                    : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                                }`}
                            {...register("pr_price", {
                                required: "Requerido",
                                valueAsNumber: true,
                                min: { value: 0.01, message: "Mínimo 0.01" },
                            })}
                        />
                        <ErrorFormMessage>{errors.pr_price?.message}</ErrorFormMessage>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock
                        </label>
                        <input
                            type="number"
                            min="0"
                            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                                ${errors.pr_stock
                                    ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                                    : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
                                }`}
                            {...register("pr_stock", {
                                required: "Requerido",
                                valueAsNumber: true,
                                min: { value: 0, message: "Mínimo 0" },
                            })}
                        />
                        <ErrorFormMessage>{errors.pr_stock?.message}</ErrorFormMessage>
                    </div>
                </div>

                {/* Disponibilidad */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="availability"
                        {...register("pr_availability")}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="availability" className="text-sm font-medium text-gray-700 select-none">
                        Producto Disponible
                    </label>
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
