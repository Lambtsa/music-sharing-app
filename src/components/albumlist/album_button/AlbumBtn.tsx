import Image from 'next/image';
import { type ReactElement, useCallback, useMemo, useState } from 'react';

import { Icon } from '@/components/icon';
import { useTranslation } from '@/hooks/useTranslation';

import type { TrackBtnProps } from './AlbumBtn.types';

export const AlbumBtn = ({
  album,
  isLight,
  handleOnClick,
}: TrackBtnProps): ReactElement => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandOnClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  const tracks = useMemo(() => {
    return album.tracks;
  }, [album.tracks]);

  const hasTracks = !!tracks.length;

  return (
    <>
      <div className={`grid grid-cols-[50px_1fr_40px] justify-center items-center gap-4 [&>svg]:min-w-[30px] ${isLight ? 'bg-tiffanyBlue20 [&>svg>path]:stroke-eerieBlack' : 'bg-onyx [&>svg>path]:stroke-ivory'} rounded-[10px] w-full px-3 py-4`}>
        {album.imageUrl ? (
          <div className='relative h-[50px] w-[50px] overflow-hidden rounded-[7px]'>
            <Image
              className='rounded-[7px]'
              height={50}
              width={50}
              object-fit="cover"
              src={album.imageUrl}
              alt={album.album.name}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
          </div>
        ) : (
          <Icon icon='placeholder' width={50} height={50} />
        )
        }
        <div className = 'flex flex-auto flex-col justify-center items-start gap-1/2 w-full overflow-hidden whitespace-nowrap'>
          <h3 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>
            {album.artist}
          </h3>
          <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>
            {album.album.name}
          </p>
          <p className={`${isLight ? 'text-eerieBlack70' : 'text-ivory70'} text-left font-normal text-xs overflow-hidden whitespace-nowrap text-ellipsis`}>
            {album.release_date}
          </p>
        </div>
        <button
          className={`flex justify-center transition transform duration-[300ms] ease-out items-center px-2 py-4 rounded-[7px] text-sm text-ivory ${isExpanded ? 'transform rotate-90' : ''}`}
          type="button"
          onClick={handleExpandOnClick}
        >
          <Icon icon='chevron' rotate={270} color={isLight ? '#262626' : '#FFFEED'} />
        </button>
      </div>
      {isExpanded && (
        <div className='flex flex-col gap-1 py-2'>
          {hasTracks &&
            tracks.map((track) => (
              <div 
                key={track.id}
                className={`flex justify-between items-center gap-4 ${isLight ? 'bg-tiffanyBlue20' : 'bg-onyx'} rounded-[10px] w-full px-3 py-4`} 
              >
                <Icon icon='music' width={30} height={30} color={isLight ? '#262626' : '#FFFEED'} />
                <div className='flex flex-auto flex-col justify-center items-start gap-1/2 w-full overflow-hidden whitespace-nowrap'>
                  <h3 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>
                    {track.track.name}
                  </h3>
                  <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>
                    {track.artist}
                  </p>
                </div>
                <button
                  className = 'px-4 py-2 rounded-[7px] bg-pastelPink text-ivory font-bold hover:text-ivory hover:bg-oldRose text-sm'
                  type="button"
                  onClick={() => handleOnClick(track.url)}
                >
                  {t({ id: 'label.select' })}
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
