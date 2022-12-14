import { useLightOrDarkTheme } from "@context/ThemeContext";
import { ReactNode } from "react";
import { MainSection } from "./Main.styles";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps): JSX.Element => {
  const { isLight } = useLightOrDarkTheme();
  return <MainSection isLight={isLight}>{children}</MainSection>;
};
