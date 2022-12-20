import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Main } from "@components/Main";
import { Container } from "@components/Container";
import { Toggle } from "@components/Toggle";
import { useTranslation } from "@hooks/useTranslation";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import { ReactComponent as LightLogo } from "@assets/lightLogo.svg";
import { ReactComponent as DarkLogo } from "@assets/darkLogo.svg";
import {
  Form,
  HeaderWrapper,
  LinksWrapper,
  LogoContainer,
  ShowingDetailsText,
  Subtitle,
  Title,
} from "./Home.styles";
import { InputText } from "@components/Inputs/InputText";
import { Button } from "@components/Button";
import { GetMusicLinksInput, MusicData, ResponseLinksApi } from "@customTypes";
import { MusicLink } from "@components/Link";
import { Loader } from "@components/Loader";
import { MessageBox } from "@components/MessageBox";
import { Footer } from "@components/Footer";
import { Selector } from "@components/Selector";
import { InputSelection } from "@constants/input";
import { isValidInput, isValidMusicStreamingUrl } from "@helpers/url";
import { TrackBtn } from "@components/TrackBtn";
import {
  ListOfTracksReturnType,
  ListOfAlbumsReturnType,
} from "@helpers/spotify/spotify.types";
import { AlbumBtn } from "@components/AlbumBtn";

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();

  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const [links, setLinks] = useState<MusicData[]>([]);
  const [tracks, setTracks] = useState<ListOfTracksReturnType["tracks"]>([]);
  const [albums, setAlbums] = useState<ListOfAlbumsReturnType["albums"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    FormatjsIntl.Message["ids"] | undefined
  >(undefined);
  const [selected, setSelected] = useState<InputSelection>(
    InputSelection.Artist
  );
  const [details, setDetails] = useState<GetMusicLinksInput | undefined>(
    undefined
  );

  const createErrorMessage = (selected: InputSelection): string => {
    switch (selected) {
      case InputSelection.Artist: {
        return t({ id: "error.message.requiredArtist" });
      }
      case InputSelection.Track: {
        return t({ id: "error.message.requiredTitle" });
      }
      case InputSelection.Url: {
        return t({ id: "error.message.requiredUrl" });
      }
    }
  };

  /* ################################################## */
  /* Forms */
  /* ################################################## */
  const validationSchema = z.object({
    search: z
      .string({
        required_error: t({ id: "error.message.requiredArtist" }),
      })
      .trim()
      .refine((val) => isValidInput(val, selected), {
        message: createErrorMessage(selected),
      }),
  });

  type FormFields = TypeOf<typeof validationSchema>;

  const defaultValues: FormFields = useMemo(
    () => ({
      search: "",
    }),
    []
  );

  /**
   * Options chosen
   * https://react-hook-form.com/api/useform/
   */
  const { control, formState, handleSubmit, reset, watch, setError } = useForm({
    defaultValues,
    mode: "onSubmit",
    shouldFocusError: true,
    /* All errors from each field will be gathered */
    criteriaMode: "all",
    resolver: zodResolver(validationSchema),
  });
  const url = watch("search");

  const formErrors = useMemo(() => {
    return formState.errors;
  }, [formState.errors]);

  useEffect(() => {
    reset(defaultValues, { keepDefaultValues: true });
  }, [reset, defaultValues]);

  useEffect(() => {
    /* Will automatically change the selected input to url if a valid url is passed into the field */
    if (isValidMusicStreamingUrl(url)) {
      setSelected(InputSelection.Url);
    }
  }, [url]);

  /* ################################################## */
  /* Actions */
  /* ################################################## */
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      /* Reset states */
      setIsLoading(true);
      setErrorMessage(undefined);
      setLinks([]);
      setTracks([]);
      setAlbums([]);

      let timeOut: NodeJS.Timeout;

      handleSubmit(
        async (formFields) => {
          switch (selected) {
            /* Artist will return a list of tracks sorted by album. User can then select a track */
            case InputSelection.Artist: {
              const response = await fetch("/api/tracks", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  [selected]: formFields.search,
                }),
              });

              const data: ListOfAlbumsReturnType = await response.json();

              timeOut = setTimeout(() => {
                if (response.ok) {
                  setAlbums(data.albums);
                  reset(defaultValues, { keepDefaultValues: true });
                } else {
                  if (response.status === 400) {
                    setError("search", {
                      type: "server",
                      message: t({ id: "error.message.requiredUrl" }),
                    });
                  } else if (response.status === 404) {
                    setError("search", {
                      type: "server",
                      message: t({ id: "error.message.requiredArtist" }),
                    });
                  }
                  setErrorMessage("error.message.noTitle");
                }
                setIsLoading(false);
              }, 2000);

              return () => clearTimeout(timeOut);
            }
            /* Tracks will return a list of tracks that correspond to the typed search input. User can then select a track */
            case InputSelection.Track: {
              const response = await fetch("/api/tracks", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  [selected]: formFields.search,
                }),
              });

              const data: ListOfTracksReturnType = await response.json();

              timeOut = setTimeout(() => {
                if (response.ok) {
                  setTracks(data.tracks);
                  reset(defaultValues, { keepDefaultValues: true });
                } else {
                  if (response.status === 400) {
                    setError("search", {
                      type: "server",
                      message: t({ id: "error.message.requiredUrl" }),
                    });
                  } else if (response.status === 404) {
                    setError("search", {
                      type: "server",
                      message: t({ id: "error.message.requiredTitle" }),
                    });
                  }
                  setErrorMessage("error.message.noTitle");
                }
                setIsLoading(false);
              }, 2000);

              return () => clearTimeout(timeOut);
            }
            /* Url will directly return a list of links if the url is valid and if the songs exist on other platforms */
            case InputSelection.Url: {
              const response = await fetch("/api/links", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  [selected]: formFields.search,
                }),
              });

              const data: ResponseLinksApi = await response.json();

              timeOut = setTimeout(() => {
                if (response.ok) {
                  setLinks(data.links);
                  setDetails(data.details);
                  reset(defaultValues, { keepDefaultValues: true });
                } else {
                  if (response.status === 400) {
                    setError("search", {
                      type: "server",
                      message: t({ id: "error.message.requiredUrl" }),
                    });
                  } else if (response.status === 404) {
                    setError("search", {
                      type: "server",
                      message: t({ id: "error.message.requiredUrl" }),
                    });
                  }
                  setErrorMessage("error.message.incorrectUrl");
                }
                setIsLoading(false);
              }, 2000);

              return () => clearTimeout(timeOut);
            }
          }
        },
        (error) => {
          console.log({ error: error.search });
        }
      )();
    },
    [defaultValues, handleSubmit, reset, selected, setError, t]
  );

  const handleOnClick = useCallback(
    async ({ artist, track }: { artist: string; track: string }) => {
      setIsLoading(true);
      setErrorMessage(undefined);
      setTracks([]);
      setAlbums([]);

      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ artist, track }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setError("search", {
            type: "server",
            message: t({ id: "error.message.requiredUrl" }),
          });
        } else if (response.status === 404) {
          setError("search", {
            type: "server",
            message:
              selected === InputSelection.Artist
                ? t({ id: "error.message.requiredArtist" })
                : t({ id: "error.message.requiredTitle" }),
          });
        }
      }

      const data: ResponseLinksApi = await response.json();

      const timeOut = setTimeout(() => {
        if (response.ok) {
          setLinks(data.links);
          setDetails(data.details);
          reset(defaultValues, { keepDefaultValues: true });
        } else {
          // TODO: make specific error messages
          setErrorMessage("error.message.noTitle");
        }
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timeOut);
    },
    [defaultValues, reset, selected, setError, t]
  );

  const hasLinks = !!links.length;
  const hasTracks = !!tracks.length;
  const hasAlbums = !!albums.length;
  const hasErrorMessage = !!errorMessage;

  return (
    <>
      <Main>
        <Container size="mobile">
          <LogoContainer>
            {isLight ? <DarkLogo /> : <LightLogo />}
          </LogoContainer>
          <Toggle />
          <HeaderWrapper>
            <Title isLight={isLight}>{t({ id: "home.title" })}</Title>
            <Subtitle isLight={isLight}>{t({ id: "home.subtitle" })}</Subtitle>
          </HeaderWrapper>
          <Form onSubmit={onSubmit}>
            <InputText
              isLight={isLight}
              type="text"
              control={control}
              name="search"
              placeholder={t({ id: "label.search" })}
              error={formErrors.search}
            />
            <Selector
              isLight={isLight}
              selected={selected}
              setSelected={setSelected}
            />
            <Button type="submit" isLight={isLight}>
              {t({ id: "home.cta" })}
            </Button>
          </Form>
          <LinksWrapper>
            {isLoading && <Loader isLight={isLight} />}
            {!isLoading && hasLinks && (
              <>
                <ShowingDetailsText isLight={isLight}>
                  {t(
                    { id: "home.showingResults" },
                    { artist: details?.artist, track: details?.track }
                  )}
                </ShowingDetailsText>
                {links.map(({ name, url }) => (
                  <MusicLink
                    key={name}
                    service={name}
                    serviceUrl={url}
                    isLight={isLight}
                  />
                ))}
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
            {!isLoading && hasErrorMessage && (
              <MessageBox message={errorMessage} />
            )}
          </LinksWrapper>
        </Container>
      </Main>
      <Footer isLight={isLight} />
    </>
  );
};
