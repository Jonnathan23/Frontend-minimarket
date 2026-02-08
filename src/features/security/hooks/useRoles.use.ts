import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RolesImpl } from "../services/roles.api"
import type { CreateRoleDTO, Role, UpdateRoleDTO } from "../types/roles.types"
import { useState } from "react"



export const useGetAllRoles = (isRegister: boolean) => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: () => RolesImpl.getAllRoles(),
        retry: 1,
        enabled: isRegister,
    })
}

export const useCreateRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (role: CreateRoleDTO) => RolesImpl.createRole(role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    })
}

export const useUpdateRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (role: UpdateRoleDTO) => RolesImpl.updateRole(role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    })
}

export const useDeleteRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => RolesImpl.deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    })
}

export const useAllHandlersRoles = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);

    

    const {mutate:createMutation, isPending:isCreating} = useCreateRole();
    const {mutate:updateMutation, isPending:isUpdating} = useUpdateRole();

    const isLoading = isCreating || isUpdating;
    // Handlers
    const handleEditRole = (role: Role) => {
        setIsEditing(true);
        setSelectedRole(role);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedRole(undefined);
    }

    const handleSubmitForm = (data: Role) => {
        console.log("Enviando al backend:", data);

        if (isEditing) {
            updateMutation(data);
        } else {
            createMutation(data);
        }

        handleCancelEdit();
    }

    return {
        handleEditRole,
        handleCancelEdit,
        handleSubmitForm,

        isEditing,
        selectedRole,
        isLoading        
    }
}