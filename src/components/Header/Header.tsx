'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Logo } from '@/components/Logo';
import { Toggle } from '@/components/Toggle';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { routes } from '@/utils/routes';

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
    <div data-testid='header--wrapper-div' className='flex justify-between items-center fixed top-0 left-0 w-full px-4'>
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
