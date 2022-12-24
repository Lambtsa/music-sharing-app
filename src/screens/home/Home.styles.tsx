import { CONTAINER, MEDIA } from "@constants/layout";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 100%;
  margin-bottom: 16px;
`;

export const Title = styled.h1<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: center;
  font-size: 48px;
  line-height: 48px;

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
  text-align: center;
  font-size: 16px;
  line-height: 20px;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 24px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: ${CONTAINER.MOBILE}px;
  gap: 4px;
`;

export const ShowingDetailsText = styled.p<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight
      ? props.theme.colors.eerieBlack70
      : props.theme.colors.ivory70};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  text-align: left;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
