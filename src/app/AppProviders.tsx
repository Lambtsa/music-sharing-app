"use client";

import {
  Fragment, type PropsWithChildren, type ReactElement 
} from "react";
import { IntlProvider } from "react-intl";

import translations from "@/locales/en-UK.json";
import { useTheme } from "@/stores/theme.store";

export const AppProviders = ({ children }: PropsWithChildren): ReactElement => {
  const { isLight } = useTheme();
  
  return (
    <IntlProvider
      locale="en-UK"
      messages={translations}
      textComponent={Fragment}
    >
      <main className={`grid grid-cols-1 grid-rows-[60px_1fr_60px] h-full overflow-x-hidden min-w-full max-w-screen ${isLight ? "bg-ivory" : "bg-eerie-black"}`}>
        {children}
      </main>
    </IntlProvider>
  );
};