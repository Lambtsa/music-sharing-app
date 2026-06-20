import type { ReactElement } from "react";

import type { InputProps } from "./Input.types";

export const Input = ({
  type = "text",
  error,
  isLight,
  ...rest
}: InputProps): ReactElement => {
  return (
    <div className='flex flex-col items-start'>
      <input 
        {...rest} 
        className={`block w-full px-3 py-4 border-none outline-none mx-auto rounded-[10px] ${isLight ? "bg-eerie-black-20 text-eerie-black [&::placeholder]:text-eerie-black-70" : "bg-ivory-20 text-ivory [&::placeholder]:text-ivory-70"} [&::placeholder]:text-base`}
        type={type}
      />
      <div className='flex justify-between items-center w-full h-4 gap-1'>
        {error && <p className='flex-auto m-0 text-xs leading-4 pl-2 text-new-york-pink'>{error.message}</p>}
      </div>
    </div>
  );
};
