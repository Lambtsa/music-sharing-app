import { Button as ButtonUI } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  isLight,
  width,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <ButtonUI width={width} {...rest} type="submit" isLight={isLight}>
      {children}
    </ButtonUI>
  );
};
