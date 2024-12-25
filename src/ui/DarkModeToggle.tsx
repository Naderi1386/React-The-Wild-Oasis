import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/useDarkMode";

const DarkModeToggle = () => {
    const { isDarkMode, handleChangeMode } = useDarkMode();
    
  return (
    <ButtonIcon onClick={() => handleChangeMode(!isDarkMode)}>
      {!isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
