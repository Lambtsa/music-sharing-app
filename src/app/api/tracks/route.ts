import { type NextRequest } from 'next/server';

import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import { searchInputSchema } from '@/schemas/input.schema';
import { SpotifyWebApi } from '@/services/spotify';
import type { SearchInputType } from '@/types/api';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: SearchInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const trackSafeParse = searchInputSchema.safeParse(body);

    if (!trackSafeParse.success) {
      throw new BadRequestError({
        message: 'Please provide valid input',
        statusCode: 400,
        url: '/api/tracks',
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();

    const tracks = await spotifyApi.getTrackList(body.searchTerm);

    return new Response(JSON.stringify(tracks), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
