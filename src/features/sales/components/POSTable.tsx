
import { Edit2, Trash2, ShoppingBag, DollarSign, CheckCircle } from "lucide-react";
import type { SalesDetailItem } from "../types/sales.types";

interface POSTableProps {
    items: SalesDetailItem[];
    total: number;
    onEdit: (tempId: string) => void;
    onDelete: (tempId: string) => void;
    onConfirm: () => void;
    isSubmitting: boolean;
}

export default function POSTable({ items, total, onEdit, onDelete, onConfirm, isSubmitting }: POSTableProps) {

    return (
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header / Client Info could go here if implemented later */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <ShoppingBag size={18} />
                    Detalle de Venta
                </h3>
                <span className="text-sm text-gray-500">{items.length} ítems</span>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-auto p-0">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="p-4">Producto</th>
                            <th className="p-4 text-center">Cant.</th>
                            <th className="p-4 text-right">Precio</th>
                            <th className="p-4 text-right">Subtotal</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-400">
                                    <ShoppingBag size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No hay productos en la lista.</p>
                                    <p className="text-xs mt-1">Usa el formulario para agregar.</p>
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.tempId} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4 font-medium text-gray-800">{item.productName}</td>
                                    <td className="p-4 text-center">{item.quantity}</td>
                                    <td className="p-4 text-right text-gray-600">${item.price.toFixed(2)}</td>
                                    <td className="p-4 text-right font-bold text-gray-800">${item.subtotal.toFixed(2)}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(item.tempId)}
                                                className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                                                title="Editar"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(item.tempId)}
                                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Totals */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-medium text-gray-600">Total a Pagar</span>
                        <div className="flex items-center gap-1 font-bold text-2xl text-gray-900">
                            <DollarSign size={24} className="text-gray-400" />
                            {total.toFixed(2)}
                        </div>
                    </div>

                    <button
                        onClick={onConfirm}
                        disabled={items.length === 0 || isSubmitting}
                        className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${items.length === 0
                                ? "bg-gray-300 cursor-not-allowed shadow-none"
                                : isSubmitting
                                    ? "bg-emerald-400 cursor-wait"
                                    : "bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-200"
                            }`}
                    >
                        {isSubmitting ? (
                            "Procesando..."
                        ) : (
                            <>
                                <CheckCircle size={20} />
                                Confirmar Venta
                            </>
                        )}
                    </button>

                    {items.length === 0 && (
                        <p className="text-center text-xs text-gray-400">
                            Agrega al menos un producto para habilitar
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
