import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const SunIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.625 8C10.625 9.44975 9.44975 10.625 8 10.625C6.55025 10.625 5.375 9.44975 5.375 8C5.375 6.55025 6.55025 5.375 8 5.375C9.44975 5.375 10.625 6.55025 10.625 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 8.75C15.4142 8.75 15.75 8.41421 15.75 8C15.75 7.58579 15.4142 7.25 15 7.25V8.75ZM13.25 7.25C12.8358 7.25 12.5 7.58579 12.5 8C12.5 8.41421 12.8358 8.75 13.25 8.75V7.25ZM2.75 8.75C3.16421 8.75 3.5 8.41421 3.5 8C3.5 7.58579 3.16421 7.25 2.75 7.25V8.75ZM1 7.25C0.585786 7.25 0.25 7.58579 0.25 8C0.25 8.41421 0.585786 8.75 1 8.75V7.25ZM8.75 1C8.75 0.585786 8.41421 0.25 8 0.25C7.58579 0.25 7.25 0.585786 7.25 1H8.75ZM7.25 2.75C7.25 3.16421 7.58579 3.5 8 3.5C8.41421 3.5 8.75 3.16421 8.75 2.75H7.25ZM8.75 13.25C8.75 12.8358 8.41421 12.5 8 12.5C7.58579 12.5 7.25 12.8358 7.25 13.25H8.75ZM7.25 15C7.25 15.4142 7.58579 15.75 8 15.75C8.41421 15.75 8.75 15.4142 8.75 15H7.25ZM13.4803 3.58033C13.7732 3.28744 13.7732 2.81256 13.4803 2.51967C13.1874 2.22678 12.7126 2.22678 12.4197 2.51967L13.4803 3.58033ZM11.1817 3.75767C10.8888 4.05056 10.8888 4.52544 11.1817 4.81833C11.4746 5.11122 11.9494 5.11122 12.2423 4.81833L11.1817 3.75767ZM4.81833 12.2423C5.11122 11.9494 5.11122 11.4746 4.81833 11.1817C4.52544 10.8888 4.05056 10.8888 3.75767 11.1817L4.81833 12.2423ZM2.51967 12.4197C2.22678 12.7126 2.22678 13.1874 2.51967 13.4803C2.81256 13.7732 3.28744 13.7732 3.58033 13.4803L2.51967 12.4197ZM3.58033 2.51967C3.28744 2.22678 2.81256 2.22678 2.51967 2.51967C2.22678 2.81256 2.22678 3.28744 2.51967 3.58033L3.58033 2.51967ZM3.75767 4.81833C4.05056 5.11122 4.52544 5.11122 4.81833 4.81833C5.11122 4.52544 5.11122 4.05056 4.81833 3.75767L3.75767 4.81833ZM12.2433 11.1827C11.9504 10.8898 11.4756 10.8898 11.1827 11.1827C10.8898 11.4756 10.8898 11.9504 11.1827 12.2433L12.2433 11.1827ZM12.4197 13.4803C12.7126 13.7732 13.1874 13.7732 13.4803 13.4803C13.7732 13.1874 13.7732 12.7126 13.4803 12.4197L12.4197 13.4803ZM15 7.25H13.25V8.75H15V7.25ZM2.75 7.25H1V8.75H2.75V7.25ZM7.25 1V2.75H8.75V1H7.25ZM7.25 13.25V15H8.75V13.25H7.25ZM12.4197 2.51967L11.1817 3.75767L12.2423 4.81833L13.4803 3.58033L12.4197 2.51967ZM3.75767 11.1817L2.51967 12.4197L3.58033 13.4803L4.81833 12.2423L3.75767 11.1817ZM2.51967 3.58033L3.75767 4.81833L4.81833 3.75767L3.58033 2.51967L2.51967 3.58033ZM11.1827 12.2433L12.4197 13.4803L13.4803 12.4197L12.2433 11.1827L11.1827 12.2433Z" fill={color} />
    </BaseIcon>
  );
};