import { InputHTMLAttributes } from "react";
import {
  Checkbox,
  CheckboxInnerContainer,
  CheckboxWrapper,
} from "./InputCheckbox.styles";
import { ReactComponent as Tick } from "@assets/tick16.svg";

interface InputCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string | undefined;
  isLight: boolean;
  isSelected: boolean;
  handleOnChange: () => void;
}

export const InputCheckbox = ({
  label,
  isLight,
  handleOnChange,
  disabled,
  isSelected,
}: InputCheckboxProps): JSX.Element => {
  return (
    <CheckboxWrapper>
      <CheckboxInnerContainer isLight={isLight} isSelected={isSelected}>
        <Tick />
      </CheckboxInnerContainer>
      <label>
        <Checkbox
          data-test="link-checkbox"
          disabled={disabled}
          checked={isSelected}
          onChange={handleOnChange}
          type="checkbox"
        />
        <span>{label}</span>
      </label>
    </CheckboxWrapper>
  );
};
