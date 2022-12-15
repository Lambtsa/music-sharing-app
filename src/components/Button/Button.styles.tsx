import styled from "styled-components";

export const Button = styled.button<{
  isLight: boolean;
}>`
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.ivory};
  background-color: ${(props) => props.theme.colors.tiffanyBlue};

  :hover {
    color: ${(props) => props.theme.colors.ivory};
    background-color: ${(props) => props.theme.colors.viridianGreen};
    /* transition: all 0.1s ease-out; */
  }
`;
