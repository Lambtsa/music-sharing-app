'use client';

import { useRouter } from 'next/navigation';
import { type ReactElement, useCallback } from 'react';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { useLightOrDarkTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { routes } from '@/utils/routes';

export const FourOhFour = (): ReactElement => {
  const { isLight } = useLightOrDarkTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  return (
    <>
      <Main>
        <Container size="mobile">
          <Header />
          <div className='flex flex-col justify-center items-center gap-4 w-full h-full mb-4'>
            <h1 className={`${isLight ? 'text-eerieBlack' : 'text-ivory'} font-bold text-center text-[110px] leading-[110px]`}>
              {t({ id: 'fourOhFour.title' })}
            </h1>
            <p className={`${isLight ? 'text-eerieBlack70' : 'text-ivory70'} font-normal italic text-center text-base leading-5`}>
              {t({ id: 'fourOhFour.subtitle' })}
            </p>
            <Button
              onClick={handleOnClick}
              width={140}
              type="button"
            >
              {t({ id: 'fourOhFour.cta' })}
            </Button>
          </div>
        </Container>
      </Main>
      <Footer isLight={isLight} />
    </>
  );
};
