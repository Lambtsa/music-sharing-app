import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Header } from "@components/Header";
import { Main } from "@components/Main";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import { useTranslation } from "@hooks/useTranslation";
import { FourOhFourContainer, Subtitle, Title } from "./FourOhFour.styles";

export const FourOhFour = (): JSX.Element => {
  const { isLight } = useLightOrDarkTheme();
  const { t } = useTranslation();

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
            <Button width={140} type="button" isLight={isLight}>
              {t({ id: "fourOhFour.cta" })}
            </Button>
          </FourOhFourContainer>
        </Container>
      </Main>
    </>
  );
};
