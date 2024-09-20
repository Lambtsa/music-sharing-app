/**
 * Small helper that creates timeout and clears it after delay
 */
export const delay = <T extends () => void>(fn: T, delay: number = 1000) => {
  const timeOut = setTimeout(fn, delay);

  return (): void => clearTimeout(timeOut);
};
