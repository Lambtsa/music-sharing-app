"use client";

import type { ReactElement } from "react";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";

export const Footer = (): ReactElement => {
  const { isLight } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`flex min-w-full justify-center items-center p-4 ${isLight ? "bg-ivory" : "bg-eerie-black"} bottom-0 left-0 right-0`}>
      <p className={`${isLight ? "text-eerie-black" : "text-ivory"} font-normal text-center text-sm leading-4`}>
        {t({
          id: "footer.copyright" 
        }, {
          date: new Date().getFullYear() 
        })}
      </p>
    </div>
  );
};
