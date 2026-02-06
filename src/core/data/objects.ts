import type { Module } from "../types";
import { ShoppingCart, Package, Tags, Users, Truck, BarChart3, Settings } from "lucide-react";

export const modules: Module[] = [
        {
            title: "Punto de Venta",
            description: "Registrar nuevas ventas y facturación",
            icon: ShoppingCart,
            color: "bg-blue-600",
            hoverColor: "hover:bg-blue-50",
            path: "/"
        },
        {
            title: "Productos",
            description: "Gestión de inventario y stock",
            icon: Package,
            color: "bg-emerald-600",
            hoverColor: "hover:bg-emerald-50",
            path: "/"
        },
        {
            title: "Categorías",
            description: "Organizar productos por secciones",
            icon: Tags,
            color: "bg-purple-600",
            hoverColor: "hover:bg-purple-50",
            path: "/"
        },
        {
            title: "Usuarios",
            description: "Administrar personal y accesos",
            icon: Users,
            color: "bg-orange-600",
            hoverColor: "hover:bg-orange-50",
            path: "/"
        },
        {
            title: "Proveedores",
            description: "Gestión de compras y abastecimiento",
            icon: Truck,
            color: "bg-indigo-600",
            hoverColor: "hover:bg-indigo-50",
            path: "/"
        },
        {
            title: "Reportes",
            description: "Estadísticas de ventas y ganancias",
            icon: BarChart3,
            color: "bg-rose-600",
            hoverColor: "hover:bg-rose-50",
            path: "/"
        },
        {
            title: "Configuración",
            description: "Ajustes generales del sistema",
            icon: Settings,
            color: "bg-slate-600",
            hoverColor: "hover:bg-slate-50",
            path: "/"
        },
    ];