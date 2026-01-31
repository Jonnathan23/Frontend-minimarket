import { Outlet } from "react-router-dom";



 
export default function AuthLayout() {
    return (
        <>
            <header>
                <h2>Hola</h2>
            </header>
            <main>
                <Outlet />
            </main>

            
        </>
    );
}
