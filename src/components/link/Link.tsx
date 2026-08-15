import {
  type ReactElement, type ReactNode, useMemo 
} from "react";

import { Icon } from "@/components/icon";
import { InputCheckbox } from "@/components/inputs/input_checkbox";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/stores/theme.store";
import type { MusicProviders } from "@/types/music";

interface MusicLinkProps {
  service: MusicProviders;
  serviceUrl: string | null;
  handleOnChange: (id: MusicProviders) => void;
  isSelected: boolean;
}

export const MusicLink = ({
  service,
  serviceUrl,
  handleOnChange,
  isSelected,
}: MusicLinkProps): ReactElement => {
  const { isLight } = useTheme();
  const { t } = useTranslation();

  /* ############################## */
  /* State */
  /* ############################## */
  const isDisabled = useMemo(() => {
    return !serviceUrl;
  }, [serviceUrl]);

  const ServiceIcon: ReactNode = useMemo(() => {
    switch (service) {
      case "spotify": {
        return <Icon icon='spotify' />;
      }
      case "deezer": {
        return <Icon icon='deezer' />;
      }
      case "youtube": {
        return <Icon icon='youtube' />;
      }
    }
  }, [service]);

  const contentUrl = useMemo(() => {
    if (!serviceUrl) {
      return t({
        id: "label.noUrl" 
      }, {
        service 
      });
    }
    return serviceUrl;
  }, [service, serviceUrl, t]);

  return (
    <div className={`flex justify-center border border-eerie-black-20 items-center gap-[10px] ${isLight ? "bg-[#FFFFFF]" : "bg-onyx"} rounded-[10px] w-full px-4 py-2 ${isDisabled ? "opacity-40" : ""}`}>
      <InputCheckbox
        disabled={isDisabled}
        isSelected={isSelected}
        handleOnChange={() => handleOnChange(service)}
      />
      <div className='flex flex-auto min-w-0'>
        <input 
          className={`w-full min-w-0 flex-auto rounded-[7px] px-2 py-[10px] ${isLight ? "bg-eerie-black-10 text-eerie-black-70" : "bg-ivory-20 text-ivory"} overflow-hidden text-ellipsis`}
          readOnly
          value={contentUrl} 
        />
      </div>
      {ServiceIcon}
    </div>
  );
};
