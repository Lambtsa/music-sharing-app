import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const SearchIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Size=24px, Fill=False">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.628 41.798L36.062 33.234C38.6164 30.0475 40.0058 26.084 40 22C40 12.064 31.936 4 22 4C12.064 4 4 12.064 4 22C4 31.936 12.064 40 22 40C26.084 40.0058 30.0475 38.6164 33.234 36.062L41.798 44.628L44.628 41.798ZM36 22C36.0057 25.6409 34.5882 29.1398 32.05 31.75L31.75 32.05C29.1398 34.5882 25.6409 36.0057 22 36C14.264 36 8 29.734 8 22C8 14.264 14.264 8 22 8C29.734 8 36 14.264 36 22Z"
          fill={color}
        />
      </g>
    </BaseIcon>
  );
};
