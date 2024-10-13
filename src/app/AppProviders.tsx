'use client';

import { Fragment, type PropsWithChildren, type ReactElement } from 'react';
import { IntlProvider } from 'react-intl';

import { NextAuthProvider } from '@/context/AuthProvider';
import { LightOrDarkThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import translations from '@/locales/en-UK.json';

export const AppProviders = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <NextAuthProvider>
      <IntlProvider
        locale="en-UK"
        messages={translations}
        textComponent={Fragment}
      >
        <LightOrDarkThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LightOrDarkThemeProvider>
      </IntlProvider>
    </NextAuthProvider>
  );
};