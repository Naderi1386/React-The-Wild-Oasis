import { CabinCreate, CabinType } from "../../services/apiCabins";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
export interface FileImageType {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface DataFormType {
  description: string;
  discount: string;
  maxCapacity: string;
  name: string;
  regularPrice: string;
  image: FileImageType[] | string;
}

interface CreateCabinFormPropType {
  cabinToEdit: CabinType;
  onCloseModal?: () => void;
}
const initialCabin: CabinType = {
  created_at: "",
  description: "",
  discount: 0,
  id: 0,
  image: "",
  maxCapacity: 0,
  name: "",
  regularPrice: 0,
};

function CreateCabinForm({
  cabinToEdit = initialCabin,
  onCloseModal,
}: CreateCabinFormPropType) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditing = editId !== 0;
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEdit, editCabin } = useEditCabin();
  const isWorking = isCreating || isEdit;

  const onSubmit = (data: object) => {
    const cabin = data as DataFormType;

    const newCabin: CabinCreate = {
      description: cabin.description,
      discount: Number(cabin.discount),
      image: typeof cabin.image === "string" ? cabin.image : cabin.image[0],
      maxCapacity: Number(cabin.maxCapacity),
      regularPrice: Number(cabin.regularPrice),
      name: cabin.name,
    };

    if (isEditing)
      editCabin(
        { id: editId, newCabin },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

    if (!isEditing)
      createCabin(
        { id: 0, newCabin },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        isgrid={true}
        lable="Cabin name"
        error={errors.name?.message as string}
      >
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        isgrid={true}
        lable="Max capacity"
        error={errors.maxCapacity?.message as string}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        isgrid={true}
        lable="Regular price"
        error={errors.regularPrice?.message as string}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required ",
            min: {
              value: 1,
              message: "price must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        isgrid={true}
        lable="Discount"
        error={errors.discount?.message as string}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              `Discount must be less than regular price`,
          })}
        />
      </FormRow>

      <FormRow
        isgrid={true}
        lable="Description for website"
        error={errors.description?.message as string}
      >
        <Textarea
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow isgrid={true} lable="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow isgrid={true}>
        <Button
          variations="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {!isEditing ? "Add cabin" : "Edit cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
