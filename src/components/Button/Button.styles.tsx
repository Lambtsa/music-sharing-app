import styled from "styled-components";

export const Button = styled.button<{
  isLight: boolean;
}>`
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  color: ${(props) =>
    props.isLight ? props.theme.colors.ivory : props.theme.colors.eerieBlack};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};

  :hover {
    color: ${(props) => props.theme.colors.ivory};
    background-color: ${(props) => props.theme.colors.blueMunsell};
    /* transition: all 0.1s ease-out; */
  }
`;
