import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const SpotifyIcon = ({ ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none" {...props}>
      <path d="M15 0C6.71591 0 0 6.71568 0 14.9997C0 23.2847 6.71591 30 15 30C23.2845 30 30 23.2847 30 14.9997C30 6.71621 23.285 0 15 0ZM21.8789 21.6339C21.6095 22.0758 21.0338 22.2143 20.5934 21.945C17.071 19.7922 12.6374 19.3059 7.41607 20.4987C6.91293 20.614 6.41139 20.2986 6.29677 19.7956C6.18159 19.2925 6.49558 18.7909 6.99998 18.6763C12.7139 17.37 17.6151 17.9323 21.5688 20.3482C22.0095 20.6187 22.1494 21.1933 21.8789 21.6339ZM23.7149 17.5502C23.3756 18.1006 22.6559 18.2733 22.1062 17.9353C18.0751 15.4574 11.9283 14.7396 7.15922 16.1873C6.54072 16.3741 5.88747 16.0255 5.69975 15.4081C5.51347 14.7896 5.86222 14.1376 6.47964 13.9496C11.9272 12.2967 18.6993 13.0973 23.3296 15.9426C23.8795 16.2812 24.0534 17.001 23.7149 17.5502ZM23.8725 13.2972C19.0373 10.4258 11.0619 10.1617 6.44613 11.5626C5.70494 11.7874 4.92112 11.369 4.6965 10.6278C4.47188 9.88626 4.88995 9.10297 5.63168 8.87764C10.9302 7.26916 19.7384 7.57993 25.3044 10.8841C25.9711 11.2798 26.1898 12.1408 25.7946 12.8066C25.4006 13.4733 24.537 13.6931 23.8725 13.2972Z" fill="#2EBD59"/>
    </BaseIcon>
  );
};
