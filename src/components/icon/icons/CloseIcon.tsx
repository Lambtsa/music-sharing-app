import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const CloseIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Size=24px, Fill=True">
        <path
          id="Vector"
          d="M24 21.172L33.9 11.272L36.728 14.1L26.828 24L36.728 33.9L33.9 36.728L24 26.828L14.1 36.728L11.272 33.9L21.172 24L11.272 14.1L14.1 11.272L24 21.172Z"
          fill={color}
        />
      </g>
    </BaseIcon>
  );
};
