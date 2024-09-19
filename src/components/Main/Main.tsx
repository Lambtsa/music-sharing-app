import type { ReactNode } from 'react';

import { useLightOrDarkTheme } from '@/context/ThemeContext';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps): JSX.Element => {
  const { isLight } = useLightOrDarkTheme();
  return (
    <main className={`flex-1 overflow-x-hidden min-w-full max-w-screen ${isLight ? 'bg-ivory' : 'bg-eerieBlack'}`}>
      {children}
    </main>
  );
};
