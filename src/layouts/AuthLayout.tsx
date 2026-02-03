import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <header className="py-8 flex justify-center items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                            <span className="text-white font-bold text-2xl">M</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                            MiniMarket <span className="text-blue-600">2026</span>
                        </h1>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        <Outlet />
                    </div>
                </main>


                <footer className="py-6 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        &copy; {new Date().getFullYear()} MiniMarket. Todos los derechos reservados.
                    </p>
                </footer>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
