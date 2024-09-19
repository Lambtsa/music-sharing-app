import type { ReactNode } from 'react';

import type { TranslationKey } from '@/types';

export type ToastType = 'Active' | 'Error';

export interface ToastMessage {
  id: TranslationKey;
  variables?: Record<string, ReactNode>;
}

export interface ToastProps {
  type: ToastType;
  message: ToastMessage;
  passableData?: Record<string, ReactNode>;
  onClose: () => void;
}
