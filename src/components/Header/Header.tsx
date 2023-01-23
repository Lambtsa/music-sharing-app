import { Toggle } from "@components/Toggle";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import { routes } from "@helpers/routes";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { HeaderContainer, LogoButton } from "./Header.styles";
import { ReactComponent as LightLogo } from "@assets/lightLogo.svg";
import { ReactComponent as DarkLogo } from "@assets/darkLogo.svg";

export const Header = (): JSX.Element => {
  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  return (
    <HeaderContainer isLight={isLight} data-test="header">
      <LogoButton data-test="header-button" onClick={handleOnClick}>
        {isLight ? (
          <DarkLogo data-test="header-svg-dark" />
        ) : (
          <LightLogo data-test="header-svg-light" />
        )}
      </LogoButton>
      <Toggle />
    </HeaderContainer>
  );
};
