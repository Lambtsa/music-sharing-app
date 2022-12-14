import { InputHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLight: boolean;
}
