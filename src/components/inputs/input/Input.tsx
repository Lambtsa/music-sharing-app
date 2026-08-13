import type { ReactElement } from "react";

import type { InputProps } from "./Input.types";

export const Input = ({
  type = "text",
  error,
  isLight,
  ...rest
}: InputProps): ReactElement => {
  return (
    <div className='flex flex-col items-start w-full'>
      <input 
        {...rest}
        className={`block w-full mx-auto rounded-[10px] px-4 py-4 text-base outline-none transition-all duration-200 backdrop-blur-md ${
          isLight
            ? "bg-white/60 text-slate-900 border border-slate-300 placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-400/20"
            : "bg-white/10 text-white border border-white/15 placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/10"
        }`}
        type={type}
      />
      <div className='flex justify-between items-center w-full h-4 gap-1'>
        {error && <p className='flex-auto m-0 text-xs leading-4 pl-2 text-new-york-pink'>{error.message}</p>}
      </div>
    </div>
  );
};
