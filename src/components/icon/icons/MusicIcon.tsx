import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const MusicIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15.001 3V27M19.4997 6V24M23.9994 9V21M28.5 12V18M10.4994 24V6M6.00016 21V9M1.5 18V12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </BaseIcon>
  );
};
