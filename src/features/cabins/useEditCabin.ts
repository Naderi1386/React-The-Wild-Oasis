import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isPending: isEdit, mutate: editCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("cabin successfully edited");
    },
    onError: (err) => {
      toast.error(String(err));
    },
  });

  return { isEdit, editCabin };
};

export default useEditCabin;
