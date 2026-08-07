import type { ReactElement } from "react";

import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  width,
  isLoading = false,
  ...rest
}: ButtonProps): ReactElement => {
  return (
    <button 
      {...rest}
      disabled={isLoading || rest.disabled}
      className={`py-3 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed px-6 hover:bg-pastel-pink bg-tiffany-blue text-ivory font-bold rounded-[10px] text-base leading-[20px] ${width ? `w-[${width}px]` : "w-full"} :hover:bg-viridian-green :hover:text-ivory`}
      type="submit"
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-1 h-5">
          <span className="h-2 w-2 rounded-full bg-current animate-[bounce_1s_infinite_100ms]" />
          <span className="h-2 w-2 rounded-full bg-current animate-[bounce_1s_infinite_200ms]" />
          <span className="h-2 w-2 rounded-full bg-current animate-[bounce_1s_infinite_300ms]" />
        </span>
      ) : (
        children
      )}
    </button>
  );
};
