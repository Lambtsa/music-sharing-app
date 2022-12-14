import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Main } from "@components/Main";
import { Container } from "@components/Container";
import { Toggle } from "@components/Toggle";
import { useTranslation } from "@hooks/useTranslation";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import {
  Form,
  HeaderWrapper,
  LinksWrapper,
  Subtitle,
  Title,
} from "./Home.styles";
import { InputText } from "@components/Inputs/InputText";
import { Button } from "@components/Button";
import { MusicProviders } from "@customTypes";
import { MusicLink } from "@components/Link";

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = useLightOrDarkTheme();

  const mockData: { name: MusicProviders; url: string }[] = useMemo(() => {
    return [
      {
        name: "spotify",
        url: "https://open.spotify.com/track/2SGBEDwsOAOAHrrdAd304i",
      },
      {
        name: "deezer",
        url: "https://www.deezer.com/track/3112219",
      },
      {
        name: "youtube",
        url: "https://www.youtube.com/watch?v=pquhYpGHrlw",
      },
    ];
  }, []);

  /* ################################################## */
  /* Forms */
  /* ################################################## */
  /* TODO: add the email error message in french @see https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md */
  const validationSchema = z.object({
    artist: z
      .string({
        required_error: "",
      })
      .min(1)
      .trim(),
    title: z
      .string({
        required_error: "",
      })
      .min(1)
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
    mode: "onChange",
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
      console.log("submitted");

      handleSubmit(
        async (formFields) => {
          // const response = await fetch("/api/music", {
          //   method: "POST",
          //   headers: {
          //     "Content-type": "application/json",
          //   },
          //   body: JSON.stringify(formFields)
          // });

          // const data = await response.json();
          console.log({ formFields });
        },
        (error) => {
          console.log("error", error);
        }
      )();
    },
    [handleSubmit]
  );

  const hasLinks = !!mockData.length;

  return (
    <Main>
      <Container size="mobile">
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
          {hasLinks &&
            mockData.map(({ name, url }) => (
              <MusicLink key={name} service={name} serviceUrl={url} />
            ))}
        </LinksWrapper>
      </Container>
    </Main>
  );
};
