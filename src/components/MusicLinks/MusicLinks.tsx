import { MusicLink } from "@components/Link";
import { LinksResponseData, MusicProviders } from "@customTypes";
import { StyledButton } from "./MusicLinks.styles";
import { ReactComponent as Link } from "@assets/link.svg";
import { ReactComponent as Tick } from "@assets/tick16.svg";
import { useCallback, useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import { delay } from "@helpers/time";
import { CustomApiErrorMessages } from "@constants/errors";

interface MusicLinksProps {
  isLight: boolean;
  links: LinksResponseData[];
}

export const MusicLinks = ({
  isLight,
  links,
}: MusicLinksProps): JSX.Element => {
  // TODO: deal with copy to clipboard errors
  const [_state, copyToClipboard] = useCopyToClipboard();
  /* ############################## */
  /* State */
  /* ############################## */
  const [selectedProviders, setSelectedProviders] = useState<MusicProviders[]>(
    [],
  );
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    delay(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  /* ############################## */
  /* Actions */
  /* ############################## */
  const isSelected = useCallback(
    (id: MusicProviders) => {
      return selectedProviders.includes(id);
    },
    [selectedProviders],
  );

  const handleOnChange = useCallback(
    (id: MusicProviders) => {
      if (isSelected(id)) {
        setSelectedProviders(selectedProviders.filter((s) => s !== id));
      } else {
        setSelectedProviders([...selectedProviders, id]);
      }
    },
    [isSelected, selectedProviders],
  );

  const createCopyString = useCallback((): string => {
    return selectedProviders
      .map((provider) => {
        const url = links.find((link) => link.name === provider)?.url;
        if (!url || url === CustomApiErrorMessages.NoTrack) {
          return "";
        }
        return url;
      })
      .join("\n \n");
  }, [links, selectedProviders]);

  const handleCopyLink = useCallback(() => {
    if (isCopied) {
      return;
    }
    copyToClipboard(createCopyString());
    setIsCopied(!isCopied);
  }, [copyToClipboard, createCopyString, isCopied]);

  const hasProviders = !!selectedProviders.length;
  return (
    <>
      {links.map(({ name, url }) => (
        <MusicLink
          key={name}
          isSelected={isSelected(name)}
          handleOnChange={handleOnChange}
          service={name}
          serviceUrl={url}
          isLight={isLight}
        />
      ))}
      <StyledButton
        disabled={!hasProviders}
        isCopied={isCopied}
        onClick={handleCopyLink}
      >
        {isCopied ? <Tick /> : <Link />}
        {isCopied && "Copied"}
        {!isCopied &&
          (selectedProviders.length > 1 ? "Copy Links" : "Copy Link")}
      </StyledButton>
    </>
  );
};
