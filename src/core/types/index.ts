import type { LucideIcon } from "lucide-react";


export interface Module {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    hoverColor: string;
    path: string;
    allowedRoles: string[];
}

export interface ApiMessageResponse {
    message: string;
}