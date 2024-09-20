import type { InputHTMLAttributes } from 'react';

import { Icon } from '@/components/icon';

interface InputCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | undefined;
  isLight: boolean;
  isSelected: boolean;
  handleOnChange: () => void;
}

export const InputCheckbox = ({
  label,
  isLight,
  handleOnChange,
  disabled,
  isSelected,
}: InputCheckboxProps): JSX.Element => {
  return (
    <div className='relative flex justify-center items-center'>
      <label
        className={`flex absolute justify-center items-center gap-1 w-5 h-5 ${isSelected ? '[&>svg]:block border-2 border-tiffanyBlue bg-tiffanyBlue' : isLight ? 'bg-ivory [&>svg]:none' : 'bg-ivory20 [&>svg]:none'} rounded-[4px]`}
      >
        <Icon icon='tick' />
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
