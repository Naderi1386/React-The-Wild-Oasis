import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DataBookingSelectedType, updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useCheckout=()=>{
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {mutate:checkOut,isPending:isCheckouting}=useMutation({
        mutationFn:updateBooking,
        onSuccess:(data:DataBookingSelectedType)=>{
            toast.success(`booking #${data.id} successfully checked out`)
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
            navigate('/bookings')
        },
        onError:()=>{
            toast.error('booking could not be checked out')
        }
    })
    return {checkOut,isCheckouting}
}