import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const BurgerIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...props}>
      <g clipPath="url(#clip0_2917_7296)">
        <path
          d="M17.5 15.0006V16.6672H2.5V15.0006H17.5ZM14.5033 3.25391L18.3333 7.08391L14.5033 10.9139L13.325 9.73557L15.9767 7.08391L13.325 4.43224L14.5033 3.25391ZM10 9.16724V10.8339H2.5V9.16724H10ZM10 3.33391V5.00057H2.5V3.33391H10Z"
          fill={color}
        />
      </g>
    </BaseIcon>
  );
};
