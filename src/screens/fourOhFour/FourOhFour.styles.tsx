import { MEDIA } from "@constants/layout";
import styled from "styled-components";

export const FourOhFourContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
`;

export const Title = styled.h1<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: center;
  font-size: 110px;
  line-height: 110px;

  @media ${MEDIA.MOBILE} {
    font-size: 36px;
    line-height: 36px;
  } ;
`;

export const Subtitle = styled.p<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight
      ? props.theme.colors.eerieBlack70
      : props.theme.colors.ivory70};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-style: italic;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
`;
