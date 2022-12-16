import styled from "styled-components";

export const SelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const SelectorButton = styled.button<{
  isLight: boolean;
  selected: boolean;
}>`
  padding: 16px;
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.tiffanyBlue
      : props.isLight
      ? props.theme.colors.eerieBlack20
      : props.theme.colors.ivory20};
  border-radius: 10px;
`;

export const ButtonText = styled.p<{
  isLight: boolean;
  selected: boolean;
}>`
  color: ${(props) =>
    props.selected
      ? props.theme.colors.ivory
      : props.isLight
      ? props.theme.colors.eerieBlack70
      : props.theme.colors.ivory70};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  text-align: center;
  font-size: 16px;
  line-height: 20px;
`;
