'use client';

import type { ReactElement } from 'react';

import { useTranslation } from '@/hooks/useTranslation';
import type { SearchType } from '@/types/music';

type SearchItemProps = {
  type: SearchType;
  artist: string | null;
  track: string | null;
  url: string | null;
  onClick: () => void;
};

export const SearchItem = ({
  type,
  artist,
  track,
  url,
  onClick,
}: SearchItemProps): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr] justify-between items-center w-full px-4 py-2 gap-4 rounded-xl border border-ivory70">
      <div className="flex flex-col justify-start max-w-full overflow-hidden">
        <h1 className="text-[10px] whitespace-nowrap font-bold uppercase text-ivory70">Search type</h1>
        <p title={type} className="text-base capitalize whitespace-nowrap text-ellipsis overflow-hidden max-w-full text-ivory">{type}</p>
      </div>
      <div className="flex flex-col justify-start max-w-full overflow-hidden">
        <h1 className="text-[10px] whitespace-nowrap font-bold uppercase text-ivory70">Artist</h1>
        <p className="text-base whitespace-nowrap text-ellipsis overflow-hidden max-w-full text-ivory">{artist || '-'}</p>
      </div>
      <div className="flex flex-col justify-start max-w-full overflow-hidden">
        <h1 className="text-[10px] whitespace-nowrap font-bold uppercase text-ivory70">Track</h1>
        <p className="text-base whitespace-nowrap text-ellipsis overflow-hidden max-w-full text-ivory">{track || '-'}</p>
      </div>
      <div className="flex flex-col justify-start max-w-full overflow-hidden">
        <h1 className="text-[10px] whitespace-nowrap font-bold uppercase text-ivory70">Url</h1>
        <p className="text-base whitespace-nowrap text-ellipsis overflow-hidden max-w-full text-ivory">{url || '-'}</p>
      </div>
      <button
        className = 'px-4 py-2 rounded-[7px] bg-pastelPink text-ivory font-bold hover:text-ivory hover:bg-oldRose text-sm'
        type="button"
        onClick={onClick}
      >
        {t({ id: 'label.select' })}
      </button>
    </div>
  );
};