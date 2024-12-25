import { NewSettingType, SettingType } from "../../services/apiSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSettings } = useEditSetting();
  if (isLoading) return <Spinner />;
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsperBooking,
    minBookingLength,
  } = settings as SettingType;

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) => {
    const { value } = e.target;
    if (!value) return;
    const newSetting: NewSettingType = {
      [field]: Number(value),
    };

    updateSettings(newSetting);
  };

  return (
    <Form>
      <FormRow lable="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow lable="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow lable="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsperBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsperBooking")}
        />
      </FormRow>
      <FormRow lable="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
