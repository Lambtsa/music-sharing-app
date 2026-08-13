import Image from "next/image";
import type { ReactElement } from "react";

import { Icon } from "@/components/icon";
import { useTranslation } from "@/hooks/useTranslation";

import type { ArtistBtnProps } from "./ArtistBtn.types";

export const ArtistBtn = ({
  artist,
  handleOnClick,
  isLight,
}: ArtistBtnProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <div 
      className={`grid grid-cols-[50px_minmax(0,1fr)_80px] justify-center items-center gap-4 ${isLight ? "bg-tiffany-blue-20" : "bg-onyx"} rounded-[10px] w-full px-4 py-3`}
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
      <div className="flex flex-auto flex-col justify-center items-start gap-1/2 w-full min-w-0"
      >
        <h3
          title={artist.name}
          className={`${isLight ? "text-eerie-black" : "text-ivory"} text-left font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full`}
        >
          {artist.name}
        </h3>
        <p
          title={`${artist.followers} followers`}
          className={`${isLight ? "text-eerie-black" : "text-ivory"} text-left font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full`}>
          {artist.followers} followers
        </p>
      </div>
      <button 
        className = 'px-4 py-2 rounded-[7px] hover:cursor-pointer bg-pastel-pink text-ivory font-bold hover:text-ivory hover:bg-old-rose text-sm'
        type="button" 
        onClick={() => handleOnClick(artist.id)}
      >
        {t({
          id: "label.select" 
        })}
      </button>
    </div>
  );
};
