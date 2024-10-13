import type { ReactElement } from 'react';

import styles from '@/components/icon/Icon.module.css';
import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const TermsIcon = ({ color, ...props }: Omit<IconProps, 'children'>): ReactElement => {
  return (
    <BaseIcon
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles['chevron']}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1H5C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H10C12.2091 15 14 13.2091 14 11V5C14 2.79086 12.2091 1 10 1Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 5.75C10.9142 5.75 11.25 5.41421 11.25 5C11.25 4.58579 10.9142 4.25 10.5 4.25V5.75ZM4.5 4.25C4.08579 4.25 3.75 4.58579 3.75 5C3.75 5.41421 4.08579 5.75 4.5 5.75V4.25ZM10.5 8.75C10.9142 8.75 11.25 8.41421 11.25 8C11.25 7.58579 10.9142 7.25 10.5 7.25V8.75ZM4.5 7.25C4.08579 7.25 3.75 7.58579 3.75 8C3.75 8.41421 4.08579 8.75 4.5 8.75V7.25ZM7.5 11.75C7.91421 11.75 8.25 11.4142 8.25 11C8.25 10.5858 7.91421 10.25 7.5 10.25V11.75ZM4.5 10.25C4.08579 10.25 3.75 10.5858 3.75 11C3.75 11.4142 4.08579 11.75 4.5 11.75V10.25ZM10.5 4.25H4.5V5.75H10.5V4.25ZM10.5 7.25H4.5V8.75H10.5V7.25ZM7.5 10.25H4.5V11.75H7.5V10.25Z" fill={color}/>
    </BaseIcon>
  );
};
