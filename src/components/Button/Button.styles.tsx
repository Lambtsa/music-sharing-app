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

  /* @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover */
  @media (hover: hover) {
    /* when hover is supported */
    :hover {
      color: ${(props) => props.theme.colors.ivory};
      background-color: ${(props) => props.theme.colors.viridianGreen};
    }
  }
`;
