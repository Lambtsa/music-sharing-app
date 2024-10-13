'use client';

import { type RefObject, useEffect } from 'react';

type UseOuterClickProps = {
  ref: RefObject<HTMLElement>;
  isActive: boolean;
  action: () => void;
  exceptions?: string[];
};

export const useClickOutside = ({
  ref,
  isActive,
  action,
  exceptions = [],
}: UseOuterClickProps) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      const exception = clickedElement.getAttribute('id');

      if (exception && exceptions.includes(exception)) {
        return;
      }

      if (
        ref.current !== clickedElement &&
        !ref.current?.contains(clickedElement)
      ) {
        action();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    /* Cleanup */
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [action, exceptions, isActive, ref]);
};
