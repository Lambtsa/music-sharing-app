'use client';

import { useRouter } from 'next/navigation';
import { type ReactElement, useCallback } from 'react';

import { Logo } from '@/components/logo';
import { Toggle } from '@/components/toggle';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { routes } from '@/utils/routes';

export const Header = (): ReactElement => {
  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  return (
    <div data-testid='header--wrapper-div' className={`flex justify-between  items-center top-0 left-0 w-full px-4 ${isLight ? 'bg-ivory' : 'bg-eerieBlack'}`}>
      <button 
        data-testid='header-logo-button'
        type='button' 
        onClick={handleOnClick}
      >
        <Logo data-testid='header-logo-svg' isLight={isLight} />
      </button>
      <Toggle />
    </div>
  );
};
