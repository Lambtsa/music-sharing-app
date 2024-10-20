'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fragment, type PropsWithChildren, type ReactElement } from 'react';
import { IntlProvider } from 'react-intl';

import { NextAuthProvider } from '@/context/AuthProvider';
import { LightOrDarkThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import translations from '@/locales/en-UK.json';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <NextAuthProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </NextAuthProvider>
  );
};