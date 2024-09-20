import type { ButtonProps } from './Button.types';

export const Button = ({
  children,
  width,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button 
      {...rest} 
      className={`py-3 px-6 bg-tiffanyBlue text-ivory font-bold rounded-[10px] text-base leading-[20px] ${width ? `w-[${width}px]` : 'w-full'} :hover:bg-viridianGreen :hover:text-ivory`}
      type="submit"
    >
      {children}
    </button>
  );
};
