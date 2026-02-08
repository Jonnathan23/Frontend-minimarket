
import { Link } from "react-router-dom";
import { modules } from "../data/objects";
import { BarChart3, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
    // 1. Obtener el rol del usuario (Normalizamos a Mayúsculas por si acaso)
    const userRole = localStorage.getItem("role")?.toUpperCase() || "INVITADO";

    // 2. Filtrar los módulos permitidos
    const allowedModules = modules.filter(module =>
        module.allowedRoles.includes(userRole)
    );

    return (
        <div className="animate-fadeIn space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Hola, <span className="text-blue-600 capitalize">{userRole.toLowerCase()}</span> 👋
                </h1>
                <p className="text-gray-500">Selecciona un módulo para comenzar a trabajar.</p>
            </div>

            {/* GRID DE MÓDULOS (Renderizamos allowedModules, no modules completo) */}
            {allowedModules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allowedModules.map((module, index) => (
                        <Link
                            key={index}
                            to={module.path}
                            className={`
                                group bg-white p-6 rounded-xl border border-gray-100 shadow-sm 
                                hover:shadow-md transition-all duration-300 transform hover:-translate-y-1
                                ${module.hoverColor}
                            `}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${module.color} bg-opacity-10 shadow-sm`}>
                                    <module.icon
                                        size={24}
                                        className={`text-${module.color.split('-')[1]}-600`}
                                        // Nota: Si usas clases de Tailwind dinámicas como text-blue-600, 
                                        // asegúrate de que Tailwind las detecte (safelist) o usa style inline para colores específicos.
                                        color="black" // Fallback visual
                                        style={{ color: 'var(--tw-text-opacity)' }} // Truco para forzar color si falla la clase
                                    />
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900">
                                {module.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {module.description}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                // 3. Caso borde: Usuario sin permisos
                <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
                    <ShieldAlert className="mx-auto h-12 w-12 text-red-400 mb-3" />
                    <h3 className="text-lg font-bold text-red-700">Acceso Limitado</h3>
                    <p className="text-red-500">Tu rol actual ({userRole}) no tiene módulos asignados.</p>
                </div>
            )}

            {/* WIDGET DE ESTADÍSTICAS (Solo visible para ADMIN o GERENCIA) */}
            {/* Puedes aplicar la misma lógica aquí si no quieres que el vendedor vea las ganancias totales */}
            {userRole === "ADMIN" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <BarChart3 size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Métricas del Día</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="py-2">
                            <p className="text-3xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Ventas Realizadas</p>
                        </div>
                        <div className="py-2">
                            <p className="text-3xl font-bold text-gray-900">$0.00</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Ingresos Totales</p>
                        </div>
                        <div className="py-2">
                            <p className="text-3xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Productos Bajos</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}