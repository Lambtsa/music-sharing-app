import Image from "next/image";
import type { ReactElement } from "react";

import { Icon } from "@/components/icon";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/stores/theme.store";

import type { TrackBtnProps } from "./TrackBtn.types";

export const TrackBtn = ({
  track,
  handleOnClick,
}: TrackBtnProps): ReactElement => {
  const { isLight } = useTheme();
  const { t } = useTranslation();

  return (
    <div 
      className={`grid grid-cols-[50px_minmax(0,1fr)_80px] justify-center border border-eerie-black-20 items-center gap-4 ${isLight ? "bg-[#FFFFFF]" : "bg-onyx"} rounded-[10px] w-full px-4 py-3`}
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
      <div className="flex flex-auto flex-col justify-center items-start gap-1/2 w-full min-w-0"
      >
        <h3
          title={track.track.name}
          className={`${isLight ? "text-eerie-black" : "text-ivory"} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full`}
        >
          {track.track.name}
        </h3>
        <p
          title={track.artist}
          className={`${isLight ? "text-eerie-black-70" : "text-ivory-70"} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full`}>
          {track.artist}
        </p>
        <p
          title={track.album.name}
          className={`${isLight ? "text-eerie-black-70" : "text-ivory-70"} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full`}>
          {track.album.name}
        </p>
      </div>
      <button 
        className = 'px-4 py-2 rounded-[7px] hover:cursor-pointer bg-pastel-pink text-ivory font-bold hover:text-ivory hover:bg-old-rose text-sm'
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
