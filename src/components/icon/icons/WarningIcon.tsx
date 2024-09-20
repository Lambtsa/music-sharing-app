import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const WarningIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Size=24px, Fill=False">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24ZM40 24C40 32.8366 32.8366 40 24 40C15.1634 40 8 32.8366 8 24C8 15.1634 15.1634 8 24 8C32.8366 8 40 15.1634 40 24ZM26 30V34H22V30H26ZM26 26V14H22V26H26Z"
          fill={color}
        />
      </g>
    </BaseIcon>
  );
};
