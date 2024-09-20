import { type ReactNode, useMemo } from 'react';

import { ReactComponent as Deezer } from '@/assets/deezer.svg';
import { ReactComponent as Spotify } from '@/assets/spotify.svg';
import { ReactComponent as Youtube } from '@/assets/youtube.svg';
import { InputCheckbox } from '@/components/Inputs/InputCheckbox';
import { CustomApiErrorMessages } from '@/constants/errors';
import { useTranslation } from '@/hooks/useTranslation';
import type { MusicProviders } from '@/types';

interface MusicLinkProps {
  service: MusicProviders;
  serviceUrl: string;
  isLight: boolean;
  handleOnChange: (id: MusicProviders) => void;
  isSelected: boolean;
}

export const MusicLink = ({
  service,
  serviceUrl,
  isLight,
  handleOnChange,
  isSelected,
}: MusicLinkProps): JSX.Element => {
  const { t } = useTranslation();

  /* ############################## */
  /* State */
  /* ############################## */
  const isDisabled = useMemo(() => {
    return serviceUrl === CustomApiErrorMessages.NoTrack;
  }, [serviceUrl]);

  const ServiceIcon: ReactNode = useMemo(() => {
    switch (service) {
      case 'spotify': {
        return <Spotify />;
      }
      case 'deezer': {
        return <Deezer />;
      }
      case 'youtube': {
        return <Youtube />;
      }
    }
  }, [service]);

  const contentUrl = useMemo(() => {
    if (isDisabled) {
      return t({ id: 'label.noUrl' }, { service });
    }
    return serviceUrl;
  }, [isDisabled, service, serviceUrl, t]);

  return (
    <div className={`flex justify-center items-center gap-[10px] ${isLight ? 'bg-tiffanyBlue20' : 'bg-onyx'} rounded-[10px] w-full px-3 py-4 ${isDisabled ? 'opacity-40' : ''}`}>
      <InputCheckbox
        disabled={isDisabled}
        isSelected={isSelected}
        handleOnChange={() => handleOnChange(service)}
        isLight={isLight}
      />
      <div className='flex flex-auto'>
        <input 
          className={`flex-auto rounded-[7px] px-2 py-[10px] ${isLight ? 'bg-ivory text-eerieBlack' : 'bg-ivory20 text-ivory'} overflow-hidden text-ellipsis`}
          readOnly
          value={contentUrl} 
        />
      </div>
      {ServiceIcon}
    </div>
  );
};
