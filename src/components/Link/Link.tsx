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

interface MusicLinkProps {
  service: MusicProviders;
  serviceUrl: string;
}

export const MusicLink = ({
  service,
  serviceUrl,
}: MusicLinkProps): JSX.Element => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    console.log({ state });
  }, [state]);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 4000);
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

  const handleCopyLink = useCallback(() => {
    if (isCopied) {
      return;
    }
    copyToClipboard(serviceUrl);
    setIsCopied(!isCopied);
  }, [copyToClipboard, isCopied, serviceUrl]);

  return (
    <LinkWrapper>
      {ServiceIcon}
      <StyledButtonWrapper>
        <StyledInput readOnly value={serviceUrl} />
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
