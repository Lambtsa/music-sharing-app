'use client';

import Image from 'next/image';
import type { User } from 'next-auth';
import { type ReactElement, useMemo, useRef, useState } from 'react';

import { Icon, type IconType } from '@/components/icon';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { useClickOutside } from '@/hooks/useClickOutside';

import styles from './ProfileDropdown.module.css';

export type ProfileDropdownMenu = {
  id: string;
  icon: IconType
  label: string;
  onClick: () => void;
};

type ProfileDropdownProps = {
  menu: ProfileDropdownMenu[];
  user: User;
  open?: boolean;
};

export const ProfileDropdown = ({
  menu,
  user,
  open = false,
}: ProfileDropdownProps): ReactElement => {
  const dropdown = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(open);
  const { isLight } = useLightOrDarkTheme();

  useClickOutside({
    ref: dropdown,
    isActive: isExpanded,
    action: () => setIsExpanded(false),
  });

  const isOpen = useMemo(() => {
    return isExpanded && !!menu.length;
  }, [isExpanded, menu]);

  return (
    <nav ref={dropdown} className="relative" data-testid="component-dropdown">
      <button
        data-testid="dropdown-button"
        onClick={() => setIsExpanded((value) => !value)}
        className='rounded-full flex justify-center items-center h-[36px] w-[36px] bg-tiffanyBlue text-base font-normal text-ivory'
      >
        {user.picture && (
          <Image
            className='rounded-full'         
            height={36}
            width={36}
            object-fit="cover"
            src={user.picture}
            alt={user.name}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
          />
        )}
      </button>

      {isOpen && (
        <ul
          className={`${styles['dropdown']} absolute right-0 mt-2 flex w-max flex-col gap-2 rounded ${isLight ? 'bg-eerieBlack' : 'bg-ivory'} py-2`}
        >
          {menu.map((item, index) => (
            <li
              key={item.label}
              className="flex justify-start items-center gap-2 text-sm text-brand"
            >
              <button
                onClick={item.onClick}
                className={`flex gap-2 w-full ${isLight ? 'text-ivory hover:bg-ivory20' : 'text-eerieBlack hover:bg-eerieBlack20'} items-center justify-start px-2 py-1 rounded`}
              >
                <Icon icon={item.icon} height={16} width={16} color={isLight ? '#FFFEED' : '#262626'} />
                {item.label}
              </button>

              {index % 2 !== 0 && index !== menu.length - 1 && (
                <div className="h-px bg-gray-200" />
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
