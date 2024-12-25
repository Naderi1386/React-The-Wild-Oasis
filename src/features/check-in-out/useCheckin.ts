import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataBookingSelectedType, updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useChecking = () => {
  const navigate=useNavigate() 
  const queryClient = useQueryClient();
  const { mutate: update, isPending: isCheckining } = useMutation({
    mutationFn: updateBooking,
    onSuccess: (d:DataBookingSelectedType) => {
        toast.success(`Booking #${d.id} successfully checked in`)
      queryClient.invalidateQueries({
        queryKey:['booking']
      });
      navigate(-1)
    },onError:()=>{
        toast.error('There was an error while checking in ')
    }
  });

  return { update, isCheckining };
};
