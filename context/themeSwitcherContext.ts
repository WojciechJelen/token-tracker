import { createContext } from "react";

export const ThemeSwitcherContext = createContext<{
  setDarkMode: (value: boolean) => void;
  isDark: boolean;
}>({
  setDarkMode: () => {},
  isDark: false,
});
