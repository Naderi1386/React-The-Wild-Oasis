import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUserUpdate = () => {
    const queryClient=useQueryClient()
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: () => {
        toast.success('User account updated successfully')
        queryClient.invalidateQueries({
            queryKey:['user']
        })
    },
    onError: (err) => {
        toast.error(err.message as string)
    },
  });
  return { updateUser, isUpdating };
};
