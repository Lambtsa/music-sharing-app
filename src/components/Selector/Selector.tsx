import { type Dispatch, type SetStateAction, useMemo } from 'react';

import { useTranslation } from '@/hooks/useTranslation';
import type { SearchType } from '@/types/music';

interface SelectorProps {
  isLight: boolean;
  selected: SearchType;
  setSelected: Dispatch<SetStateAction<SearchType>>;
}

export const Selector = ({
  isLight,
  selected,
  setSelected,
}: SelectorProps): JSX.Element => {
  const { t } = useTranslation();

  const options = useMemo((): SearchType[] => {
    return ['artist', 'track', 'url'];
  }, []);

  const handleOnClick = (input: SearchType) => {
    setSelected(input);
  };

  const hasOptions = !!options.length;

  return (
    <div className='grid grid-cols-3 justify-center items-center gap-2 mb-4'>
      {hasOptions &&
        options.map((option) => (
          <button
            className={`p-4 hover:bg-pastelPink ${selected === option ? 'bg-tiffanyBlue' : isLight ? 'bg-eerieBlack20' : 'bg-ivory20'} rounded-[10px]`}
            type="button"
            key={option}
            onClick={() => handleOnClick(option)}
          >
            <p className={`text-center ${selected === option ? 'text-ivory' : isLight ? 'text-eerieBlack70' : 'text-ivory70'} font-normal text-base leading-[20px]`}>
              {t({ id: `label.${option}` })}
            </p>
          </button>
        ))}
    </div>
  );
};
