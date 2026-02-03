import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/security/pages/Login.page";

import RegisterPage from "../features/security/pages/Register.page";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>

                </Route>
            </Routes>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register-new-user" element={<RegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}