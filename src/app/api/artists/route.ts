import { type NextRequest } from 'next/server';

import { insert } from '@/core/db';
import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import { searchInputSchema } from '@/schemas/api.schema';
import { SpotifyWebApi } from '@/services/api/spotify';
import type { SearchInputType } from '@/types/api';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: SearchInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const albumSafeParse = searchInputSchema.safeParse(body);

    if (!albumSafeParse.success || !body.search.artist) {
      throw new BadRequestError({
        message: 'Please provide valid input',
        statusCode: 400,
        url: '/api/albums',
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();
    const artists = await spotifyApi.getArtistList(body.search.artist);

    await insert.search({
      track: null,
      artist: body.search.artist,
      url: null,
      search_type: 'artist',
      ip: body.user.ip ?? null,
      city: body.user.geolocation?.city ?? null,
      country: body.user.geolocation?.country ?? null,
      coordinates: body.user.geolocation?.coordinates ?? null,
      timezone: body.user.geolocation?.timezone ?? null,
      url_type: null,
    });

    return new Response(JSON.stringify(artists), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
