'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FormEvent, type ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import z, { type TypeOf} from 'zod';

import { Albumlist } from '@/components/albumlist';
import { ArtistList } from '@/components/artistlist';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { InputText } from '@/components/inputs/input_text';
import { Loader } from '@/components/loader';
import { MusicLinks } from '@/components/music_links';
import { Tracklist } from '@/components/tracklist';
import { CONTAINER } from '@/constants/layout';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useUserData } from '@/hooks/useUserData';
import type { AlbumInputType, AlbumReturnType, ArtistReturnType, LinkListReturnType, MusicDetails, SearchInputType, TrackReturnType } from '@/types/api';
import type { SearchType } from '@/types/music';
import { buildUrl, isValidInput, isValidMusicStreamingUrl } from '@/utils/url';

export const HomeScreen = (): ReactElement => {
  const { t } = useTranslation();
  const { ip, geolocation } = useUserData();
  const { addToast } = useToast();
  const itemsRef = useRef<HTMLDivElement>(null);

  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const [links, setLinks] = useState<LinkListReturnType['links'] | undefined>(undefined);
  const [tracks, setTracks] = useState<TrackReturnType[]>([]);
  const [albums, setAlbums] = useState<AlbumReturnType[]>([]);
  const [artists, setArtists] = useState<ArtistReturnType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<SearchType>('url');
  const [details, setDetails] = useState<MusicDetails | undefined>(
    undefined,
  );
  
  const createErrorMessage = useCallback(
    (selected: SearchType): string => {
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
    track: z
      .string()
      .trim()
      .optional()
      .refine((val) => isValidInput(val, 'track'), {
        message: createErrorMessage('track'),
      }),
    artist: z
      .string()
      .trim()
      .optional()
      .refine((val) => isValidInput(val, 'artist'), {
        message: createErrorMessage('artist'),
      }),
    url: z
      .string()
      .trim()
      .optional()
      .refine((val) => isValidInput(val, 'url'), {
        message: createErrorMessage('url'),
      }),
  }).refine((schema) => {
    return !(!schema.track && !schema.artist && !schema.url);
  }, {
    message: t({ id: 'error.message.requiredTitle' }),
    path: ['track']
  });

  type FormFields = TypeOf<typeof validationSchema>;

  const defaultValues: FormFields = useMemo(
    () => ({
      track: '',
      artist: '',
      url: '',
    }),
    [],
  );

  /**
   * Options chosen
   * https://react-hook-form.com/api/useform/
   */
  const { control, formState, reset, watch, handleSubmit } = useForm({
    defaultValues,
    mode: 'onSubmit',
    shouldFocusError: true,
    /* All errors from each field will be gathered */
    criteriaMode: 'all',
    resolver: zodResolver(validationSchema),
  });
  const url = watch('url');
  const artist = watch('artist');
  const track = watch('track');

  const formErrors = useMemo(() => {
    return formState.errors;
  }, [formState.errors]);

  useEffect(() => {
    reset(defaultValues, { keepDefaultValues: true });
  }, [reset, defaultValues]);

  useEffect(() => {
    if ((tracks.length || albums.length || links) && itemsRef.current) {
      itemsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [albums.length, links, tracks.length]);

  useEffect(() => {
    if (artist && !track && !url) {
      setSelected('artist');
    } else if (track && !url) {
      setSelected('track');
    }
  }, [artist, track, url]);

  useEffect(() => {
    /* Will automatically change the selected input to url if a valid url is passed into the field */
    if (isValidMusicStreamingUrl(url)) {
      setSelected('url');
    }
  }, [url]);

  useEffect(() => {
    setAlbums([]);
    setTracks([]);
    setLinks(undefined);
  }, [selected]);

  /* ################################################## */
  /* Actions */
  /* ################################################## */
  const resetStates = useCallback(() => {
    setLinks(undefined);
    setTracks([]);
    setAlbums([]);
    setArtists([]);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoading) {
        return;
      }

      /* Reset states */
      resetStates();

      handleSubmit(
        async (formFields) => {
          if (!formFields.track && !formFields.artist && !formFields.url) {
            // TODO: add toast
            return;
          }

          setIsLoading(true);
          try {
            const body: SearchInputType = {
              search: {
                artist: formFields.artist ?? null,
                track: formFields.track ?? null,
                url: formFields.url ?? null,
              },
              user: {
                ip,
                geolocation,
              },
            };
            switch (selected) {
              /* Artist will return a list of tracks sorted by album. User can then select a track */
              case 'artist': {
                const response = await fetch(
                  buildUrl('/api/artists', process.env.NEXT_PUBLIC_BASE_URL),
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  },
                );

                if (!response.ok) {
                  addToast({
                    message: response.statusText,
                    type: 'warning',
                    title: 'Issue getting albums',
                    id: uuid()
                  });
                  break;
                }

                const data: ArtistReturnType[] = await response.json();
                setArtists(data);
                reset(defaultValues, { keepDefaultValues: true });
                scrollToTop();

                break;
              }
              /* Tracks will return a list of tracks that correspond to the typed search input. User can then select a track */
              case 'track': {
                const response = await fetch(
                  buildUrl('/api/tracks', process.env.NEXT_PUBLIC_BASE_URL),
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  },
                );

                if (!response.ok) {
                  addToast({
                    message: response.statusText,
                    type: 'warning',
                    title: 'Issue getting tracks',
                    id: uuid()
                  });
                  break;
                }

                const data: TrackReturnType[] = await response.json();
                setTracks(data);
                reset(defaultValues, { keepDefaultValues: true });
                scrollToTop();

                break;
              }
              /* Url will directly return a list of links if the url is valid and if the songs exist on other platforms */
              case 'url': {
                const response = await fetch(
                  buildUrl('/api/links', process.env.NEXT_PUBLIC_BASE_URL),
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  },
                );

                if (!response.ok) {
                  addToast({
                    message: response.statusText,
                    type: 'warning',
                    title: 'Issue getting tracks',
                    id: uuid()
                  });
                  break;
                }

                const data: LinkListReturnType = await response.json();

                setLinks(data.links);
                setDetails(data.details);
                reset(defaultValues, { keepDefaultValues: true });
                scrollToTop();

                break;
              }
            }
          } catch (err) {
            // setErrorMessage('error.message.generic');
            console.log({ err });
          } finally {
            setIsLoading(false);
          }
        },
      )();
    },
    [addToast, defaultValues, geolocation, handleSubmit, ip, isLoading, reset, resetStates, scrollToTop, selected],
  );

  const handleOnArtistClick = useCallback(
    async (artistId: string) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      /* Reset states */
      resetStates();

      try {
        const body: AlbumInputType = {
          artistId,
          user: {
            ip,
            geolocation,
          },
        };

        const response = await fetch(
          buildUrl('/api/albums', process.env.NEXT_PUBLIC_BASE_URL),
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          addToast({
            message: response.statusText,
            type: 'warning',
            title: 'Issue getting tracks',
            id: uuid()
          });
        } else {
          const data: AlbumReturnType[] = await response.json();
  
          setAlbums(data);
          reset(defaultValues, { keepDefaultValues: true });
          scrollToTop();
        }
      } catch (err) {
        addToast({
          message: (err as Error).message,
          type: 'warning',
          title: 'Issue getting tracks',
          id: uuid()
        });
        console.log({ err });
      } finally {
        setIsLoading(false);
      }
    }, [addToast, defaultValues, geolocation, ip, isLoading, reset, resetStates, scrollToTop]);

  const handleOnTrackClick = useCallback(
    async (url: string) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      /* Reset states */
      resetStates();

      try {
        const body: SearchInputType = {
          search: {
            artist: details?.artist ?? null,
            track: details?.track ?? null,
            url,
          },
          user: {
            ip,
            geolocation,
          },
        };

        const response = await fetch(
          buildUrl('/api/links', process.env.NEXT_PUBLIC_BASE_URL),
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          addToast({
            message: response.statusText,
            type: 'warning',
            title: 'Issue getting tracks',
            id: uuid()
          });
        } else {
          const data: LinkListReturnType = await response.json();
  
          setLinks(data.links);
          setDetails(data.details);
          reset(defaultValues, { keepDefaultValues: true });
          scrollToTop();
        }
      } catch (err) {
        addToast({
          message: (err as Error).message,
          type: 'warning',
          title: 'Issue getting tracks',
          id: uuid()
        });
        console.log({ err });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, defaultValues, details?.artist, details?.track, geolocation, ip, isLoading, reset, resetStates, scrollToTop],
  );

  const hasTracks = useMemo(() => !!tracks.length, [tracks]);
  const hasAlbums = useMemo(() => !!albums.length, [albums]);
  const hasArtists = useMemo(() => !!artists.length, [artists]);

  return (
    <main className={`flex-1 overflow-x-hidden min-w-full max-w-screen ${isLight ? 'bg-ivory' : 'bg-eerieBlack'}`}>
      <Container size="mobile">
        <div className='flex flex-col justify-center gap-4 w-full mb-4'>
          <h1 data-testid='home-title' className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} font-bold text-center text-5xl leading-[48px]`}>
            {t({ id: 'home.title' })}
          </h1>
          <p data-testid='home-subtitle' className={`${isLight ? 'text-eerieBlack70' : 'text-ivory70'} font-normal text-center text-base leading-[20px]`}>
            {t({ id: 'home.subtitle' })}
          </p>
        </div>
        <form
          data-testid='home-form' 
          className={`flex flex-col justify-center w-full max-w-[${CONTAINER.MOBILE}px] gap-4`} 
          onSubmit={onSubmit}
        >
          <div className='flex flex-col justify-center w-full gap-1'>
            <InputText
              data-testid='home-input-track'
              isLight={isLight}
              type="text"
              control={control}
              name="track"
              placeholder={t({ id: 'label.track' })}
              error={formErrors.track}
            />
            <InputText
              data-testid='home-input-artist'
              isLight={isLight}
              type="text"
              control={control}
              name="artist"
              placeholder={t({ id: 'label.artist' })}
              error={formErrors.artist}
            />
            <InputText
              data-testid='home-input-url'
              isLight={isLight}
              type="text"
              control={control}
              name="url"
              placeholder={t({ id: 'label.url' })}
              error={formErrors.url}
            />
          </div>
          <Button data-testid='home-form-submit-button' type="submit">
            {t({ id: 'home.cta' })}
          </Button>
        </form>
        <div ref={itemsRef} className='flex flex-col gap-2 w-full mx-6 my-0 pb-[40px]'>
          {isLoading && <Loader isLight={isLight} />}

          {/* Music Links */}
          {!isLoading && links && (
            <MusicLinks details={details} isLight={isLight} links={links} />
          )}

          {/* Tracklist */}
          {!isLoading && hasTracks && (
            <Tracklist tracks={tracks} handleOnClick={handleOnTrackClick} isLight={isLight} />
          )}

          {/* Artistlist */}
          {!isLoading && hasArtists && (
            <ArtistList artists={artists} handleOnClick={handleOnArtistClick} isLight={isLight} />
          )}

          {/* Albumlist */}
          {!isLoading && hasAlbums && (
            <Albumlist albums={albums} handleOnClick={handleOnTrackClick} isLight={isLight} />
          )}
        </div>
      </Container>
    </main>
  );
};
