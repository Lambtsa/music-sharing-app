import { type NextRequest, userAgent } from 'next/server';

/**
 *
 */
export const getUserAgentInfo = (
  req: NextRequest
): ReturnType<typeof userAgent> | null => {
  if (process.env.NODE_ENV !== 'test') {
    return userAgent({ headers: req.headers });
  }
  return null;
};
