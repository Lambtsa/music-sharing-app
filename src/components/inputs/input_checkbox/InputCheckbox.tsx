import type { InputHTMLAttributes, ReactElement } from "react";

import { Icon } from "@/components/icon";
import { useTheme } from "@/stores/theme.store";

interface InputCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string | undefined;
  isSelected: boolean;
  handleOnChange: () => void;
}

export const InputCheckbox = ({
  label,
  handleOnChange,
  disabled,
  isSelected,
}: InputCheckboxProps): ReactElement => {
  const { isLight } = useTheme();
  return (
    <div className='relative flex justify-center items-center'>
      <label
        className={`flex absolute justify-center border border-eerie-black-20 items-center gap-1 w-5 h-5 ${isSelected ? "[&>svg]:block border-2 border-tiffany-blue bg-tiffany-blue" : isLight ? "bg-[#FFFFFF] [&>svg]:none" : "bg-ivory-20 [&>svg]:none"} rounded-[4px]`}
      >
        {isSelected && <Icon icon='tick' height={16} width={16} color='#FFFEED' />}
      </label>
      <label>
        <input
          className='cursor-pointer opacity-0 w-5 h-5 disabled:cursor-not-allowed'
          disabled={disabled}
          checked={isSelected}
          onChange={handleOnChange}
          type="checkbox"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
