import { ROLES } from "../../features/security/types/roles.types";
import type { Module } from "../types";
import { ShoppingCart, Package, Tags, Users, Truck, BarChart3, UserPlus, UserCog } from "lucide-react";

export const modules: Module[] = [
    {
        title: "Ventas",
        description: "Registrar nuevas ventas y facturación",
        icon: ShoppingCart,
        color: "bg-cyan-600",
        hoverColor: "hover:bg-cyan-50",
        path: "/sales",
        allowedRoles: [ROLES.ADMIN, ROLES.VENDEDOR]
    },
    {
        title: "Productos",
        description: "Gestión de inventario y stock",
        icon: Package,
        color: "bg-emerald-600",
        hoverColor: "hover:bg-emerald-50",
        path: "/products",
        allowedRoles: [ROLES.ADMIN, ROLES.BODEGUERO]
    },
    {
        title: "Compras a Proveedores",
        description: "Registrar nuevas compras a proveedores",
        icon: ShoppingCart,
        color: "bg-blue-600",
        hoverColor: "hover:bg-blue-50",
        path: "/purchases",
        allowedRoles: [ROLES.ADMIN, ROLES.VENDEDOR]
    },
    {
        title: "Categorías",
        description: "Organizar productos por secciones",
        icon: Tags,
        color: "bg-purple-600",
        hoverColor: "hover:bg-purple-50",
        path: "/categories",
        allowedRoles: [ROLES.ADMIN, ROLES.BODEGUERO]
    },
    {
        title: "Registar Usuario",
        description: "Registrar un nuevo usuario",
        icon: UserPlus,
        color: "bg-orange-600",
        hoverColor: "hover:bg-orange-50",
        path: "/auth/register-new-user",
        allowedRoles: [ROLES.ADMIN] // Solo Admin
    },
    {
        title: "Roles",
        description: "Administrar roles y permisos",
        icon: UserCog,
        color: "bg-yellow-600",
        hoverColor: "hover:bg-yellow-50",
        path: "/roles",
        allowedRoles: [ROLES.ADMIN] // Solo Admin
    },
    {
        title: "Usuarios",
        description: "Administrar personal y accesos",
        icon: Users,
        color: "bg-orange-600",
        hoverColor: "hover:bg-orange-50",
        path: "/users",
        allowedRoles: [ROLES.ADMIN] // Solo Admin
    },
    {
        title: "Proveedores",
        description: "Gestión de compras y abastecimiento",
        icon: Truck,
        color: "bg-indigo-600",
        hoverColor: "hover:bg-indigo-50",
        path: "/providers",
        allowedRoles: [ROLES.ADMIN, ROLES.BODEGUERO]
    },
    {
        title: "Caja",
        description: "Gestión de caja y ventas",
        icon: BarChart3,
        color: "bg-rose-600",
        hoverColor: "hover:bg-rose-50",
        path: "/cash",
        allowedRoles: [ROLES.ADMIN]
    },
    {
        title: "Reportes",
        description: "Estadísticas de ventas y ganancias",
        icon: BarChart3,
        color: "bg-rose-600",
        hoverColor: "hover:bg-rose-50",
        path: "/inventory",
        allowedRoles: [ROLES.ADMIN]
    },
    /*,
    {
        title: "Configuración",
        description: "Ajustes generales del sistema",
        icon: Settings,
        color: "bg-slate-600",
        hoverColor: "hover:bg-slate-50",
        path: "/",
        allowedRoles: [ROLES.ADMIN]
    },
    */
];