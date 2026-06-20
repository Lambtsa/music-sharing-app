"use client";

import {
  Fragment, type PropsWithChildren, type ReactElement 
} from "react";
import { IntlProvider } from "react-intl";

import { ThemeProvider } from "@/context/ThemeContext";
import translations from "@/locales/en-UK.json";

export const AppProviders = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <IntlProvider
      locale="en-UK"
      messages={translations}
      textComponent={Fragment}
    >
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </IntlProvider>
  );
};