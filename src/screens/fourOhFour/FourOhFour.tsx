import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Main } from "@components/Main";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import { routes } from "@helpers/routes";
import { useTranslation } from "@hooks/useTranslation";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FourOhFourContainer, Subtitle, Title } from "./FourOhFour.styles";

export const FourOhFour = (): JSX.Element => {
  const { isLight } = useLightOrDarkTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  return (
    <>
      <Main>
        <Container alignment="center" size="mobile">
          <Header />
          <FourOhFourContainer>
            <Title isLight={isLight}>{t({ id: "fourOhFour.title" })}</Title>
            <Subtitle isLight={isLight}>
              {t({ id: "fourOhFour.subtitle" })}
            </Subtitle>
            <Button
              onClick={handleOnClick}
              width={140}
              type="button"
              isLight={isLight}
            >
              {t({ id: "fourOhFour.cta" })}
            </Button>
          </FourOhFourContainer>
        </Container>
      </Main>
      <Footer isLight={isLight} />
    </>
  );
};
