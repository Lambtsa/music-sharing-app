import { Logo } from "@components/Logo";
import { Toggle } from "@components/Toggle";
import { useLightOrDarkTheme } from "@context/ThemeContext";
import { HeaderContainer } from "./Header.styles";

export const Header = (): JSX.Element => {
  /* ################################################## */
  /* State */
  /* ################################################## */
  const { isLight } = useLightOrDarkTheme();

  return (
    <HeaderContainer>
      <Logo isLight={isLight} />
      <Toggle />
    </HeaderContainer>
  );
};
