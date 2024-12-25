import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUserUpdate } from "./useUpdateUser";
import { UpdatedUserType } from "../../services/apiAuth";
interface UserMetaType {
  email: string;
  fullName: string;
}

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  const { updateUser, isUpdating } = useUserUpdate();
  const { user } = useUser();
  const { email, fullName: currentFullName } =
    user?.user_metadata as UserMetaType;
    console.log(currentFullName);
    

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<FileList | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    const updatedUserInfo: UpdatedUserType = {
      avatar: avatar as FileList,
      fullName: fullName,
    };
    updateUser(updatedUserInfo, {
      onSettled: () => {
        handleReset()
      },
    });
  }
  function handleReset() {
    setAvatar(null);
    setFullName(currentFullName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow isgrid={true} lable="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow isgrid={true} lable="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow isgrid={true} lable="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow isgrid={true}>
        <Button
          onClick={handleReset}
          disabled={isUpdating}
          type="reset"
          variations="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
