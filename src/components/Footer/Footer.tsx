import { useTranslation } from '@/hooks/useTranslation';

export const Footer = ({ isLight }: { isLight: boolean }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={`flex min-w-full justify-center items-center p-4 ${isLight ? 'bg-ivory' : 'bg-eerieBlack'} bottom-0 left-0 right-0`}>
      <p className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} font-normal text-center text-sm leading-4`}>
        {t({ id: 'footer.copyright' }, { date: new Date().getFullYear() })}
      </p>
    </div>
  );
};
