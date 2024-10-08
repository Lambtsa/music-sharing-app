import { type ReactElement, useMemo } from 'react';

import { Icon } from '@/components/icon';

import type { IconProps } from '../icon/Icon.types';


interface LogoProps extends Omit<IconProps, 'children'> {
  isLight: boolean;
}

export const Logo = (props: LogoProps): ReactElement => {

  const { isLight, ...rest } = useMemo(() => props, [props]);

  if (isLight) { 
    return (
      <Icon {...rest} icon='dark' width={60} height={60} />
    );
  }
  return <Icon {...rest} icon='light' width={60} height={60} />;
};
