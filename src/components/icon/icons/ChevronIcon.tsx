import styles from '@/components/icon/Icon.module.css';
import type { IconProps } from '@/components/icon/Icon.types';

import { BaseIcon } from './BaseIcon';

export const ChevronIcon = ({ color, ...props }: Omit<IconProps, 'children'>) => {
  return (
    <BaseIcon
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles['chevron']}
      {...props}
    >
      <path
        d="M8.00048 8.78047L11.3005 5.48047L12.2431 6.42314L8.00048 10.6658L3.75781 6.42314L4.70048 5.48047L8.00048 8.78047Z"
        fill={color}
      />
    </BaseIcon>
  );
};
