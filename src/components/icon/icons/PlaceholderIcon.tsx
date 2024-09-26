import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const PlaceholderIcon = ({ ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 180.119 139.794" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(-13.59 -66.639)" paint-order="fill markers stroke">
        <path fill="#d0d0d0" d="M13.591 66.639H193.71v139.794H13.591z"/><path d="m118.507 133.514-34.249 34.249-15.968-15.968-41.938 41.937H178.726z" opacity=".675" fill="#fff"/>
        <circle cx="58.217" cy="108.555" r="11.773" opacity=".675" fill="#fff"/>
        <path fill="none" d="M26.111 77.634h152.614v116.099H26.111z"/>
      </g>
    </BaseIcon>
  );
};