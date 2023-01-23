import { LinkWrapper, StyledButtonWrapper, StyledInput } from "./Link.styles";
import { ReactComponent as Spotify } from "@assets/spotify.svg";
import { ReactComponent as Deezer } from "@assets/deezer.svg";
import { ReactComponent as Youtube } from "@assets/youtube.svg";
import { useTranslation } from "@hooks/useTranslation";
import { ReactNode, useMemo } from "react";
// import { useCopyToClipboard } from "react-use";
import { MusicProviders } from "@customTypes";
import { CustomApiErrorMessages } from "@constants/errors";
// import { delay } from "@helpers/time";
import { InputCheckbox } from "@components/Inputs/InputCheckbox";

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
      case "spotify": {
        return <Spotify />;
      }
      case "deezer": {
        return <Deezer />;
      }
      case "youtube": {
        return <Youtube />;
      }
    }
  }, [service]);

  const contentUrl = useMemo(() => {
    if (isDisabled) {
      return t({ id: "label.noUrl" }, { service });
    }
    return serviceUrl;
  }, [isDisabled, service, serviceUrl, t]);

  return (
    <LinkWrapper
      data-test="link-container"
      disabled={isDisabled}
      isLight={isLight}
    >
      <InputCheckbox
        disabled={isDisabled}
        isSelected={isSelected}
        handleOnChange={() => handleOnChange(service)}
        isLight={isLight}
      />
      <StyledButtonWrapper>
        <StyledInput
          data-test="link-input"
          readOnly
          value={contentUrl}
          isLight={isLight}
        />
      </StyledButtonWrapper>
      {ServiceIcon}
    </LinkWrapper>
  );
};
