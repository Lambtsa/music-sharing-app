import Image from 'next/image';

import { useTranslation } from '@/hooks/useTranslation';

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
      <Image
        className='rounded-[7px]'
        height={60}
        width={60}
        object-fit="cover"
        src={track.imageUrl || '/placeholder.svg'}
        alt={track.album}
        placeholder="blur"
        blurDataURL="/placeholder.svg"
      />
      <div className="flex flex-auto flex-col justify-center items-start gap-1/2 w-full overflow-hidden whitespace-nowrap"
      >
        <h3 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {track.track}
        </h3>
        <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{track.artist}</p>
        <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{track.album}</p>
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
