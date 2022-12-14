import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
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
import { MusicData, ResponseMusicData } from "@customTypes";
import { MusicLink } from "@components/Link";
import { Loader } from "@components/Loader";

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = useLightOrDarkTheme();
  const [links, setLinks] = useState<MusicData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("submitted");

      handleSubmit(
        async (formFields) => {
          const response = await fetch("/api/music", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formFields),
          });

          if (response.ok) {
            const data: ResponseMusicData = await response.json();
            console.log({ data: data.links });
            setLinks(data.links);
            setIsLoading(false);
          }
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      )();
    },
    [handleSubmit]
  );

  const hasLinks = !!links.length;

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
          {isLoading && <Loader isLight={isLight} />}
          {!isLoading &&
            hasLinks &&
            links.map(({ name, url }) => (
              <MusicLink key={name} service={name} serviceUrl={url} />
            ))}
        </LinksWrapper>
      </Container>
    </Main>
  );
};
