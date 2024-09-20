import { type NextRequest } from 'next/server';

import { globalApiErrorHandler } from '@/core/errors';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body = await req.json();
    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const userAgentInfo = getUserAgentInfo(req);

    console.log({ body, userAgentInfo });

    return new Response(JSON.stringify({}), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
