import styled from "styled-components";

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const FooterText = styled.p<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight
      ? props.theme.colors.eerieBlack70
      : props.theme.colors.ivory70};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  text-align: center;
  font-size: 14px;
  line-height: 16px;
`;
