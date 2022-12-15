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
import { MusicData, ResponseMusicData } from "@customTypes";
import { MusicLink } from "@components/Link";
import { Loader } from "@components/Loader";
import { MessageBox } from "@components/MessageBox";

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = useLightOrDarkTheme();
  const [links, setLinks] = useState<MusicData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    FormatjsIntl.Message["ids"] | undefined
  >(undefined);

  /* ################################################## */
  /* Forms */
  /* ################################################## */
  /* TODO: add the email error message in french @see https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md */
  const validationSchema = z.object({
    artist: z
      .string({
        required_error: t({ id: "error.message.requiredArtist" }),
      })
      .min(1, { message: t({ id: "error.message.requiredArtist" }) })
      .trim(),
    title: z
      .string({
        required_error: t({ id: "error.message.requiredTitle" }),
      })
      .min(1, { message: t({ id: "error.message.requiredTitle" }) })
      .trim(),
  });

  type FormFields = TypeOf<typeof validationSchema>;

  const defaultValues: FormFields = useMemo(
    () => ({
      artist: "",
      title: "",
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

      handleSubmit(
        async (formFields) => {
          // TODO: add settimeout for fetch for ux
          const response = await fetch("/api/music", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formFields),
          });

          if (response.ok) {
            const data: ResponseMusicData = await response.json();
            setLinks(data.links);
            setErrorMessage(undefined);
            setIsLoading(false);
          }
        },
        (error) => {
          console.log("error", error);
          // TODO: make specific error messages
          setErrorMessage("error.message.noTitle");
          setIsLoading(false);
        }
      )();
    },
    [handleSubmit]
  );

  const hasLinks = !!links.length;
  const hasErrorMessage = !!errorMessage;

  return (
    <Main>
      <Container size="mobile">
        <LogoContainer>{isLight ? <DarkLogo /> : <LightLogo />}</LogoContainer>
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
            name="artist"
            placeholder={t({ id: "label.artist" })}
            error={formErrors.artist}
          />
          <InputText
            isLight={isLight}
            type="text"
            control={control}
            name="title"
            placeholder={t({ id: "label.title" })}
            error={formErrors.title}
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
          {!isLoading && hasErrorMessage && (
            <MessageBox message={errorMessage} />
          )}
        </LinksWrapper>
      </Container>
    </Main>
  );
};
