import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const TickIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Size=24px, Fill=True">
        <path
          id="Vector"
          d="M20 30.344L38.384 11.958L41.214 14.786L20 36L7.27197 23.272L10.1 20.444L20 30.344Z"
          fill={color}
        />
      </g>
    </BaseIcon>
  );
};
