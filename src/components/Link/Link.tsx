import {
  LinkWrapper,
  StyledButton,
  StyledButtonWrapper,
  StyledInput,
} from "./Link.styles";
import { ReactComponent as Spotify } from "@assets/spotify.svg";
import { ReactComponent as Deezer } from "@assets/deezer.svg";
import { ReactComponent as Youtube } from "@assets/youtube.svg";
import { ReactComponent as LinkIcon } from "@assets/link.svg";
import { ReactComponent as Tickcon } from "@assets/tick.svg";
import { useTranslation } from "@hooks/useTranslation";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useCopyToClipboard } from "react-use";
import { MusicProviders } from "@customTypes";
import { CustomApiErrorMessages } from "@constants/errors";

interface MusicLinkProps {
  service: MusicProviders;
  serviceUrl: string;
  isLight: boolean;
}

export const MusicLink = ({
  service,
  serviceUrl,
  isLight,
}: MusicLinkProps): JSX.Element => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  // TODO: deal with copy to clipboard errors
  const [_state, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

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
    if (serviceUrl === CustomApiErrorMessages.NoTrack) {
      return t({ id: "label.noUrl" }, { service });
    }
    return serviceUrl;
  }, [service, serviceUrl, t]);

  const handleCopyLink = useCallback(() => {
    if (isCopied) {
      return;
    }
    copyToClipboard(serviceUrl);
    setIsCopied(!isCopied);
  }, [copyToClipboard, isCopied, serviceUrl]);

  return (
    <LinkWrapper isLight={isLight}>
      {ServiceIcon}
      <StyledButtonWrapper>
        <StyledInput readOnly value={contentUrl} isLight={isLight} />
        {/* TODO: make this button trigger shareto @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API */}
        <StyledButton
          isCopied={isCopied}
          onClick={handleCopyLink}
          title={t({ id: "label.copyLink" })}
        >
          {isCopied ? <Tickcon /> : <LinkIcon />}
        </StyledButton>
      </StyledButtonWrapper>
    </LinkWrapper>
  );
};
