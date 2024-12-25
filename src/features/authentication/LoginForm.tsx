import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { LogInPropType } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
interface LoginFormPropType {
  isgrid: boolean;
}

function LoginForm({ isgrid = true }: LoginFormPropType) {
  const [email, setEmail] = useState("jonas@example.com");
  const [password, setPassword] = useState("123456789");
  const { onLogin, isLogining } = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) {
      const info: LogInPropType = {
        email,
        password,
      };
      onLogin(info, {
        onSettled: () => {
          setPassword("");
          setEmail("");
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow lable="Email address" isgrid={isgrid}>
        <Input
          disabled={isLogining}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow lable="Password" isgrid={isgrid}>
        <Input
          disabled={isLogining}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow isgrid={isgrid}>
        <Button sizes="large">
          {isLogining ? <SpinnerMini/> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
