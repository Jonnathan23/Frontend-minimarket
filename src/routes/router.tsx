import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/security/pages/Login.page";
import RegisterPage from "../features/security/pages/Register.page";
import DashboardPage from "../core/pages/DashboardPage";
import RolesPage from "../features/security/pages/Roles.page";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/auth/register-new-user" element={<RegisterPage />} />
                    <Route path="/roles" element={<RolesPage />} />
                </Route>
            </Routes>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}