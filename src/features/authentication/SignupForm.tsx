import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import { NewUserType } from "../../services/apiAuth";
import SpinnerMini from "../../ui/SpinnerMini";
interface FormDataUserType {
  fullName?: string;
  email?: string;
  password?: string;
}

function SignupForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const pass = getValues().password as string;
  const {onSignUp,isCreatingUser}=useSignUp()

  const { errors } = formState;

  const onSubmit = (data: FormDataUserType) => {
    const newUser: NewUserType = {
      fullName: data.fullName as string,
      email: data.email as string,
      password: data.password as string,
    };
    onSignUp(newUser,{onSettled:()=>{
      reset()
    }})
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        isgrid={true}
        lable="Full name"
        error={errors.fullName && (errors.fullName.message as string)}
      >
        <Input
          disabled={isCreatingUser}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        isgrid={true}
        lable="Email address"
        error={errors.email && (errors.email.message as string)}
      >
        <Input
          disabled={isCreatingUser}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              message: "Please provide a valid email address",
              value: /\S+@\S+\.\S+/,
            },
          })}
        />
      </FormRow>

      <FormRow
        isgrid={true}
        lable="Password (min 8 characters)"
        error={errors.password && (errors.password.message as string)}
      >
        <Input
          disabled={isCreatingUser}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              message: "This field must be at least 8 characters",
              value: 8,
            },
          })}
        />
      </FormRow>

      <FormRow
        isgrid={true}
        lable="Repeat password"
        error={
          errors.passwordConfirm && (errors.passwordConfirm.message as string)
        }
      >
        <Input
          disabled={isCreatingUser}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            validate: (val: string) =>
              val === pass || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow isgrid={true}>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isCreatingUser}
          onClick={reset}
          variations="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isCreatingUser}>
          {!isCreatingUser ? "Create new user" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
