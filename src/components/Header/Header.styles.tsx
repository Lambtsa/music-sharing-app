import styled from "styled-components";

export const HeaderContainer = styled.header<{
  isLight: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.ivory : props.theme.colors.eerieBlack};
`;

export const LogoButton = styled.button``;
