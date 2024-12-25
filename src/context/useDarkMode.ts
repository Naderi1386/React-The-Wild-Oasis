import { useContext } from "react";
import { ContextDarkMode, DarkModeContextType } from "./DarkModeContext";

export const useDarkMode = () => {
  const context = useContext(ContextDarkMode) as DarkModeContextType;
  if (context == undefined)
    throw new Error("You must use context inside the provider");
  return context;
};
