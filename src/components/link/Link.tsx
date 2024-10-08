import { type ReactElement, type ReactNode, useMemo } from 'react';

import { Icon } from '@/components/icon';
import { InputCheckbox } from '@/components/inputs/input_checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import type { MusicProviders } from '@/types/music';

interface MusicLinkProps {
  service: MusicProviders;
  serviceUrl: string | null;
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
}: MusicLinkProps): ReactElement => {
  const { t } = useTranslation();

  /* ############################## */
  /* State */
  /* ############################## */
  const isDisabled = useMemo(() => {
    return !serviceUrl;
  }, [serviceUrl]);

  const ServiceIcon: ReactNode = useMemo(() => {
    switch (service) {
      case 'spotify': {
        return <Icon icon='spotify' />;
      }
      case 'deezer': {
        return <Icon icon='deezer' />;
      }
      case 'youtube': {
        return <Icon icon='youtube' />;
      }
    }
  }, [service]);

  const contentUrl = useMemo(() => {
    if (!serviceUrl) {
      return t({ id: 'label.noUrl' }, { service });
    }
    return serviceUrl;
  }, [service, serviceUrl, t]);

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
