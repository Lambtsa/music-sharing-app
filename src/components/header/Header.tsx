'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { type ReactElement, useCallback, useMemo } from 'react';

import { Logo } from '@/components/logo';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Toggle } from '@/components/toggle';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { routes } from '@/utils/routes';

import type { ProfileDropdownMenu } from '../profile-dropdown/ProfileDropdown';

export const Header = (): ReactElement => {
  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const router = useRouter();
  const { data: session } = useSession();

  /* ################################################## */
  /* Actions */
  /* ################################################## */
  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);


  const profileOptions = useMemo((): ProfileDropdownMenu[] => ([
    {
      id: 'header.dropdown.profil.history.label',
      label: 'History',
      icon: 'music',
      onClick: () => console.log('History clicked'),
    },
    {
      id: 'header.dropdown.profil.privacy.label',
      label: 'Privacy',
      icon: 'privacy',
      onClick: () => console.log('History clicked'),
    },
    {
      id: 'header.dropdown.profil.terms.label',
      label: 'Terms & conditions',
      icon: 'terms',
      onClick: () => console.log('History clicked'),
    },
    {
      id: 'header.dropdown.profil.signout.label',
      label: 'Sign out',
      icon: 'signout',
      onClick: () => console.log('History clicked'),
    },
  ]), []);

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
          <ProfileDropdown
            user={user}
            menu={profileOptions}
          />
        )}
      </div>
    </div>
  );
};
