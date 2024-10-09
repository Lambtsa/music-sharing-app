import Image from 'next/image';
import type { ReactElement } from 'react';

import { Icon } from '@/components/icon';
import { useTranslation } from '@/hooks/useTranslation';

import type { ArtistBtnProps } from './ArtistBtn.types';

export const ArtistBtn = ({
  artist,
  handleOnClick,
  isLight,
}: ArtistBtnProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <div 
      className={`grid grid-cols-[50px_1fr_80px] justify-center items-center gap-4 ${isLight ? 'bg-tiffanyBlue20' : 'bg-onyx'} rounded-[10px] w-full px-3 py-4`}
    >
      {artist.imageUrl ? (
        <div className='relative h-[50px] w-[50px] overflow-hidden rounded-[7px]'>
          <Image           
            height={50}
            width={50}
            object-fit="cover"
            src={artist.imageUrl}
            alt={artist.name}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
          />
        </div>  
      ) : (
        <Icon icon='placeholder' height={50} width={50} />
      )
      }
      <div className="flex flex-auto flex-col justify-center items-start gap-1/2 w-full overflow-hidden whitespace-nowrap"
      >
        <h3 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {artist.name}
        </h3>
        <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{artist.followers} followers</p>
      </div>
      <button 
        className = 'px-4 py-2 rounded-[7px] bg-pastelPink text-ivory font-bold hover:text-ivory hover:bg-oldRose text-sm'
        type="button" 
        onClick={() => handleOnClick(artist.id)}
      >
        {t({ id: 'label.select' })}
      </button>
    </div>
  );
};
