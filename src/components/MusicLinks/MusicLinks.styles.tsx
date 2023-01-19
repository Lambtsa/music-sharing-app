import styled from "styled-components";

export const StyledButton = styled.button<{
  isCopied: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isCopied
      ? props.theme.colors.chelseaCucumber
      : props.theme.colors.tiffanyBlue};
  padding: 8px 16px;
  width: fit-content;
  margin-top: 16px;
  color: ${(props) => props.theme.colors.ivory};

  /* @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover */
  @media (hover: hover) {
    /* when hover is supported */
    :hover {
      background-color: ${(props) =>
        !props.isCopied && props.theme.colors.viridianGreen};
    }
  }

  :disabled {
    opacity: 40%;
    background-color: ${(props) => props.theme.colors.tiffanyBlue};
    cursor: not-allowed;
  }
`;
