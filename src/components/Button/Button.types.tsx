import { InputHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends Omit<InputHTMLAttributes<HTMLButtonElement>, "width"> {
  children: ReactNode;
  isLight: boolean;
  width?: number;
}
