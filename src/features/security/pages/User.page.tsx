import { useNavigate } from "react-router-dom";
import UserComponent from "../components/User";
import { useGetAllUsers } from "../hooks/useAuth.use";
import { Shield, UserPlus, Users } from "lucide-react";


export default function UserPage() {
    const { data: users, isLoading, error } = useGetAllUsers();
    const navigate = useNavigate();

    // --- Loading State (Skeleton) ---
    if (isLoading) return (
        <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 rounded w-48"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                ))}
            </div>
        </div>
    );

    // --- Error State ---
    if (error) return (
        <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-xl flex flex-col items-center justify-center text-center gap-2">
            <Shield size={48} className="text-red-400 mb-2" />
            <h3 className="text-lg font-bold">Error al cargar usuarios</h3>
            <p>{error.message}</p>
        </div>
    );

    return (
        <div className="animate-fadeIn pb-10 space-y-8">

            {/* HEADER DE LA PÁGINA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Users className="text-blue-600" />
                        Directorio de Usuarios
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Gestiona el acceso y visualiza al personal registrado en el sistema.
                    </p>
                </div>

                {/* BOTÓN DE ACCIÓN PRINCIPAL */}
                <button
                    onClick={() => navigate("/auth/register-new-user")} // Ruta actualizada según tu objects.ts
                    className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-blue-100 hover:-translate-y-0.5"
                >
                    <UserPlus size={20} />
                    Registrar Nuevo
                </button>
            </div>

            {/* CONTENIDO PRINCIPAL: GRID DE USUARIOS */}
            {users && users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <UserComponent key={user.us_id} user={user} />
                    ))}
                </div>
            ) : (
                // EMPTY STATE (Por si acaso no hay usuarios)
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <Users className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No hay usuarios registrados</h3>
                    <p className="text-gray-500">Comienza registrando al primer miembro del equipo.</p>
                </div>
            )}
        </div>
    );
}
