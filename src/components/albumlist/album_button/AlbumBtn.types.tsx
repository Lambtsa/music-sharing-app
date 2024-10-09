import type { InputHTMLAttributes } from 'react';

import type { AlbumReturnType } from '@/types/api';

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  album: AlbumReturnType;
  handleOnClick: (url: string) => void;
  isLight: boolean;
}
