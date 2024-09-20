'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import z, { type TypeOf} from 'zod';

import { AlbumBtn } from '@/components/AlbumBtn';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { InputText } from '@/components/Inputs/InputText';
import { Loader } from '@/components/Loader';
import { Main } from '@/components/Main';
import { MusicLinks } from '@/components/MusicLinks';
import { Selector } from '@/components/Selector';
import { TrackBtn } from '@/components/TrackBtn';
import { CONTAINER } from '@/constants/layout';
import urls from '@/constants/url';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserData } from '@/hooks/useUserData';
import type { 
  GetMusicLinksInput,
  LinksResponseData,
  ListOfAlbumsReturnType, 
  ListOfTracksReturnType, 
  ResponseLinksApi,
  SearchInputType
} from '@/types';
import { delay } from '@/utils/time';
import { isValidInput, isValidMusicStreamingUrl } from '@/utils/url';

const isProd = process.env.NODE_ENV === 'production';

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { ip, geolocation } = useUserData();
  const { addToast } = useToast();

  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const [links, setLinks] = useState<LinksResponseData[]>([]);
  const [tracks, setTracks] = useState<ListOfTracksReturnType['tracks']>([]);
  const [albums, setAlbums] = useState<ListOfAlbumsReturnType['albums']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<SearchInputType>('artist');
  const [details, setDetails] = useState<GetMusicLinksInput | undefined>(
    undefined,
  );

  const createErrorMessage = useCallback(
    (selected: SearchInputType): string => {
      switch (selected) {
        case 'artist': {
          return t({ id: 'error.message.requiredArtist' });
        }
        case 'track': {
          return t({ id: 'error.message.requiredTitle' });
        }
        case 'url': {
          return t({ id: 'error.message.requiredUrl' });
        }
      }
    },
    [t],
  );

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  /* ################################################## */
  /* Forms */
  /* ################################################## */
  const validationSchema = z.object({
    search: z
      .string({
        required_error: t({ id: 'error.message.requiredArtist' }),
      })
      .trim()
      .refine((val) => isValidInput(val, selected), {
        message: createErrorMessage(selected),
      }),
  });

  type FormFields = TypeOf<typeof validationSchema>;

  const defaultValues: FormFields = useMemo(
    () => ({
      search: '',
    }),
    [],
  );

  /**
   * Options chosen
   * https://react-hook-form.com/api/useform/
   */
  const { control, formState, reset, watch, setError } = useForm({
    defaultValues,
    mode: 'onSubmit',
    shouldFocusError: true,
    /* All errors from each field will be gathered */
    criteriaMode: 'all',
    resolver: zodResolver(validationSchema),
  });
  const url = watch('search');

  const formErrors = useMemo(() => {
    return formState.errors;
  }, [formState.errors]);

  useEffect(() => {
    reset(defaultValues, { keepDefaultValues: true });
  }, [reset, defaultValues]);

  useEffect(() => {
    /* Will automatically change the selected input to url if a valid url is passed into the field */
    if (isValidMusicStreamingUrl(url)) {
      setSelected('url');
    }
  }, [url]);

  /* ################################################## */
  /* Actions */
  /* ################################################## */
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoading) {
        return;
      }

      /* Reset states */
      setIsLoading(true);
      // setErrorMessage(undefined);
      setLinks([]);
      setTracks([]);
      setAlbums([]);

      addToast({
        message: 'error message',
        type: 'success',
        title: 'title',
        id: uuid()
      });

      // handleSubmit(
      //   async (formFields) => {
      //     try {
      //       switch (selected) {
      //         /* Artist will return a list of tracks sorted by album. User can then select a track */
      //         case 'artist': {
      //           const response = await fetch(
      //             `${isProd ? urls.PROD_API : urls.DEV_API}/api/tracks`,
      //             {
      //               method: 'POST',
      //               headers: {
      //                 'Content-type': 'application/json',
      //               },
      //               body: JSON.stringify({
      //                 [selected]: formFields.search,
      //                 user: {
      //                   ip,
      //                   geolocation,
      //                 },
      //               }),
      //             },
      //           );

      //           const data: ListOfAlbumsReturnType = await response.json();

      //           delay(() => {
      //             if (response.ok) {
      //               setAlbums(data.albums);
      //               reset(defaultValues, { keepDefaultValues: true });
      //               scrollToTop();
      //             } else {
      //               if (response.status === 400) {
      //                 setError('search', {
      //                   type: 'server',
      //                   message: t({ id: 'error.message.requiredUrl' }),
      //                 });
      //               } else if (response.status === 404) {
      //                 setError('search', {
      //                   type: 'server',
      //                   message: t({ id: 'error.message.requiredArtist' }),
      //                 });
      //               }
      //               setErrorMessage('error.message.noTitle');
      //             }
      //             setIsLoading(false);
      //           }, 1000);

      //           break;
      //         }
      //         /* Tracks will return a list of tracks that correspond to the typed search input. User can then select a track */
      //         case 'track': {
      //           const response = await fetch(
      //             `${isProd ? urls.PROD_API : urls.DEV_API}/api/tracks`,
      //             {
      //               method: 'POST',
      //               headers: {
      //                 'Content-type': 'application/json',
      //               },
      //               body: JSON.stringify({
      //                 [selected]: formFields.search,
      //                 user: {
      //                   ip,
      //                   geolocation,
      //                 },
      //               }),
      //             },
      //           );

      //           const data: ListOfTracksReturnType = await response.json();

      //           delay(() => {
      //             if (response.ok) {
      //               setTracks(data.tracks);
      //               reset(defaultValues, { keepDefaultValues: true });
      //               scrollToTop();
      //             } else {
      //               if (response.status === 400) {
      //                 setError('search', {
      //                   type: 'server',
      //                   message: t({ id: 'error.message.requiredUrl' }),
      //                 });
      //               } else if (response.status === 404) {
      //                 setError('search', {
      //                   type: 'server',
      //                   message: t({ id: 'error.message.requiredTitle' }),
      //                 });
      //               }
      //               setErrorMessage('error.message.noTitle');
      //             }
      //             setIsLoading(false);
      //           }, 1000);

      //           break;
      //         }
      //         /* Url will directly return a list of links if the url is valid and if the songs exist on other platforms */
      //         case 'url': {
      //           const response = await fetch(
      //             `${isProd ? urls.PROD_API : urls.DEV_API}/api/links`,
      //             {
      //               method: 'POST',
      //               headers: {
      //                 'Content-type': 'application/json',
      //               },
      //               body: JSON.stringify({
      //                 [selected]: formFields.search,
      //                 user: {
      //                   ip,
      //                   geolocation,
      //                 },
      //               }),
      //             },
      //           );

      //           const data: ResponseLinksApi = await response.json();

      //           delay(() => {
      //             if (response.ok) {
      //               setLinks(data.links);
      //               setDetails(data.details);
      //               reset(defaultValues, { keepDefaultValues: true });
      //               scrollToTop();
      //             } else {
      //               if (response.status === 400) {
      //                 setError('search', {
      //                   type: 'server',
      //                   message: t({ id: 'error.message.requiredUrl' }),
      //                 });
      //               } else if (response.status === 404) {
      //                 setError('search', {
      //                   type: 'server',
      //                   message: t({ id: 'error.message.requiredUrl' }),
      //                 });
      //               }
      //               setErrorMessage('error.message.incorrectUrl');
      //             }
      //             setIsLoading(false);
      //           }, 1000);

      //           break;
      //         }
      //       }
      //     } catch (err) {
      //       setIsLoading(false);
      //       setErrorMessage('error.message.generic');
      //       console.log({ err });
      //     }
      //   },
      //   (error) => {
      //     setIsLoading(false);
      //     setErrorMessage('error.message.generic');
      //     console.log({ error: error.search });
      //   },
      // )();
    },
    [addToast, isLoading],
  );

  const handleOnClick = useCallback(
    async (url: string) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      // setErrorMessage(undefined);
      setTracks([]);
      setAlbums([]);

      try {
        const response = await fetch(
          `${isProd ? urls.PROD_API : urls.DEV_API}/api/links`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              url,
              user: {
                ip,
                geolocation,
              },
            }),
          },
        );

        if (!response.ok) {
          if (response.status === 400) {
            setError('search', {
              type: 'server',
              message: t({ id: 'error.message.requiredUrl' }),
            });
          } else if (response.status === 404) {
            setError('search', {
              type: 'server',
              message:
                selected === 'artist'
                  ? t({ id: 'error.message.requiredArtist' })
                  : t({ id: 'error.message.requiredTitle' }),
            });
          }
        }

        const data: ResponseLinksApi = await response.json();

        delay(() => {
          if (response.ok) {
            setLinks(data.links);
            setDetails(data.details);
            reset(defaultValues, { keepDefaultValues: true });
            scrollToTop();
          } else {
            // TODO: make specific error messages
            // setErrorMessage('error.message.noTitle');
          }
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setIsLoading(false);
        // setErrorMessage('error.message.generic');
        console.log({ err });
      }
    },
    [
      defaultValues,
      geolocation,
      ip,
      isLoading,
      reset,
      scrollToTop,
      selected,
      setError,
      t,
    ],
  );

  const hasLinks = !!links.length;
  const hasTracks = !!tracks.length;
  const hasAlbums = !!albums.length;

  return (
    <>
      <Main>
        <Container size="mobile">
          <Header />
          <div className='flex flex-col justify-center gap-4 w-full mb-4'>
            <h1 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} font-bold text-center text-5xl leading-[48px]`}>
              {t({ id: 'home.title' })}
            </h1>
            <p className={`${isLight ? 'text-eerieBlack70' : 'text-ivory70'} font-normal text-center text-base leading-[20px]`}>
              {t({ id: 'home.subtitle' })}
            </p>
          </div>
          <form 
            className={`flex flex-col justify-center w-full max-w-[${CONTAINER.MOBILE}px] gap-4`} 
            onSubmit={onSubmit}
          >
            <InputText
              isLight={isLight}
              type="text"
              control={control}
              name="search"
              placeholder={t({ id: 'label.search' })}
              error={formErrors.search}
            />
            <Selector
              isLight={isLight}
              selected={selected}
              setSelected={setSelected}
            />
            <Button type="submit" isLight={isLight}>
              {t({ id: 'home.cta' })}
            </Button>
          </form>
          <div className='flex flex-col gap-2 w-full mx-6 my-0'>
            {isLoading && <Loader isLight={isLight} />}
            {!isLoading && hasLinks && (
              <>
                <p className={`${isLight ? 'text-eerieBlack70' : 'text-ivory70'} font-normal text-left text-base leading-5 mb-4 whitespace-nowrap overflow-hidden text-ellipsis`}>
                  {t(
                    { id: 'home.showingResults' },
                    { artist: details?.artist, track: details?.track },
                  )}
                </p>
                {/* TODO: make this button trigger shareto @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API */}
                <MusicLinks isLight={isLight} links={links} />
              </>
            )}
            {!isLoading &&
              hasTracks &&
              tracks.map((track) => (
                <TrackBtn
                  key={track.id}
                  track={track}
                  handleOnClick={handleOnClick}
                  isLight={isLight}
                />
              ))}
            {!isLoading &&
              hasAlbums &&
              albums.map((album) => (
                <AlbumBtn
                  handleOnClick={handleOnClick}
                  key={album.id}
                  album={album}
                  isLight={isLight}
                />
              ))}
          </div>
        </Container>
      </Main>
      <Footer isLight={isLight} />
    </>
  );
};
