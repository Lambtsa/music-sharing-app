import type { ReactElement } from 'react';

import styles from '@/components/icon/Icon.module.css';
import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const PrivacyIcon = ({ color, ...props }: Omit<IconProps, 'children'>): ReactElement => {
  return (
    <BaseIcon
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles['chevron']}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M14 4.521C14.125 11.366 10.042 14.278 7.727 14.965C7.57366 15.0106 7.41034 15.0106 7.257 14.965C4.98 14.29 1.014 11.464 1 4.862C1.01372 4.29149 1.33458 3.7729 1.839 3.506C5.363 1.516 7.058 1 7.489 1C7.92 1 9.749 1.549 13.507 3.7C13.8045 3.86767 13.9918 4.17958 14 4.521Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 8.01508L6.5 10.0151L10.5 6.00708" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </BaseIcon>
  );
};
