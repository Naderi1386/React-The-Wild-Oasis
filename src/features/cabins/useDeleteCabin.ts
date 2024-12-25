import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin=()=>{
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate:DeleteCabin } = useMutation({
      mutationFn: deleteCabin,
      onSuccess: () => {
        toast.success("Cabin successfuly deleted");
        queryClient.invalidateQueries({
          queryKey:['cabins']
        });
      },
      onError: (err) => {
        toast.error(`${err.message}`);
      },
    });

    return { isDeleting, DeleteCabin };

}

export default useDeleteCabin