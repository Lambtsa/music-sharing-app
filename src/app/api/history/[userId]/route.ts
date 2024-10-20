import { type NextRequest } from 'next/server';

import { selectSearch, selectUser } from '@/core/db';
import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import type { SearchReturnType } from '@/types/api';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

type RouteParams = {
  params: Record<string, string>;
};

export const GET = async (req: NextRequest, routeParams: RouteParams): Promise<Response> => {
  const {
    params: { userId },
  } = routeParams;
  try {
    const userAgentInfo = getUserAgentInfo(req);

    if (!userId) {
      throw new BadRequestError({
        message: 'User is not authenticated',
        statusCode: 401,
        url: '/api/history/[userId]',
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const userResponse = await selectUser(userId);

    const user = userResponse.data?.[0];

    if (!user?.id) {
      throw new Error('User not found');
    }

    const searchResponse = await selectSearch(user?.id);

    if (!searchResponse.data) {
      return new Response(JSON.stringify([]), {
        status: 200,
      }); 
    }

    const searches: SearchReturnType[] = searchResponse.data.map(((search) => ({
      id: search.id,
      search_type: search.search_type,
      artist: search.artist,
      track: search.track,
      url: search.url,
      url_type: search.url_type,
      created_at: search.created_at
    })));

    return new Response(JSON.stringify(searches), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
