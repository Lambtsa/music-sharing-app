import type { InputHTMLAttributes } from 'react';

import type { ListOfTracksReturnType } from '@/types';

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  track: ListOfTracksReturnType['tracks'][number];
  handleOnClick: (url: string) => void;
  isLight: boolean;
}
