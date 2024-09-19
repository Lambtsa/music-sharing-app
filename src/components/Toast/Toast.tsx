import { ReactComponent as Close } from '@/assets/icons/close.svg';
import { ReactComponent as Info } from '@/assets/icons/info.svg';
import { ReactComponent as Warning } from '@/assets/icons/warning.svg';
import { CONTAINER } from '@/constants/layout';
import { useTranslation } from '@/hooks/useTranslation';

import type { ToastProps } from './Toast.types';

export const Toast = ({ type, message, onClose }: ToastProps): JSX.Element => {
  const { t } = useTranslation();
  const { variables } = message;

  return (
    <div className={`${type === 'Error' ? 'bg-newYorkPink' : 'bg-chelseaCucumber'} top-4 left-1/2 z-[100] rounded-[10px] transform -translate-x-1/2 mx-auto w-[${CONTAINER.MOBILE}px] shadow-[0_0_6px_#262626]`}>
      <div className='relative flex justify-center items-center gap-2 p-4'>
        {type === 'Error' ? <Warning className='w-4 h-4 [&>path]:fill-ivory' /> : <Info className='w-4 h-4 [&>path]:fill-ivory' />}
        <p className='text-ivory text-left text-sm leading-6 font-bold'>{t({ id: message.id }, { ...variables })}</p>
        <button className='absolute top-2 right-2' type='button' onClick={onClose}>
          <Close className='w-4 h-4 [&>path]:fill-ivory' />
        </button>
      </div>
    </div>
  );
};
