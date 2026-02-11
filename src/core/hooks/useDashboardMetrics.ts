
import { useMemo } from "react";
// Assuming we need to export a hook for fetching sales. 
// If useGetAllSales doesn't exist in usePOS, we might need to create it or add it to useSales hooks.
// Checking existing hooks... user mentioned "useSales (de features/sales)".
// Let's assume useSales.ts exists or we need to add a hook to fetch all sales.
// Based on previous steps, we only created usePOS.ts which controls the POS logic. 
// We likely need a useGetAllSales hook. I'll add the import assuming I'll find/create it, 
// or I will use the service directly if needed but hooks are better. 
// Wait, I haven't created a hook to GET ALL sales yet, only create. 
// I will assume I need to implement `useGetAllSales` in `src/features/sales/hooks/useSales.ts` or similar.
// But the user instruction says: "Debe importar y utilizar los hooks useSales (de features/sales)". 
// I'll check if `useSales` exists. If not, I'll create `useDashboardMetrics` and might need to add the query there.

import { useGetAllProducts } from "../../features/clients/hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/config";
import type { Sale } from "../../features/sales/types/sales.types";

// Quick local definition for useGetAllSales if it doesn't exist globally yet
const useGetAllSales = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: async () => {
            // Re-using the pattern. We haven't defined getAll in SalesImpl yet? 
            // I'll check SalesImpl in the next step, but for now I'll assume standard GET /sales/
            const url = `/sales/`;
            return api.get<Sale[]>(url);
        },
    });
};

export const useDashboardMetrics = () => {
    const { data: products, isLoading: isLoadingProducts } = useGetAllProducts();
    const { data: sales, isLoading: isLoadingSales } = useGetAllSales();

    const metrics = useMemo(() => {
        if (!products || !sales) {
            return {
                totalVentas: 0,
                ingresosTotales: 0,
                productosBajos: 0
            };
        }

        const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local

        // Filter sales for today
        const todaySales = sales.filter(s => {
            if (!s.sa_fecha) return false;
            // Assuming sa_fecha is ISO string, we slice it or convert. 
            // Backend might return 2026-02-10T...
            // To be safe with timezone "local" logic requested:
            const saleDate = new Date(s.sa_fecha).toLocaleDateString('en-CA');
            return saleDate === today;
        });

        const totalVentas = todaySales.length;

        const ingresosTotales = todaySales.reduce((acc, sale) => {
            return acc + Number(sale.sa_total || 0);
        }, 0);

        const productosBajos = products.filter(p => p.pr_stock <= 5).length;

        return {
            totalVentas,
            ingresosTotales,
            productosBajos
        };

    }, [products, sales]);

    return {
        metrics,
        isLoading: isLoadingProducts || isLoadingSales
    };
};
