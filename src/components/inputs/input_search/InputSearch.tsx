import type { ReactElement } from "react";
import {
  type FieldValues, type Path, useController 
} from "react-hook-form";

import { Icon } from "@/components/icon";
import type { ControlledInputProps } from "@/components/inputs/input/Input.types";

export const InputSearch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  control,
  name,
  type,
  isLight,
  error,
  ...rest
}: ControlledInputProps<TFieldValues, TName>): ReactElement => {
  const { field: { ref: _ref, ...fieldRest }, } = useController({
    control,
    name
  });

  return (
    <div className='flex flex-col items-start w-full'>
      <div
        className={`flex gap-3 justify-start items-center w-full mx-auto rounded-[10px] px-4 py-4 text-base transition-all duration-200 backdrop-blur-md border ${
          isLight
            ? "bg-white/60 text-slate-900 border-slate-300 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-400/20"
            : "bg-white/10 text-white border-white/15 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10"
        }`}
      >
        <Icon icon="search" color={isLight ? "#64748b" : "rgba(255, 254, 237, 0.5)"} />
        <input
          {...rest}
          {...fieldRest}
          type={type}
          className={`w-full bg-transparent outline-none autofill:bg-transparent autofill:transition-colors border-none p-0 focus:ring-0 focus:outline-none ${
            isLight 
              ? "text-slate-900 placeholder:text-slate-500 [:-webkit-autofill&]:[-webkit-text-fill-color:#0f172a]" 
              : "text-white placeholder:text-white/50 [:-webkit-autofill&]:[-webkit-text-fill-color:#ffffff]"
          }`}
        />
      </div>
      <div className='flex justify-between items-center w-full h-4 gap-1'>
        {error && <p className='flex-auto m-0 text-xs leading-4 pl-2 text-new-york-pink'>{error.message}</p>}
      </div>
    </div>
  );
};
