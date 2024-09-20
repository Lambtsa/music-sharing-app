import type { IconProps } from '@/components/icon/Icon.types';

export const BaseIcon = ({
  id,
  height,
  width,
  rotate = 0,
  opacity,
  viewBox,
  children,
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
  ...rest
}: IconProps) => {
  return (
    <svg
      id={id}
      width={width}
      height={height}
      opacity={opacity}
      transform={`rotate(${rotate})`}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}
      {...rest}
    >
      {children}
    </svg>
  );
};
