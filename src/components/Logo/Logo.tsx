import { LogoContainer } from "./Logo.styles";
import { ReactComponent as LightLogo } from "@assets/lightLogo.svg";
import { ReactComponent as DarkLogo } from "@assets/darkLogo.svg";

interface LogoProps {
  isLight: boolean;
}

export const Logo = ({ isLight }: LogoProps): JSX.Element => {
  return (
    <LogoContainer>{isLight ? <DarkLogo /> : <LightLogo />}</LogoContainer>
  );
};
