import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useEditSetting = () => {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings successfuly edited");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Settings can not be edited");
    },
  });

  return { isUpdating, updateSettings };
};
