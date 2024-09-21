import { type ReactElement, useMemo } from 'react';

import { Icon, type IconType } from '@/components/icon';
import { useLightOrDarkTheme } from '@/context/ThemeContext';

import type { ToastProps } from './Toast.types';

export const Toast = ({
  title,
  type,
  message,
  onClose,
}: ToastProps): ReactElement => {
  const { isLight } = useLightOrDarkTheme();

  const icon = useMemo((): IconType => {
    switch (type) {
      case 'success':
        return 'info';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'warning';
      case 'info':
        return 'info';
    }
  }, [type]);

  const color = useMemo(() => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'warning':
        return '#FFC107';
      case 'danger':
        return '#F44336';
      case 'info':
        return '#2196F3';
    }
  }, [type]);

  return (
    <div
      data-testid='component-toast'
      className={`toast flex w-80 items-center justify-between gap-2 rounded ${isLight ? 'bg-eerieBlack text-ivory' : 'bg-ivory text-eerieBlack'} px-4 py-3`}
    >
      <div className="flex items-center gap-2">
        <Icon
          color={color}
          data-testid="toast-info-icon"
          icon={icon}
        />
        <div>
          <h2 className="text-sm font-bold leading-4">{title}</h2>
          {message && <p className="text-sm leading-4">{message}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`rounded p-2 ${isLight ? 'hover:bg-ivory20' : 'hover:bg-eerieBlack20'}`}
      >
        <Icon
          color={isLight ? '#FFFEED' : '#262626'}
          data-testid="toast-close-icon" 
          icon='close' 
        />
      </button>
    </div>
  );
};
