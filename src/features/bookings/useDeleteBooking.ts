import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useDeleteBooking=()=>{
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {mutate:removeBooking,isPending:isDeleting}=useMutation({
        mutationFn:deleteBooking,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
            toast.success(`booking successfully deleted`)
            navigate('/bookings')
        },onError:()=>{
            toast.error('booking could not be deleted')
        }
    })
    return {removeBooking,isDeleting}
}