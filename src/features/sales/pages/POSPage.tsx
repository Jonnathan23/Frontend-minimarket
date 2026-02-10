
import { ShoppingCart, User, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import POSForm from "../components/POSForm";
import POSTable from "../components/POSTable";
import { usePOS, type ClientSaleData } from "../hooks/usePOS";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";

export default function POSPage() {

    const {
        items,
        activeItem,
        total,
        isCreatingSale,
        addItem,
        updateItem,
        deleteItem,
        selectItem,
        cancelEdit,
        confirmSale
    } = usePOS();

    // Local form for Client Info
    const { register, handleSubmit, formState: { errors } } = useForm<ClientSaleData>({
        defaultValues: {
            sa_client_name: "",
            sa_client_ci: "",
            sa_medio_de_pago: "EFECTIVO"
        }
    });

    const onConfirmSale = (data: ClientSaleData) => {
        confirmSale(data);
    };

    return (
        <div className="animate-fadeIn pb-10 h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="mb-6 shrink-0">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingCart className="text-cyan-600" />
                    Punto de Venta
                </h1>
                <p className="text-gray-500 mt-1">
                    Gestión de ventas y facturación.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* Left Column: Client Form + Product Form */}
                <div className="lg:col-span-1 h-full overflow-y-auto pr-1 space-y-6">

                    {/* Client Info Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-2">
                            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                                <User size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Datos de Venta</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.sa_client_name ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                        }`}
                                    {...register("sa_client_name", { required: "Nombre requerido", minLength: { value: 3, message: "Mínimo 3 letras" } })}
                                />
                                <ErrorFormMessage>{errors.sa_client_name?.message}</ErrorFormMessage>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CI / RUC</label>
                                <input
                                    type="text"
                                    placeholder="Identificación"
                                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all ${errors.sa_client_ci ? "border-red-300 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                        }`}
                                    {...register("sa_client_ci", { required: "CI requerido", minLength: { value: 5, message: "Mínimo 5 caracteres" } })}
                                />
                                <ErrorFormMessage>{errors.sa_client_ci?.message}</ErrorFormMessage>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medio de Pago</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                        <CreditCard size={18} />
                                    </div>
                                    <select
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                                        {...register("sa_medio_de_pago")}
                                    >
                                        <option value="EFECTIVO">Efectivo</option>
                                        <option value="TARJETA">Tarjeta</option>
                                        <option value="TRANSFERENCIA">Transferencia</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Form Component */}
                    <POSForm
                        activeItem={activeItem}
                        onAddItem={addItem}
                        onUpdateItem={updateItem}
                        onCancelEdit={cancelEdit}
                    />
                </div>

                {/* Right Column: Table */}
                <div className="lg:col-span-2 h-full min-h-[400px]">
                    {/* We pass a handler that eventually triggers handleSubmit from this page's form */}
                    <POSTable
                        items={items}
                        total={total}
                        onEdit={selectItem}
                        onDelete={deleteItem}
                        onConfirm={handleSubmit(onConfirmSale)}
                        isSubmitting={isCreatingSale}
                    />
                </div>
            </div>
        </div>
    );
}
