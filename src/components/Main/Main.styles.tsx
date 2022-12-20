import styled from "styled-components";

export const MainSection = styled.main<{
  isLight: boolean;
}>`
  flex: 1 1 100%;
  overflow-x: hidden;
  min-width: 100%;
  max-width: 100vw;
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.ivory : props.theme.colors.eerieBlack};
`;
