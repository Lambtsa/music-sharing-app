import { type ReactNode, type SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  height?: number;
  width?: number;
  color?: string;
  disabled?: boolean;
  opacity?: number;
  onClick?: () => void;
  rotate?: number;
  viewBox?: string;
  xmlns?: string;
  fill?: string;
  children: ReactNode;
}
export type IconType =
  | 'burger'
  | 'close'
  | 'chevron'
  | 'dark'
  | 'deezer'
  | 'info'
  | 'light'
  | 'link'
  | 'moon'
  | 'music'
  | 'placeholder'
  | 'search'
  | 'share'
  | 'spotify'
  | 'sun'
  | 'tick'
  | 'valid'
  | 'warning'
  | 'youtube';
