import { Shield, UserIcon } from "lucide-react";
import type { User } from "../types/auth.types";

interface UserProps {
    user: User;
}

export default function UserComponent({ user }: UserProps) {
    const { us_nombre_completo, us_username, role } = user;
    const { ro_nombre_del_rol } = role;

    // 🎨 Lógica visual: Color del Badge según el Rol
    const getRoleBadgeStyle = (roleName: string) => {
        const role = roleName.toUpperCase();
        if (role.includes("ADMIN")) return "bg-red-100 text-red-700 border-red-200";
        if (role.includes("VENDEDOR") || role.includes("CAJERO")) return "bg-blue-100 text-blue-700 border-blue-200";
        if (role.includes("BODEGUERO")) return "bg-purple-100 text-purple-700 border-purple-200";
        return "bg-gray-100 text-gray-700 border-gray-200"; // Default
    };

    // 🔤 Inicial para el Avatar
    const initial = us_nombre_completo.charAt(0).toUpperCase();

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex items-start gap-4 group">


            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl font-bold text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-gray-200">
                {initial}
            </div>

            <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                    {us_nombre_completo}
                </h3>
                <p className="text-sm text-gray-400 font-medium mb-3 flex items-center gap-1">
                    <UserIcon size={12} />
                    @{us_username}
                </p>


                <div className="flex items-center justify-between mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeStyle(ro_nombre_del_rol)} flex items-center gap-1`}>
                        <Shield size={12} />
                        {ro_nombre_del_rol}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Activo
                    </span>
                </div>
            </div>
        </div>
    );
}
