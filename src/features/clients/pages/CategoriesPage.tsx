
import { Edit2, Tags, Trash2 } from "lucide-react";
import CategoriesForm from "../components/CategoriesForm";
import { useCategoriesHandlers, useDeleteCategory, useGetAllCategories } from "../hooks/useCategories.ts";

export default function CategoriesPage() {
    // Hooks
    const { data: categories, isLoading: isLoadingCategories, isError, error } = useGetAllCategories();
    const {
        handleCancelEdit,
        handleEditCategory,
        handleSubmitForm,
        isEditing,
        selectedCategory,
        isLoading,
    } = useCategoriesHandlers();

    // Hook para eliminar (no estaba en handlers por defecto en la estructura de Roles, lo agrego aquí directo o uso un handler si existiera)
    // En RolesPage no vi el delete implementado en la vista, pero el usuario lo pidió en los requisitos: "botones de acción (Editar/Eliminar) visibles".
    const { mutate: deleteCategory } = useDeleteCategory();

    const handleDelete = (id: string) => {
        if (confirm("¿Estás seguro de eliminar esta categoría?")) {
            deleteCategory(id);
        }
    };

    // --- RENDERIZADO CONDICIONAL DE ESTADOS ---
    if (isLoadingCategories)
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
                <span>⚠️ Error al cargar categorías: {(error as Error).message}</span>
            </div>
        );

    return (
        <div className="animate-fadeIn pb-10">
            {/* Header de la Página */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Tags className="text-blue-600" />
                    Gestión de Categorías
                </h1>
                <p className="text-gray-500 mt-1">
                    Administra las categorías para organizar los productos del minimarket.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <CategoriesForm
                        isEditing={isEditing}
                        category={selectedCategory}
                        onCancel={handleCancelEdit}
                        onSubmitProp={handleSubmitForm}
                        isLoading={isLoading}
                    />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Tags size={18} />
                        Categorías Existentes ({categories?.length || 0})
                    </h3>

                    <div className="grid gap-4">
                        {categories?.map((category) => (
                            <div
                                key={category.ca_id}
                                className={`
                                    group bg-white p-4 rounded-xl border transition-all duration-200 flex items-center justify-between
                                    ${selectedCategory?.ca_id === category.ca_id
                                        ? "border-blue-500 ring-1 ring-blue-500 shadow-md"
                                        : "border-gray-100 hover:border-blue-200 hover:shadow-sm"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <Tags size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{category.ca_name}</h4>
                                        <p className="text-sm text-gray-500">{category.ca_descripcion}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditCategory(category)}
                                        className="cursor-pointer p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.ca_id)}
                                        className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {categories?.length === 0 && (
                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No hay categorías creadas aún.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
