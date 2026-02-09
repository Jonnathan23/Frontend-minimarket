
import { Edit2, Package, Trash2 } from "lucide-react";
import ProductsForm from "../components/ProductsForm";
import { useDeleteProduct, useGetAllProducts, useProductsHandlers } from "../hooks/useProducts";
import { useGetAllCategories } from "../hooks/useCategories";

export default function ProductsPage() {
    // Hooks
    const { data: products, isLoading: isLoadingProducts, isError, error } = useGetAllProducts();
    const { data: categories } = useGetAllCategories();

    const { handleCancelEdit, handleEditProduct, handleSubmitForm, isEditing, selectedProduct, isLoading } = useProductsHandlers();

    const { mutate: deleteProduct } = useDeleteProduct();

    const handleDelete = (id: string) => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            deleteProduct(id);
        }
    };

    // Helper para obtener nombre de categoría
    const getCategoryName = (categoryId: string) => {
        return categories?.find(cat => cat.ca_id === categoryId)?.ca_name || "Sin categoría";
    };

    // --- RENDERIZADO CONDICIONAL DE ESTADOS ---
    if (isLoadingProducts)
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
                <span>⚠️ Error al cargar productos: {(error as Error).message}</span>
            </div>
        );

    return (
        <div className="animate-fadeIn pb-10">
            {/* Header de la Página */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Package className="text-blue-600" />
                    Gestión de Productos
                </h1>
                <p className="text-gray-500 mt-1">
                    Administra el inventario, precios y disponibilidad de tus productos.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <ProductsForm
                        isEditing={isEditing}
                        product={selectedProduct}
                        onCancel={handleCancelEdit}
                        onSubmitProp={handleSubmitForm}
                        isLoading={isLoading}
                    />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Package size={18} />
                        Productos Existentes ({products?.length || 0})
                    </h3>

                    <div className="grid gap-4">
                        {products?.map((product) => (
                            <div
                                key={product.pr_id}
                                className={`
                                    group bg-white p-4 rounded-xl border transition-all duration-200 flex items-center justify-between
                                    ${selectedProduct?.pr_id === product.pr_id
                                        ? "border-blue-500 ring-1 ring-blue-500 shadow-md"
                                        : "border-gray-200 hover:border-blue-200 hover:shadow-sm"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <Package size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-800 truncate">{product.pr_name}</h4>
                                            <span
                                                className={`w-2 h-2 rounded-full ${product.pr_availability ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                                title={product.pr_availability ? "Disponible" : "No disponible"}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                                                ${Number(product.pr_price).toFixed(2)}
                                            </span>
                                            <span>•</span>
                                            <span>Stock: {product.pr_stock}</span>
                                            <span>•</span>
                                            <span className="text-xs text-gray-400">
                                                {getCategoryName(product.pr_category_id)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="cursor-pointer p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.pr_id!)}
                                        className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {products?.length === 0 && (
                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No hay productos creados aún.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
