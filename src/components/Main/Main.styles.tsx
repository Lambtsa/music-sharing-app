import styled from "styled-components";

export const MainSection = styled.main<{
  isLight: boolean;
}>`
  flex: 1 1 100%;
  overflow: hidden;
  min-width: 100%;
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.ivory : props.theme.colors.eerieBlack};
`;
