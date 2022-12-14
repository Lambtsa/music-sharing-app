import { Button as ButtonUI } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  isLight,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <ButtonUI {...rest} type="submit" isLight={isLight}>
      {children}
    </ButtonUI>
  );
};
