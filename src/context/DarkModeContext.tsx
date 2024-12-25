import { createContext, ReactNode, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export interface DarkModeContextType {
  isDarkMode: boolean;
  handleChangeMode: (mode: boolean) => void;
}
// interface InitialDarkModeStateType {
//   mode: "dark-mode" | "light-mode";
// }
// const initialDarkModeState:InitialDarkModeStateType={
//     mode:'light-mode'
// }

export const ContextDarkMode = createContext<null | DarkModeContextType>(null);

interface DarkModeContextProviderPropType {
  children: ReactNode;
}
const DarkModeContextProvider = ({
  children,
}: DarkModeContextProviderPropType) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );
  const handleChangeMode = (mode: boolean) => setIsDarkMode(mode);
  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <ContextDarkMode.Provider value={{ isDarkMode, handleChangeMode }}>
      {children}
    </ContextDarkMode.Provider>
  );
};

export default DarkModeContextProvider;
