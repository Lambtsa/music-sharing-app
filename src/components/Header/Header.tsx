'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Logo } from '@/components/Logo';
import { Toggle } from '@/components/Toggle';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { routes } from '@/helpers/routes';

export const Header = (): JSX.Element => {
  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  return (
    <div>
      <button type='button' onClick={handleOnClick}>
        <Logo isLight={isLight} />
      </button>
      <Toggle />
    </div>
  );
};
