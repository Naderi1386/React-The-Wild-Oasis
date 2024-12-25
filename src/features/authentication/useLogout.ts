import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Logout } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"

export const useLogout=()=>{
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const {mutate:onLogout,isPending}=useMutation({
        mutationFn:Logout,
        onSuccess:()=>{
            queryClient.removeQueries()
            navigate('/login',{replace:true})
            
        },
        onError:(err)=>{
            console.error(err)

        }
    })
    return {onLogout,isPending}
}