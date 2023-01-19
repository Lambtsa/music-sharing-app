import styled, { css } from "styled-components";

export const LinkWrapper = styled.div<{
  isLight: boolean;
  disabled: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.tiffanyBlue20 : props.theme.colors.onyx};
  border-radius: 10px;
  width: 100%;
  padding: 12px 16px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 40%;
    `}
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export const StyledInput = styled.input<{
  isLight: boolean;
}>`
  flex: 1 1 auto;
  border-radius: 7px 0 0 7px;
  padding: 8px 10px;
  color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.ivory : props.theme.colors.ivory20};
  overflow: hidden;
  text-overflow: ellipsis;
`;
