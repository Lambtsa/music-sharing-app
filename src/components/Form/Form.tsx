import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";
import { StyledForm } from "./Form.styles";

interface FormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: ReactNode;
}

export const Form = ({ children }: FormProps): JSX.Element => {
  return <StyledForm>{children}</StyledForm>;
};
