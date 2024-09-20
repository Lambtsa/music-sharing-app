'use client';

import { ReactComponent as Warning } from '@/assets/warning.svg';
import { useTranslation } from '@/hooks/useTranslation';

interface MessageBoxProps {
  message: FormatjsIntl.Message['ids'];
}

export const MessageBox = ({ message }: MessageBoxProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className='flex justify-start items-center gap-3 p-4 rounded-[10px] bg-pastelPink text-ivory'
    >
      <Warning className='w-[30px] h-[30px] [&>path]:fill-ivory' />
      <p className='text-ivory text-left text-base leading-5'>{t({ id: message })}</p>
    </div>
  );
};
