import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini"

const Logout = () => {
    const {onLogout,isPending}=useLogout()
  return (
    <ButtonIcon onClick={() => onLogout()}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout