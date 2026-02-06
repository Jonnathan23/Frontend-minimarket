import { useForm } from "react-hook-form";
import type { Role } from "../types/roles.types";
import { ErrorFormMessage } from "../../../core/components/ErrorFormMessage";
import { PlusCircle, Save, Shield, X } from "lucide-react";
import { useEffect } from "react";


interface RolesFormProps {
    isEditing?: boolean
    role?: Role
    onCancel: () => void; // Nueva prop para cancelar edición
    onSubmitProp: (data: Role) => void; // Pasamos la función del padre
}

export default function RolesForm({ isEditing = false, role, onCancel, onSubmitProp }: RolesFormProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Role>();
    
    useEffect(() => { 
        if (isEditing && role) {
            reset(role); 
        } else {
            reset({ ro_nombre_del_rol: '' }); 
        }
    }, [isEditing, role, reset]);

    const handleFormSubmit = (data: Role) => {
        onSubmitProp(data);
        if (!isEditing) reset(); 
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className={`p-2 rounded-lg ${isEditing ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                    {isEditing ? <Shield size={20} /> : <PlusCircle size={20} />}
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                    {isEditing ? 'Editar Rol' : 'Nuevo Rol'}
                </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Rol
                    </label>
                    <input
                        type="text"
                        placeholder="Ej. SUPERVISOR"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all
                            ${errors.ro_nombre_del_rol
                                ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                                : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                            }`}
                        {...register("ro_nombre_del_rol", {
                            required: "El nombre del rol es requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            maxLength: { value: 50, message: "Máximo 50 caracteres" }
                        })}
                    />
                    <ErrorFormMessage>
                        {errors.ro_nombre_del_rol?.message as string}
                    </ErrorFormMessage>
                </div>

                <div className="flex gap-3 pt-2">
                    {/* Botón Principal (Guardar/Actualizar) */}
                    <button
                        type="submit"
                        className={`cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm
                            ${isEditing
                                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
                            }`}
                    >
                        <Save size={18} />
                        {isEditing ? 'Actualizar' : 'Guardar'}
                    </button>

                    {/* Botón Cancelar (Solo si estamos editando) */}
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="cursor-pointer p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"
                            title="Cancelar edición"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
