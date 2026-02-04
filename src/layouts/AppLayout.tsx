import { Heart, LogOut } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function AppLayout() {
    const navigate = useNavigate();
    
    // 1. Verificamos token
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login", { replace: true });
    };

    // Obtenemos el año actual para el copyright
    const currentYear = new Date().getFullYear();

    return (
        // 🏗️ ESTRUCTURA FLEXBOX:
        // 'flex flex-col' organiza los hijos verticalmente.
        // 'min-h-screen' asegura que ocupe toda la altura de la ventana.
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            
            {/* --- HEADER --- */}
            <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">Panel Administrativo</h2>
                    <p className="text-xs text-gray-400 font-medium">Minimarket System v1.0</p>
                </div>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 group"
                    title="Cerrar Sesión"
                >
                    <span className="hidden md:inline group-hover:underline">Salir</span>
                    <LogOut size={18} />
                </button>
            </header>

            {/* --- CONTENIDO PRINCIPAL --- */}
            {/* 'flex-grow' hace que este div se estire para ocupar todo el espacio disponible, empujando el footer hacia abajo */}
            <main className="container mx-auto px-4 py-8 grow">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        &copy; {currentYear} Minimarket System. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-xs text-gray-400">
                        <span>Desarrollado con</span>
                        <Heart size={12} className="text-red-400 fill-current animate-pulse" />
                        <span>para gestión eficiente.</span>
                    </div>
                </div>
            </footer>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="light"
            />
        </div>
    );
}