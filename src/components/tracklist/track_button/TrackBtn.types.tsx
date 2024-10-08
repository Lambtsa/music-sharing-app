import type { InputHTMLAttributes } from 'react';

import type { TrackReturnType } from '@/types/api';

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  track: TrackReturnType;
  handleOnClick: (url: string) => void;
  isLight: boolean;
}
