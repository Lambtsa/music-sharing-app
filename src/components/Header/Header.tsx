import { Logo } from "@components/Logo";
import { Toggle } from "@components/Toggle";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import { routes } from "@helpers/routes";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { HeaderContainer, LogoButton } from "./Header.styles";

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
    <HeaderContainer>
      <LogoButton onClick={handleOnClick}>
        <Logo isLight={isLight} />
      </LogoButton>
      <Toggle />
    </HeaderContainer>
  );
};
