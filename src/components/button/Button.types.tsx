import type { InputHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends Omit<InputHTMLAttributes<HTMLButtonElement>, 'width'> {
  children: ReactNode;
  width?: number;
}
