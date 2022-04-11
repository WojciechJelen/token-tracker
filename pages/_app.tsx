import { useState, createContext, useCallback } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { jsx, ThemeProvider } from "@emotion/react";

const queryClient = new QueryClient();
/**
 * @todo:
 * move it to separate file
 */
const lightTheme = {
  colors: {
    text: "#000",
    background: "#fff",
  },
};

const darkTheme = {
  colors: {
    background: "#121212",
    text: "#fff",
  },
};

/**
 * @todo:
 * move it to separate file
 */
export const ThemeSwitcherContext = createContext<{
  setDarkMode: (value: boolean) => void;
  isDark: boolean;
}>({
  setDarkMode: () => {},
  isDark: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setDarkTheme] = useState<boolean>(false);
  const setDarkMode = useCallback(
    (value: boolean) => {
      setDarkTheme(value);
    },
    [setDarkTheme]
  );
  console.log("###isDark", isDark);
  return (
    <ThemeSwitcherContext.Provider value={{ setDarkMode, isDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* @ts-ignore */}
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}

export default MyApp;
