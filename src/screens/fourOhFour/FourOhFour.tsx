"use client";

import { useRouter } from "next/navigation";
import { type ReactElement, useCallback } from "react";

import { Button } from "@/components/button";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { routes } from "@/utils/routes";

export const FourOhFour = (): ReactElement => {
  const { isLight } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handleOnClick = useCallback(() => {
    router.push(routes.index());
  }, [router]);

  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full h-full mb-4 px-4'>
      <h1 className={`${isLight ? "text-eerieBlack" : "text-ivory"} font-bold text-center text-[110px] leading-[110px]`}>
        {t({
          id: "fourOhFour.title"
        })}
      </h1>
      <p className={`${isLight ? "text-eerie-black-70" : "text-ivory-70"} font-normal italic text-center text-base leading-5`}>
        {t({
          id: "fourOhFour.subtitle"
        })}
      </p>
      <Button
        onClick={handleOnClick}
        width={140}
        type="button"
      >
        {t({
          id: "fourOhFour.cta"
        })}
      </Button>
    </div>
  );
};
