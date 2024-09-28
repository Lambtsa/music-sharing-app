import { useCallback } from 'react';

import { Icon } from '@/components/icon';
import { useLightOrDarkTheme } from '@/context/ThemeContext';

export const Toggle = (): JSX.Element => {
  const { isLight, setIsLight } = useLightOrDarkTheme();

  const handleChange = useCallback(() => {
    setIsLight(!isLight);
  }, [isLight, setIsLight]);

  return (
    <form data-testid='theme-toggle-form' className='relative w-[60px] inline-block p-0'>
      <input
        data-testid='theme-toggle-input'
        className='hidden'
        type="checkbox"
        onChange={handleChange}
        name="themeToggle"
        id="themeToggle"
        checked={isLight}
      />
      <label 
        data-testid='theme-toggle-label'
        className={`flex overflow-hidden cursor-pointer h-[30px] rounded-[20px] m-0 bg-eerieBlack border border-solid ${isLight ? 'border-eerieBlack' : 'border-ivory'}`} 
        htmlFor="themeToggle"
      >
        <div className='flex items-center w-full justify-between px-[6px]'>
          <Icon data-testid='theme-toggle-icon-light' color='#FFFEED' height={16} width={16} icon="sun" />
          <Icon data-testid='theme-toggle-icon-dark' color='#FFFEED' height={16} width={16} icon='moon' />
        </div>
        <div className={`flex w-[25px] m-[3px] bg-ivory absolute top-0 bottom-0 ${isLight ? 'right-0' : 'right-[1.8rem]'} rounded-[1.2rem] transition-all duration-300 ease-in`}/>
      </label>
    </form>
  );
};
