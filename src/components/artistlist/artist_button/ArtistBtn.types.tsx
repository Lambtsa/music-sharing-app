import type { InputHTMLAttributes } from 'react';

import type { ArtistReturnType } from '@/types/api';

export interface ArtistBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  artist: ArtistReturnType;
  handleOnClick: (artist: string) => void;
  isLight: boolean;
}
