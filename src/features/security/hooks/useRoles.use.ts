import { useQuery } from "@tanstack/react-query"
import { RolesImpl } from "../services/roles.api"



export const useGetAllRoles = () => {
   return useQuery({
        queryKey: ["roles"],
        queryFn: () => RolesImpl.getAllRoles(),        
    })
}