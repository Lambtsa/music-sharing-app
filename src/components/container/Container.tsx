import { memo, type ReactElement, useMemo } from 'react';

import { CONTAINER } from '@/constants/layout';

import type { ContainerProps } from './Container.types';

export const Container = memo(function Container({
  children,
  size = 'tablet',
}: ContainerProps): ReactElement {

  const styles = useMemo(() => {
    switch (size) {
      case 'mobile': {
        return {
          maxWidth: `${CONTAINER.MOBILE}px`,
        };
      }
      case 'tablet': {
        return {
          maxWidth: `${CONTAINER.TABLET}px`,
        };
      }
      case 'pc': {
        return {
          maxWidth: `${CONTAINER.PC}px`,
        };
      }
      case 'tv': {
        return {
          maxWidth: `${CONTAINER.TV}px`,
        };
      }
      case 'full': {
        return {
          maxWidth: '100%',
        };
      }
    }
  }, [size]);

  return (
    <div 
      className='flex flex-col items-center px-4 py-8 justify-start gap-4 h-full mx-auto my-0'
      style={styles}
    >
      {children}
    </div>
  );
});
