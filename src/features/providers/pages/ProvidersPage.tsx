
import { Truck, Edit2, Trash2, Mail, Phone, MapPin } from "lucide-react";
import ProvidersForm from "../components/ProvidersForm";
import { useDeleteProvider, useGetAllProviders, useProvidersHandlers } from "../hooks/useProviders";

export default function ProvidersPage() {

    // Hooks
    const { data: providers, isLoading: isLoadingProviders, isError, error } = useGetAllProviders();
    const { handleCancelEdit, handleEditProvider, handleSubmitForm, isEditing,
        selectedProvider, isLoading } = useProvidersHandlers();

    const { mutate: deleteProvider } = useDeleteProvider();

    const handleDelete = (id: string) => {
        if (confirm("¿Estás seguro de eliminar este proveedor?")) {
            deleteProvider(id);
        }
    };

    // Render Conditional
    if (isLoadingProviders)
        return (
            <div className="p-8 space-y-4 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                    <div className="md:col-span-2 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );

    if (isError)
        return (
            <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
                <span>⚠️ Error al cargar proveedores: {(error as Error).message}</span>
            </div>
        );

    return (
        <div className="animate-fadeIn pb-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Truck className="text-indigo-600" />
                    Gestión de Proveedores
                </h1>
                <p className="text-gray-500 mt-1">
                    Administra la información de tus proveedores y sus contactos.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Column */}
                <div className="lg:col-span-1">
                    <ProvidersForm
                        isEditing={isEditing}
                        provider={selectedProvider}
                        onCancel={handleCancelEdit}
                        onSubmitProp={handleSubmitForm}
                        isLoading={isLoading}
                    />
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Truck size={18} />
                        Proveedores Registrados ({providers?.length || 0})
                    </h3>

                    <div className="grid gap-4">
                        {providers?.map((provider) => (
                            <div
                                key={provider.po_id}
                                className={`
                                    group bg-white p-5 rounded-xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4
                                    ${selectedProvider?.po_id === provider.po_id
                                        ? "border-indigo-500 ring-1 ring-indigo-500 shadow-md"
                                        : "border-gray-200 hover:border-indigo-200 hover:shadow-sm"
                                    }
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                        <Truck size={24} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-gray-800 text-lg">{provider.po_nombre}</h4>
                                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200 font-mono">
                                                {provider.po_RUC_NIT}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} />
                                                <span className="truncate">{provider.po_correo}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} />
                                                <span>{provider.po_telefono}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} />
                                                <span className="truncate">{provider.po_direccion}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button
                                        onClick={() => handleEditProvider(provider)}
                                        className="cursor-pointer p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(provider.po_id)}
                                        className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {providers?.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <Truck className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-500 font-medium">No hay proveedores registrados.</p>
                            <p className="text-gray-400 text-sm mt-1">Completa el formulario para agregar uno.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
