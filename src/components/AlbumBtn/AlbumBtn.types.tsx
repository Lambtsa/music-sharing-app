import type { InputHTMLAttributes } from 'react';

import type { ListOfAlbumsReturnType } from '@/types';

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  album: ListOfAlbumsReturnType['albums'][number];
  handleOnClick: (url: string) => void;
  isLight: boolean;
}
