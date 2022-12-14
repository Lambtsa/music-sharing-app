import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { LightOrDarkThemeProvider } from "@context/ThemeContext";
import { Fragment } from "react";
import { theme } from "@styles";
import { GlobalStyle } from "@styles";
import translations from "@locales/en-UK.json";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IntlProvider
        locale="en-UK"
        messages={translations}
        textComponent={Fragment}
      >
        <LightOrDarkThemeProvider>
          <Component {...pageProps} />
        </LightOrDarkThemeProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}
