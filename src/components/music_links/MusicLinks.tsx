import { type ReactElement, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Icon } from '@/components/icon';
import { MusicLink } from '@/components/link';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/hooks/useTranslation';
import type { LinkListReturnType, MusicDetails } from '@/types/api';
import type { MusicProviders } from '@/types/music';
import { delay } from '@/utils/time';

interface MusicLinksProps {
  isLight: boolean;
  links: LinkListReturnType['links'];
  details: MusicDetails | undefined
}

export const MusicLinks = ({
  isLight,
  links,
  details,
}: MusicLinksProps): ReactElement => {
  const { addToast } = useToast();
  const { t } = useTranslation();
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

  const handleCopyLink = useCallback(async () => {
    if (!navigator.share) {
      addToast({
        message: 'Unfortunately, your browser does not support sharing',
        type: 'warning',
        title: 'Cannot share',
        id: uuid()
      });
      return;
    }

    try {
      await navigator.share({
        text: createCopyString().trim()
      });
      addToast({
        message: `You have shared your link${selectedProviders.length > 1 ? 's' : ''}`,
        type: 'success',
        title: 'Copied',
        id: uuid()
      });
    } catch (err) {
      addToast({
        message: 'There has been an error sharing the link',
        type: 'warning',
        title: 'Not shared',
        id: uuid()
      });
    }
  }, [addToast, createCopyString, selectedProviders.length]);

  const hasProviders = !!selectedProviders.length;
  return (
    <>
      <p className={`${isLight ? 'text-eerieBlack70' : 'text-ivory70'} font-normal text-left text-base leading-5 mb-4`}>
        {t(
          { id: 'home.showingResults' },
          { artist: details?.artist, track: details?.track },
        )}
      </p>
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
        <Icon icon='share' color='#FFFEED' height={20} />
        {selectedProviders.length > 1 ? 'Share Links' : 'Share Link'}
      </button>
    </>
  );
};
