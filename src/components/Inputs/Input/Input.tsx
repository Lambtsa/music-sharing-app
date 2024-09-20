import type { InputProps } from './Input.types';

export const Input = ({
  type = 'text',
  error,
  isLight,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div className='flex flex-col items-start'>
      <input 
        {...rest} 
        className={`block w-full px-3 py-4 border-none outline-none mx-auto rounded-[10px] ${isLight ? 'bg-eerieBlack20 text-eerieBlack [&::placeholder]:text-eerieBlack70' : 'bg-ivory20 text-ivory [&::placeholder]:text-ivory70'} [&::placeholder]:text-base`} 
        type={type}
      />
      <div className='flex justify-between items-center w-full h-4 gap-1'>
        {error && <p className='flex-auto m-0 text-xs leading-4 pl-2 text-newYorkPink'>{error.message}</p>}
      </div>
    </div>
  );
};
