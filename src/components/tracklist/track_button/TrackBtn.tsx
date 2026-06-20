import Image from "next/image";
import type { ReactElement } from "react";

import { Icon } from "@/components/icon";
import { useTranslation } from "@/hooks/useTranslation";

import type { TrackBtnProps } from "./TrackBtn.types";

export const TrackBtn = ({
  track,
  handleOnClick,
  isLight,
}: TrackBtnProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <div 
      className={`grid grid-cols-[50px_1fr_80px] justify-center items-center gap-4 ${isLight ? "bg-tiffany-blue-20" : "bg-onyx"} rounded-[10px] w-full px-3 py-4`}
    >
      {track.imageUrl ? (
        <div className='relative h-[50px] w-[50px] overflow-hidden rounded-[7px]'>
          <Image
            className='rounded-[7px]'
            height={50}
            width={50}
            object-fit="cover"
            src={track.imageUrl}
            alt={track.album.name}
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
        <h3 className={`${isLight ? "text-eerie-black" : "text-ivory"} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {track.track.name}
        </h3>
        <p className={`${isLight ? "text-eerie-black" : "text-ivory"} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{track.artist}</p>
        <p className={`${isLight ? "text-eerie-black" : "text-ivory"} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis`}>{track.album.name}</p>
      </div>
      <button 
        className = 'px-4 py-2 rounded-[7px] bg-pastel-pink text-ivory font-bold hover:text-ivory hover:bg-old-rose text-sm'
        type="button" 
        onClick={() => handleOnClick(track.url)}
      >
        {t({
          id: "label.select" 
        })}
      </button>
    </div>
  );
};
