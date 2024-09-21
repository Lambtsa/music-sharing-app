'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Toast, type ToastProps } from '@/components/Toast';
import { createStableUUID } from '@/utils/uuid';

export type ToastType = Pick<ToastProps, 'message' | 'type' | 'title'> & { id: string };

type ToastContextShape = {
  addToast: (toast: ToastType) => void;
};

const ToastContext = createContext<ToastContextShape | undefined>(undefined);

type ToastTypeExtended = ToastType & {
  id: string;
};

type ToastProviderProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastRoot, setToastRoot] = useState<Element | null>(null);
  const [toasts, setToasts] = useState<ToastTypeExtended[]>([]);

  /* ############################## */
  /* Actions */
  /* ############################## */
  const handleOnClose = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastType, 'onClose'>) => {
    const extendedToast: ToastTypeExtended = {
      ...toast,
      id: createStableUUID(toast.id),
    };
    setToasts((toasts) => [...toasts, extendedToast]);
  }, []);

  /* ############################## */
  /* State */
  /* ############################## */
  const toastValue: ToastContextShape = useMemo(
    () => ({
      addToast,
    }),
    [addToast]
  );

  /* ############################## */
  /* Lifecycle hooks */
  /* ############################## */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toasts.length > 0) {
      timer = setTimeout(() => setToasts((toasts) => toasts.slice(1)), 3000);
    }

    return () => clearTimeout(timer);
  }, [toasts.length]);

  useEffect(() => {
    const toastDiv = document.querySelector('#toast-root');
    if (!toastDiv) {
      return;
    }
    setToastRoot(toastDiv);
  }, []);

  const hasToasts = !!toasts.length;

  return (
    <ToastContext.Provider value={toastValue}>
      {hasToasts &&
        toastRoot &&
        createPortal(
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onClose={() => handleOnClose(toast.id)}
            />
          )),
          toastRoot
        )}
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };

export const useToast = (): ToastContextShape => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
