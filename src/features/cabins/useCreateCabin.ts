import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("cabin successfully created");
     },
    onError: (err) => {
      toast.error(String(err));
    },
  });

  return { isCreating, createCabin };
};

export default useCreateCabin;
