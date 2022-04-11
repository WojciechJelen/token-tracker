import { useState, createContext, useCallback } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@emotion/react";
import { ThemeSwitcherContext } from "../context/themeSwitcherContext";
import { darkTheme, lightTheme } from "../styled/themes";
import { Global, css } from "@emotion/react";

const queryClient = new QueryClient();

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
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            font-family: "Montserrat", sans-serif;
          }
          body {
            margin: 0;
            height: 100vh;
          }
        `}
      />
      <ThemeSwitcherContext.Provider value={{ setDarkMode, isDark }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {/* @ts-ignore */}
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </ThemeSwitcherContext.Provider>
    </>
  );
}

export default MyApp;
