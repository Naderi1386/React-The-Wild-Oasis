import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onLogin, isPending: isLogining } = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { onLogin, isLogining };
};
