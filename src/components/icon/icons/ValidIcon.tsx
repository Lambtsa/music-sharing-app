import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const ValidIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Size=24px, Fill=True">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24ZM36.146 17.858L22.006 32L13.52 23.514L16.348 20.686L22.006 26.344L33.318 15.03L36.146 17.858Z"
          fill={color}
        />
      </g>
    </BaseIcon>
  );
};
