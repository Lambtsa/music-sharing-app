'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { type ReactElement, useCallback, useMemo } from 'react';

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
  const { data: session } = useSession();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  const user = useMemo(() => session?.user, [session?.user]);

  return (
    <div data-testid='header--wrapper-div' className={`flex justify-between  items-center top-0 left-0 w-full px-4 ${isLight ? 'bg-ivory' : 'bg-eerieBlack'}`}>
      <button 
        data-testid='header-logo-button'
        type='button' 
        onClick={handleOnClick}
      >
        <Logo data-testid='header-logo-svg' isLight={isLight} />
      </button>
      <div className='flex justify-center items-center gap-4'>
        <Toggle />
        {!user && (
          <button 
            type='button' 
            className='rounded-full flex justify-center items-center h-10 w-10 bg-tiffanyBlue text-base font-normal text-ivory'
            onClick={() => console.log('User profile clicked')}
          >
            JD
          </button>
        )}
        {user && (
          <button 
            type='button' 
            className='rounded-full flex justify-center items-center h-10 w-10 bg-tiffanyBlue text-base font-normal text-ivory'
            onClick={() => console.log({ user })}
          >
            <Image
              className='rounded-full'         
              height={40}
              width={40}
              object-fit="cover"
              src={user.picture}
              alt={user.name}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
          </button>
        )}
      </div>
    </div>
  );
};
