import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckboxInnerContainer = styled.label<{
  isSelected: boolean;
  isLight: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) => (props.isSelected ? props.theme.colors.tiffanyBlue : "none")};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.tiffanyBlue
      : props.isLight
      ? props.theme.colors.ivory
      : props.theme.colors.ivory20};

  svg {
    display: ${(props) => (props.isSelected ? "block" : "none")};
  }
`;

export const Checkbox = styled.input`
  cursor: pointer;
  opacity: 0;
  width: 20px;
  height: 20px;

  :disabled {
    cursor: not-allowed;
  }
`;
