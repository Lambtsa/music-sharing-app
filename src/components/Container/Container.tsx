import { memo, useMemo } from 'react';

import { CONTAINER } from '@/constants/layout';

import type { ContainerProps } from './Container.types';

export const Container = memo(function Container({
  children,
  size = 'tablet',
}: ContainerProps) {

  const styles = useMemo(() => {
    switch (size) {
      case 'mobile': {
        return {
          maxWidth: `${CONTAINER.MOBILE}px`,
          padding: '96px 16px',
        };
      }
      case 'tablet': {
        return {
          maxWidth: `${CONTAINER.TABLET}px`,
          padding: '96px 16px',
        };
      }
      case 'pc': {
        return {
          maxWidth: `${CONTAINER.PC}px`,
          padding: '96px 16px',
        };
      }
      case 'tv': {
        return {
          maxWidth: `${CONTAINER.TV}px`,
          padding: '96px 16px',
        };
      }
      case 'full': {
        return {
          maxWidth: '100%',
          padding: '96px 16px',
        };
      }
    }
  }, [size]);

  return (
    <div 
      className='flex flex-col items-center justify-start gap-4 h-full mx-auto my-0'
      style={styles}
    >
      {children}
    </div>
  );
});
