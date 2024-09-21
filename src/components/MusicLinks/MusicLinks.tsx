import { useCallback, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { v4 as uuid } from 'uuid';

import { Icon } from '@/components/icon';
import { MusicLink } from '@/components/Link';
import { useToast } from '@/context/ToastContext';
import type { LinkListReturnType } from '@/types/api';
import type { MusicProviders } from '@/types/music';
import { delay } from '@/utils/time';

interface MusicLinksProps {
  isLight: boolean;
  links: LinkListReturnType['links'];
}

export const MusicLinks = ({
  isLight,
  links,
}: MusicLinksProps): JSX.Element => {
  // TODO: deal with copy to clipboard errors
  const [_state, copyToClipboard] = useCopyToClipboard();
  const { addToast } = useToast();
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
        const url = links[provider];
        
        if (!url) {
          return 'No track available';
        }
        return url;
      })
      .join('\n \n');
  }, [links, selectedProviders]);

  const handleCopyLink = useCallback(() => {
    if (isCopied) {
      return;
    }
    copyToClipboard(createCopyString());
    addToast({
      message: `You have copied the link${selectedProviders.length > 1 ? 's' : ''}`,
      type: 'success',
      title: 'Copied',
      id: uuid()
    });
    setIsCopied(!isCopied);
  }, [addToast, copyToClipboard, createCopyString, isCopied, selectedProviders.length]);

  const hasProviders = !!selectedProviders.length;
  return (
    <>
      {(Object.entries(links) as [MusicProviders, string | null][]).map(([ name, url ]) => (
        <MusicLink
          key={name}
          isSelected={isSelected(name)}
          handleOnChange={handleOnChange}
          service={name}
          serviceUrl={url}
          isLight={isLight}
        />
      ))}
      <button
        className='flex justify-center gap-2 items-center rounded-[10px] bg-tiffanyBlue hover:bg-viridianGreen px-4 py-2 text-ivory w-fit mt-4 disabled:opacity-40 disabled:bg-tiffanyBlue disabled:cursor-not-allowed'
        type='button'
        disabled={!hasProviders}
        onClick={handleCopyLink}
      >
        <Icon icon='link' color='#FFFEED' height={20} />
        {selectedProviders.length > 1 ? 'Copy Links' : 'Copy Link'}
      </button>
    </>
  );
};
