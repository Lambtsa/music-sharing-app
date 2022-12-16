import { useTranslation } from "@hooks/useTranslation";
import { FooterContainer, FooterText } from "./Footer.styles";

export const Footer = ({ isLight }: { isLight: boolean }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <FooterContainer isLight={isLight}>
      <FooterText isLight={isLight}>
        {t({ id: "footer.copyright" }, { date: new Date().getFullYear() })}
      </FooterText>
    </FooterContainer>
  );
};
