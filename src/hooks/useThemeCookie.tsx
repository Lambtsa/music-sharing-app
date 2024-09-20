/* eslint-disable no-duplicate-imports */
import type { Dispatch, SetStateAction} from 'react';
import { useEffect, useState } from 'react';
import { useCookie } from 'react-use';

interface UseThemeCookieReturnType {
  value: boolean;
  updateValue: Dispatch<SetStateAction<boolean>>;
}

/**
 * If cookie value is anything other than "true" then the function will return false
 */
export const convertCookieValue = (cookie: string | null): boolean => {
  return cookie === 'true';
};

export const useThemeCookie = (
  defaultValue: boolean,
): UseThemeCookieReturnType => {
  const [cookie, updateCookie] = useCookie('theme');
  const [value, setValue] = useState<boolean>(defaultValue);

  useEffect(() => {
    const cookieValue = convertCookieValue(cookie);
    setValue(cookieValue);
  }, [cookie]);

  useEffect(() => {
    const cookieValue = convertCookieValue(cookie);
    if (cookieValue === value) {
      return;
    }
    updateCookie(`${value}`, {
      expires: 31536000,
    });
  }, [cookie, updateCookie, value]);

  return {
    value,
    updateValue: setValue,
  };
};
