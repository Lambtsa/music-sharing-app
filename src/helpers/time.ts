/**
 * Small helper that creates timeout and clears it after delay
 */
export const delay = <T extends Function>(fn: T, delay: number = 2000) => {
  const timeOut = setTimeout(fn, delay);

  return () => clearTimeout(timeOut);
};
