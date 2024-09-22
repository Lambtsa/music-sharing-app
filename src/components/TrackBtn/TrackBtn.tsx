import Image from 'next/image';

import { useTranslation } from '@/hooks/useTranslation';

import { Icon } from '../icon';
import type { TrackBtnProps } from './TrackBtn.types';

export const TrackBtn = ({
  track,
  handleOnClick,
  isLight,
}: TrackBtnProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div 
      className={`flex justify-center items-center gap-4 ${isLight ? 'bg-tiffanyBlue20' : 'bg-onyx'} rounded-[10px] w-full px-3 py-4`}
    >
      {track.imageUrl ? (
        <Image
          className='rounded-[7px]'
          height={60}
          width={60}
          object-fit="cover"
          src={track.imageUrl}
          alt={track.album.name}
          placeholder="blur"
          blurDataURL="/placeholder.svg"
        />
      ) : (
        <Icon icon='placeholder' height={60} width={60} />
      )
      }
      <div className="flex flex-auto flex-col justify-center items-start gap-1/2 w-full overflow-hidden whitespace-nowrap"
      >
        <h3 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {track.track.name}
        </h3>
        <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{track.artist}</p>
        <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{track.album.name}</p>
      </div>
      <button 
        className = 'px-4 py-2 rounded-[7px] bg-pastelPink text-ivory font-bold hover:text-ivory hover:bg-oldRose text-sm'
        type="button" 
        onClick={() => handleOnClick(track.url)}
      >
        {t({ id: 'label.select' })}
      </button>
    </div>
  );
};
