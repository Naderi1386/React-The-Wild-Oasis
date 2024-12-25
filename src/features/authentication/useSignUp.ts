import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../services/apiAuth"
import toast from "react-hot-toast";

export const useSignUp=()=>{
    const {mutate:onSignUp,isPending:isCreatingUser}=useMutation({
        mutationFn:signUp,
        onSuccess:(user)=>{
            console.log(user);
            toast.success("Account successfully created! Please verufy the new account from the user's email address.")
            

        },onError:()=>{

        }
    })
    return {onSignUp,isCreatingUser}

}