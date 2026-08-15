"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReactElement, useCallback, useEffect, useMemo, useRef, useState 
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Albumlist } from "@/components/albumlist";
import { ArtistList } from "@/components/artistlist";
import { Icon } from "@/components/icon";
import { InputSearch } from "@/components/inputs/input_search";
import { Loader } from "@/components/loader";
import { MusicLinks } from "@/components/music_links";
import { Separator } from "@/components/separator/Separator";
import { Tracklist } from "@/components/tracklist";
import { useTheme } from "@/context/ThemeContext";
import { GeolocationType } from "@/hooks/user-data/userData.types";
import { useTranslation } from "@/hooks/useTranslation";
import type {
  AlbumInputType,
  AlbumReturnType,
  ArtistReturnType,
  LinkListReturnType,
  MusicDetails,
  SearchInputType,
  SearchLegacyInputType,
  SearchReturnType,
  TrackReturnType
} from "@/types/api";
import { logger } from "@/utils/logger";
import { isSupportedMediaUrl, sanitiseSearchQuery } from "@/utils/url";

export const HomeScreen = ({ userData }: { userData: GeolocationType }): ReactElement => {
  const { t } = useTranslation();
  const itemsRef = useRef<HTMLDivElement | null>(null);

  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useTheme();
  const [links, setLinks] = useState<LinkListReturnType["links"] | undefined>(undefined);
  const [tracks, setTracks] = useState<TrackReturnType[]>([]);
  const [albums, setAlbums] = useState<AlbumReturnType[]>([]);
  const [artists, setArtists] = useState<ArtistReturnType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<MusicDetails | undefined>(
    undefined,
  );

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  /* ################################################## */
  /* Forms */
  /* ################################################## */
  const validationSchema = z.object({
    search: z
      .string()
      .trim()
      .optional()
  });

  type FormFields = z.TypeOf<typeof validationSchema>;

  const { control, formState, reset, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
    mode: "onSubmit",
    shouldFocusError: true,
    /* All errors from each field will be gathered */
    criteriaMode: "all",
    resolver: zodResolver(validationSchema),
  });

  const searchQuery = useWatch({
    control,
    name: "search",
  });

  const formErrors = useMemo(() => {
    return formState.errors;
  }, [formState.errors]);
  
  useEffect(() => {
    reset({
      search: "" 
    }, {
      keepDefaultValues: true
    });
  }, [reset]);

  useEffect(() => {
    if ((tracks.length || albums.length || links) && itemsRef.current) {
      itemsRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [albums.length, links, tracks.length]);

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
    async (formFields: FormFields) => {
      if (isLoading) {
        return;
      }
      if (!formFields.search) {
        toast.warning("Please provide a url, artist, album or track");
        return;
      }

      /* Reset states */
      resetStates();
      setIsLoading(true);
      try {
        const isUrl = isSupportedMediaUrl(formFields.search);

        if (!isUrl) {
          const body: SearchInputType = {
            search: sanitiseSearchQuery(formFields.search),
            user: userData,
          };
          const response = await fetch(
            "/api/search",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            },
          );

          if (!response.ok) {
            toast.warning("Issue with search", {
              description: response.statusText
            });
          }

          const data: SearchReturnType = await response.json();

          if (!data.albums.length && !data.tracks.length && !data.artists.length) {
            toast.warning("Search returned no results", {
              description: searchQuery ? `There were no results for "${searchQuery}"` : "There were no results for this query",
            });
          }

          setArtists(data.artists);
          setAlbums(data.albums);
          setTracks(data.tracks);
          
          reset({
            search: "",
          }, {
            keepDefaultValues: true
          });
          scrollToTop();
        } else {
          const body: SearchLegacyInputType = {
            search: {
              url: formFields.search ?? null,
              track: null,
              artist: null
            },
            user: userData,
          };
          const response = await fetch(
            "/api/links",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            },
          );

          if (!response.ok) {
            toast.warning("Issue getting links", {
              description: response.statusText
            });
          }

          const data: LinkListReturnType = await response.json();

          setLinks(data.links);
          setDetails(data.details);
          reset({
            search: "",
          }, {
            keepDefaultValues: true
          });
          scrollToTop();
        }
      } catch (err) {
        // setErrorMessage('error.message.generic');
        logger.error("", {
          err: err as Error
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, resetStates, userData, reset, scrollToTop, searchQuery],
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
          user: userData,
        };

        const response = await fetch(
          "/api/albums",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          toast.warning("Issue getting tracks", {
            description: response.statusText
          });
        } else {
          const data: AlbumReturnType[] = await response.json();

          if (!data.length) {
            toast.warning("Search returned no albums", {
              description: response.statusText
            });
            return;
          }

          setAlbums(data);
          reset({
            search: "",
          }, {
            keepDefaultValues: true
          });
          scrollToTop();
        }
      } catch (err) {
        toast.warning("Issue getting tracks", {
          description: (err as Error).message
        });
        logger.error("", {
          err: err as Error
        });
      } finally {
        setIsLoading(false);
      }
    }, [userData, isLoading, reset, resetStates, scrollToTop]);

  const handleOnTrackClick = useCallback(
    async (url: string) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      /* Reset states */
      resetStates();

      try {
        const body: SearchLegacyInputType = {
          search: {
            artist: details?.artist ?? null,
            track: details?.track ?? null,
            url,
          },
          user: userData,
        };

        const response = await fetch(
          "/api/links",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          toast.warning("Issue getting tracks", {
            description: response.statusText
          });
        } else {
          const data: LinkListReturnType = await response.json();

          setLinks(data.links);
          setDetails(data.details);
          reset({
            search: "",
          }, {
            keepDefaultValues: true
          });
          scrollToTop();
        }
      } catch (err) {
        toast.warning("Issue getting tracks", {
          description: (err as Error).message
        });
        logger.error("", {
          err: err as Error
        });
      } finally {
        setIsLoading(false);
      }
    },
    [details, isLoading, reset, resetStates, scrollToTop, userData],
  );

  const hasTracks = useMemo(() => !!tracks.length, [tracks]);
  const hasAlbums = useMemo(() => !!albums.length, [albums]);
  const hasArtists = useMemo(() => !!artists.length, [artists]);

  return (
    <main className="flex flex-col items-center justify-center gap-[30px] w-full h-full max-w-xl m-auto p-4">
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='flex gap-2 justify-center items-center'>
          <Icon icon='spotify' />
          <Icon icon='deezer' />
          <Icon icon='youtube' />
        </div>
        <h1 data-testid='home-title' className={`${isLight ? "text-eerie-black" : "text-ivory"} font-bold text-center text-4xl leading-12`}>
          {t({
            id: "home.title"
          })}
        </h1>
        <p data-testid='home-subtitle' className={`${isLight ? "text-eerie-black-70" : "text-ivory-70"} font-normal text-center text-base leading-5`}>
          {t({
            id: "home.subtitle"
          })}
        </p>
      </div>
      <form
        data-testid='home-form'
        className="flex flex-col justify-center w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col justify-center w-full gap-1'>
          <InputSearch
            data-testid='home-input-track'
            isLight={isLight}
            type="text"
            control={control}
            name="search"
            placeholder={t({
              id: "label.search"
            })}
            error={formErrors.search}
          />
        </div>
      </form>
      <div ref={itemsRef} className='flex flex-col gap-2 w-full my-0'>
        {isLoading && <Loader isLight={isLight} />}

        {/* Music Links */}
        {!isLoading && links && (
          <MusicLinks details={details} isLight={isLight} links={links} />
        )}

        {/* Artistlist */}
        {!isLoading && hasArtists && (
          <>
            <Separator isLight={isLight} type="artist"/>
            <ArtistList artists={artists} handleOnClick={handleOnArtistClick} isLight={isLight} />
          </>
        )}

        {/* Tracklist */}
        {!isLoading && hasTracks && (
          <>
            <Separator isLight={isLight} type='track' />
            <Tracklist tracks={tracks} handleOnClick={handleOnTrackClick} isLight={isLight} />
          </>
        )}

        {/* Albumlist */}
        {!isLoading && hasAlbums && (
          <>
            <Separator isLight={isLight} type="album" />
            <Albumlist albums={albums} handleOnClick={handleOnTrackClick} isLight={isLight} />
          </>
        )}
      </div>
    </main>
  );
};
