import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const MoonIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.00009 8.00077C0.996036 6.6271 1.37712 5.2798 2.10009 4.11177C2.80106 2.97733 3.82625 2.07929 5.04309 1.53377C6.23055 1.00425 7.55516 0.864224 8.82709 1.13377L9.00909 1.17577C8.20535 1.71232 7.52578 2.41473 7.01609 3.23577C6.29312 4.4038 5.91204 5.7511 5.91609 7.12477C5.90683 8.95788 6.59212 10.7265 7.83409 12.0748C8.68476 12.9942 9.78496 13.6458 11.0001 13.9498C9.97835 14.6323 8.77782 14.9979 7.54909 15.0008C5.78773 14.9902 4.1101 14.2475 2.91809 12.9508C1.67612 11.6025 0.990827 9.83388 1.00009 8.00077Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </BaseIcon>
  );
};
