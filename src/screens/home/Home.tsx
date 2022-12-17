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
  Subtitle,
  Title,
} from "./Home.styles";
import { InputText } from "@components/Inputs/InputText";
import { Button } from "@components/Button";
import { MusicData, ResponseLinksApi, ResponseMusicApi } from "@customTypes";
import { MusicLink } from "@components/Link";
import { Loader } from "@components/Loader";
import { MessageBox } from "@components/MessageBox";
import { Footer } from "@components/Footer";
import { Selector } from "@components/Selector";
import { InputSelection } from "@constants/input";
import { isValidInput } from "@helpers/url";

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();

  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const [links, setLinks] = useState<MusicData[]>([]);
  const [tracks, setTracks] = useState<ResponseMusicApi["tracks"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    FormatjsIntl.Message["ids"] | undefined
  >(undefined);
  const [selected, setSelected] = useState<InputSelection>(
    InputSelection.Artist
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
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "onSubmit",
    shouldFocusError: true,
    /* All errors from each field will be gathered */
    criteriaMode: "all",
    resolver: zodResolver(validationSchema),
  });

  const formErrors = useMemo(() => {
    return formState.errors;
  }, [formState.errors]);

  useEffect(() => {
    reset(defaultValues, { keepDefaultValues: true });
  }, [reset, defaultValues]);

  /* ################################################## */
  /* Actions */
  /* ################################################## */
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setLinks([]);
      let timeOut: NodeJS.Timeout;

      handleSubmit(
        async (formFields) => {
          switch (selected) {
            case InputSelection.Artist:
            case InputSelection.Track: {
              const response = await fetch("/api/music", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  [selected]: formFields.search,
                }),
              });
              const data: ResponseMusicApi = await response.json();

              timeOut = setTimeout(() => {
                if (response.ok) {
                  setTracks(data.tracks);
                  setErrorMessage(undefined);
                  setIsLoading(false);
                } else {
                  // TODO: make specific error messages
                  setErrorMessage("error.message.noTitle");
                  setIsLoading(false);
                }
              }, 2000);

              return () => clearTimeout(timeOut);
            }
            case InputSelection.Url: {
              const response = await fetch("/api/links", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(formFields),
              });
              const data: ResponseLinksApi = await response.json();

              timeOut = setTimeout(() => {
                if (response.ok) {
                  setLinks(data.links);
                  setErrorMessage(undefined);
                  setIsLoading(false);
                } else {
                  // TODO: make specific error messages
                  setErrorMessage("error.message.noTitle");
                  setIsLoading(false);
                }
              }, 2000);

              return () => clearTimeout(timeOut);
            }
          }
        },
        (error) => {
          console.log({ error });
          // TODO: make specific error messages
          setErrorMessage("error.message.noTitle");
          setIsLoading(false);
        }
      )();
    },
    [handleSubmit, selected]
  );

  const hasLinks = !!links.length;
  const hasTracks = !!tracks.length;
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
            {!isLoading &&
              hasLinks &&
              links.map(({ name, url }) => (
                <MusicLink key={name} service={name} serviceUrl={url} />
              ))}
            {!isLoading &&
              hasTracks &&
              tracks.map((track, index) => (
                <div key={index}>
                  <p>{track.artist}</p>
                  <p>{track.track}</p>
                  <p>{track.album}</p>
                </div>
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
