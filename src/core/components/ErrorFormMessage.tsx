import type { ReactNode } from "react";



interface ErrorFormMessageProps {
    children: ReactNode;
}

export const ErrorFormMessage = ({ children }: ErrorFormMessageProps) => {
    if (!children) return null;

    return (
        <p className="text-xs text-red-500 mt-1 font-medium animate-pulse">
            {children}
        </p>
    );
};