import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUserUpdate } from "./useUpdateUser";


interface HandleSubmitType{
  password?:string
}
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUserUpdate();

  function onSubmit({ password }:HandleSubmitType) {
    updateUser({ password }, { onSuccess: ()=>{
      reset();
    } });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
      isgrid={true}
        lable="Password (min 8 characters)"
        error={errors?.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
      isgrid={true}
        lable="Confirm password"
        error={errors?.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow isgrid={true}>
        <Button onClick={reset} type="reset" variations="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
